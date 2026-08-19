import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os
from typing import Dict, Any, List, Optional

from services.india_agri_data import CROP_AGRI_METADATA, get_crops_by_location_and_season, STATE_SOIL_MAP

# Define dataset of typical optimal condition centers for Indian crops
CROP_DATA = [
    # N, P, K, temp, humidity, ph, rainfall, label
    [90, 42, 43, 20.8, 82.0, 6.5, 202.9, "Rice"],
    [107, 58, 32, 22.6, 63.6, 5.7, 88.5, "Maize"],
    [40, 67, 79, 20.1, 16.9, 7.5, 80.1, "Chickpea"],
    [23, 60, 20, 18.3, 21.6, 5.7, 105.9, "Kidneybeans"],
    [22, 67, 20, 27.7, 48.1, 5.7, 149.5, "Pigeonpeas"],
    [21, 48, 20, 28.1, 53.1, 6.8, 51.2, "Mothbeans"],
    [20, 47, 20, 28.5, 85.5, 6.7, 48.4, "Mungbean"],
    [40, 68, 19, 29.9, 65.2, 7.1, 67.8, "Blackgram"],
    [18, 68, 19, 24.5, 64.8, 6.9, 45.7, "Lentil"],
    [18, 18, 40, 21.8, 90.1, 5.6, 111.1, "Pomegranate"],
    [100, 82, 50, 27.4, 80.2, 6.0, 105.0, "Banana"],
    [20, 27, 30, 31.2, 50.2, 5.8, 94.7, "Mango"],
    [23, 133, 201, 23.8, 81.9, 6.0, 70.0, "Grapes"],
    [99, 24, 50, 25.6, 85.2, 6.4, 50.8, "Watermelon"],
    [100, 17, 52, 28.6, 92.3, 6.3, 24.7, "Muskmelon"],
    [20.8, 134, 199, 22.6, 92.3, 6.1, 112.7, "Apple"],
    [19, 16, 10, 22.8, 92.4, 7.0, 110.4, "Orange"],
    [49, 59, 50, 33.7, 92.4, 6.7, 142.6, "Papaya"],
    [21, 17, 30, 27.0, 98.8, 5.9, 175.7, "Coconut"],
    [117, 46, 19, 23.9, 79.8, 6.9, 80.4, "Cotton"],
    [78, 46, 40, 24.9, 79.6, 6.7, 174.8, "Jute"],
    [101, 29, 30, 25.5, 57.6, 6.8, 158.1, "Coffee"],
    [110, 50, 40, 15.5, 55.0, 6.5, 95.0, "Wheat"],
    [140, 60, 80, 26.0, 70.0, 6.8, 180.0, "Sugarcane"],
    [90, 60, 100, 18.0, 75.0, 5.5, 120.0, "Potato"],
    [100, 60, 60, 24.0, 65.0, 6.5, 90.0, "Tomato"]
]

# Generate synthetic dataset around centers for robust model training
def generate_training_data():
    X = []
    y = []
    np.random.seed(42)
    for row in CROP_DATA:
        n, p, k, t, h, ph, r, crop = row
        for _ in range(50):
            n_val = max(0, n + np.random.normal(0, 10))
            p_val = max(0, p + np.random.normal(0, 8))
            k_val = max(0, k + np.random.normal(0, 8))
            t_val = np.clip(t + np.random.normal(0, 2), 5, 48)
            h_val = np.clip(h + np.random.normal(0, 5), 10, 100)
            ph_val = np.clip(ph + np.random.normal(0, 0.4), 3.5, 9.5)
            r_val = max(0, r + np.random.normal(0, 20))
            
            X.append([n_val, p_val, k_val, t_val, h_val, ph_val, r_val])
            y.append(crop)
    return np.array(X), np.array(y)

_model = None

def get_trained_model():
    global _model
    if _model is not None:
        return _model
    
    model_path = os.path.join(os.path.dirname(__file__), "crop_rf_model.pkl")
    if os.path.exists(model_path):
        try:
            _model = joblib.load(model_path)
            return _model
        except Exception:
            pass

    X, y = generate_training_data()
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X, y)
    _model = clf
    try:
        joblib.dump(clf, model_path)
    except Exception:
        pass
    return _model

