"""
ML Crop Yield & Total Production Prediction Service
Trains and evaluates a RandomForestRegressor on agricultural yield data
and provides yield forecasts in tonnes/hectare and total production estimates
using January-December calendar months (seasons completely replaced).
"""

import os
import joblib
import numpy as np
from typing import Dict, Any, List, Optional
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from services.india_agri_data import STATE_SOIL_MAP
from services.comprehensive_crop_database import COMPREHENSIVE_CROP_DATABASE, ALL_MONTHS

MODEL_PATH = os.path.join(os.path.dirname(__file__), "yield_rf_model.pkl")
METRICS_PATH = os.path.join(os.path.dirname(__file__), "yield_model_metrics.pkl")

# Master Label Encoders
CROP_LIST = list(COMPREHENSIVE_CROP_DATABASE.keys())
STATE_LIST = list(STATE_SOIL_MAP.keys()) + ["Other State"]
MONTH_LIST = ALL_MONTHS  # January - December
SOIL_LIST = ["Red Loam", "Black Cotton", "Alluvial", "Clay Loam", "Laterite", "Sandy Loam", "Coastal Alluvial", "Mountain Soil"]

def generate_yield_dataset():
    """
    Generates realistic historical training samples based on agricultural statistical baselines
    across all 12 calendar months and worldwide cultivated crops.
    """
    X = []
    y = []
    np.random.seed(101)

    crop_encoder = LabelEncoder().fit(CROP_LIST)
    state_encoder = LabelEncoder().fit(STATE_LIST)
    month_encoder = LabelEncoder().fit(MONTH_LIST)
    soil_encoder = LabelEncoder().fit(SOIL_LIST)

    for crop_idx, (crop_name, meta) in enumerate(COMPREHENSIVE_CROP_DATABASE.items()):
        base_yield = meta["expected_yield_t_ha"]
        min_yield, max_yield = meta["yield_range"]
        suitable_months = meta.get("suitable_months", MONTH_LIST)

        for _ in range(60):
            # Pick random state, month, soil
            st = np.random.choice(STATE_LIST)
            mo = np.random.choice(MONTH_LIST)
            so = np.random.choice(meta["soils"]) if meta.get("soils") else "Alluvial"

            # Features
            rainfall = float(np.random.uniform(meta["rainfall_range"][0] * 0.75, meta["rainfall_range"][1] * 1.15))
            temp = float(np.random.uniform(meta["temp_range"][0] - 3, meta["temp_range"][1] + 3))
            n_val = float(np.random.uniform(meta["n_range"][0] * 0.8, meta["n_range"][1] * 1.2))
            p_val = float(np.random.uniform(meta["p_range"][0] * 0.8, meta["p_range"][1] * 1.2))
            k_val = float(np.random.uniform(meta["k_range"][0] * 0.8, meta["k_range"][1] * 1.2))
            area_ha = float(np.random.uniform(0.5, 10.0))

            # Encode categorical features
            c_enc = crop_encoder.transform([crop_name])[0]
            st_enc = state_encoder.transform([st if st in STATE_LIST else "Other State"])[0]
            mo_enc = month_encoder.transform([mo if mo in MONTH_LIST else "July"])[0]
            so_enc = soil_encoder.transform([so if so in SOIL_LIST else "Alluvial"])[0]

            # Seasonal month suitability factor
            is_suitable = mo in suitable_months
            month_factor = 1.0 if is_suitable else 0.82

            # Temperature and rainfall stress factor
            t_min, t_max = meta["temp_range"]
            temp_penalty = 1.0 - (0.15 * max(0.0, (t_min - temp) / max(1.0, t_min)) + 0.15 * max(0.0, (temp - t_max) / max(1.0, t_max)))
            temp_penalty = max(0.7, min(1.0, temp_penalty))

            # Calculate realistic yield with variations
            yield_val = base_yield * month_factor * temp_penalty + np.random.normal(0, base_yield * 0.05)
            yield_val = float(np.clip(yield_val, min_yield * 0.7, max_yield * 1.1))

            X.append([c_enc, st_enc, mo_enc, so_enc, rainfall, temp, n_val, p_val, k_val, area_ha])
            y.append(yield_val)

    return np.array(X), np.array(y), crop_encoder, state_encoder, month_encoder, soil_encoder

_yield_model = None
_encoders = None
_metrics = None

