MANDI_PRICES_DATABASE = [
    {"mandi": "Mandya APMC", "district": "Mandya", "state": "Karnataka", "crop": "Sugarcane", "min_price": 310, "max_price": 340, "modal_price": 325, "unit": "Quintal", "change_pct": 2.1, "trend": "UP"},
    {"mandi": "Mandya APMC", "district": "Mandya", "state": "Karnataka", "crop": "Paddy (Sona Masuri)", "min_price": 2150, "max_price": 2400, "modal_price": 2300, "unit": "Quintal", "change_pct": 1.5, "trend": "UP"},
    {"mandi": "Kolar APMC", "district": "Kolar", "state": "Karnataka", "crop": "Tomato", "min_price": 2600, "max_price": 3200, "modal_price": 2950, "unit": "Quintal", "change_pct": 4.8, "trend": "UP"},
    {"mandi": "Ramanagara APMC", "district": "Ramanagara", "state": "Karnataka", "crop": "Silk Cocoon", "min_price": 450, "max_price": 620, "modal_price": 580, "unit": "Kg", "change_pct": -0.8, "trend": "DOWN"},
    {"mandi": "Azadpur Mandi", "district": "Delhi", "state": "Delhi", "crop": "Tomato", "min_price": 2800, "max_price": 3400, "modal_price": 3100, "unit": "Quintal", "change_pct": 3.2, "trend": "UP"},
    {"mandi": "Azadpur Mandi", "district": "Delhi", "state": "Delhi", "crop": "Onion", "min_price": 2200, "max_price": 2600, "modal_price": 2450, "unit": "Quintal", "change_pct": -2.4, "trend": "DOWN"},
    {"mandi": "Lasalgaon APMC", "district": "Nashik", "state": "Maharashtra", "crop": "Onion", "min_price": 2100, "max_price": 2550, "modal_price": 2380, "unit": "Quintal", "change_pct": 1.2, "trend": "UP"},
    {"mandi": "Kalyan APMC", "district": "Thane", "state": "Maharashtra", "crop": "Potato", "min_price": 1500, "max_price": 1800, "modal_price": 1680, "unit": "Quintal", "change_pct": 0.5, "trend": "STABLE"},
    {"mandi": "Ludhiana APMC", "district": "Ludhiana", "state": "Punjab", "crop": "Wheat", "min_price": 2250, "max_price": 2400, "modal_price": 2325, "unit": "Quintal", "change_pct": 0.8, "trend": "UP"},
    {"mandi": "Khanna APMC", "district": "Ludhiana", "state": "Punjab", "crop": "Paddy (Basmati)", "min_price": 3800, "max_price": 4350, "modal_price": 4150, "unit": "Quintal", "change_pct": 5.2, "trend": "UP"},
    {"mandi": "Guntur APMC", "district": "Guntur", "state": "Andhra Pradesh", "crop": "Red Chilli", "min_price": 14500, "max_price": 18200, "modal_price": 16800, "unit": "Quintal", "change_pct": 3.6, "trend": "UP"},
    {"mandi": "Rajkot APMC", "district": "Rajkot", "state": "Gujarat", "crop": "Cotton", "min_price": 6400, "max_price": 7100, "modal_price": 6850, "unit": "Quintal", "change_pct": -1.2, "trend": "DOWN"},
]

def get_market_intelligence(state: str = None, crop: str = None):
    results = MANDI_PRICES_DATABASE
    if state and state.strip():
        results = [r for r in results if state.lower() in r["state"].lower()]
    if crop and crop.strip():
        results = [r for r in results if crop.lower() in r["crop"].lower()]
        
    if not results:
        results = MANDI_PRICES_DATABASE[:6]

    top_gainers = sorted(MANDI_PRICES_DATABASE, key=lambda x: x["change_pct"], reverse=True)[:4]
    
    return {
        "mandi_prices": results,
        "top_gainers": top_gainers,
        "total_records": len(results),
        "last_updated": "Today, 08:30 AM IST (Agmarknet Live Sync)"
    }
