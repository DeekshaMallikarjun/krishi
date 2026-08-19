from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class FarmerProfileSchema(BaseModel):
    name: str = "Ramesh Patel"
    phone: str = "+91 98765 43210"
    state: str = "Karnataka"
    district: str = "Mandya"
    land_acres: float = 4.5
    soil_type: str = "Red Loam"
    primary_crops: str = "Sugarcane, Paddy, Tomato"
    preferred_language: str = "Kannada"
    sms_status: Optional[str] = None
    sms_message: Optional[str] = None
    sms_gateway: Optional[str] = None

class CropRecommendationRequest(BaseModel):
    n: float = Field(90.0, ge=0, le=250, description="Nitrogen content in soil (kg/ha)")
    p: float = Field(40.0, ge=0, le=250, description="Phosphorus content in soil (kg/ha)")
    k: float = Field(40.0, ge=0, le=250, description="Potassium content in soil (kg/ha)")
    temp: float = Field(26.0, ge=-10, le=60, description="Temperature in °C")
    humidity: float = Field(70.0, ge=0, le=100, description="Relative Humidity in %")
    ph: float = Field(6.5, ge=0, le=14, description="Soil pH value")
    rainfall: float = Field(850.0, ge=0, le=3000, description="Annual Rainfall in mm")

class CropRecommendationRequestV2(BaseModel):
    state: str = "Karnataka"
    district: str = "Mandya"
    season: str = "Kharif"
    soil_type: str = "Red Loam"
    n: float = Field(90.0, ge=0, le=250)
    p: float = Field(40.0, ge=0, le=250)
    k: float = Field(40.0, ge=0, le=250)
    temp: float = Field(26.0, ge=-10, le=60)
    humidity: float = Field(70.0, ge=0, le=100)
    ph: float = Field(6.5, ge=0, le=14)
    rainfall: float = Field(850.0, ge=0, le=3000)

class CropRecommendationResponse(BaseModel):
    recommended_crop: str
    confidence: float
    nitrogen_advice: str
    phosphorus_advice: str
    potassium_advice: str
    growth_period_days: int
    water_requirement: str
    top_crops: List[Dict[str, Any]]

class CropRecommendationResponseV2(BaseModel):
    state: str
    district: str
    season: str
    soil_type: str
    recommended_crop: str
    confidence: float
    nitrogen_advice: str
    phosphorus_advice: str
    potassium_advice: str
    explanation: str
    growth_period_days: int
    water_requirement: str
    expected_yield_t_ha: float
    top_crops: List[Dict[str, Any]]

class YieldPredictionRequest(BaseModel):
    crop: str = "Rice / Paddy"
    state: str = "Karnataka"
    district: Optional[str] = "Mandya"
    month: str = "July"
    soil_type: str = "Red Loam"
    area_acres: float = Field(2.5, gt=0, le=1000)
    rainfall_mm: float = Field(850.0, ge=0)
    temperature_c: float = Field(28.0, ge=-10, le=60)
    n_kg_ha: float = Field(90.0, ge=0)
    p_kg_ha: float = Field(50.0, ge=0)
    k_kg_ha: float = Field(40.0, ge=0)

class YieldPredictionResponse(BaseModel):
    crop: str
    state: str
    district: str
    month: str
    area_acres: float
    area_hectares: float
    predicted_yield_t_ha: float
    total_production_tonnes: float
    yield_range_t_ha: List[float]
    total_production_range_tonnes: List[float]
    evaluation_metrics: Dict[str, Any]
    agronomic_advice: str
    disclaimer: str

class ChemicalTreatmentDetail(BaseModel):
    active_ingredient: str
    formulation: str
    dosage: str
    application_guidance: str
    safety_precautions: List[str]
    pre_harvest_interval: str
    disclaimer: str = "Always verify with local agricultural extension officers (KVK) and read product label instructions before application."

class CauseFactors(BaseModel):
    pathogen_type: str
    weather_factors: str
    soil_irrigation_factors: str
    farming_practices: str
    spread_mechanism: str

class SymptomsBreakdown(BaseModel):
    leaf_symptoms: str
    stem_fruit_symptoms: str
    early_stage: str
    severe_stage: str
    manual_identification_guide: str

class NutrientManagement(BaseModel):
    npk_guidance: str
    micronutrients: str
    organic_soil_inputs: str
    deficiency_vs_disease_note: str