def predict_crop(n: float, p: float, k: float, temp: float, humidity: float, ph: float, rainfall: float):
    """
    Backward-compatible legacy endpoint predictor.
    """
    clf = get_trained_model()
    input_vector = np.array([[n, p, k, temp, humidity, ph, rainfall]])
    
    probabilities = clf.predict_proba(input_vector)[0]
    classes = clf.classes_
    
    top_indices = np.argsort(probabilities)[::-1]
    
    top_crops = []
    for idx in top_indices[:5]:
        cname = str(classes[idx])
        meta = CROP_AGRI_METADATA.get(cname, {"duration_days": 100, "water_req": "Medium (500-700 mm)", "expected_yield_t_ha": 3.0})
        top_crops.append({
            "crop": cname,
            "score": round(float(probabilities[idx]) * 100, 1),
            "duration_days": meta.get("duration_days", 100),
            "water_requirement": meta.get("water_req", "Medium (500-700 mm)"),
            "expected_yield_t_ha": meta.get("expected_yield_t_ha", 3.0)
        })
    
    best_crop = top_crops[0]["crop"]
    confidence = top_crops[0]["score"]
    
    n_advice = "Sufficient Nitrogen." if n >= 80 else ("Low Nitrogen: Add Urea or Organic Compost." if n < 50 else "Moderate Nitrogen.")
    p_advice = "Sufficient Phosphorus." if p >= 50 else ("Low Phosphorus: Add DAP or Single Super Phosphate." if p < 30 else "Moderate Phosphorus.")
    k_advice = "Sufficient Potassium." if k >= 40 else ("Low Potassium: Add MOP (Muriate of Potash)." if k < 25 else "Moderate Potassium.")
    
    info = CROP_AGRI_METADATA.get(best_crop, {"duration_days": 100, "water_req": "Medium (500-700 mm)"})
    
    return {
        "recommended_crop": best_crop,
        "confidence": confidence,
        "nitrogen_advice": n_advice,
        "phosphorus_advice": p_advice,
        "potassium_advice": k_advice,
        "growth_period_days": info.get("duration_days", 100),
        "water_requirement": info.get("water_req", "Medium (500-700 mm)"),
        "top_crops": top_crops
    }

def predict_crop_v2(
    state: str = "Karnataka",
    district: str = "Mandya",
    season: str = "Kharif",
    soil_type: str = "Red Loam",
    n: float = 90.0,
    p: float = 40.0,
    k: float = 40.0,
    temp: float = 26.0,
    humidity: float = 70.0,
    ph: float = 6.5,
    rainfall: float = 850.0
) -> Dict[str, Any]:
    """
    Location & Season-Aware India-Wide Smart Crop Recommendation Engine.
    Combines Random Forest ML classifier probabilities with location/season agro-climatic rules.
    """
    # Get ML Random Forest top probabilities
    clf = get_trained_model()
    input_vector = np.array([[n, p, k, temp, humidity, ph, rainfall]])
    probabilities = clf.predict_proba(input_vector)[0]
    classes = clf.classes_
    rf_scores = {str(classes[i]): float(probabilities[i]) * 100 for i in range(len(classes))}

    # Get agro-location regional crops ranking
    loc_crops = get_crops_by_location_and_season(state, district, season)

    # Hybrid ranking blending RF ML predictions + Regional location suitability
    blended_crops = []
    for item in loc_crops:
        cname = item["crop"]
        rf_score = rf_scores.get(cname, 10.0)
        loc_score = item["suitability_score"]

        # 60% RF ML prediction weight + 40% Regional agro-climatic weight
        blended_score = min(99.4, round((0.6 * rf_score) + (0.4 * loc_score), 1))

        blended_crops.append({
            "crop": cname,
            "suitability_score": blended_score,
            "duration_days": item["duration_days"],
            "water_requirement": item["water_req"],
            "expected_yield_t_ha": item["expected_yield_t_ha"],
            "yield_range": item["yield_range"],
            "seasons": item["seasons"],
            "description": item["description"]
        })

    blended_crops.sort(key=lambda x: x["suitability_score"], reverse=True)
    top_crops = blended_crops[:5]
    best_crop = top_crops[0]["crop"]

    # Tailored nutrient & agronomic guidance
    n_advice = "Optimal Nitrogen level for " + best_crop + "." if n >= 70 else "Low Nitrogen: Apply Urea or Farmyard Manure to boost vegetative growth."
    p_advice = "Good Phosphorus balance." if p >= 45 else "Low Phosphorus: Add Single Super Phosphate (SSP) for strong root formation."
    k_advice = "Sufficient Potassium." if k >= 35 else "Low Potassium: Apply Muriate of Potash (MOP) to enhance pest & drought resistance."

    explanation = f"Recommended for {state} ({district}) during the {season} season based on your {soil_type} soil profile, temperature ({temp}°C), and annual rainfall ({rainfall} mm)."

    return {
        "state": state,
        "district": district,
        "season": season,
        "soil_type": soil_type,
        "recommended_crop": best_crop,
        "confidence": top_crops[0]["suitability_score"],
        "nitrogen_advice": n_advice,
        "phosphorus_advice": p_advice,
        "potassium_advice": k_advice,
        "explanation": explanation,
        "growth_period_days": top_crops[0]["duration_days"],
        "water_requirement": top_crops[0]["water_requirement"],
        "expected_yield_t_ha": top_crops[0]["expected_yield_t_ha"],
        "top_crops": top_crops
    }
