"""
India-Wide Agricultural Intelligence Repository
Contains state, union territory, district mappings, soil profiles, seasonal crop suitability,
and GPS geocoding lookup for all regions of India.
"""

from typing import Dict, List, Any, Optional
import math

# All 28 States and 8 Union Territories of India with District mappings
INDIA_STATES_DISTRICTS: Dict[str, List[str]] = {
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa", "Nellore"],
    "Arunachal Pradesh": ["Changlang", "East Siang", "Kamle", "Lahit", "Papum Pare", "Tawang", "Tirap", "West Kameng"],
    "Assam": ["Baksa", "Barpeta", "Cachar", "Darrang", "Dhubri", "Dibrugarh", "Golaghat", "Jorhat", "Kamrup", "Karbi Anglong", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia"],
    "Bihar": ["Araria", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Gaya", "Gopalganj", "Katihar", "Madhubani", "Muzaffarpur", "Nalanda", "Patna", "Purnia", "Rohtas", "Samastipur", "Saran", "Vaishali"],
    "Chhattisgarh": ["Bastar", "Bilaspur", "Dantewada", "Durg", "Janjgir-Champa", "Kanker", "KORBA", "Mahasamund", "Raigarh", "Raipur", "Rajnandgaon", "Surguja"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Gandhinagar", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mehsana", "Navsari", "Rajkot", "Surat", "Vadodara", "Valsad"],
    "Haryana": ["Ambala", "Bhiwani", "Faridabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Karnal", "Kurukshetra", "Panipat", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Hazaribagh", "Jamtara", "Ranchi", "West Singhbhum"],
    "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
    "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    "Madhya Pradesh": ["Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Chhatarpur", "Chhindwara", "Dewas", "Dhar", "Gwalior", "Hoshangabad", "Indore", "Jabalpur", "Katni", "Mandsaur", "Morena", "Neemuch", "Rewa", "Sagar", "Satna", "Sehore", "Ujjain", "Vidisha"],
    "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad (Chhatrapati Sambhaji Nagar)", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Yavatmal"],
    "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Senapati", "Thoubal", "Ukhrul"],
    "Meghalaya": ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "South Garo Hills", "West Garo Hills", "West Khasi Hills"],
    "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lunglei", "Mamit", "Serchhip"],
    "Nagaland": ["Dimapur", "Kohima", "Mokokchung", "Mon", "Phek", "Tuensang", "Wokha", "Zunheboto"],
    "Odisha": ["Angul", "Balasore", "Bargarh", "Bhadrak", "Bolangir", "Cuttack", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kendrapara", "Keonjhar", "Khurda", "Koraput", "Mayurbhanj", "Puri", "Sambalpur", "Sundargarh"],
    "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar (Mohali)", "Sangrur", "Tarn Taran"],
    "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Ganganagar", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Kota", "Nagaur", "Pali", "Sikar", "Sirohi", "Tonk", "Udaipur"],
    "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Vellore", "Viluppuram", "Virudhunagar"],
    "Telangana": ["Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahabubnagar", "Medak", "Nalgonda", "Nizamabad", "Rangareddy", "Warangal"],
    "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad (Prayagraj)", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad (Ayodhya)", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar (Noida)", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri (Lakhimpur)", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Rae Bareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
    # Union Territories
    "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
    "Delhi (NCT)": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
    "Ladakh": ["Kargil", "Leh"],
    "Lakshadweep": ["Lakshadweep"],
    "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
}

# Representative coordinates (Latitude, Longitude) for GPS matching
GPS_LOCATIONS = [
    {"state": "Karnataka", "district": "Mandya", "lat": 12.5218, "lon": 76.8951},
    {"state": "Karnataka", "district": "Bengaluru Urban", "lat": 12.9716, "lon": 77.5946},
    {"state": "Karnataka", "district": "Mysuru", "lat": 12.2958, "lon": 76.6394},
    {"state": "Karnataka", "district": "Belagavi", "lat": 15.8497, "lon": 74.4977},
    {"state": "Punjab", "district": "Ludhiana", "lat": 30.9010, "lon": 75.8573},
    {"state": "Punjab", "district": "Amritsar", "lat": 31.6340, "lon": 74.8723},
    {"state": "Maharashtra", "district": "Pune", "lat": 18.5204, "lon": 73.8567},
    {"state": "Maharashtra", "district": "Nashik", "lat": 19.9975, "lon": 73.7898},
    {"state": "Maharashtra", "district": "Nagpur", "lat": 21.1458, "lon": 79.0882},
    {"state": "Uttar Pradesh", "district": "Lucknow", "lat": 26.8467, "lon": 80.9462},
    {"state": "Uttar Pradesh", "district": "Varanasi", "lat": 25.3176, "lon": 82.9739},
    {"state": "Gujarat", "district": "Ahmedabad", "lat": 23.0225, "lon": 72.5714},
    {"state": "Tamil Nadu", "district": "Coimbatore", "lat": 11.0168, "lon": 76.9558},
    {"state": "Tamil Nadu", "district": "Madurai", "lat": 9.9252, "lon": 78.1198},
    {"state": "West Bengal", "district": "Kolkata", "lat": 22.5726, "lon": 88.3639},
    {"state": "Rajasthan", "district": "Jaipur", "lat": 26.9124, "lon": 75.7873},
    {"state": "Bihar", "district": "Patna", "lat": 25.5941, "lon": 85.1376},
    {"state": "Telangana", "district": "Hyderabad", "lat": 17.3850, "lon": 78.4867},
    {"state": "Delhi (NCT)", "district": "New Delhi", "lat": 28.6139, "lon": 77.2090},
]