def get_trained_yield_model():
    global _yield_model, _encoders, _metrics
    if _yield_model is not None and _metrics is not None:
        return _yield_model, _encoders, _metrics

    if os.path.exists(MODEL_PATH) and os.path.exists(METRICS_PATH):
        try:
            saved_data = joblib.load(MODEL_PATH)
            # Verify encoders contain 'month'
            if "month" in saved_data.get("encoders", {}):
                _yield_model = saved_data["model"]
                _encoders = saved_data["encoders"]
                _metrics = joblib.load(METRICS_PATH)
                return _yield_model, _encoders, _metrics
        except Exception:
            pass

    # Train new month-based model
    X, y, c_enc, st_enc, mo_enc, so_enc = generate_yield_dataset()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    rf = RandomForestRegressor(n_estimators=120, max_depth=14, random_state=42)
    rf.fit(X_train, y_train)

    y_pred = rf.predict(X_test)
    mae = float(mean_absolute_error(y_test, y_pred))
    rmse = float(np.sqrt(mean_squared_error(y_test, y_pred)))
    r2 = float(r2_score(y_test, y_pred))

    _metrics = {
        "model_name": "RandomForestRegressor (Month-Calibrated)",
        "mae": round(mae, 3),
        "rmse": round(rmse, 3),
        "r2_score": round(r2, 3),
        "n_samples": len(X)
    }

    _encoders = {
        "crop": c_enc,
        "state": st_enc,
        "month": mo_enc,
        "soil": so_enc
    }
    _yield_model = rf

    try:
        joblib.dump({"model": rf, "encoders": _encoders}, MODEL_PATH)
        joblib.dump(_metrics, METRICS_PATH)
    except Exception:
        pass

    return _yield_model, _encoders, _metrics

def predict_crop_yield(
    crop: str,
    state: str,
    district: Optional[str] = None,
    month: str = "July",
    soil_type: str = "Red Loam",
    area_acres: float = 2.5,
    rainfall_mm: float = 850.0,
    temperature_c: float = 28.0,
    n_kg_ha: float = 90.0,
    p_kg_ha: float = 50.0,
    k_kg_ha: float = 40.0
) -> Dict[str, Any]:
    model, encoders, metrics = get_trained_yield_model()

    # Convert acres to hectares (1 acre = 0.404686 ha)
    area_ha = max(0.1, area_acres * 0.404686)

    # Normalize crop name against database
    crop_name = crop
    if crop_name not in CROP_LIST:
        # Match case-insensitively or closest
        matched = next((c for c in CROP_LIST if c.lower() == crop.lower() or crop.lower() in c.lower()), "Rice / Paddy")
        crop_name = matched

    st_name = state if state in STATE_LIST else "Karnataka"
    mo_name = month if month in MONTH_LIST else "July"
    so_name = soil_type if soil_type in SOIL_LIST else "Red Loam"

    c_enc = encoders["crop"].transform([crop_name])[0]
    st_enc = encoders["state"].transform([st_name if st_name in STATE_LIST else "Other State"])[0]
    mo_enc = encoders["month"].transform([mo_name])[0]
    so_enc = encoders["soil"].transform([so_name if so_name in SOIL_LIST else "Red Loam"])[0]

    input_vector = np.array([[c_enc, st_enc, mo_enc, so_enc, rainfall_mm, temperature_c, n_kg_ha, p_kg_ha, k_kg_ha, area_ha]])
    pred_yield_ha = float(model.predict(input_vector)[0])
    pred_yield_ha = max(0.4, pred_yield_ha)

    total_production_t = pred_yield_ha * area_ha
    lower_t_ha = round(pred_yield_ha * 0.88, 2)
    upper_t_ha = round(pred_yield_ha * 1.12, 2)

    # Agronomic recommendation tailored to month and crop
    meta = COMPREHENSIVE_CROP_DATABASE.get(crop_name, COMPREHENSIVE_CROP_DATABASE["Rice / Paddy"])
    suitable_months = meta.get("suitable_months", [])
    
    if mo_name in suitable_months:
        advice = f"Sowing {crop_name} in {mo_name} aligns with its optimal agro-climatic window in {state}. Maintain recommended N-P-K ({meta['n_range'][0]}-{meta['n_range'][1]} kg N/ha) and monitor soil moisture at critical growth stages for peak yield."
    else:
        best_window = ", ".join(suitable_months[:3])
        advice = f"Note: {mo_name} is outside the primary optimal sowing window ({best_window}) for {crop_name} in {state}. Ensure supplementary irrigation and climate mitigation to achieve forecasted yield."

    return {
        "crop": crop_name,
        "state": state,
        "district": district or "Central Region",
        "month": mo_name,
        "area_acres": area_acres,
        "area_hectares": round(area_ha, 2),
        "predicted_yield_t_ha": round(pred_yield_ha, 2),
        "total_production_tonnes": round(total_production_t, 2),
        "yield_range_t_ha": [lower_t_ha, upper_t_ha],
        "total_production_range_tonnes": [round(lower_t_ha * area_ha, 2), round(upper_t_ha * area_ha, 2)],
        "evaluation_metrics": metrics,
        "agronomic_advice": advice,
        "disclaimer": "Predicted yields are machine learning estimates based on regression models and historical agricultural benchmarks. Actual yields depend on pest management, irrigation timing, and seed quality."
    }
