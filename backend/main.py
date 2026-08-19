import sys
import os

# Ensure backend directory is in sys.path for robust import resolution
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional, List, Dict, Any
import json
from datetime import datetime

from database import engine, get_db, Base
from models.db_models import (
    FarmerProfileDB, CropHistoryDB, DiseaseHistoryDB, PriceHistoryDB, ChatLogDB,
    CommunityPostDB, CommunityCommentDB
)
from models.pydantic_schemas import (
    FarmerProfileSchema, CropRecommendationRequest, CropRecommendationResponse,
    CropRecommendationRequestV2, CropRecommendationResponseV2,
    YieldPredictionRequest, YieldPredictionResponse,
    DiseaseDetectionResponse, PricePredictionRequest, PricePredictionResponse,
    WeatherResponse, IrrigationRequest, IrrigationResponse, SchemeSchema,
    ChatRequest, ChatResponse,
    CommunityPostCreateSchema, CommunityPostResponseSchema,
    CommunityCommentCreateSchema, CommunityCommentResponseSchema,
    CommunitySummaryResponse
)

from services.india_agri_data import (
    INDIA_STATES_DISTRICTS, GPS_LOCATIONS, find_nearest_location_by_gps,
    get_crops_by_location_and_season, STATE_SOIL_MAP, CROP_AGRI_METADATA
)
from services.comprehensive_crop_database import (
    COMPREHENSIVE_CROP_DATABASE, ALL_MONTHS, get_all_categories,
    get_crops_by_category, get_crops_by_month
)
from services.crop_rec_service import predict_crop, predict_crop_v2
from services.yield_prediction_service import predict_crop_yield
from services.disease_service import analyze_crop_disease
from services.price_service import predict_crop_prices
from services.weather_service import get_live_weather
from services.irrigation_service import calculate_smart_irrigation
from services.market_service import get_market_intelligence
from services.schemes_service import get_government_schemes, monitor_official_sources
from services.rag_chatbot_service import generate_rag_response
from services.sms_service import send_farmer_registration_sms

# Auto-create SQLite database tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="KrishiAstra — AI Smart Farming API",
    description="India-Wide AI Smart Agriculture Platform for Crop Recommendation, ML Yield Forecasting, Leaf Disease Detection, APMC Price Trends, Farmer Community, and Multilingual Groq Llama 3.3 RAG Chatbot.",
    version="2.0.0"
)

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------
# 1. LOCATION & CROP INTELLIGENCE ENDPOINTS
# ----------------------------------------------------
@app.get("/api/location/states-districts")
def get_india_states_districts():
    """Returns all 28 States, 8 UTs, and their respective Districts across India."""
    return INDIA_STATES_DISTRICTS

@app.post("/api/location/gps")
def get_location_by_gps(lat: float = Query(...), lon: float = Query(...)):
    """Matches user's GPS coordinates to the nearest Indian District and State."""
    return find_nearest_location_by_gps(lat, lon)

@app.get("/api/india-agri-map")
def get_india_agri_map(state: str = Query("Karnataka"), district: Optional[str] = Query("Mandya")):
    """Returns regional soil profile, major crops, seasonal suitability, and market info for selected state/district."""
    soil = STATE_SOIL_MAP.get(state, "Alluvial")
    crops_kharif = get_crops_by_location_and_season(state, district, "Kharif")[:4]
    crops_rabi = get_crops_by_location_and_season(state, district, "Rabi")[:4]
    crops_zaid = get_crops_by_location_and_season(state, district, "Zaid")[:3]
    
    return {
        "state": state,
        "district": district or "Central Region",
        "primary_soil": soil,
        "kharif_crops": crops_kharif,
        "rabi_crops": crops_rabi,
        "zaid_crops": crops_zaid,
        "avg_annual_rainfall_mm": 950.0,
        "major_commodities": [c["crop"] for c in crops_kharif[:3]]
    }