# Comprehensive Agricultural Crop Database with Indian Agro-Climatic Data
CROP_AGRI_METADATA: Dict[str, Dict[str, Any]] = {
    "Rice": {
        "seasons": ["Kharif"],
        "soils": ["Alluvial", "Clay Loam", "Red Loam", "Coastal Alluvial"],
        "temp_range": [20.0, 38.0],
        "rainfall_range": [1000, 2500],
        "ph_range": [5.5, 7.5],
        "n_range": [80, 140],
        "p_range": [30, 60],
        "k_range": [30, 60],
        "duration_days": 120,
        "water_req": "Very High (1200-1500 mm)",
        "expected_yield_t_ha": 3.8,
        "yield_range": [2.5, 5.5],
        "description": "Staple grain requiring flooded/wet soil during early growth. High market demand across India."
    },
    "Wheat": {
        "seasons": ["Rabi"],
        "soils": ["Alluvial", "Clay Loam", "Black Cotton"],
        "temp_range": [12.0, 25.0],
        "rainfall_range": [450, 750],
        "ph_range": [6.0, 7.5],
        "n_range": [90, 150],
        "p_range": [40, 70],
        "k_range": [30, 60],
        "duration_days": 120,
        "water_req": "Medium (450-650 mm)",
        "expected_yield_t_ha": 4.2,
        "yield_range": [3.0, 5.8],
        "description": "Cool-season cereal crop. Thrives under 4-5 well-timed irrigation cycles during CRI and grain filling."
    },
    "Sugarcane": {
        "seasons": ["Kharif", "Rabi"],
        "soils": ["Black Cotton", "Alluvial", "Red Loam"],
        "temp_range": [20.0, 38.0],
        "rainfall_range": [1200, 2500],
        "ph_range": [6.0, 8.0],
        "n_range": [120, 200],
        "p_range": [50, 90],
        "k_range": [60, 120],
        "duration_days": 330,
        "water_req": "Very High (1500-2500 mm)",
        "expected_yield_t_ha": 75.0,
        "yield_range": [60.0, 95.0],
        "description": "Long-duration commercial cash crop. High returns in irrigated plains with sugar mill connectivity."
    },
    "Cotton": {
        "seasons": ["Kharif"],
        "soils": ["Black Cotton", "Alluvial"],
        "temp_range": [21.0, 35.0],
        "rainfall_range": [600, 1100],
        "ph_range": [6.0, 8.0],
        "n_range": [90, 140],
        "p_range": [40, 70],
        "k_range": [30, 60],
        "duration_days": 160,
        "water_req": "Medium-High (700-1000 mm)",
        "expected_yield_t_ha": 2.2,
        "yield_range": [1.5, 3.2],
        "description": "Major fiber cash crop thriving in deep black soils of Deccan and fertile Alluvial plains."
    },
    "Maize": {
        "seasons": ["Kharif", "Rabi", "Zaid"],
        "soils": ["Red Loam", "Alluvial", "Black Cotton"],
        "temp_range": [18.0, 32.0],
        "rainfall_range": [500, 900],
        "ph_range": [5.8, 7.5],
        "n_range": [80, 130],
        "p_range": [40, 70],
        "k_range": [30, 60],
        "duration_days": 95,
        "water_req": "Medium (500-800 mm)",
        "expected_yield_t_ha": 5.0,
        "yield_range": [3.5, 7.0],
        "description": "Versatile cereal crop used for grain, poultry feed, and industrial starch. Highly responsive to nitrogen."
    },
    "Chickpea": {
        "seasons": ["Rabi"],
        "soils": ["Black Cotton", "Clay Loam"],
        "temp_range": [14.0, 26.0],
        "rainfall_range": [300, 600],
        "ph_range": [6.0, 7.8],
        "n_range": [20, 50],
        "p_range": [40, 80],
        "k_range": [20, 50],
        "duration_days": 105,
        "water_req": "Low (250-400 mm)",
        "expected_yield_t_ha": 1.8,
        "yield_range": [1.2, 2.5],
        "description": "Important Rabi pulse crop that fixes atmospheric nitrogen and requires minimal irrigation."
    },
    "Mustard": {
        "seasons": ["Rabi"],
        "soils": ["Alluvial", "Sandy Loam", "Red Loam"],
        "temp_range": [10.0, 25.0],
        "rainfall_range": [250, 500],
        "ph_range": [6.0, 7.5],
        "n_range": [60, 100],
        "p_range": [30, 50],
        "k_range": [20, 40],
        "duration_days": 110,
        "water_req": "Low (250-400 mm)",
        "expected_yield_t_ha": 1.9,
        "yield_range": [1.3, 2.6],
        "description": "Major Rabi oilseed crop. Thrives under cool winters and dry harvest periods."
    },
    "Groundnut": {
        "seasons": ["Kharif", "Zaid"],
        "soils": ["Sandy Loam", "Red Loam"],
        "temp_range": [22.0, 33.0],
        "rainfall_range": [500, 850],
        "ph_range": [5.8, 7.2],
        "n_range": [20, 40],
        "p_range": [40, 70],
        "k_range": [30, 60],
        "duration_days": 115,
        "water_req": "Medium (450-650 mm)",
        "expected_yield_t_ha": 2.4,
        "yield_range": [1.6, 3.2],
        "description": "Leguminous oilseed crop requiring loose, friable sandy soil for peg penetration and pod development."
    },
    "Soybean": {
        "seasons": ["Kharif"],
        "soils": ["Black Cotton", "Clay Loam"],
        "temp_range": [20.0, 32.0],
        "rainfall_range": [650, 1000],
        "ph_range": [6.0, 7.5],
        "n_range": [20, 40],
        "p_range": [50, 80],
        "k_range": [30, 60],
        "duration_days": 100,
        "water_req": "Medium (500-750 mm)",
        "expected_yield_t_ha": 2.1,
        "yield_range": [1.4, 2.9],
        "description": "High-protein Kharif oilseed predominant in Madhya Pradesh and Maharashtra."
    },
    "Tomato": {
        "seasons": ["Kharif", "Rabi", "Zaid"],
        "soils": ["Red Loam", "Alluvial", "Clay Loam"],
        "temp_range": [18.0, 32.0],
        "rainfall_range": [400, 750],
        "ph_range": [6.0, 7.2],
        "n_range": [80, 140],
        "p_range": [50, 90],
        "k_range": [60, 120],
        "duration_days": 90,
        "water_req": "Medium (400-600 mm)",
        "expected_yield_t_ha": 28.0,
        "yield_range": [20.0, 42.0],
        "description": "High-value vegetable crop. Drip irrigation and trellising yield quick high returns."
    },
    "Potato": {
        "seasons": ["Rabi"],
        "soils": ["Alluvial", "Sandy Loam"],
        "temp_range": [12.0, 24.0],
        "rainfall_range": [400, 600],
        "ph_range": [5.2, 6.5],
        "n_range": [100, 160],
        "p_range": [60, 100],
        "k_range": [80, 140],
        "duration_days": 90,
        "water_req": "Medium (500-700 mm)",
        "expected_yield_t_ha": 26.0,
        "yield_range": [18.0, 36.0],
        "description": "Major tuber crop requiring loose, slightly acidic soil and cool night temperatures during tuberization."
    },
    "Onion": {
        "seasons": ["Kharif", "Rabi", "Zaid"],
        "soils": ["Red Loam", "Alluvial", "Black Cotton"],
        "temp_range": [15.0, 30.0],
        "rainfall_range": [400, 700],
        "ph_range": [6.0, 7.5],
        "n_range": [80, 120],
        "p_range": [40, 70],
        "k_range": [50, 90],
        "duration_days": 120,
        "water_req": "Medium (400-650 mm)",
        "expected_yield_t_ha": 18.0,
        "yield_range": [12.0, 25.0],
        "description": "Essential commercial bulb crop with strong domestic market and export demand."
    },
    "Banana": {
        "seasons": ["Kharif", "Rabi", "Zaid"],
        "soils": ["Alluvial", "Red Loam", "Clay Loam"],
        "temp_range": [22.0, 36.0],
        "rainfall_range": [1200, 2200],
        "ph_range": [6.0, 7.5],
        "n_range": [150, 220],
        "p_range": [60, 100],
        "k_range": [150, 250],
        "duration_days": 365,
        "water_req": "High (1200-2000 mm)",
        "expected_yield_t_ha": 45.0,
        "yield_range": [35.0, 60.0],
        "description": "Perennial fruit crop offering continuous harvest income. High potassium consumer."
    },
    "Watermelon": {
        "seasons": ["Zaid"],
        "soils": ["Sandy Loam", "Alluvial"],
        "temp_range": [24.0, 38.0],
        "rainfall_range": [300, 600],
        "ph_range": [6.0, 7.2],
        "n_range": [80, 120],
        "p_range": [40, 60],
        "k_range": [40, 80],
        "duration_days": 80,
        "water_req": "Medium (350-500 mm)",
        "expected_yield_t_ha": 32.0,
        "yield_range": [22.0, 45.0],
        "description": "Fast-growing summer cash crop with high water efficiency under drip irrigation."
    },
    "Ragi (Finger Millet)": {
        "seasons": ["Kharif"],
        "soils": ["Red Loam", "Laterite"],
        "temp_range": [20.0, 34.0],
        "rainfall_range": [500, 900],
        "ph_range": [5.5, 7.2],
        "n_range": [40, 70],
        "p_range": [20, 40],
        "k_range": [20, 40],
        "duration_days": 105,
        "water_req": "Low-Medium (350-500 mm)",
        "expected_yield_t_ha": 2.2,
        "yield_range": [1.5, 3.2],
        "description": "Highly nutritious, drought-resilient super millet widely grown in Karnataka and Southern India."
    }
}

