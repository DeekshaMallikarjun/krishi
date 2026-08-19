def calculate_smart_irrigation(crop: str, soil_type: str, soil_moisture_pct: float, current_temp: float, forecast_rain_mm: float):
    # Base moisture thresholds (%) for different crops
    crop_moisture_thresholds = {
        "Paddy / Rice": {"critical_low": 45.0, "optimal": 75.0, "daily_liters_acre": 18000},
        "Sugarcane": {"critical_low": 40.0, "optimal": 70.0, "daily_liters_acre": 20000},
        "Cotton": {"critical_low": 30.0, "optimal": 55.0, "daily_liters_acre": 12000},
        "Wheat": {"critical_low": 35.0, "optimal": 60.0, "daily_liters_acre": 10000},
        "Tomato": {"critical_low": 35.0, "optimal": 65.0, "daily_liters_acre": 11000},
        "Potato": {"critical_low": 38.0, "optimal": 65.0, "daily_liters_acre": 9500},
        "Maize": {"critical_low": 30.0, "optimal": 60.0, "daily_liters_acre": 9000},
        "Pulses / Gram": {"critical_low": 25.0, "optimal": 45.0, "daily_liters_acre": 6000}
    }

    info = crop_moisture_thresholds.get(crop, {"critical_low": 35.0, "optimal": 60.0, "daily_liters_acre": 10000})
    critical_low = info["critical_low"]
    optimal = info["optimal"]
    base_liters = info["daily_liters_acre"]

    # Soil type water retention factor
    retention_factor = 1.0
    safe_soil_type = (soil_type or "").lower()
    if "sand" in safe_soil_type:
        retention_factor = 1.3 # Sand loses water fast
    elif "black" in safe_soil_type or "clay" in safe_soil_type:
        retention_factor = 0.85 # Clay retains water well


    # Temperature evapotranspiration boost
    temp_factor = 1.0
    if current_temp > 32.0:
        temp_factor = 1.25
    elif current_temp < 20.0:
        temp_factor = 0.85

    # Determine decision logic
    if forecast_rain_mm >= 15.0:
        decision = "NOT REQUIRED"
        urgency = "NONE"
        liters = 0.0
        reasoning = f"Substantial rainfall forecast ({forecast_rain_mm:.1f} mm in 48h). Natural precipitation will restore soil moisture to {optimal}%."
        next_check = 24
    elif soil_moisture_pct < critical_low:
        decision = "IRRIGATE NOW"
        urgency = "HIGH"
        deficit = (optimal - soil_moisture_pct) / optimal
        liters = round(base_liters * deficit * retention_factor * temp_factor)
        reasoning = f"Soil moisture ({soil_moisture_pct:.1f}%) is below critical threshold ({critical_low}%). High root zone moisture deficit detected."
        next_check = 6
    elif soil_moisture_pct < optimal - 5.0 and forecast_rain_mm < 5.0:
        decision = "IRRIGATE LATER"
        urgency = "MEDIUM"
        deficit = (optimal - soil_moisture_pct) / optimal
        liters = round(base_liters * deficit * retention_factor * 0.7)
        reasoning = f"Soil moisture ({soil_moisture_pct:.1f}%) is moderate. Schedule light irrigation early morning tomorrow to prevent stress."
        next_check = 12
    else:
        decision = "NOT REQUIRED"
        urgency = "NONE"
        liters = 0.0
        reasoning = f"Soil moisture level ({soil_moisture_pct:.1f}%) is within optimal range ({optimal}%). No additional irrigation required today."
        next_check = 24

    return {
        "decision": decision,
        "water_volume_liters_per_acre": liters,
        "urgency_level": urgency,
        "reasoning": reasoning,
        "next_check_hours": next_check
    }