@app.get("/api/crops/database")
def get_crops_database_endpoint(
    category: Optional[str] = Query(None),
    month: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """Returns comprehensive plant, crop, and disease dataset with optional category, month, or search filtering."""
    results = {}
    for crop_name, data in COMPREHENSIVE_CROP_DATABASE.items():
        if category and category.lower() != "all" and data.get("category", "").lower() != category.lower():
            continue
        if month and month.lower() != "all" and month not in data.get("suitable_months", []):
            continue
        if search and search.lower() not in crop_name.lower() and search.lower() not in data.get("category", "").lower():
            continue
        results[crop_name] = data
    return {
        "total_crops": len(results),
        "crops": results
    }

@app.get("/api/crops/categories")
def get_crop_categories_endpoint():
    """Returns all 11 agricultural crop categories."""
    return get_all_categories()

@app.get("/api/crops/months")
def get_crop_months_endpoint():
    """Returns all 12 calendar months (January to December)."""
    return ALL_MONTHS

# ----------------------------------------------------
# 2. CROP RECOMMENDATION ENDPOINTS (Legacy + Location-Aware V2)
# ----------------------------------------------------
@app.post("/api/recommend-crop", response_model=CropRecommendationResponse)
def recommend_crop_legacy(req: CropRecommendationRequest, db: Session = Depends(get_db)):
    """Legacy 7-parameter NPK/Weather Crop Recommendation endpoint."""
    res = predict_crop(req.n, req.p, req.k, req.temp, req.humidity, req.ph, req.rainfall)
    
    history = CropHistoryDB(
        n=req.n, p=req.p, k=req.k, temp=req.temp, humidity=req.humidity,
        ph=req.ph, rainfall=req.rainfall, recommended_crop=res["recommended_crop"],
        confidence=res["confidence"], top_crops=res["top_crops"]
    )
    db.add(history)
    db.commit()
    return res

@app.post("/api/recommend-crop-v2", response_model=CropRecommendationResponseV2)
def recommend_crop_v2(req: CropRecommendationRequestV2, db: Session = Depends(get_db)):
    """India-Wide Location & Season Aware Smart Crop Recommendation Engine."""
    res = predict_crop_v2(
        state=req.state, district=req.district, season=req.season, soil_type=req.soil_type,
        n=req.n, p=req.p, k=req.k, temp=req.temp, humidity=req.humidity, ph=req.ph, rainfall=req.rainfall
    )
    return res

# ----------------------------------------------------
# 3. ML YIELD & PRODUCTION PREDICTION ENDPOINT (Month-Based)
# ----------------------------------------------------
@app.post("/api/predict-yield", response_model=YieldPredictionResponse)
def predict_yield_endpoint(req: YieldPredictionRequest):
    """ML Random Forest Crop Yield (tonnes/ha) & Total Production Forecast Engine using Calendar Months."""
    return predict_crop_yield(
        crop=req.crop, state=req.state, district=req.district, month=req.month,
        soil_type=req.soil_type, area_acres=req.area_acres, rainfall_mm=req.rainfall_mm,
        temperature_c=req.temperature_c, n_kg_ha=req.n_kg_ha, p_kg_ha=req.p_kg_ha, k_kg_ha=req.k_kg_ha
    )

# ----------------------------------------------------
# 4. VISION LEAF DISEASE DETECTION ENDPOINT
# ----------------------------------------------------
@app.post("/api/detect-disease", response_model=DiseaseDetectionResponse)
async def detect_disease_endpoint(
    crop_hint: str = Form("Tomato"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """PyTorch CNN + OpenCV Visual Disease Segmentation & Treatment Engine."""
    contents = await file.read()
    res = analyze_crop_disease(image_bytes=contents, crop_hint=crop_hint)
    
    if res.get("is_valid_leaf", True):
        history = DiseaseHistoryDB(
            crop_name=res["crop_name"], disease_name=res["disease_name"],
            confidence=res["confidence"] or 0.0, affected_percentage=res["affected_percentage"],
            treatment_organic="\n".join(res["organic_treatment"]),
            treatment_chemical="\n".join(res["chemical_treatment"]),
            image_name=file.filename
        )
        db.add(history)
        db.commit()
    return res

# ----------------------------------------------------
# 5. APMC MARKET PRICE FORECASTING
# ----------------------------------------------------
@app.post("/api/predict-price", response_model=PricePredictionResponse)
def predict_price_endpoint(req: PricePredictionRequest, db: Session = Depends(get_db)):
    res = predict_crop_prices(crop=req.crop, state=req.state, mandi=req.mandi)
    
    history = PriceHistoryDB(
        crop=req.crop, state=req.state, current_price=res["current_price"],
        predicted_30d_price=res["predicted_30d_price"], trend=res["trend"],
        recommendation=res["recommendation"]
    )
    db.add(history)
    db.commit()
    return res

# ----------------------------------------------------
# 6. LIVE WEATHER & SMART IRRIGATION
# ----------------------------------------------------
@app.get("/api/weather", response_model=WeatherResponse)
async def weather_endpoint(location: str = Query("Mandya")):
    return await get_live_weather(location_query=location)

@app.post("/api/calculate-irrigation", response_model=IrrigationResponse)
def irrigation_endpoint(req: IrrigationRequest):
    return calculate_smart_irrigation(
        crop=req.crop, soil_type=req.soil_type,
        soil_moisture_pct=req.soil_moisture_pct,
        current_temp=req.current_temp, forecast_rain_mm=req.forecast_rain_mm
    )

# ----------------------------------------------------
# 7. APMC MANDI MARKET INTELLIGENCE
# ----------------------------------------------------
@app.get("/api/market-intelligence")
def market_intelligence_endpoint(state: str = Query("Karnataka")):
    return get_market_intelligence(state=state)

# ----------------------------------------------------
# 8. GOVERNMENT SCHEMES MONITOR
# ----------------------------------------------------
@app.get("/api/government-schemes")
def government_schemes_endpoint():
    return get_government_schemes()

@app.post("/api/trigger-source-monitor")
def trigger_source_monitor_endpoint():
    return monitor_official_sources()

# ----------------------------------------------------
# 9. FARMER COMMUNITY HUB ENDPOINTS
# ----------------------------------------------------
@app.get("/api/community/posts", response_model=List[CommunityPostResponseSchema])
def get_community_posts(
    state: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    crop_tag: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """Lists community posts with location, crop tag, and keyword filtering."""
    query = db.query(CommunityPostDB).filter(CommunityPostDB.is_hidden == False)
    
    if state:
        query = query.filter(CommunityPostDB.state == state)
    if district:
        query = query.filter(CommunityPostDB.district == district)
    if crop_tag and crop_tag != "All":
        query = query.filter(CommunityPostDB.crop_tag == crop_tag)
    if search:
        s_term = f"%{search}%"
        query = query.filter(CommunityPostDB.title.ilike(s_term) | CommunityPostDB.content.ilike(s_term))
        
    posts = query.order_by(CommunityPostDB.created_at.desc()).all()
    
    # Populate mock initial posts if database is empty
    if not posts and not search and not crop_tag:
        mock_posts = [
            CommunityPostDB(
                farmer_name="Suresh Gowda", state="Karnataka", district="Mandya", crop_tag="Paddy / Rice",
                title="Best organic remedy for stem borer in Kharif Paddy?",
                content="My paddy field in Mandya is showing dead hearts in early tillering. Has anyone tried Trichogramma egg parasitoid cards or neem cake?",
                helpful_count=12, reports_count=0
            ),
            CommunityPostDB(
                farmer_name="Rajesh Patil", state="Maharashtra", district="Nashik", crop_tag="Tomato",
                title="Tomato mandi rates up by ₹400 in Nashik APMC",
                content="Wholesale buyers offering good prices today for Grade-A Tomato. Better to sell now or wait for weekend?",
                helpful_count=18, reports_count=0
            ),
            CommunityPostDB(
                farmer_name="Gurpreet Singh", state="Punjab", district="Ludhiana", crop_tag="Wheat",
                title="Drip irrigation water requirement during warm March days",
                content="Temperature rising fast in Punjab. Adjusting irrigation to 4-day intervals for wheat grain filling.",
                helpful_count=9, reports_count=0
            )
        ]
        db.add_all(mock_posts)
        db.commit()
        posts = db.query(CommunityPostDB).order_by(CommunityPostDB.created_at.desc()).all()

    result = []
    for p in posts:
        comments_db = db.query(CommunityCommentDB).filter(CommunityCommentDB.post_id == p.id).all()
        cmts = [
            CommunityCommentResponseSchema(
                id=c.id, post_id=c.post_id, farmer_name=c.farmer_name,
                comment_text=c.comment_text, created_at=c.created_at.strftime("%Y-%m-%d %H:%M")
            ) for c in comments_db
        ]
        result.append(
            CommunityPostResponseSchema(
                id=p.id, farmer_name=p.farmer_name, state=p.state, district=p.district,
                crop_tag=p.crop_tag, title=p.title, content=p.content, image_url=p.image_url,
                helpful_count=p.helpful_count, comments_count=len(cmts),
                created_at=p.created_at.strftime("%Y-%m-%d %H:%M"), comments=cmts
            )
        )
    return result

@app.post("/api/community/posts", response_model=CommunityPostResponseSchema)
def create_community_post(req: CommunityPostCreateSchema, db: Session = Depends(get_db)):
    post = CommunityPostDB(
        farmer_name=req.farmer_name or "Ramesh Patel",
        state=req.state or "Karnataka",
        district=req.district or "Mandya",
        crop_tag=req.crop_tag or "General",
        title=req.title,
        content=req.content,
        image_url=req.image_url
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return CommunityPostResponseSchema(
        id=post.id, farmer_name=post.farmer_name, state=post.state, district=post.district,
        crop_tag=post.crop_tag, title=post.title, content=post.content, image_url=post.image_url,
        helpful_count=0, comments_count=0, created_at=post.created_at.strftime("%Y-%m-%d %H:%M"), comments=[]
    )

@app.post("/api/community/posts/{post_id}/comments", response_model=CommunityCommentResponseSchema)
def add_community_comment(post_id: int, req: CommunityCommentCreateSchema, db: Session = Depends(get_db)):
    post = db.query(CommunityPostDB).filter(CommunityPostDB.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
        
    cmt = CommunityCommentDB(
        post_id=post_id,
        farmer_name=req.farmer_name or "Kisan Partner",
        comment_text=req.comment_text
    )
    db.add(cmt)
    db.commit()
    db.refresh(cmt)
    return CommunityCommentResponseSchema(
        id=cmt.id, post_id=cmt.post_id, farmer_name=cmt.farmer_name,
        comment_text=cmt.comment_text, created_at=cmt.created_at.strftime("%Y-%m-%d %H:%M")
    )

@app.post("/api/community/posts/{post_id}/helpful")
def vote_post_helpful(post_id: int, db: Session = Depends(get_db)):
    post = db.query(CommunityPostDB).filter(CommunityPostDB.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post.helpful_count += 1
    db.commit()
    return {"message": "Vote recorded", "helpful_count": post.helpful_count}

@app.post("/api/community/posts/{post_id}/report")
def report_community_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(CommunityPostDB).filter(CommunityPostDB.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post.reports_count += 1
    if post.reports_count >= 5:
        post.is_hidden = True
    db.commit()
    return {"message": "Post reported", "reports_count": post.reports_count}

@app.get("/api/community/ai-summary", response_model=CommunitySummaryResponse)
def get_community_ai_summary(db: Session = Depends(get_db)):
    posts = db.query(CommunityPostDB).filter(CommunityPostDB.is_hidden == False).all()
    districts = list(set([p.district for p in posts]))
    crops = list(set([p.crop_tag for p in posts]))
    
    return {
        "total_posts": len(posts),
        "active_districts": districts[:6],
        "popular_crops": crops[:6],
        "ai_summary_verified_facts": [
            "ICAR recommends Trichogramma egg cards (100,000/ha) for paddy stem borer control.",
            "Drip irrigation saves 30-40% water compared to flood irrigation during grain filling."
        ],
        "farmer_community_opinions": [
            "Farmers in Mandya recommend splitting nitrogen fertilizer into 3 doses during early Kharif.",
            "Nashik tomato growers advise selling early morning at APMC for peak wholesale rates."
        ]
    }

# ----------------------------------------------------
# 10. MULTILINGUAL RAG CHATBOT ENDPOINT (Groq Llama 3.3)
# ----------------------------------------------------
@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest, db: Session = Depends(get_db)):
    res = await generate_rag_response(
        user_query=req.message,
        override_lang=req.user_language_override,
        location_context=req.location_context,
        conversation_history=req.conversation_history
    )
    
    chat_log = ChatLogDB(
        user_query=req.message,
        detected_language=res.get("detected_language", "en"),
        bot_response=res.get("reply", ""),
        rag_sources=res.get("sources", [])
    )
    db.add(chat_log)
    db.commit()
    return res

# ----------------------------------------------------
# 11. DASHBOARD SUMMARY ENDPOINT
# ----------------------------------------------------
@app.get("/api/dashboard-summary")
async def dashboard_summary(db: Session = Depends(get_db)):
    weather_data = await get_live_weather("Mandya")
    market_data = get_market_intelligence(state="Karnataka")
    schemes_data = get_government_schemes()
    profile = db.query(FarmerProfileDB).first()
    if not profile:
        profile = FarmerProfileDB()

    return {
        "farmer": {
            "name": profile.name,
            "district": profile.district,
            "state": profile.state,
            "land_acres": profile.land_acres,
            "primary_crops": profile.primary_crops
        },
        "weather": weather_data,
        "market_ticker": market_data["top_gainers"],
        "active_schemes_count": schemes_data["total_count"],
        "irrigation_preview": calculate_smart_irrigation("Paddy / Rice", profile.soil_type, 38.0, weather_data["temperature"], 0.0)
    }

# ----------------------------------------------------
# 12. STATIC FILE SERVING & SPA ROUTING (FOR RENDER)
# ----------------------------------------------------
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))

if os.path.exists(frontend_dist):
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        
        target_file = os.path.join(frontend_dist, full_path)
        if full_path and os.path.exists(target_file) and os.path.isfile(target_file):
            return FileResponse(target_file)
        
        index_file = os.path.join(frontend_dist, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"message": "KrishiAstra API is running. Frontend build not found."}
else:
    @app.get("/")
    def root():
        return {
            "name": "KrishiAstra AI Smart Agriculture API",
            "version": "2.0.0",
            "status": "online"
        }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)