class RecoveryMonitoring(BaseModel):
    improvement_signs: str
    inspection_interval: str
    severe_warning_signs: str
    seek_expert_guidance: str

class DiseaseDetectionResponse(BaseModel):
    crop_name: str
    botanical_name: Optional[str] = None
    crop_category: Optional[str] = None
    disease_name: str
    pathogen_scientific_name: Optional[str] = None
    confidence: Optional[float] = None
    affected_percentage: float
    severity_level: str = "Low"
    status: str
    symptoms: Optional[str] = None
    
    # Comprehensive Disease Report Fields
    causes: Optional[CauseFactors] = None
    symptoms_detail: Optional[SymptomsBreakdown] = None
    immediate_actions: List[str] = []
    organic_treatment: List[str] = []
    chemical_treatment_detail: Optional[ChemicalTreatmentDetail] = None
    chemical_treatment: List[str] = []
    nutrient_management: Optional[NutrientManagement] = None
    prevention_measures: List[str] = []
    preventive_care: List[str] = []
    what_not_to_do: List[str] = []
    recovery_monitoring: Optional[RecoveryMonitoring] = None
    
    segmentation_mask_base64: Optional[str] = None
    is_valid_leaf: Optional[bool] = True
    uncertainty_notice: Optional[str] = None

class PricePredictionRequest(BaseModel):
    crop: str = "Tomato"
    state: str = "Karnataka"
    mandi: Optional[str] = "Mandya APMC"

class HistoricalPricePoint(BaseModel):
    date: str
    price_per_quintal: float

class PredictedPricePoint(BaseModel):
    date: str
    predicted_price: float
    lower_bound: float
    upper_bound: float

class PricePredictionResponse(BaseModel):
    crop: str
    state: str
    mandi: str
    current_price: float
    predicted_30d_price: float
    change_percentage: float
    trend: str
    recommendation: str
    historical: List[HistoricalPricePoint]
    forecast: List[PredictedPricePoint]

class WeatherResponse(BaseModel):
    location: str
    temperature: float
    feels_like: float
    humidity: float
    wind_speed: float
    rainfall_24h: float
    weather_condition: str
    icon: str
    forecast_7days: List[Dict[str, Any]]
    agricultural_alert: Optional[str] = None

class IrrigationRequest(BaseModel):
    crop: str = "Paddy"
    soil_type: str = "Red Loam"
    soil_moisture_pct: float = Field(..., ge=0, le=100)
    current_temp: float = 28.5
    forecast_rain_mm: float = 0.0

class IrrigationResponse(BaseModel):
    decision: str
    water_volume_liters_per_acre: float
    urgency_level: str
    reasoning: str
    next_check_hours: int

class SchemeSchema(BaseModel):
    id: Optional[int] = None
    title: str
    category: str
    authority: str
    benefit_summary: str
    eligibility: str
    documents_required: List[str]
    deadline: str
    official_link: str
    is_new: bool = False

class ChatRequest(BaseModel):
    message: str
    user_language_override: Optional[str] = None
    location_context: Optional[Dict[str, Any]] = None
    conversation_history: Optional[List[Dict[str, str]]] = None

class ChatResponse(BaseModel):
    reply: str
    detected_language: str
    language_display: str
    speech_lang_tag: Optional[str] = "kn-IN"
    sources: Optional[List[Dict[str, Any]]] = Field(default_factory=list)

# Community Schemas
class CommunityCommentCreateSchema(BaseModel):
    farmer_name: Optional[str] = "Kisan Partner"
    comment_text: str

class CommunityCommentResponseSchema(BaseModel):
    id: int
    post_id: int
    farmer_name: str
    comment_text: str
    created_at: str

class CommunityPostCreateSchema(BaseModel):
    farmer_name: Optional[str] = "Ramesh Patel"
    state: Optional[str] = "Karnataka"
    district: Optional[str] = "Mandya"
    crop_tag: Optional[str] = "Paddy / Rice"
    title: str
    content: str
    image_url: Optional[str] = None

class CommunityPostResponseSchema(BaseModel):
    id: int
    farmer_name: str
    state: str
    district: str
    crop_tag: str
    title: str
    content: str
    image_url: Optional[str] = None
    helpful_count: int
    comments_count: int
    created_at: str
    comments: List[CommunityCommentResponseSchema] = []

class CommunitySummaryResponse(BaseModel):
    total_posts: int
    active_districts: List[str]
    popular_crops: List[str]
    ai_summary_verified_facts: List[str]
    farmer_community_opinions: List[str]