# Regional default soil mapping based on State
STATE_SOIL_MAP: Dict[str, str] = {
    "Karnataka": "Red Loam",
    "Maharashtra": "Black Cotton",
    "Punjab": "Alluvial",
    "Haryana": "Alluvial",
    "Uttar Pradesh": "Alluvial",
    "Madhya Pradesh": "Black Cotton",
    "Gujarat": "Black Cotton",
    "Tamil Nadu": "Red Loam",
    "Andhra Pradesh": "Red Loam",
    "Telangana": "Red Loam",
    "Rajasthan": "Desert / Sandy",
    "West Bengal": "Coastal Alluvial",
    "Bihar": "Alluvial",
    "Assam": "Alluvial",
    "Kerala": "Laterite",
    "Odisha": "Red Loam",
    "Himachal Pradesh": "Mountain Soil",
    "Uttarakhand": "Mountain Soil",
    "Jammu and Kashmir": "Mountain Soil"
}

def find_nearest_location_by_gps(lat: float, lon: float) -> Dict[str, str]:
    """
    Finds the closest Indian district & state using Haversine distance.
    """
    closest_loc = GPS_LOCATIONS[0]
    min_dist = float("inf")

    for loc in GPS_LOCATIONS:
        # Haversine formula
        dlat = math.radians(loc["lat"] - lat)
        dlon = math.radians(loc["lon"] - lon)
        a = math.sin(dlat/2)**2 + math.cos(math.radians(lat)) * math.cos(math.radians(loc["lat"])) * math.sin(dlon/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        dist = 6371 * c  # km

        if dist < min_dist:
            min_dist = dist
            closest_loc = loc

    return {
        "state": closest_loc["state"],
        "district": closest_loc["district"],
        "distance_km": round(min_dist, 1)
    }

def get_crops_by_location_and_season(state: str, district: Optional[str] = None, season: Optional[str] = "Kharif") -> List[Dict[str, Any]]:
    """
    Returns crops ranked by suitability for the given state, district, and season.
    """
    suitable_crops = []
    default_soil = STATE_SOIL_MAP.get(state, "Alluvial")

    for crop_name, meta in CROP_AGRI_METADATA.items():
        score = 80.0 # Base suitability score

        # Season alignment bonus
        if season and season in meta["seasons"]:
            score += 15.0
        elif season and "Zaid" in meta["seasons"] and season == "Zaid":
            score += 10.0

        # Soil alignment bonus
        if default_soil in meta["soils"]:
            score += 5.0

        # State regional preference adjustment
        if state in ["Punjab", "Haryana", "Uttar Pradesh"] and crop_name in ["Wheat", "Rice", "Sugarcane", "Mustard", "Potato"]:
            score += 5.0
        elif state in ["Karnataka", "Tamil Nadu", "Andhra Pradesh"] and crop_name in ["Rice", "Ragi (Finger Millet)", "Sugarcane", "Tomato", "Banana", "Groundnut"]:
            score += 5.0
        elif state in ["Maharashtra", "Gujarat", "Madhya Pradesh"] and crop_name in ["Cotton", "Soybean", "Chickpea", "Onion", "Sugarcane"]:
            score += 5.0

        suitable_crops.append({
            "crop": crop_name,
            "suitability_score": min(99.5, round(score, 1)),
            "duration_days": meta["duration_days"],
            "water_req": meta["water_req"],
            "expected_yield_t_ha": meta["expected_yield_t_ha"],
            "yield_range": meta["yield_range"],
            "seasons": meta["seasons"],
            "description": meta["description"]
        })

    # Sort descending by suitability score
    suitable_crops.sort(key=lambda x: x["suitability_score"], reverse=True)
    return suitable_crops
