"""
KrishiAstra Comprehensive Plant, Crop & Disease Intelligence Database
Contains cultivated and commonly grown crops worldwide across 11 major agricultural categories:
1. Cereals & Grains
2. Pulses & Legumes
3. Oilseeds
4. Vegetables
5. Fruits
6. Spices & Herbs
7. Commercial, Plantation & Fiber Crops
8. Flowers & Ornamental Crops
9. Medicinal & Aromatic Plants
10. Fodder & Forage Crops
11. Agroforestry & Tree Crops

Each crop record contains:
- category, botanical_name, suitable_months (January-December)
- soils, temp_range (°C), rainfall_range (mm), ph_range
- n_range, p_range, k_range (kg/ha), duration_days, water_req
- expected_yield_t_ha, yield_range
- description
- diseases (name, symptoms, organic, chemical, preventive)
"""

from typing import Dict, List, Any, Optional

ALL_MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

COMPREHENSIVE_CROP_DATABASE: Dict[str, Dict[str, Any]] = {
    # ==========================================
    # 1. CEREALS & GRAINS
    # ==========================================
    "Rice / Paddy": {
        "category": "Cereals",
        "botanical_name": "Oryza sativa",
        "suitable_months": ["June", "July", "August", "December", "January"],
        "soils": ["Alluvial", "Clay Loam", "Red Loam", "Coastal Alluvial"],
        "temp_range": [20.0, 38.0],
        "rainfall_range": [1000, 2500],
        "ph_range": [5.5, 7.5],
        "n_range": [80, 150],
        "p_range": [30, 60],
        "k_range": [30, 60],
        "duration_days": 125,
        "water_req": "Very High (1200-1500 mm)",
        "expected_yield_t_ha": 4.2,
        "yield_range": [2.5, 6.5],
        "description": "Primary staple cereal food crop grown across tropical and subtropical wetland plains under submerged or saturated soil conditions.",
        "diseases": [
            {
                "name": "Blast (Magnaporthe oryzae)",
                "symptoms": "Spindle-shaped or diamond lesions with grayish-white centers and dark brown margins on leaves, nodes, and panicles.",
                "organic": ["Spray diluted fermented cow urine with neem extract (1:10).", "Apply Pseudomonas fluorescens bio-agent @ 10g/kg seed."],
                "chemical": ["Tricyclazole 75% WP @ 0.6g/L of water.", "Isoprothiolane 40% EC @ 1.5ml/L."],
                "preventive": ["Avoid excessive nitrogen application.", "Maintain proper water depth and use certified resistant seeds like IR64."]
            },
            {
                "name": "Bacterial Leaf Blight (Xanthomonas oryzae)",
                "symptoms": "Water-soaked stripes turning yellow-white with wavy margins starting from leaf tips and progressing downwards.",
                "organic": ["Spray fresh cow dung slurry filtrate (5%) or Neem seed kernel extract.", "Drain flood water and re-irrigate fresh water."],
                "chemical": ["Copper Oxychloride 50% WP @ 2.5g/L + Streptocycline @ 0.1g/L of water."],
                "preventive": ["Use certified disease-resistant varieties.", "Avoid clipping seedling tips during transplanting."]
            },
            {
                "name": "Brown Spot (Bipolaris oryzae)",
                "symptoms": "Small, oval, dark brown spots on foliage with yellow halo, causing premature drying of leaves.",
                "organic": ["Apply balanced organic compost and vermicompost.", "Seed soaking in hot water at 52°C for 10 minutes."],
                "chemical": ["Mancozeb 75% WP @ 2g/L of water.", "Propiconazole 25% EC @ 1ml/L."],
                "preventive": ["Correct soil potassium and zinc deficiencies.", "Treat seeds with Trichoderma before nursery sowing."]
            }
        ]
    },
    "Wheat": {
        "category": "Cereals",
        "botanical_name": "Triticum aestivum",
        "suitable_months": ["October", "November", "December"],
        "soils": ["Alluvial", "Clay Loam", "Black Cotton"],
        "temp_range": [10.0, 25.0],
        "rainfall_range": [350, 750],
        "ph_range": [6.0, 7.5],
        "n_range": [90, 150],
        "p_range": [40, 70],
        "k_range": [30, 60],
        "duration_days": 120,
        "water_req": "Medium (450-650 mm)",
        "expected_yield_t_ha": 4.5,
        "yield_range": [3.0, 6.2],
        "description": "Major cool-season rabi cereal grain requiring 4-6 timely irrigations at crown root initiation, tillering, and grain filling stages.",
        "diseases": [
            {
                "name": "Yellow / Stripe Rust (Puccinia striiformis)",
                "symptoms": "Bright yellow pustules arranged in parallel stripes along leaf veins, releasing powdery yellow spores.",
                "organic": ["Spray foliar garlic and chilli extract.", "Isolate and incinerate early localized infection patches."],
                "chemical": ["Tebuconazole 25.9% EC @ 1ml/L of water.", "Propiconazole 25% EC @ 1ml/L."],
                "preventive": ["Sow resistant varieties like HD-2967, DBW-187.", "Avoid late sowing beyond November."]
            },
            {
                "name": "Loose Smut (Ustilago tritici)",
                "symptoms": "Infected heads emerge earlier than healthy ones, turning the entire ear into a mass of black powdery spores.",
                "organic": ["Solar heat seed treatment in summer months.", "Trichoderma viride seed treatment @ 5g/kg."],
                "chemical": ["Carboxin 75% WP @ 2g/kg seed treatment before sowing."],
                "preventive": ["Always use certified disease-free certified seed stock from authorized seed corporations."]
            }
        ]
    },
    "Maize (Corn)": {
        "category": "Cereals",
        "botanical_name": "Zea mays",
        "suitable_months": ["January", "February", "June", "July", "October"],
        "soils": ["Red Loam", "Alluvial", "Black Cotton", "Sandy Loam"],
        "temp_range": [18.0, 35.0],
        "rainfall_range": [500, 900],
        "ph_range": [5.8, 7.5],
        "n_range": [90, 160],
        "p_range": [40, 70],
        "k_range": [30, 60],
        "duration_days": 100,
        "water_req": "Medium (500-750 mm)",
        "expected_yield_t_ha": 5.5,
        "yield_range": [3.5, 7.8],
        "description": "Highly versatile 'Queen of Cereals' grown for human food, poultry/livestock feed, and industrial starch production.",
        "diseases": [
            {
                "name": "Turcicum Leaf Blight (Exserohilum turcicum)",
                "symptoms": "Long, elliptical grayish-green or tan lesions on leaves that merge, causing complete foliar scorch.",
                "organic": ["Spray bio-agent Trichoderma harzianum @ 5g/L."],
                "chemical": ["Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1ml/L."],
                "preventive": ["Destroy post-harvest crop stubble and avoid high planting density."]
            },
            {
                "name": "Maydis Leaf Blight (Bipolaris maydis)",
                "symptoms": "Small, rectangular buff-colored spots bounded by leaf veins with reddish-brown borders.",
                "organic": ["Apply neem cake to soil before sowing.", "Spray Pseudomonas fluorescens @ 5g/L."],
                "chemical": ["Zineb 75% WP @ 2g/L or Mancozeb 75% WP @ 2g/L."],
                "preventive": ["Rotate crops with non-graminaceous legumes and ensure good field drainage."]
            }
        ]
    },
    "Barley": {
        "category": "Cereals",
        "botanical_name": "Hordeum vulgare",
        "suitable_months": ["October", "November", "December"],
        "soils": ["Sandy Loam", "Alluvial", "Clay Loam"],
        "temp_range": [12.0, 28.0],
        "rainfall_range": [300, 550],
        "ph_range": [6.0, 8.0],
        "n_range": [50, 80],
        "p_range": [25, 45],
        "k_range": [20, 40],
        "duration_days": 115,
        "water_req": "Low-Medium (300-450 mm)",
        "expected_yield_t_ha": 3.8,
        "yield_range": [2.5, 5.0],
        "description": "Drought and salinity tolerant rabi cereal prized for malt, brewery products, animal feed, and health food grains.",
        "diseases": [
            {
                "name": "Covered Smut (Ustilago hordei)",
                "symptoms": "Grains are replaced by hard, persistent dark brown spore masses covered by a thin membrane.",
                "organic": ["Soak seeds in hot water at 54°C for 10 minutes.", "Trichoderma seed treatment @ 4g/kg."],
                "chemical": ["Thiram 75% WP or Carbendazim 50% WP @ 2g/kg seed treatment."],
                "preventive": ["Avoid sowing untreated saved grains; use certified disease-free seeds."]
            }
        ]
    },
    "Oats": {
        "category": "Cereals",
        "botanical_name": "Avena sativa",
        "suitable_months": ["October", "November", "December"],
        "soils": ["Loam", "Clay Loam", "Sandy Loam"],
        "temp_range": [12.0, 26.0],
        "rainfall_range": [400, 700],
        "ph_range": [5.5, 7.0],
        "n_range": [60, 100],
        "p_range": [30, 50],
        "k_range": [25, 45],
        "duration_days": 110,
        "water_req": "Medium (400-600 mm)",
        "expected_yield_t_ha": 3.5,
        "yield_range": [2.2, 4.8],
        "description": "Nutrient-rich cool season cereal cultivated for high-fiber human food and premium green forage.",
        "diseases": [
            {
                "name": "Crown Rust (Puccinia coronata)",
                "symptoms": "Bright orange-yellow pustules scattered randomly over leaf blades without forming distinct stripes.",
                "organic": ["Foliar spray of neem seed kernel extract (5%)."],
                "chemical": ["Propiconazole 25% EC @ 1ml/L of water."],
                "preventive": ["Plant early-maturing resistant varieties and remove buckthorn alternate hosts."]
            }
        ]
    },
    "Rye": {
        "category": "Cereals",
        "botanical_name": "Secale cereale",
        "suitable_months": ["September", "October", "November"],
        "soils": ["Sandy Loam", "Poor Soils", "Light Loam"],
        "temp_range": [8.0, 22.0],
        "rainfall_range": [350, 650],
        "ph_range": [5.0, 7.0],
        "n_range": [50, 80],
        "p_range": [25, 45],
        "k_range": [25, 45],
        "duration_days": 130,
        "water_req": "Low (300-450 mm)",
        "expected_yield_t_ha": 3.2,
        "yield_range": [2.0, 4.5],
        "description": "Hardy cereal capable of flourishing in cold climates and poor, acidic soils where other grains struggle.",
        "diseases": [
            {
                "name": "Ergot (Claviceps purpurea)",
                "symptoms": "Dark purple or black horn-like sclerotia protruding from the spikelets in place of normal grain kernels.",
                "organic": ["Deep summer plowing to bury sclerotia below 5 cm depth."],
                "chemical": ["Seed brine flotation (20% salt solution) to float out ergot sclerotia before sowing."],
                "preventive": ["Practice crop rotation and use certified ergot-free seed stock."]
            }
        ]
    },
    "Sorghum (Jowar)": {
        "category": "Cereals",
        "botanical_name": "Sorghum bicolor",
        "suitable_months": ["June", "July", "September", "October"],
        "soils": ["Black Cotton", "Red Loam", "Clay Loam"],
        "temp_range": [24.0, 36.0],
        "rainfall_range": [400, 750],
        "ph_range": [6.0, 8.5],
        "n_range": [60, 100],
        "p_range": [30, 50],
        "k_range": [25, 45],
        "duration_days": 105,
        "water_req": "Low-Medium (400-550 mm)",
        "expected_yield_t_ha": 3.0,
        "yield_range": [1.8, 4.5],
        "description": "Climate-resilient 'Camel of Crops' capable of thriving in semi-arid conditions and erratic monsoon rainfall.",
        "diseases": [
            {
                "name": "Grain Mold (Fusarium & Curvularia spp.)",
                "symptoms": "Black, pink, or white fungal growth over maturing grain florets causing discoloration and chalky endosperm.",
                "organic": ["Foliar spray of Trichoderma harzianum at flowering stage."],
                "chemical": ["Propiconazole 25% EC @ 1ml/L or Mancozeb 75% WP @ 2g/L at flowering."],
                "preventive": ["Harvest immediately upon physiological maturity to prevent rainy-season mold."]
            }
        ]
    },
    "Pearl Millet (Bajra)": {
        "category": "Cereals",
        "botanical_name": "Pennisetum glaucum",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Sandy Loam", "Light Red Loam", "Alluvial"],
        "temp_range": [25.0, 40.0],
        "rainfall_range": [300, 600],
        "ph_range": [6.5, 8.5],
        "n_range": [50, 90],
        "p_range": [25, 45],
        "k_range": [20, 40],
        "duration_days": 85,
        "water_req": "Low (250-400 mm)",
        "expected_yield_t_ha": 2.6,
        "yield_range": [1.5, 3.8],
        "description": "Highly drought and heat tolerant nutrient-dense millet rich in iron, zinc, and dietary fiber.",
        "diseases": [
            {
                "name": "Downy Mildew / Green Ear (Sclerospora graminicola)",
                "symptoms": "Chlorotic streaks on leaves turning whitish with downy growth on undersides; floral parts transformed into leafy structures.",
                "organic": ["Seed treatment with bio-agents and rogue out infected green-ear plants early."],
                "chemical": ["Metalaxyl 35% WS @ 6g/kg seed treatment; foliar spray of Metalaxyl-Mancozeb @ 2g/L."],
                "preventive": ["Grow downy mildew resistant hybrids like HHB-67."]
            }
        ]
    },
    "Finger Millet (Ragi)": {
        "category": "Cereals",
        "botanical_name": "Eleusine coracana",
        "suitable_months": ["June", "July", "August", "December", "January"],
        "soils": ["Red Loam", "Laterite", "Sandy Loam", "Alluvial"],
        "temp_range": [20.0, 34.0],
        "rainfall_range": [500, 1000],
        "ph_range": [5.5, 7.5],
        "n_range": [50, 80],
        "p_range": [25, 40],
        "k_range": [20, 35],
        "duration_days": 110,
        "water_req": "Medium (450-650 mm)",
        "expected_yield_t_ha": 2.8,
        "yield_range": [1.6, 4.0],
        "description": "Superfood millet packed with bio-available calcium (344mg/100g), essential amino acids, and dietary fiber.",
        "diseases": [
            {
                "name": "Ragi Blast (Pyricularia grisea)",
                "symptoms": "Spindle-shaped lesions with gray center on leaves, neck blast turning earhead brown and drooping.",
                "organic": ["Seed treatment with Pseudomonas fluorescens @ 10g/kg.", "Spray fermented Panchagavya (3%)."],
                "chemical": ["Tricyclazole 75% WP @ 0.6g/L or Kitazin 48% EC @ 1ml/L."],
                "preventive": ["Avoid excessive nitrogen and use blast-resistant varieties like GPU-28, ML-365."]
            }
        ]
    },
    "Foxtail Millet": {
        "category": "Cereals",
        "botanical_name": "Setaria italica",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Sandy Loam", "Red Loam", "Light Alluvial"],
        "temp_range": [20.0, 35.0],
        "rainfall_range": [350, 600],
        "ph_range": [5.5, 7.5],
        "n_range": [40, 60],
        "p_range": [20, 30],
        "k_range": [15, 25],
        "duration_days": 80,
        "water_req": "Low (250-400 mm)",
        "expected_yield_t_ha": 2.0,
        "yield_range": [1.2, 3.0],
        "description": "Short-duration, fast-growing ancient millet grain with a low glycemic index and high antioxidant properties.",
        "diseases": [
            {
                "name": "Rust (Uromyces setariae-italicae)",
                "symptoms": "Minute brown to dark reddish pustules on both leaf surfaces.",
                "organic": ["Spray 5% neem seed kernel extract."],
                "chemical": ["Mancozeb 75% WP @ 2g/L."],
                "preventive": ["Maintain balanced nutrition and avoid dense stand."]
            }
        ]
    },

    # ==========================================
    # 2. PULSES & LEGUMES
    # ==========================================
    "Chickpea (Gram)": {
        "category": "Pulses & Legumes",
        "botanical_name": "Cicer arietinum",
        "suitable_months": ["October", "November", "December"],
        "soils": ["Black Cotton", "Clay Loam", "Alluvial"],
        "temp_range": [15.0, 28.0],
        "rainfall_range": [350, 650],
        "ph_range": [6.0, 7.8],
        "n_range": [20, 30],
        "p_range": [40, 60],
        "k_range": [20, 30],
        "duration_days": 105,
        "water_req": "Low (250-400 mm)",
        "expected_yield_t_ha": 2.2,
        "yield_range": [1.3, 3.2],
        "description": "Major cool-season pulse crop that fixes atmospheric nitrogen in root nodules, enhancing long-term soil health.",
        "diseases": [
            {
                "name": "Fusarium Wilt (Fusarium oxysporum f. sp. ciceris)",
                "symptoms": "Drooping of petioles, yellowing and drying of leaves progressing from top to bottom, internal xylem browning.",
                "organic": ["Soil application of Trichoderma viride @ 2.5kg/ha enriched in farmyard manure."],
                "chemical": ["Seed treatment with Carbendazim 1g + Thiram 2g per kg of seed."],
                "preventive": ["Rotate crops with cereals and sow wilt-resistant varieties like JG-11, JAKI-9218."]
            },
            {
                "name": "Ascochyta Blight (Ascochyta rabiei)",
                "symptoms": "Circular spots on leaves and pods with dark margins and concentric rings of black pycnidia dots.",
                "organic": ["Deep summer plowing and seed treatment with bio-agents."],
                "chemical": ["Chlorothalonil 75% WP @ 2g/L or Mancozeb 75% WP @ 2.5g/L."],
                "preventive": ["Use clean certified seed and avoid overhead sprinkling."]
            }
        ]
    },
    "Pigeon Pea (Arhar / Tur)": {
        "category": "Pulses & Legumes",
        "botanical_name": "Cajanus cajan",
        "suitable_months": ["June", "July"],
        "soils": ["Deep Black", "Red Loam", "Alluvial"],
        "temp_range": [20.0, 35.0],
        "rainfall_range": [600, 1000],
        "ph_range": [6.0, 8.0],
        "n_range": [20, 30],
        "p_range": [40, 60],
        "k_range": [20, 40],
        "duration_days": 170,
        "water_req": "Medium (500-700 mm)",
        "expected_yield_t_ha": 2.0,
        "yield_range": [1.2, 3.0],
        "description": "Deep-rooted perennial/annual legume fixing up to 40 kg N/ha, providing protein-rich dal and firewood stems.",
        "diseases": [
            {
                "name": "Sterility Mosaic Disease (SMD)",
                "symptoms": "Severe stunting, bushiness, green mosaic mottling on small leaves, complete cessation of flowering.",
                "organic": ["Eradicate volunteer infected plants from previous season."],
                "chemical": ["Spray Fenazaquin 10% EC @ 1.5ml/L or Propargite 57% EC @ 2ml/L to control mite vectors."],
                "preventive": ["Plant SMD-resistant varieties like BSMR-736, Asha (ICPL-87119)."]
            }
        ]
    },
    "Green Gram (Moong)": {
        "category": "Pulses & Legumes",
        "botanical_name": "Vigna radiata",
        "suitable_months": ["February", "March", "June", "July"],
        "soils": ["Alluvial", "Loam", "Red Loam", "Black Soil"],
        "temp_range": [22.0, 35.0],
        "rainfall_range": [400, 750],
        "ph_range": [6.2, 7.5],
        "n_range": [15, 25],
        "p_range": [30, 50],
        "k_range": [15, 30],
        "duration_days": 65,
        "water_req": "Low (300-450 mm)",
        "expected_yield_t_ha": 1.4,
        "yield_range": [0.8, 2.2],
        "description": "Short-duration catch crop easily fitted into intensive cereal crop rotations to restore nitrogen balance.",
        "diseases": [
            {
                "name": "Yellow Mosaic Virus (MYMV)",
                "symptoms": "Bright yellow patches interspersed with green on leaves, stunted growth and pod distortion.",
                "organic": ["Install yellow sticky traps @ 10/acre to trap whitefly vectors.", "Neem oil 1500ppm @ 4ml/L spray."],
                "chemical": ["Dimethoate 30% EC @ 1.7ml/L or Imidacloprid 17.8% SL @ 0.3ml/L."],
                "preventive": ["Cultivate MYMV-resistant varieties like IPM-02-3, Shikha."]
            }
        ]
    },
    "Black Gram (Urad)": {
        "category": "Pulses & Legumes",
        "botanical_name": "Vigna mungo",
        "suitable_months": ["February", "March", "June", "July", "October"],
        "soils": ["Black Cotton", "Alluvial", "Clay Loam"],
        "temp_range": [22.0, 35.0],
        "rainfall_range": [500, 800],
        "ph_range": [6.0, 7.5],
        "n_range": [15, 25],
        "p_range": [30, 50],
        "k_range": [15, 30],
        "duration_days": 75,
        "water_req": "Low-Medium (350-500 mm)",
        "expected_yield_t_ha": 1.3,
        "yield_range": [0.7, 2.0],
        "description": "Nutritious pulse essential for traditional culinary dishes, containing high amounts of phosphoric acid.",
        "diseases": [
            {
                "name": "Powdery Mildew (Erysiphe polygoni)",
                "symptoms": "White floury talc-like patches on both leaf surfaces, turning grayish with leaf curling and shedding.",
                "organic": ["Foliar spray of wettable sulfur (bio-grade) @ 2g/L or raw milk dilution (1:9)."],
                "chemical": ["Hexaconazole 5% EC @ 1ml/L or Carbendazim 50% WP @ 1g/L."],
                "preventive": ["Avoid delayed sowing and dense plant populations."]
            }
        ]
    },
    "Lentil (Masoor)": {
        "category": "Pulses & Legumes",
        "botanical_name": "Lens culinaris",
        "suitable_months": ["October", "November"],
        "soils": ["Alluvial", "Clay Loam", "Loam"],
        "temp_range": [12.0, 25.0],
        "rainfall_range": [300, 550],
        "ph_range": [6.0, 7.5],
        "n_range": [15, 25],
        "p_range": [30, 50],
        "k_range": [15, 25],
        "duration_days": 110,
        "water_req": "Low (250-350 mm)",
        "expected_yield_t_ha": 1.6,
        "yield_range": [1.0, 2.4],
        "description": "Highly nutritious cool-season pulse packed with prebiotics, protein, and micro-nutrients.",
        "diseases": [
            {
                "name": "Lentil Rust (Uromyces viciae-fabae)",
                "symptoms": "Dark brown to black pustules on lower leaves, leading to severe leaf shedding.",
                "organic": ["Spray neem oil 2% at initial symptom appearance."],
                "chemical": ["Mancozeb 75% WP @ 2g/L or Propiconazole 25% EC @ 1ml/L."],
                "preventive": ["Sow early and use rust-resistant cultivars like Pant L-406."]
            }
        ]
    },
    "Pea (Green / Field Pea)": {
        "category": "Pulses & Legumes",
        "botanical_name": "Pisum sativum",
        "suitable_months": ["October", "November", "December"],
        "soils": ["Alluvial", "Loam", "Clay Loam"],
        "temp_range": [10.0, 22.0],
        "rainfall_range": [400, 650],
        "ph_range": [6.0, 7.5],
        "n_range": [25, 40],
        "p_range": [40, 60],
        "k_range": [30, 50],
        "duration_days": 85,
        "water_req": "Medium (350-500 mm)",
        "expected_yield_t_ha": 8.0,
        "yield_range": [5.0, 12.0],
        "description": "Cool-season sweet legume grown for fresh green tender pods and dried pulse seed markets.",
        "diseases": [
            {
                "name": "Powdery Mildew (Erysiphe pisi)",
                "symptoms": "White powdery fungal growth covering leaves, stems, and pods, reducing market value.",
                "organic": ["Spray wettable sulfur @ 2.5g/L or baking soda solution (3g/L)."],
                "chemical": ["Sulfur 80% WDG @ 2.5g/L or Dinocap 48% EC @ 1ml/L."],
                "preventive": ["Plant resistant varieties like Arka Ajit, Azad P-1."]
            }
        ]
    },
    "Soybean": {
        "category": "Pulses & Legumes",
        "botanical_name": "Glycine max",
        "suitable_months": ["June", "July"],
        "soils": ["Black Cotton", "Loam", "Alluvial"],
        "temp_range": [20.0, 32.0],
        "rainfall_range": [600, 950],
        "ph_range": [6.0, 7.5],
        "n_range": [25, 40],
        "p_range": [50, 80],
        "k_range": [30, 50],
        "duration_days": 95,
        "water_req": "Medium (450-650 mm)",
        "expected_yield_t_ha": 2.5,
        "yield_range": [1.5, 3.5],
        "description": "Dual-purpose wonder crop containing 40% high-quality protein and 20% edible oil.",
        "diseases": [
            {
                "name": "Soybean Rust (Phakopsora pachyrhizi)",
                "symptoms": "Small brown/tan lesions with raised volcanic pustules on undersides of leaves, causing rapid defoliation.",
                "organic": ["Foliar spray of Trichoderma harzianum @ 5g/L."],
                "chemical": ["Hexaconazole 5% EC @ 1ml/L or Pyraclostrobin 20% WG @ 1g/L."],
                "preventive": ["Plant early at recommended spacing to promote canopy aeration."]
            }
        ]
    },
    "Cowpea (Lobia)": {
        "category": "Pulses & Legumes",
        "botanical_name": "Vigna unguiculata",
        "suitable_months": ["February", "March", "June", "July"],
        "soils": ["Sandy Loam", "Red Loam", "Alluvial"],
        "temp_range": [22.0, 35.0],
        "rainfall_range": [400, 700],
        "ph_range": [5.5, 7.5],
        "n_range": [15, 25],
        "p_range": [30, 50],
        "k_range": [20, 35],
        "duration_days": 70,
        "water_req": "Low (300-450 mm)",
        "expected_yield_t_ha": 1.8,
        "yield_range": [1.0, 2.5],
        "description": "Versatile drought-tolerant legume grown as vegetable pod, dry pulse, and nitrogen-fixing green manure.",
        "diseases": [
            {
                "name": "Cercospora Leaf Spot (Cercospora cruenta)",
                "symptoms": "Circular to angular reddish-brown lesions on leaves, surrounded by yellow halos.",
                "organic": ["Spray neem oil 1500ppm @ 3ml/L."],
                "chemical": ["Carbendazim 50% WP @ 1g/L or Mancozeb @ 2g/L."],
                "preventive": ["Practice crop rotation and avoid sprinkler irrigation during hot hours."]
            }
        ]
    },
    "Kidney Bean (Rajma)": {
        "category": "Pulses & Legumes",
        "botanical_name": "Phaseolus vulgaris",
        "suitable_months": ["October", "November"],
        "soils": ["Deep Loam", "Clay Loam", "Rich Alluvial"],
        "temp_range": [12.0, 25.0],
        "rainfall_range": [450, 750],
        "ph_range": [5.8, 7.0],
        "n_range": [80, 120],
        "p_range": [50, 80],
        "k_range": [40, 60],
        "duration_days": 115,
        "water_req": "Medium (400-600 mm)",
        "expected_yield_t_ha": 2.2,
        "yield_range": [1.4, 3.2],
        "description": "High-value commercial pulse requiring direct nitrogen fertilization as it does not nodulate with native rhizobia.",
        "diseases": [
            {
                "name": "Anthracnose (Colletotrichum lindemuthianum)",
                "symptoms": "Sunken, dark brown to black circular lesions on pods and leaf veins with pink gelatinous spore masses.",
                "organic": ["Hot water seed treatment at 50°C for 15 minutes.", "Spray bio-agent Trichoderma viride."],
                "chemical": ["Carbendazim 50% WP @ 1g/L or Mancozeb 75% WP @ 2g/L."],
                "preventive": ["Always use disease-free certified seeds and maintain wide row spacing."]
            }
        ]
    },

    # ==========================================
    # 3. OILSEEDS
    # ==========================================
    "Groundnut (Peanut)": {
        "category": "Oilseeds",
        "botanical_name": "Arachis hypogaea",
        "suitable_months": ["January", "February", "June", "July"],
        "soils": ["Sandy Loam", "Red Sandy Loam", "Light Alluvial"],
        "temp_range": [22.0, 34.0],
        "rainfall_range": [500, 850],
        "ph_range": [6.0, 7.5],
        "n_range": [20, 30],
        "p_range": [40, 60],
        "k_range": [40, 60],
        "duration_days": 115,
        "water_req": "Medium (450-600 mm)",
        "expected_yield_t_ha": 2.6,
        "yield_range": [1.5, 3.8],
        "description": "Subterranean pod-developing oilseed crop requiring light, friable soils for easy peg penetration and pod development.",
        "diseases": [
            {
                "name": "Tikka Leaf Spot (Cercospora arachidicola & C. personata)",
                "symptoms": "Early spots are circular brown with bright yellow halos; late spots are dark circular without conspicuous halos.",
                "organic": ["Foliar spray of 5% neem seed kernel extract (NSKE).", "Spray fermented buttermilk (5%)."],
                "chemical": ["Hexaconazole 5% EC @ 1ml/L or Carbendazim 12% + Mancozeb 63% WP @ 2g/L."],
                "preventive": ["Maintain balanced gypsum (calcium & sulfur) soil application @ 200 kg/ha at flowering."]
            }
        ]
    },
    "Mustard (Rapeseed)": {
        "category": "Oilseeds",
        "botanical_name": "Brassica juncea",
        "suitable_months": ["October", "November"],
        "soils": ["Alluvial", "Sandy Loam", "Clay Loam"],
        "temp_range": [10.0, 25.0],
        "rainfall_range": [300, 500],
        "ph_range": [6.0, 7.8],
        "n_range": [60, 90],
        "p_range": [30, 50],
        "k_range": [25, 40],
        "duration_days": 115,
        "water_req": "Low-Medium (250-400 mm)",
        "expected_yield_t_ha": 2.0,
        "yield_range": [1.2, 2.8],
        "description": "Crucial cool-season oilseed providing pungent edible oil and high-protein oilcake for animal feed.",
        "diseases": [
            {
                "name": "White Rust (Albugo candida)",
                "symptoms": "Raised, white to cream-colored blister-like pustules on leaf undersides and swollen floral malformations.",
                "organic": ["Seed treatment with bio-agents and remove weed hosts."],
                "chemical": ["Metalaxyl 35% WS @ 6g/kg seed treatment; foliar spray with Metalaxyl 8% + Mancozeb 64% WP @ 2g/L."],
                "preventive": ["Sow early in October to escape peak disease and aphid incidence."]
            },
            {
                "name": "Alternaria Blight (Alternaria brassicae)",
                "symptoms": "Concentric target-board circular dark brown spots on leaves, stems, and pods.",
                "organic": ["Spray garlic bulb extract (2%)."],
                "chemical": ["Mancozeb 75% WP @ 2g/L or Iprodione 50% WP @ 1.5g/L."],
                "preventive": ["Use clean certified seeds and destroy infected crop residues."]
            }
        ]
    },
    "Sunflower": {
        "category": "Oilseeds",
        "botanical_name": "Helianthus annuus",
        "suitable_months": ["January", "February", "June", "July", "October", "November"],
        "soils": ["Black Cotton", "Alluvial", "Red Loam"],
        "temp_range": [20.0, 32.0],
        "rainfall_range": [450, 750],
        "ph_range": [6.5, 8.0],
        "n_range": [60, 90],
        "p_range": [40, 60],
        "k_range": [30, 50],
        "duration_days": 90,
        "water_req": "Medium (400-600 mm)",
        "expected_yield_t_ha": 1.8,
        "yield_range": [1.0, 2.6],
        "description": "Photo-insensitive oilseed producing heart-healthy polyunsaturated edible oil with 40-45% oil content.",
        "diseases": [
            {
                "name": "Alternaria Leaf Spot (Alternaria helianthi)",
                "symptoms": "Dark brown to black circular lesions with yellow halos on leaves, stems, and sepals.",
                "organic": ["Spray bio-fungicide Pseudomonas fluorescens @ 5g/L."],
                "chemical": ["Mancozeb 75% WP @ 2g/L or Difenoconazole 25% EC @ 0.5ml/L."],
                "preventive": ["Treat seeds with Thiram @ 3g/kg before sowing."]
            }
        ]
    },
    "Sesame (Til)": {
        "category": "Oilseeds",
        "botanical_name": "Sesamum indicum",
        "suitable_months": ["February", "March", "June", "July"],
        "soils": ["Sandy Loam", "Alluvial", "Well-Drained Loam"],
        "temp_range": [25.0, 38.0],
        "rainfall_range": [350, 650],
        "ph_range": [5.5, 7.5],
        "n_range": [30, 50],
        "p_range": [20, 35],
        "k_range": [20, 35],
        "duration_days": 80,
        "water_req": "Low (250-400 mm)",
        "expected_yield_t_ha": 0.8,
        "yield_range": [0.5, 1.4],
        "description": "Ancient 'Queen of Oilseeds' prized for high stability, nutty flavor, sesamol antioxidants, and culinary uses.",
        "diseases": [
            {
                "name": "Phyllody (Phytoplasma)",
                "symptoms": "All floral parts transformed into leafy structures, profuse branching, and complete seed failure.",
                "organic": ["Rogue out and burn infected plants immediately upon sighting."],
                "chemical": ["Spray Dimethoate 30% EC @ 1.5ml/L or Imidacloprid @ 0.3ml/L to eliminate jassid vectors."],
                "preventive": ["Intercrop with pearl millet or redgram as barrier crops."]
            }
        ]
    },
    "Safflower (Kardi)": {
        "category": "Oilseeds",
        "botanical_name": "Carthamus tinctorius",
        "suitable_months": ["October", "November"],
        "soils": ["Deep Black Cotton", "Clay Loam"],
        "temp_range": [15.0, 30.0],
        "rainfall_range": [300, 500],
        "ph_range": [6.0, 8.2],
        "n_range": [40, 60],
        "p_range": [25, 40],
        "k_range": [20, 30],
        "duration_days": 130,
        "water_req": "Low (200-350 mm)",
        "expected_yield_t_ha": 1.5,
        "yield_range": [0.9, 2.2],
        "description": "Spiny, deep-taprooted drought-tolerant rabi oilseed rich in linoleic and oleic fatty acids.",
        "diseases": [
            {
                "name": "Alternaria Leaf Blight (Alternaria carthami)",
                "symptoms": "Dark brown circular spots with concentric rings on leaves, bracts, and stems.",
                "organic": ["Spray neem oil 1500ppm @ 3ml/L."],
                "chemical": ["Mancozeb 75% WP @ 2.5g/L or Carbendazim @ 1g/L."],
                "preventive": ["Use clean certified seed and avoid overhead late irrigation."]
            }
        ]
    },
    "Castor": {
        "category": "Oilseeds",
        "botanical_name": "Ricinus communis",
        "suitable_months": ["July", "August"],
        "soils": ["Sandy Loam", "Red Sandy", "Alluvial"],
        "temp_range": [20.0, 36.0],
        "rainfall_range": [400, 750],
        "ph_range": [5.5, 7.5],
        "n_range": [60, 100],
        "p_range": [30, 50],
        "k_range": [25, 45],
        "duration_days": 150,
        "water_req": "Low-Medium (350-550 mm)",
        "expected_yield_t_ha": 2.2,
        "yield_range": [1.4, 3.2],
        "description": "Industrial non-edible oilseed yielding ricinoleic acid used for high-grade aviation lubricants, paints, and cosmetics.",
        "diseases": [
            {
                "name": "Castor Wilt (Fusarium oxysporum f. sp. ricini)",
                "symptoms": "Yellowing, marginal necrosis, drooping of leaves, and dark vascular discoloration.",
                "organic": ["Soil application of Trichoderma viride enriched farmyard manure."],
                "chemical": ["Carbendazim seed treatment @ 2g/kg."],
                "preventive": ["Grow wilt-resistant hybrids like GCH-4, GCH-7."]
            }
        ]
    },
    "Linseed (Flaxseed)": {
        "category": "Oilseeds",
        "botanical_name": "Linum usitatissimum",
        "suitable_months": ["October", "November"],
        "soils": ["Alluvial", "Clay Loam", "Black Soil"],
        "temp_range": [10.0, 24.0],
        "rainfall_range": [350, 600],
        "ph_range": [6.0, 7.5],
        "n_range": [40, 60],
        "p_range": [20, 35],
        "k_range": [20, 30],
        "duration_days": 120,
        "water_req": "Low-Medium (300-450 mm)",
        "expected_yield_t_ha": 1.2,
        "yield_range": [0.7, 1.8],
        "description": "Dual-purpose oilseed and fiber crop exceptionally rich in Omega-3 alpha-linolenic acid (ALA) and lignans.",
        "diseases": [
            {
                "name": "Linseed Rust (Melampsora lini)",
                "symptoms": "Bright orange-yellow uredia on all aerial green parts, later forming black crusty telia.",
                "organic": ["Dust sulfur powder @ 20 kg/ha in early morning."],
                "chemical": ["Mancozeb 75% WP @ 2g/L or Propiconazole @ 1ml/L."],
                "preventive": ["Sow resistant varieties like Garima, Shekhar."]
            }
        ]
    },

    # ==========================================
    # 4. VEGETABLES
    # ==========================================
    "Tomato": {
        "category": "Vegetables",
        "botanical_name": "Solanum lycopersicum",
        "suitable_months": ["January", "February", "June", "July", "October", "November"],
        "soils": ["Red Loam", "Sandy Loam", "Well-drained Alluvial"],
        "temp_range": [18.0, 30.0],
        "rainfall_range": [500, 850],
        "ph_range": [6.0, 7.2],
        "n_range": [100, 150],
        "p_range": [60, 90],
        "k_range": [60, 100],
        "duration_days": 90,
        "water_req": "Medium (500-700 mm)",
        "expected_yield_t_ha": 35.0,
        "yield_range": [20.0, 55.0],
        "description": "Extensively consumed solanaceous vegetable rich in lycopene antioxidant, Vitamin C, and potassium.",
        "diseases": [
            {
                "name": "Early Blight (Alternaria solani)",
                "symptoms": "Concentric dark brown 'target board' rings on older foliage with surrounding chlorotic halo.",
                "organic": ["Spray fermented cow urine extract (1:10) with copper.", "Apply Bacillus subtilis @ 5g/L."],
                "chemical": ["Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1ml/L."],
                "preventive": ["Stake plants to elevate foliage off wet ground and apply plastic mulch."]
            },
            {
                "name": "Late Blight (Phytophthora infestans)",
                "symptoms": "Water-soaked dark greasy foliar lesions with white cottony mildew under moist, cool conditions.",
                "organic": ["Bordeaux mixture (1%) preventive spray."],
                "chemical": ["Metalaxyl 8% + Mancozeb 64% WP @ 2g/L or Cymoxanil + Mancozeb @ 2g/L."],
                "preventive": ["Avoid overhead sprinkler irrigation and ensure fast soil drainage."]
            },
            {
                "name": "Tomato Leaf Curl Virus (ToLCV)",
                "symptoms": "Severe upward leaf curling, crinkling, vein thickening, stunting, and bushy growth.",
                "organic": ["Install yellow sticky traps @ 15/acre.", "Spray neem oil 1500ppm @ 5ml/L."],
                "chemical": ["Diafenthiuron 50% WP @ 1g/L or Spiromesifen 22.9% SC @ 1ml/L."],
                "preventive": ["Use nylon net (40-mesh) nurseries to protect seedlings from whitefly vectors."]
            }
        ]
    },
    "Potato": {
        "category": "Vegetables",
        "botanical_name": "Solanum tuberosum",
        "suitable_months": ["October", "November"],
        "soils": ["Sandy Loam", "Alluvial", "Well-Drained Silty Loam"],
        "temp_range": [15.0, 24.0],
        "rainfall_range": [400, 650],
        "ph_range": [5.2, 6.5],
        "n_range": [120, 180],
        "p_range": [80, 120],
        "k_range": [100, 150],
        "duration_days": 90,
        "water_req": "Medium (450-600 mm)",
        "expected_yield_t_ha": 25.0,
        "yield_range": [16.0, 38.0],
        "description": "World's most critical non-cereal tuber food crop, highly sensitive to tuberization temperatures above 22°C.",
        "diseases": [
            {
                "name": "Late Blight (Phytophthora infestans)",
                "symptoms": "Water-soaked irregular dark spots with white fungal down on leaf undersides, spreading rapidly in cool fog.",
                "organic": ["Foliar spray with Copper Hydroxide (bio-grade) @ 2g/L."],
                "chemical": ["Dimethomorph 50% WP @ 1g/L + Mancozeb @ 2g/L, or Fenamidone + Mancozeb @ 2.5g/L."],
                "preventive": ["Plant certified disease-free seed tubers like Kufri Pukhraj, Kufri Jyoti."]
            },
            {
                "name": "Black Scurf (Rhizoctonia solani)",
                "symptoms": "Dark brown hard sclerotial crusts on tuber skin ('dirt that won't wash off').",
                "organic": ["Tuber treatment with Trichoderma viride @ 5g/kg."],
                "chemical": ["Tuber dip in Monceren (Pencycuron) @ 2.5ml/L for 10 minutes."],
                "preventive": ["Practice 3-year crop rotation with non-solanaceous crops."]
            }
        ]
    },
    "Onion": {
        "category": "Vegetables",
        "botanical_name": "Allium cepa",
        "suitable_months": ["May", "June", "September", "October", "December", "January"],
        "soils": ["Sandy Loam", "Alluvial", "Clay Loam"],
        "temp_range": [15.0, 30.0],
        "rainfall_range": [450, 750],
        "ph_range": [6.0, 7.5],
        "n_range": [80, 120],
        "p_range": [40, 60],
        "k_range": [40, 60],
        "duration_days": 120,
        "water_req": "Medium (450-650 mm)",
        "expected_yield_t_ha": 18.0,
        "yield_range": [12.0, 28.0],
        "description": "Pungent biennial bulb crop rich in allyl propyl disulfide and quercetin antioxidants.",
        "diseases": [
            {
                "name": "Purple Blotch (Alternaria porri)",
                "symptoms": "Small, sunken, white spots on leaves developing purple/violet centers with yellow borders.",
                "organic": ["Foliar spray of 5% neem seed extract with sticker."],
                "chemical": ["Mancozeb 75% WP @ 2.5g/L or Tebuconazole 25.9% EC @ 1ml/L + Sandovit sticker."],
                "preventive": ["Avoid field waterlogging and spray with spreading agent/sticker."]
            }
        ]
    },
    "Garlic": {
        "category": "Vegetables",
        "botanical_name": "Allium sativum",
        "suitable_months": ["September", "October", "November"],
        "soils": ["Rich Loam", "Clay Loam", "Alluvial"],
        "temp_range": [12.0, 25.0],
        "rainfall_range": [400, 650],
        "ph_range": [6.0, 7.5],
        "n_range": [80, 120],
        "p_range": [40, 60],
        "k_range": [40, 60],
        "duration_days": 135,
        "water_req": "Medium (400-550 mm)",
        "expected_yield_t_ha": 8.0,
        "yield_range": [5.0, 12.0],
        "description": "Aromatic allium bulb crop valued for allicin compound with medicinal antimicrobial and cardiac benefits.",
        "diseases": [
            {
                "name": "Stemphylium Leaf Blight (Stemphylium vesicarium)",
                "symptoms": "Small yellow to pale orange lesions that elongate into dark brown patches with black sporulation.",
                "organic": ["Bio-agent Pseudomonas fluorescens @ 5g/L spray."],
                "chemical": ["Iprodione 50% WP @ 2g/L or Mancozeb 75% WP @ 2.5g/L."],
                "preventive": ["Plant healthy, well-dried seed cloves and maintain adequate plant spacing."]
            }
        ]
    },
    "Carrot": {
        "category": "Vegetables",
        "botanical_name": "Daucus carota",
        "suitable_months": ["August", "September", "October", "November"],
        "soils": ["Deep Loose Sandy Loam", "Light Alluvial"],
        "temp_range": [12.0, 22.0],
        "rainfall_range": [350, 600],
        "ph_range": [6.0, 7.0],
        "n_range": [60, 90],
        "p_range": [40, 60],
        "k_range": [60, 90],
        "duration_days": 85,
        "water_req": "Medium (350-500 mm)",
        "expected_yield_t_ha": 22.0,
        "yield_range": [14.0, 32.0],
        "description": "Sweet taproot vegetable high in beta-carotene (provitamin A) requiring stone-free loose soil for straight roots.",
        "diseases": [
            {
                "name": "Alternaria Leaf Blight (Alternaria dauci)",
                "symptoms": "Greenish-brown water-soaked spots on leaf edges with yellowing of foliage.",
                "organic": ["Spray neem oil 1500ppm @ 3ml/L."],
                "chemical": ["Chlorothalonil 75% WP @ 2g/L or Difenoconazole @ 0.5ml/L."],
                "preventive": ["Ensure well-drained raised beds and certified disease-free seeds."]
            }
        ]
    },
    "Radish": {
        "category": "Vegetables",
        "botanical_name": "Raphanus sativus",
        "suitable_months": ["January", "February", "March", "August", "September", "October", "November"],
        "soils": ["Sandy Loam", "Friable Alluvial", "Loam"],
        "temp_range": [12.0, 26.0],
        "rainfall_range": [300, 550],
        "ph_range": [5.5, 7.0],
        "n_range": [40, 60],
        "p_range": [25, 40],
        "k_range": [30, 50],
        "duration_days": 45,
        "water_req": "Low-Medium (250-400 mm)",
        "expected_yield_t_ha": 18.0,
        "yield_range": [10.0, 25.0],
        "description": "Fast-growing pungent root crop ready for harvest within 35 to 55 days from direct sowing.",
        "diseases": [
            {
                "name": "White Rust (Albugo candida)",
                "symptoms": "White blister-like pustules on leaf undersides and swollen floral axis.",
                "organic": ["Spray bio-formulation Trichoderma @ 5g/L."],
                "chemical": ["Mancozeb 75% WP @ 2g/L or Metalaxyl-Mancozeb @ 2g/L."],
                "preventive": ["Avoid overhead evening watering and rotate with non-brassica crops."]
            }
        ]
    },
    "Cabbage": {
        "category": "Vegetables",
        "botanical_name": "Brassica oleracea var. capitata",
        "suitable_months": ["September", "October", "November"],
        "soils": ["Clay Loam", "Alluvial", "Sandy Loam"],
        "temp_range": [12.0, 22.0],
        "rainfall_range": [400, 700],
        "ph_range": [6.0, 7.5],
        "n_range": [120, 160],
        "p_range": [60, 90],
        "k_range": [60, 90],
        "duration_days": 80,
        "water_req": "Medium (400-600 mm)",
        "expected_yield_t_ha": 30.0,
        "yield_range": [20.0, 45.0],
        "description": "Cruciferous leafy head vegetable rich in Vitamin C, K, and anti-carcinogenic glucosinolates.",
        "diseases": [
            {
                "name": "Black Rot (Xanthomonas campestris pv. campestris)",
                "symptoms": "Characteristic V-shaped yellow lesions along leaf margins with blackened veins.",
                "organic": ["Seed hot-water treatment at 50°C for 25 minutes."],
                "chemical": ["Streptocycline @ 0.1g/L + Copper Oxychloride @ 2.5g/L."],
                "preventive": ["Practice 3-year brassica crop rotation and rogue out infected heads."]
            }
        ]
    },
    "Cauliflower": {
        "category": "Vegetables",
        "botanical_name": "Brassica oleracea var. botrytis",
        "suitable_months": ["July", "August", "September", "October"],
        "soils": ["Clay Loam", "Alluvial", "Rich Sandy Loam"],
        "temp_range": [15.0, 24.0],
        "rainfall_range": [450, 750],
        "ph_range": [6.0, 7.2],
        "n_range": [120, 160],
        "p_range": [60, 90],
        "k_range": [60, 90],
        "duration_days": 85,
        "water_req": "Medium (450-650 mm)",
        "expected_yield_t_ha": 25.0,
        "yield_range": [15.0, 35.0],
        "description": "Delicate curd vegetable requiring precise curd-initiation temperatures and balanced boron/molybdenum micronutrients.",
        "diseases": [
            {
                "name": "Clubroot (Plasmodiophora brassicae)",
                "symptoms": "Stunted foliage with midday wilting; roots develop large, distorted spindle-shaped clubs and galls.",
                "organic": ["Apply agricultural lime to raise soil pH above 7.2."],
                "chemical": ["Fluazinam 500 SC or Flusulfamide soil drench."],
                "preventive": ["Avoid waterlogged acidic soils and clean field machinery between plots."]
            }
        ]
    },
    "Okra (Bhindi / Ladyfinger)": {
        "category": "Vegetables",
        "botanical_name": "Abelmoschus esculentus",
        "suitable_months": ["February", "March", "June", "July"],
        "soils": ["Sandy Loam", "Clay Loam", "Red Loam"],
        "temp_range": [22.0, 36.0],
        "rainfall_range": [500, 850],
        "ph_range": [6.0, 7.5],
        "n_range": [80, 120],
        "p_range": [40, 60],
        "k_range": [40, 60],
        "duration_days": 60,
        "water_req": "Medium (450-600 mm)",
        "expected_yield_t_ha": 12.0,
        "yield_range": [7.0, 18.0],
        "description": "Warm-season mucilaginous vegetable harvested in frequent 2-day picking cycles for tender green pods.",
        "diseases": [
            {
                "name": "Yellow Vein Mosaic Virus (YVMV)",
                "symptoms": "Homogeneous network of bright yellow veins on leaves, yellowing of pods, and severe dwarfing.",
                "organic": ["Install yellow sticky traps @ 12/acre.", "Spray neem oil 1500ppm @ 4ml/L."],
                "chemical": ["Acetamiprid 20% SP @ 0.3g/L or Thiamethoxam 25% WG @ 0.3g/L against whitefly vectors."],
                "preventive": ["Grow YVMV-resistant hybrids like Arka Anamika, Parbhani Kranti."]
            }
        ]
    },
    "Brinjal (Eggplant)": {
        "category": "Vegetables",
        "botanical_name": "Solanum melongena",
        "suitable_months": ["January", "February", "June", "July", "October"],
        "soils": ["Silt Loam", "Clay Loam", "Red Loam"],
        "temp_range": [20.0, 35.0],
        "rainfall_range": [500, 900],
        "ph_range": [5.8, 7.0],
        "n_range": [100, 140],
        "p_range": [50, 80],
        "k_range": [50, 80],
        "duration_days": 110,
        "water_req": "Medium (500-750 mm)",
        "expected_yield_t_ha": 28.0,
        "yield_range": [18.0, 42.0],
        "description": "Versatile warm-season solanaceous vegetable producing glossy purple, green, or variegated culinary fruits.",
        "diseases": [
            {
                "name": "Little Leaf of Brinjal (Phytoplasma)",
                "symptoms": "Extremely reduced, crowded leaves giving a rosette or witches' broom appearance with no fruit setting.",
                "organic": ["Eradicate and destroy affected plants promptly."],
                "chemical": ["Dimethoate 30% EC @ 1.7ml/L to control leafhopper vectors."],
                "preventive": ["Dip seedling roots in Tetracycline solution (500ppm) for 15 minutes before transplanting."]
            }
        ]
    },
    "Chilli (Green & Red)": {
        "category": "Vegetables",
        "botanical_name": "Capsicum annuum",
        "suitable_months": ["January", "February", "June", "July", "October"],
        "soils": ["Black Loam", "Red Sandy Loam", "Alluvial"],
        "temp_range": [20.0, 35.0],
        "rainfall_range": [500, 900],
        "ph_range": [6.0, 7.2],
        "n_range": [90, 140],
        "p_range": [40, 70],
        "k_range": [40, 70],
        "duration_days": 120,
        "water_req": "Medium (500-700 mm)",
        "expected_yield_t_ha": 14.0,
        "yield_range": [8.0, 22.0],
        "description": "High-value pungent spice and vegetable rich in capsaicin, Vitamin A, and Vitamin C.",
        "diseases": [
            {
                "name": "Anthracnose / Die-back (Colletotrichum capsici)",
                "symptoms": "Necrotic circular sunken spots with black concentric rings of acervuli on ripe fruits; twig die-back from tip downward.",
                "organic": ["Foliar spray with Pseudomonas fluorescens @ 5g/L.", "Spray 5% neem extract."],
                "chemical": ["Azoxystrobin 23% SC @ 1ml/L or Difenoconazole 25% EC @ 0.5ml/L."],
                "preventive": ["Seed treatment with Thiram @ 3g/kg and avoid picking wet fruits."]
            },
            {
                "name": "Chilli Leaf Curl Virus",
                "symptoms": "Upward curling and puckering of leaves, shortened internodes, and stunted bushy growth.",
                "organic": ["Install blue and yellow sticky traps for thrips and whiteflies."],
                "chemical": ["Fipronil 5% SC @ 1.5ml/L or Diafenthiuron 50% WP @ 1g/L."],
                "preventive": ["Grow barrier crops like 2-3 rows of maize around the chilli plot."]
            }
        ]
    },
    "Cucumber": {
        "category": "Vegetables",
        "botanical_name": "Cucumis sativus",
        "suitable_months": ["January", "February", "March", "June", "July"],
        "soils": ["Sandy Loam", "Rich Alluvial", "Loam"],
        "temp_range": [20.0, 34.0],
        "rainfall_range": [400, 700],
        "ph_range": [6.0, 7.0],
        "n_range": [70, 100],
        "p_range": [40, 60],
        "k_range": [40, 70],
        "duration_days": 60,
        "water_req": "Medium (400-550 mm)",
        "expected_yield_t_ha": 20.0,
        "yield_range": [12.0, 30.0],
        "description": "High-water content hydrating cucurbit vegetable cultivated for fresh crisp salad consumption.",
        "diseases": [
            {
                "name": "Downy Mildew (Pseudoperonospora cubensis)",
                "symptoms": "Angular chlorotic yellow lesions on upper leaf surface delimited by leaf veins; purplish-gray mildew on undersides.",
                "organic": ["Preventive spray of Bordeaux mixture (0.8%)."],
                "chemical": ["Metalaxyl + Mancozeb @ 2g/L or Fosetyl-Al @ 2g/L."],
                "preventive": ["Trellis cucumber vines to keep foliage off wet soil and maximize air circulation."]
            }
        ]
    },
    "Bottle Gourd (Lauki)": {
        "category": "Vegetables",
        "botanical_name": "Lagenaria siceraria",
        "suitable_months": ["January", "February", "June", "July"],
        "soils": ["Sandy Loam", "Alluvial", "Rich Loam"],
        "temp_range": [22.0, 35.0],
        "rainfall_range": [450, 750],
        "ph_range": [6.0, 7.5],
        "n_range": [60, 90],
        "p_range": [30, 50],
        "k_range": [30, 50],
        "duration_days": 75,
        "water_req": "Medium (400-600 mm)",
        "expected_yield_t_ha": 25.0,
        "yield_range": [15.0, 38.0],
        "description": "Vigorous trailing cucurbit producing cooling, dietary fiber-rich cylindrical green gourds.",
        "diseases": [
            {
                "name": "Gummy Stem Blight (Didymella bryoniae)",
                "symptoms": "Water-soaked lesions on stems exuding amber-colored gummy sap with black pycnidia.",
                "organic": ["Spray bio-agent Trichoderma @ 5g/L."],
                "chemical": ["Mancozeb 75% WP @ 2g/L or Thiophanate-methyl 70% WP @ 1g/L."],
                "preventive": ["Avoid mechanical injury to stems and ensure trellis wire support."]
            }
        ]
    },
    "Bitter Gourd (Karela)": {
        "category": "Vegetables",
        "botanical_name": "Momordica charantia",
        "suitable_months": ["January", "February", "June", "July"],
        "soils": ["Sandy Loam", "Alluvial", "Red Loam"],
        "temp_range": [24.0, 36.0],
        "rainfall_range": [450, 800],
        "ph_range": [6.0, 7.2],
        "n_range": [60, 90],
        "p_range": [40, 60],
        "k_range": [40, 60],
        "duration_days": 70,
        "water_req": "Medium (400-600 mm)",
        "expected_yield_t_ha": 15.0,
        "yield_range": [9.0, 22.0],
        "description": "Medicinal bitter vegetable packed with charantin, vicine, and polypeptide-p with proven blood sugar-lowering properties.",
        "diseases": [
            {
                "name": "Powdery Mildew (Podosphaera xanthii)",
                "symptoms": "White powdery talcum-like coating covering leaves and stems, causing premature defoliation.",
                "organic": ["Spray neem oil 1500ppm @ 4ml/L or wettable sulfur @ 2g/L."],
                "chemical": ["Hexaconazole 5% EC @ 1ml/L or Dinocap 48% EC @ 1ml/L."],
                "preventive": ["Prune lower crowded leaves to facilitate sunlight penetration."]
            }
        ]
    },
    "Spinach (Palak)": {
        "category": "Vegetables",
        "botanical_name": "Spinacia oleracea",
        "suitable_months": ["January", "February", "September", "October", "November"],
        "soils": ["Alluvial", "Clay Loam", "Sandy Loam"],
        "temp_range": [12.0, 24.0],
        "rainfall_range": [300, 550],
        "ph_range": [6.0, 7.5],
        "n_range": [50, 80],
        "p_range": [30, 50],
        "k_range": [30, 50],
        "duration_days": 40,
        "water_req": "Medium (300-450 mm)",
        "expected_yield_t_ha": 15.0,
        "yield_range": [9.0, 22.0],
        "description": "Nutritious fast-growing dark green leafy vegetable rich in dietary iron, folate, and lutein.",
        "diseases": [
            {
                "name": "Damping Off (Pythium spp.)",
                "symptoms": "Water-soaking of seedling stem at soil level leading to toppling and collapse.",
                "organic": ["Trichoderma viride seed treatment @ 5g/kg."],
                "chemical": ["Copper Oxychloride drenching @ 2.5g/L."],
                "preventive": ["Sow on raised beds and avoid excess seedbed irrigation."]
            }
        ]
    },

    # ==========================================
    # 5. FRUITS
    # ==========================================
    "Mango": {
        "category": "Fruits",
        "botanical_name": "Mangifera indica",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Deep Alluvial", "Red Loamy", "Lateritic"],
        "temp_range": [24.0, 38.0],
        "rainfall_range": [750, 1800],
        "ph_range": [5.5, 7.5],
        "n_range": [200, 400],
        "p_range": [100, 200],
        "k_range": [200, 400],
        "duration_days": 365,
        "water_req": "High (900-1400 mm)",
        "expected_yield_t_ha": 12.0,
        "yield_range": [6.0, 20.0],
        "description": "'King of Fruits' prized globally for delicious flavor, aromatic sweetness, and rich beta-carotene content.",
        "diseases": [
            {
                "name": "Powdery Mildew (Oidium mangiferae)",
                "symptoms": "White powdery fungal growth covering floral panicles and young fruitlets, causing heavy flower drop.",
                "organic": ["Sulfur dusting @ 25 kg/ha or spray wettable sulfur @ 2g/L before flowering."],
                "chemical": ["Hexaconazole 5% EC @ 1ml/L or Dinocap 48% EC @ 1ml/L."],
                "preventive": ["Maintain orchard sanitation and prune dead, dense interlocking branches."]
            },
            {
                "name": "Anthracnose (Colletotrichum gloeosporioides)",
                "symptoms": "Dark brown to black irregular lesions on young leaves, blossom blight, and sunken black tear-stain rot on maturing fruits.",
                "organic": ["Post-harvest hot water treatment of fruits at 52°C for 5 minutes."],
                "chemical": ["Carbendazim 50% WP @ 1g/L or Azoxystrobin 23% SC @ 1ml/L."],
                "preventive": ["Prune criss-cross branches to ensure adequate tree canopy aeration."]
            }
        ]
    },
    "Banana": {
        "category": "Fruits",
        "botanical_name": "Musa acuminata / paradisiaca",
        "suitable_months": ["January", "February", "June", "July", "October"],
        "soils": ["Deep Well-drained Loam", "Alluvial", "Clay Loam"],
        "temp_range": [20.0, 36.0],
        "rainfall_range": [1200, 2200],
        "ph_range": [6.0, 7.5],
        "n_range": [200, 300],
        "p_range": [50, 90],
        "k_range": [300, 450],
        "duration_days": 330,
        "water_req": "Very High (1500-2000 mm)",
        "expected_yield_t_ha": 45.0,
        "yield_range": [30.0, 70.0],
        "description": "High-energy commercial perennial giant herb requiring massive potassium nutrition and continuous soil moisture.",
        "diseases": [
            {
                "name": "Sigatoka Leaf Spot (Pseudocercospora musae)",
                "symptoms": "Yellow streaks turning into dark brown oval spots with light gray centers and dark halos, drying leaves prematurely.",
                "organic": ["De-leaf severely infected foliage and burn outside the orchard."],
                "chemical": ["Propiconazole 25% EC @ 1ml/L + mineral oil (1%) or Carbendazim @ 1g/L."],
                "preventive": ["Ensure rapid drainage and maintain recommended spacing (1.8m x 1.8m)."]
            },
            {
                "name": "Panama Wilt (Fusarium oxysporum f. sp. cubense TR4)",
                "symptoms": "Yellowing of lower leaves progressing upwards, petiole buckling, and longitudinal splitting of the pseudostem base.",
                "organic": ["Soil application of bio-agent Trichoderma viride with neem cake @ 250g/plant."],
                "chemical": ["Pseudostem injection of Carbendazim (2%)."],
                "preventive": ["Use certified tissue-culture disease-free plantlets and strictly sanitize farm tools."]
            }
        ]
    },
    "Apple": {
        "category": "Fruits",
        "botanical_name": "Malus domestica",
        "suitable_months": ["December", "January", "February"],
        "soils": ["Deep Well-Drained Loam", "Clay Loam"],
        "temp_range": [-5.0, 22.0],
        "rainfall_range": [800, 1300],
        "ph_range": [5.5, 6.8],
        "n_range": [70, 120],
        "p_range": [40, 70],
        "k_range": [80, 140],
        "duration_days": 365,
        "water_req": "Medium (750-1000 mm)",
        "expected_yield_t_ha": 15.0,
        "yield_range": [8.0, 24.0],
        "description": "Temperate pome fruit requiring 800-1200 chilling hours below 7°C for breaking bud dormancy.",
        "diseases": [
            {
                "name": "Apple Scab (Venturia inaequalis)",
                "symptoms": "Olive-green to velvety dark spots on leaves and corky, cracked scabby lesions on developing fruits.",
                "organic": ["Spray bio-agent Trichoderma at green tip stage.", "Collect and destroy fallen leaf litter in autumn."],
                "chemical": ["Dodine 65% WP @ 1g/L or Mancozeb 75% WP @ 2.5g/L at pink bud stage."],
                "preventive": ["Prune trees annually to keep open center canopies."]
            }
        ]
    },
    "Papaya": {
        "category": "Fruits",
        "botanical_name": "Carica papaya",
        "suitable_months": ["February", "March", "June", "July", "October"],
        "soils": ["Sandy Loam", "Alluvial", "Well-Drained Red Loam"],
        "temp_range": [22.0, 36.0],
        "rainfall_range": [1000, 1800],
        "ph_range": [6.0, 7.0],
        "n_range": [150, 250],
        "p_range": [150, 250],
        "k_range": [200, 350],
        "duration_days": 270,
        "water_req": "High (1000-1500 mm)",
        "expected_yield_t_ha": 60.0,
        "yield_range": [40.0, 90.0],
        "description": "Fast-yielding tropical fruit loaded with papain digestive enzyme, Vitamin A, and Vitamin C.",
        "diseases": [
            {
                "name": "Papaya Ringspot Virus (PRSV)",
                "symptoms": "Yellow mosaic mottling on leaves, shoestring leaf distortion, water-soaked oily streaks on petioles, and concentric rings on fruits.",
                "organic": ["Rogue out infected plants immediately.", "Spray neem oil 1500ppm @ 4ml/L."],
                "chemical": ["Dimethoate 30% EC @ 1.5ml/L to suppress aphid vector populations."],
                "preventive": ["Grow barrier crops like 3 rows of maize around the papaya plot."]
            }
        ]
    },
    "Pomegranate": {
        "category": "Fruits",
        "botanical_name": "Punica granatum",
        "suitable_months": ["January", "February", "June", "July"],
        "soils": ["Light Sandy Loam", "Red Loam", "Alluvial"],
        "temp_range": [20.0, 38.0],
        "rainfall_range": [500, 800],
        "ph_range": [6.5, 7.8],
        "n_range": [100, 160],
        "p_range": [50, 80],
        "k_range": [100, 160],
        "duration_days": 365,
        "water_req": "Medium (500-750 mm)",
        "expected_yield_t_ha": 14.0,
        "yield_range": [8.0, 22.0],
        "description": "High-value drought-tolerant fruit rich in punicalagins, punicanolic acid, and antioxidant polyphenols.",
        "diseases": [
            {
                "name": "Bacterial Blight / Telya (Xanthomonas axonopodis pv. punicae)",
                "symptoms": "Dark brown water-soaked angular spots on leaves, black cankers on twigs, and characteristic 'L' or 'Y' shaped oily fruit cracks.",
                "organic": ["Spray Bordeaux mixture (1%) or Copper Hydroxide @ 2g/L."],
                "chemical": ["Streptocycline @ 0.5g/L + Copper Oxychloride @ 2.5g/L."],
                "preventive": ["Prune and burn infected shoots immediately and paste cut ends with Bordeaux paste."]
            }
        ]
    },
    "Watermelon": {
        "category": "Fruits",
        "botanical_name": "Citrullus lanatus",
        "suitable_months": ["January", "February", "March"],
        "soils": ["Sandy Riverbed", "Sandy Loam", "Alluvial"],
        "temp_range": [24.0, 38.0],
        "rainfall_range": [400, 650],
        "ph_range": [6.0, 7.2],
        "n_range": [80, 120],
        "p_range": [50, 70],
        "k_range": [60, 100],
        "duration_days": 85,
        "water_req": "Medium (400-600 mm)",
        "expected_yield_t_ha": 35.0,
        "yield_range": [22.0, 50.0],
        "description": "Popular warm-season dessert fruit containing over 92% water and exceptionally high concentrations of lycopene.",
        "diseases": [
            {
                "name": "Fusarium Wilt (Fusarium oxysporum f. sp. niveum)",
                "symptoms": "Progressive yellowing and wilting of one or more runners, vascular browning inside stem.",
                "organic": ["Trichoderma viride soil enrichment in organic manure @ 5kg/acre."],
                "chemical": ["Carbendazim drenching @ 1g/L around root zone."],
                "preventive": ["Practice 4-year crop rotation and graft onto resistant bottle gourd rootstocks."]
            }
        ]
    },
    "Grapes": {
        "category": "Fruits",
        "botanical_name": "Vitis vinifera",
        "suitable_months": ["October", "November"],
        "soils": ["Sandy Loam", "Red Loam", "Alluvial"],
        "temp_range": [15.0, 35.0],
        "rainfall_range": [500, 850],
        "ph_range": [6.5, 7.8],
        "n_range": [100, 180],
        "p_range": [60, 100],
        "k_range": [150, 250],
        "duration_days": 365,
        "water_req": "Medium (500-750 mm)",
        "expected_yield_t_ha": 25.0,
        "yield_range": [15.0, 38.0],
        "description": "High-value commercial berry fruit grown on bower trellises for table fruit, raisins, and wine production.",
        "diseases": [
            {
                "name": "Downy Mildew (Plasmopara viticola)",
                "symptoms": "Translucent yellow 'oil spots' on upper leaf surface, dense white downy mildew on leaf undersides, and berry shriveling.",
                "organic": ["Bordeaux mixture (1%) preventive sprays at new shoot emergence."],
                "chemical": ["Dimethomorph 50% WP @ 1g/L or Kresoxim-methyl 44.3% SC @ 0.7ml/L."],
                "preventive": ["Prune lower canopy shoots and improve vine aeration."]
            }
        ]
    },
    "Guava": {
        "category": "Fruits",
        "botanical_name": "Psidium guajava",
        "suitable_months": ["June", "July", "August", "September"],
        "soils": ["Alluvial", "Clay Loam", "Sandy Loam"],
        "temp_range": [18.0, 35.0],
        "rainfall_range": [600, 1200],
        "ph_range": [5.5, 7.5],
        "n_range": [100, 180],
        "p_range": [40, 80],
        "k_range": [80, 140],
        "duration_days": 365,
        "water_req": "Medium (600-900 mm)",
        "expected_yield_t_ha": 18.0,
        "yield_range": [10.0, 26.0],
        "description": "Hardy 'Poor Man's Apple' containing 4 to 5 times more Vitamin C than fresh oranges.",
        "diseases": [
            {
                "name": "Guava Wilt (Fusarium oxysporum f. sp. psidii)",
                "symptoms": "Yellowing and browning of leaves, partial or complete wilting of branches, and vascular discoloration.",
                "organic": ["Apply bio-agent Trichoderma harzianum @ 100g/tree with neem cake."],
                "chemical": ["Carbendazim drenching @ 2g/L."],
                "preventive": ["Maintain good orchard drainage and avoid root injuries during inter-cultivation."]
            }
        ]
    },

    # ==========================================
    # 6. SPICES & HERBS
    # ==========================================
    "Turmeric": {
        "category": "Spices & Herbs",
        "botanical_name": "Curcuma longa",
        "suitable_months": ["May", "June", "July"],
        "soils": ["Well-Drained Loam", "Red Sandy Loam", "Clay Loam"],
        "temp_range": [20.0, 35.0],
        "rainfall_range": [1200, 2000],
        "ph_range": [6.0, 7.5],
        "n_range": [60, 120],
        "p_range": [40, 60],
        "k_range": [80, 120],
        "duration_days": 240,
        "water_req": "High (900-1300 mm)",
        "expected_yield_t_ha": 25.0,
        "yield_range": [15.0, 35.0],
        "description": "Sacred golden spice rich in curcumin, renowned globally for strong anti-inflammatory and antioxidant therapeutic properties.",
        "diseases": [
            {
                "name": "Rhizome Rot (Pythium aphanidermatum)",
                "symptoms": "Water-soaking at collar region, yellowing of lower leaves, and soft rotting of underground rhizomes with foul odor.",
                "organic": ["Rhizome seed treatment with Trichoderma viride @ 10g/kg.", "Apply neem cake @ 200 kg/acre."],
                "chemical": ["Metalaxyl-Mancozeb @ 2.5g/L rhizome dip and soil drenching."],
                "preventive": ["Provide high raised beds and prevent stagnant irrigation water."]
            }
        ]
    },
    "Ginger": {
        "category": "Spices & Herbs",
        "botanical_name": "Zingiber officinale",
        "suitable_months": ["April", "May", "June"],
        "soils": ["Rich Sandy Loam", "Clay Loam", "Red Loam"],
        "temp_range": [20.0, 32.0],
        "rainfall_range": [1500, 2500],
        "ph_range": [5.5, 6.8],
        "n_range": [75, 100],
        "p_range": [40, 60],
        "k_range": [50, 75],
        "duration_days": 240,
        "water_req": "High (1000-1500 mm)",
        "expected_yield_t_ha": 18.0,
        "yield_range": [10.0, 26.0],
        "description": "High-value pungent aromatic rhizome crop containing gingerol and zingerone used in culinary and pharma industries.",
        "diseases": [
            {
                "name": "Soft Rot / Rhizome Rot (Pythium myriotylum)",
                "symptoms": "Water-soaked lesions at collar region, yellowing and drying of shoots, soft decaying rhizomes.",
                "organic": ["Treat seed rhizomes with Trichoderma harzianum @ 10g/kg."],
                "chemical": ["Mancozeb 75% WP @ 3g/L or Ridomil Gold @ 2g/L soil drenching."],
                "preventive": ["Select well-drained slope lands and rotate with non-host crops."]
            }
        ]
    },
    "Black Pepper": {
        "category": "Spices & Herbs",
        "botanical_name": "Piper nigrum",
        "suitable_months": ["May", "June", "July"],
        "soils": ["Red Laterite", "Clay Loam", "Forest Humus"],
        "temp_range": [20.0, 35.0],
        "rainfall_range": [1800, 3000],
        "ph_range": [5.0, 6.5],
        "n_range": [100, 150],
        "p_range": [40, 60],
        "k_range": [120, 180],
        "duration_days": 365,
        "water_req": "Very High (1500-2200 mm)",
        "expected_yield_t_ha": 2.0,
        "yield_range": [1.0, 3.5],
        "description": "'Black Gold' - the undisputed King of Spices grown as an evergreen perennial vine trailing on living tree standards.",
        "diseases": [
            {
                "name": "Quick Wilt / Foot Rot (Phytophthora capsici)",
                "symptoms": "Black circular lesions on leaves, rotting of foot and roots leading to sudden vine collapse within a few days.",
                "organic": ["Soil application of Trichoderma viride @ 50g/vine enriched in compost."],
                "chemical": ["Bordeaux mixture (1%) foliar spray + Copper Oxychloride (0.2%) soil drench."],
                "preventive": ["Maintain clean drainage channels across plantation slopes during monsoon."]
            }
        ]
    },
    "Cardamom (Green)": {
        "category": "Spices & Herbs",
        "botanical_name": "Elettaria cardamomum",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Rich Forest Loam", "Lateritic Loam"],
        "temp_range": [15.0, 30.0],
        "rainfall_range": [1500, 3500],
        "ph_range": [4.5, 6.0],
        "n_range": [75, 120],
        "p_range": [50, 75],
        "k_range": [100, 150],
        "duration_days": 365,
        "water_req": "Very High (1500-2500 mm)",
        "expected_yield_t_ha": 0.5,
        "yield_range": [0.3, 0.9],
        "description": "'Queen of Spices' cultivated under evergreen canopy shade in the humid hill slopes of Western Ghats.",
        "diseases": [
            {
                "name": "Cardamom Katte / Mosaic Virus",
                "symptoms": "Continuous yellow chlorotic stripes on foliage, reduced tiller size, and severe clump degeneration.",
                "organic": ["Rogue out infected clumps and burn immediately."],
                "chemical": ["Dimethoate 30% EC @ 1.5ml/L to control banana aphid vectors."],
                "preventive": ["Use virus-free sucker planting materials from certified nurseries."]
            }
        ]
    },
    "Coriander (Dhania)": {
        "category": "Spices & Herbs",
        "botanical_name": "Coriandrum sativum",
        "suitable_months": ["October", "November"],
        "soils": ["Alluvial", "Clay Loam", "Red Loam"],
        "temp_range": [12.0, 26.0],
        "rainfall_range": [300, 550],
        "ph_range": [6.0, 7.5],
        "n_range": [40, 60],
        "p_range": [25, 40],
        "k_range": [20, 30],
        "duration_days": 90,
        "water_req": "Low-Medium (250-400 mm)",
        "expected_yield_t_ha": 1.5,
        "yield_range": [0.8, 2.2],
        "description": "Dual-purpose annual herb prized for its fresh aromatic leaves and sweet spice seed capsules.",
        "diseases": [
            {
                "name": "Stem Gall (Protomyces macrosporus)",
                "symptoms": "Tumor-like blister swellings on stems, leaf veins, and umbels, destroying seed viability.",
                "organic": ["Solar seed treatment and apply Trichoderma viride."],
                "chemical": ["Carbendazim 50% WP @ 2g/kg seed treatment; foliar spray @ 1g/L."],
                "preventive": ["Always use certified disease-free seeds and avoid excessive irrigation during flowering."]
            }
        ]
    },
    "Cumin (Jeera)": {
        "category": "Spices & Herbs",
        "botanical_name": "Cuminum cyminum",
        "suitable_months": ["November", "December"],
        "soils": ["Sandy Loam", "Alluvial", "Well-Drained Loam"],
        "temp_range": [10.0, 24.0],
        "rainfall_range": [200, 350],
        "ph_range": [6.5, 8.0],
        "n_range": [30, 50],
        "p_range": [20, 30],
        "k_range": [15, 25],
        "duration_days": 105,
        "water_req": "Low (150-250 mm)",
        "expected_yield_t_ha": 0.9,
        "yield_range": [0.5, 1.4],
        "description": "Delicate cool-season spice providing distinctive earthy cuminaldehyde aroma and aiding digestion.",
        "diseases": [
            {
                "name": "Cumin Blight (Alternaria burnsii)",
                "symptoms": "Dark brown necrotic spots on leaves and stems, turning entire plants black and blight-stricken.",
                "organic": ["Spray neem seed extract (5%) at initiation."],
                "chemical": ["Mancozeb 75% WP @ 2g/L or Iprodione 50% WP @ 1.5g/L."],
                "preventive": ["Avoid humid overcast weather irrigation and maintain clean seed stock."]
            }
        ]
    },

    # ==========================================
    # 7. COMMERCIAL, PLANTATION & FIBER CROPS
    # ==========================================
    "Cotton": {
        "category": "Commercial, Plantation & Fiber Crops",
        "botanical_name": "Gossypium hirsutum",
        "suitable_months": ["May", "June", "July"],
        "soils": ["Deep Black Cotton", "Alluvial", "Clay Loam"],
        "temp_range": [22.0, 38.0],
        "rainfall_range": [550, 950],
        "ph_range": [6.5, 8.0],
        "n_range": [90, 150],
        "p_range": [40, 70],
        "k_range": [40, 70],
        "duration_days": 160,
        "water_req": "Medium (600-800 mm)",
        "expected_yield_t_ha": 2.2,
        "yield_range": [1.2, 3.5],
        "description": "'White Gold' - leading natural textile fiber crop providing lint for clothing and cottonseed oil.",
        "diseases": [
            {
                "name": "Bacterial Blight / Angular Leaf Spot (Xanthomonas citri pv. malvacearum)",
                "symptoms": "Angular water-soaked lesions bounded by veins, black arm twig cankers, and circular rotting of bolls.",
                "organic": ["Spray fresh cow dung filtrate (5%) with copper."],
                "chemical": ["Copper Oxychloride 50% WP @ 2.5g/L + Streptocycline @ 0.1g/L of water."],
                "preventive": ["Acid delinting of cotton seed with concentrated sulfuric acid (100ml/kg seed)."]
            },
            {
                "name": "Cotton Leaf Curl Virus (CLCuV)",
                "symptoms": "Upward or downward leaf curling, vein thickening, and enations (leaf-like outgrowths) on leaf undersides.",
                "organic": ["Install yellow sticky traps @ 15/acre."],
                "chemical": ["Diafenthiuron 50% WP @ 1.2g/L or Flonicamid 50% WG @ 0.3g/L against whitefly vectors."],
                "preventive": ["Sow CLCuV-tolerant Bt cotton hybrids."]
            }
        ]
    },
    "Sugarcane": {
        "category": "Commercial, Plantation & Fiber Crops",
        "botanical_name": "Saccharum officinarum",
        "suitable_months": ["January", "February", "March", "October", "November"],
        "soils": ["Deep Heavy Clay", "Alluvial", "Black Loam"],
        "temp_range": [22.0, 38.0],
        "rainfall_range": [1200, 2000],
        "ph_range": [6.5, 8.0],
        "n_range": [150, 250],
        "p_range": [60, 100],
        "k_range": [80, 140],
        "duration_days": 365,
        "water_req": "Very High (1500-2200 mm)",
        "expected_yield_t_ha": 85.0,
        "yield_range": [55.0, 125.0],
        "description": "Massive sucrose-accumulating perennial C4 grass providing raw sugar, ethanol biofuel, and bagasse power.",
        "diseases": [
            {
                "name": "Red Rot (Colletotrichum falcatum)",
                "symptoms": "Third or fourth leaf drying from top, longitudinal splitting shows red pith tissues interrupted by white transverse bands and alcohol odor.",
                "organic": ["Hot water sett treatment at 52°C for 30 minutes with Trichoderma dip."],
                "chemical": ["Sett soaking in Carbendazim 50% WP @ 1g/L for 15 minutes before planting."],
                "preventive": ["Use certified disease-free tissue culture seed setts like Co-86032, Co-0238."]
            }
        ]
    },
    "Tea": {
        "category": "Commercial, Plantation & Fiber Crops",
        "botanical_name": "Camellia sinensis",
        "suitable_months": ["March", "April", "May", "June"],
        "soils": ["Acidic High-Humus Loam", "Red Forest Soil"],
        "temp_range": [15.0, 30.0],
        "rainfall_range": [1500, 3000],
        "ph_range": [4.5, 5.5],
        "n_range": [100, 160],
        "p_range": [40, 60],
        "k_range": [80, 120],
        "duration_days": 365,
        "water_req": "High (1200-1800 mm)",
        "expected_yield_t_ha": 2.5,
        "yield_range": [1.5, 3.8],
        "description": "Perennial evergreen plantation shrub yielding caffeine and antioxidant-rich theanine beverage flushes.",
        "diseases": [
            {
                "name": "Blister Blight (Exobasidium vexans)",
                "symptoms": "Translucent circular spots on young succulent tender leaves and buds, forming white blister depressions.",
                "organic": ["Spray bio-agent Pseudomonas fluorescens."],
                "chemical": ["Copper Oxychloride @ 2g/L + Hexaconazole @ 1ml/L at 7-10 day intervals during monsoon."],
                "preventive": ["Prune shade tree branches to allow direct sunlight penetration onto tea bushes."]
            }
        ]
    },
    "Coffee (Arabica & Robusta)": {
        "category": "Commercial, Plantation & Fiber Crops",
        "botanical_name": "Coffea arabica / C. canephora",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Deep Forest Humus", "Volcanic Red Loam"],
        "temp_range": [15.0, 28.0],
        "rainfall_range": [1500, 2500],
        "ph_range": [5.5, 6.5],
        "n_range": [100, 160],
        "p_range": [60, 90],
        "k_range": [100, 160],
        "duration_days": 365,
        "water_req": "High (1200-1800 mm)",
        "expected_yield_t_ha": 1.4,
        "yield_range": [0.8, 2.2],
        "description": "Shade-grown tropical hill plantation cash crop producing aromatic caffeinated beans for global markets.",
        "diseases": [
            {
                "name": "Coffee Leaf Rust (Hemileia vastatrix)",
                "symptoms": "Powdery orange-yellow spore spots on leaf undersides, leading to extensive leaf fall and twig dieback.",
                "organic": ["Bordeaux mixture (0.5%) pre-monsoon and post-monsoon preventive sprays."],
                "chemical": ["Triadimefon 25% WP @ 0.5g/L or Hexaconazole 5% EC @ 1ml/L."],
                "preventive": ["Maintain balanced shade tree canopy and grow rust-resistant selections like Chandragiri."]
            }
        ]
    },
    "Jute": {
        "category": "Commercial, Plantation & Fiber Crops",
        "botanical_name": "Corchorus olitorius / C. capsularis",
        "suitable_months": ["March", "April", "May"],
        "soils": ["Alluvial", "Clay Loam", "Deltaic Silt"],
        "temp_range": [24.0, 38.0],
        "rainfall_range": [1200, 2000],
        "ph_range": [6.0, 7.5],
        "n_range": [40, 80],
        "p_range": [20, 40],
        "k_range": [30, 50],
        "duration_days": 120,
        "water_req": "High (1000-1500 mm)",
        "expected_yield_t_ha": 3.0,
        "yield_range": [2.0, 4.2],
        "description": "'Golden Fiber' - eco-friendly, 100% biodegradable natural bast fiber used for hessian bags and ropes.",
        "diseases": [
            {
                "name": "Stem Rot (Macrophomina phaseolina)",
                "symptoms": "Brown necrotic spots on stems at ground level, shredding of bark, and premature defoliation.",
                "organic": ["Seed treatment with Trichoderma viride @ 5g/kg."],
                "chemical": ["Carbendazim 50% WP @ 2g/L or Mancozeb @ 2.5g/L."],
                "preventive": ["Ensure proper field drainage and apply recommended potash fertilizer."]
            }
        ]
    },
    "Cocoa": {
        "category": "Commercial, Plantation & Fiber Crops",
        "botanical_name": "Theobroma cacao",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Deep Loam", "Alluvial", "Clay Loam"],
        "temp_range": [20.0, 32.0],
        "rainfall_range": [1500, 2500],
        "ph_range": [6.0, 7.5],
        "n_range": [80, 120],
        "p_range": [40, 60],
        "k_range": [100, 140],
        "duration_days": 365,
        "water_req": "High (1200-1800 mm)",
        "expected_yield_t_ha": 1.2,
        "yield_range": [0.6, 1.8],
        "description": "Shade-loving intercrop grown in coconut and arecanut gardens providing cocoa butter and chocolate solids.",
        "diseases": [
            {
                "name": "Black Pod Rot (Phytophthora palmivora)",
                "symptoms": "Brown to chocolate-black rotting of developing pods covered with white sporangia in high humidity.",
                "organic": ["Spray Bordeaux mixture (1%) on pods before monsoon."],
                "chemical": ["Metalaxyl + Mancozeb @ 2g/L or Copper Oxychloride @ 2.5g/L."],
                "preventive": ["Harvest and bury infected mummified pods outside the plantation."]
            }
        ]
    },
    "Rubber (Natural)": {
        "category": "Commercial, Plantation & Fiber Crops",
        "botanical_name": "Hevea brasiliensis",
        "suitable_months": ["June", "July"],
        "soils": ["Deep Laterite", "Red Loamy"],
        "temp_range": [20.0, 34.0],
        "rainfall_range": [2000, 3500],
        "ph_range": [4.5, 6.0],
        "n_range": [30, 60],
        "p_range": [30, 60],
        "k_range": [30, 60],
        "duration_days": 365,
        "water_req": "Very High (1800-2800 mm)",
        "expected_yield_t_ha": 1.8,
        "yield_range": [1.0, 2.5],
        "description": "Major plantation tree tapped for liquid latex elastomer used in tires and industrial rubber goods.",
        "diseases": [
            {
                "name": "Abnormal Leaf Fall (Phytophthora meadii)",
                "symptoms": "Water-soaked lesions on petioles with droplets of coagulated latex, causing heavy premature leaf shed during monsoon.",
                "organic": ["Apply Bordeaux paste to tapping panel wounds."],
                "chemical": ["Aerial or high-pressure spray with Copper Oxychloride in oil suspension before monsoon."],
                "preventive": ["Maintain regular weed control and clear tree basins."]
            }
        ]
    },

    # ==========================================
    # 8. FLOWERS & ORNAMENTAL CROPS
    # ==========================================
    "Marigold": {
        "category": "Flowers & Ornamentals",
        "botanical_name": "Tagetes erecta / T. patula",
        "suitable_months": ["January", "February", "June", "July", "September", "October"],
        "soils": ["Sandy Loam", "Alluvial", "Well-Drained Loam"],
        "temp_range": [15.0, 30.0],
        "rainfall_range": [400, 750],
        "ph_range": [6.0, 7.5],
        "n_range": [80, 120],
        "p_range": [60, 90],
        "k_range": [60, 90],
        "duration_days": 80,
        "water_req": "Medium (350-500 mm)",
        "expected_yield_t_ha": 15.0,
        "yield_range": [10.0, 22.0],
        "description": "Vibrant festive flower rich in lutein carotenoids, also acting as a natural nematode-repelling trap crop.",
        "diseases": [
            {
                "name": "Marigold Leaf Spot (Alternaria tagetica)",
                "symptoms": "Minute brown circular spots expanding into large necrotic patches on leaves and florets.",
                "organic": ["Spray neem seed extract (5%) with bio-agent Pseudomonas."],
                "chemical": ["Mancozeb 75% WP @ 2g/L or Iprodione @ 1.5g/L."],
                "preventive": ["Avoid overhead wetting of flower blooms."]
            }
        ]
    },
    "Rose": {
        "category": "Flowers & Ornamentals",
        "botanical_name": "Rosa hybrida",
        "suitable_months": ["October", "November", "December"],
        "soils": ["Rich Sandy Loam", "Well-Drained Clay Loam"],
        "temp_range": [15.0, 28.0],
        "rainfall_range": [500, 900],
        "ph_range": [6.0, 7.0],
        "n_range": [100, 150],
        "p_range": [80, 120],
        "k_range": [100, 150],
        "duration_days": 365,
        "water_req": "Medium (500-750 mm)",
        "expected_yield_t_ha": 8.0,
        "yield_range": [4.0, 12.0],
        "description": "Premier ornamental cut-flower and essential oil crop celebrated for fragrance, beauty, and rosewater extraction.",
        "diseases": [
            {
                "name": "Black Spot (Diplocarpon rosae)",
                "symptoms": "Circular black spots with fringed margins on leaves, causing extensive yellowing and premature leaf fall.",
                "organic": ["Spray baking soda (5g/L) with horticultural oil (5ml/L)."],
                "chemical": ["Triforine 18.2% EC @ 1ml/L or Difenoconazole 25% EC @ 0.5ml/L."],
                "preventive": ["Prune dead stems and avoid wetting leaves during late evening hours."]
            }
        ]
    },
    "Jasmine (Mogra)": {
        "category": "Flowers & Ornamentals",
        "botanical_name": "Jasminum sambac",
        "suitable_months": ["June", "July", "August", "September"],
        "soils": ["Well-Drained Sandy Loam", "Red Loam"],
        "temp_range": [20.0, 35.0],
        "rainfall_range": [600, 1100],
        "ph_range": [6.0, 7.5],
        "n_range": [80, 120],
        "p_range": [60, 90],
        "k_range": [80, 120],
        "duration_days": 365,
        "water_req": "Medium (600-850 mm)",
        "expected_yield_t_ha": 7.0,
        "yield_range": [4.0, 10.0],
        "description": "Intensely fragrant white flower cultivated for religious garlands, perfumes, and cosmetic concretes.",
        "diseases": [
            {
                "name": "Jasmine Leaf Blight (Cercospora jasminicola)",
                "symptoms": "Reddish-brown circular spots on foliage with marginal chlorosis.",
                "organic": ["Spray neem oil 1500ppm @ 3ml/L."],
                "chemical": ["Mancozeb 75% WP @ 2g/L or Carbendazim @ 1g/L."],
                "preventive": ["Prune bushes after flowering season to promote vigorous healthy flush."]
            }
        ]
    },
    "Chrysanthemum": {
        "category": "Flowers & Ornamentals",
        "botanical_name": "Chrysanthemum morifolium",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Well-Drained Loam", "Sandy Loam"],
        "temp_range": [15.0, 26.0],
        "rainfall_range": [400, 700],
        "ph_range": [6.0, 7.0],
        "n_range": [80, 120],
        "p_range": [60, 80],
        "k_range": [60, 100],
        "duration_days": 110,
        "water_req": "Medium (400-600 mm)",
        "expected_yield_t_ha": 12.0,
        "yield_range": [8.0, 18.0],
        "description": "Popular winter-blooming cut flower and loose garland crop exhibiting spectacular diverse floral colors.",
        "diseases": [
            {
                "name": "Chrysanthemum Rust (Puccinia chrysanthemi)",
                "symptoms": "Small blister-like pustules releasing dark chocolate-brown spores on leaf undersides.",
                "organic": ["Foliar spray with Trichoderma viride."],
                "chemical": ["Propiconazole 25% EC @ 1ml/L or Wettable Sulfur @ 2g/L."],
                "preventive": ["Maintain wider plant spacing to allow fast canopy drying."]
            }
        ]
    },

    # ==========================================
    # 9. MEDICINAL & AROMATIC PLANTS
    # ==========================================
    "Aloe Vera": {
        "category": "Medicinal & Aromatic",
        "botanical_name": "Aloe barbadensis miller",
        "suitable_months": ["February", "March", "June", "July", "August", "September"],
        "soils": ["Sandy Loam", "Marginal Soil", "Gravelly Loam"],
        "temp_range": [20.0, 42.0],
        "rainfall_range": [250, 600],
        "ph_range": [6.5, 8.5],
        "n_range": [30, 50],
        "p_range": [20, 35],
        "k_range": [20, 35],
        "duration_days": 365,
        "water_req": "Very Low (200-350 mm)",
        "expected_yield_t_ha": 30.0,
        "yield_range": [18.0, 45.0],
        "description": "Succulent xerophytic perennial yielding soothing gel packed with polysaccharides and aloin for skincare and healthcare.",
        "diseases": [
            {
                "name": "Aloe Rust (Uromyces aloes)",
                "symptoms": "Hard, dark brown to black round spots on fleshy leaves with yellow halos.",
                "organic": ["Prune and incinerate affected outer leaf blades."],
                "chemical": ["Mancozeb 75% WP @ 2g/L."],
                "preventive": ["Avoid over-irrigation and planting in heavy waterlogged soils."]
            }
        ]
    },
    "Ashwagandha (Indian Ginseng)": {
        "category": "Medicinal & Aromatic",
        "botanical_name": "Withania somnifera",
        "suitable_months": ["July", "August", "September"],
        "soils": ["Sandy Loam", "Light Red Loam", "Marginal Soil"],
        "temp_range": [20.0, 36.0],
        "rainfall_range": [350, 650],
        "ph_range": [6.5, 8.0],
        "n_range": [30, 50],
        "p_range": [25, 40],
        "k_range": [20, 35],
        "duration_days": 160,
        "water_req": "Low (250-400 mm)",
        "expected_yield_t_ha": 1.0,
        "yield_range": [0.6, 1.5],
        "description": "Renowned Ayurvedic adaptogenic herb whose roots are rich in withanolides that boost vitality and stress resilience.",
        "diseases": [
            {
                "name": "Seedling Blight & Leaf Spot (Alternaria alternata)",
                "symptoms": "Small brown necrotic spots on foliage, leading to premature leaf shedding and root rot.",
                "organic": ["Seed treatment with Trichoderma harzianum @ 5g/kg."],
                "chemical": ["Mancozeb 75% WP @ 2g/L."],
                "preventive": ["Sow in well-drained raised beds during the monsoon."]
            }
        ]
    },
    "Tulsi (Holy Basil)": {
        "category": "Medicinal & Aromatic",
        "botanical_name": "Ocimum sanctum",
        "suitable_months": ["February", "March", "June", "July"],
        "soils": ["Loamy", "Alluvial", "Red Loam"],
        "temp_range": [20.0, 35.0],
        "rainfall_range": [500, 1000],
        "ph_range": [5.5, 7.5],
        "n_range": [40, 60],
        "p_range": [25, 40],
        "k_range": [25, 40],
        "duration_days": 90,
        "water_req": "Medium (400-600 mm)",
        "expected_yield_t_ha": 8.0,
        "yield_range": [5.0, 12.0],
        "description": "Venerated medicinal aromatic herb rich in eugenol and rosmarinic acid with potent antiviral and immunity benefits.",
        "diseases": [
            {
                "name": "Basil Downy Mildew (Peronospora belbahrii)",
                "symptoms": "Yellowing of leaf surface between veins, grayish-purple downy mold on leaf undersides.",
                "organic": ["Spray neem oil 1500ppm @ 3ml/L."],
                "chemical": ["Copper Oxychloride @ 2g/L."],
                "preventive": ["Maintain low humidity by spacing plants adequately."]
            }
        ]
    },
    "Lemongrass": {
        "category": "Medicinal & Aromatic",
        "botanical_name": "Cymbopogon flexuosus",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Sandy Loam", "Marginal Soil", "Red Loam"],
        "temp_range": [20.0, 38.0],
        "rainfall_range": [800, 2000],
        "ph_range": [5.5, 7.5],
        "n_range": [60, 100],
        "p_range": [30, 50],
        "k_range": [30, 50],
        "duration_days": 365,
        "water_req": "Low-Medium (500-800 mm)",
        "expected_yield_t_ha": 25.0,
        "yield_range": [15.0, 35.0],
        "description": "Perennial aromatic grass yielding citral essential oil used in pharmaceuticals, fragrances, and herbal teas.",
        "diseases": [
            {
                "name": "Lemongrass Rust (Puccinia nakanishikii)",
                "symptoms": "Linear brownish pustules on leaf blades causing drying of leaf tips.",
                "organic": ["Harvest the crop at early rust appearance."],
                "chemical": ["Mancozeb 75% WP @ 2g/L."],
                "preventive": ["Burn dry stubble after harvest to eliminate overwintering spores."]
            }
        ]
    },
    "Neem": {
        "category": "Medicinal & Aromatic",
        "botanical_name": "Azadirachta indica",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Sandy Loam", "Clay Loam", "Gravelly Soil"],
        "temp_range": [18.0, 45.0],
        "rainfall_range": [300, 1000],
        "ph_range": [6.0, 8.5],
        "n_range": [20, 40],
        "p_range": [15, 30],
        "k_range": [15, 30],
        "duration_days": 365,
        "water_req": "Low (200-500 mm)",
        "expected_yield_t_ha": 3.0,
        "yield_range": [1.5, 5.0],
        "description": "Legendary 'Village Pharmacy' tree yielding azadirachtin-rich seeds for bio-pesticides, oil, and organic cake.",
        "diseases": [
            {
                "name": "Neem Leaf Web Blight (Rhizoctonia solani)",
                "symptoms": "Water-soaked spots turning grayish-brown, leaves bound together by fungal mycelial webs.",
                "organic": ["Prune affected twigs and spray Trichoderma viride."],
                "chemical": ["Carbendazim 50% WP @ 1g/L."],
                "preventive": ["Ensure adequate tree spacing and canopy sunlight."]
            }
        ]
    },

    # ==========================================
    # 10. FODDER & FORAGE CROPS
    # ==========================================
    "Alfalfa (Lucerne)": {
        "category": "Fodder & Forage",
        "botanical_name": "Medicago sativa",
        "suitable_months": ["October", "November"],
        "soils": ["Well-Drained Loam", "Alluvial", "Clay Loam"],
        "temp_range": [12.0, 30.0],
        "rainfall_range": [400, 800],
        "ph_range": [6.5, 7.8],
        "n_range": [20, 30],
        "p_range": [50, 80],
        "k_range": [40, 60],
        "duration_days": 365,
        "water_req": "High (800-1200 mm)",
        "expected_yield_t_ha": 70.0,
        "yield_range": [45.0, 95.0],
        "description": "'Queen of Forages' - multi-cut protein-rich perennial legume delivering 7 to 9 nutritious green harvests per year.",
        "diseases": [
            {
                "name": "Common Leaf Spot (Pseudopeziza medicaginis)",
                "symptoms": "Small, circular dark brown spots with raised centers on leaflets, causing leaf shedding.",
                "organic": ["Cut forage early before significant leaf drop occurs."],
                "chemical": ["Mancozeb 75% WP @ 2g/L after harvest."],
                "preventive": ["Maintain adequate soil potassium and phosphorus levels."]
            }
        ]
    },
    "Hybrid Napier Grass": {
        "category": "Fodder & Forage",
        "botanical_name": "Pennisetum purpureum x P. glaucum",
        "suitable_months": ["February", "March", "June", "July", "August"],
        "soils": ["Rich Sandy Loam", "Clay Loam", "Alluvial"],
        "temp_range": [20.0, 38.0],
        "rainfall_range": [600, 1200],
        "ph_range": [6.0, 7.5],
        "n_range": [120, 180],
        "p_range": [40, 60],
        "k_range": [40, 60],
        "duration_days": 365,
        "water_req": "High (1000-1500 mm)",
        "expected_yield_t_ha": 180.0,
        "yield_range": [120.0, 250.0],
        "description": "High-biomass multi-cut perennial fodder grass producing succulent, palatable green forage every 45 days.",
        "diseases": [
            {
                "name": "Helminthosporium Leaf Blight (Bipolaris sacchari)",
                "symptoms": "Oval reddish-brown lesions with yellowish halos on leaves.",
                "organic": ["Harvest clumps close to ground to stimulate fresh healthy regrowth."],
                "chemical": ["Mancozeb 75% WP @ 2g/L."],
                "preventive": ["Ensure balanced fertilizer application and avoid over-mature harvests."]
            }
        ]
    },
    "Berseem (Egyptian Clover)": {
        "category": "Fodder & Forage",
        "botanical_name": "Trifolium alexandrinum",
        "suitable_months": ["October", "November"],
        "soils": ["Clay Loam", "Alluvial", "Heavy Loam"],
        "temp_range": [12.0, 25.0],
        "rainfall_range": [400, 700],
        "ph_range": [6.5, 8.0],
        "n_range": [20, 30],
        "p_range": [60, 90],
        "k_range": [30, 50],
        "duration_days": 160,
        "water_req": "High (700-1000 mm)",
        "expected_yield_t_ha": 65.0,
        "yield_range": [40.0, 85.0],
        "description": "King of Winter Forages providing 4-6 multi-cut flushes of succulent, milk-boosting dairy green fodder.",
        "diseases": [
            {
                "name": "Stem Rot (Sclerotinia sclerotiorum)",
                "symptoms": "Cottony white mold at stem base with hard black sclerotial bodies, causing patch wilting.",
                "organic": ["Deep summer plowing to bury sclerotia.", "Apply Trichoderma enriched compost."],
                "chemical": ["Carbendazim 50% WP @ 1g/L spray."],
                "preventive": ["Avoid excessive late-season irrigation."]
            }
        ]
    },

    # ==========================================
    # 11. AGROFORESTRY & TREE CROPS
    # ==========================================
    "Teak": {
        "category": "Agroforestry & Trees",
        "botanical_name": "Tectona grandis",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Deep Well-Drained Alluvial", "Red Loam"],
        "temp_range": [18.0, 42.0],
        "rainfall_range": [1200, 2500],
        "ph_range": [6.5, 7.5],
        "n_range": [50, 100],
        "p_range": [25, 50],
        "k_range": [25, 50],
        "duration_days": 365,
        "water_req": "Medium (900-1400 mm)",
        "expected_yield_t_ha": 15.0,
        "yield_range": [8.0, 22.0],
        "description": "World's most valuable tropical hardwood timber tree renowned for grain beauty, natural oil resistance, and immense durability.",
        "diseases": [
            {
                "name": "Teak Leaf Rust (Olivea tectonae)",
                "symptoms": "Yellowish-brown powdery pustules covering leaf undersides, leading to premature leaf shedding.",
                "organic": ["Foliar spray with bio-agents and clear dry leaf litter."],
                "chemical": ["Mancozeb 75% WP @ 2g/L or Hexaconazole @ 1ml/L."],
                "preventive": ["Maintain wide plantation spacing (3m x 3m) for good canopy airflow."]
            }
        ]
    },
    "Bamboo": {
        "category": "Agroforestry & Trees",
        "botanical_name": "Bambusa balcooa / Dendrocalamus strictus",
        "suitable_months": ["June", "July", "August", "September"],
        "soils": ["Sandy Loam", "Alluvial", "Clay Loam"],
        "temp_range": [15.0, 40.0],
        "rainfall_range": [1000, 2500],
        "ph_range": [5.5, 7.5],
        "n_range": [60, 120],
        "p_range": [30, 60],
        "k_range": [40, 80],
        "duration_days": 365,
        "water_req": "Medium-High (800-1500 mm)",
        "expected_yield_t_ha": 30.0,
        "yield_range": [18.0, 45.0],
        "description": "'Green Gold' - ultra-fast growing woody grass providing timber, paper pulp, handicraft material, and edible shoots.",
        "diseases": [
            {
                "name": "Bamboo Blight (Sarocladium oryzae)",
                "symptoms": "Premature drying and death of young emerging culms during the monsoon season.",
                "organic": ["Clear dead diseased culms from the clump base before monsoon."],
                "chemical": ["Drench clump base with Copper Oxychloride 50% WP @ 3g/L."],
                "preventive": ["Ensure proper spacing and mound soil around clump bases."]
            }
        ]
    },
    "Sandalwood": {
        "category": "Agroforestry & Trees",
        "botanical_name": "Santalum album",
        "suitable_months": ["June", "July", "August"],
        "soils": ["Red Loamy", "Sandy Clay Loam", "Gravelly Soil"],
        "temp_range": [15.0, 38.0],
        "rainfall_range": [600, 1400],
        "ph_range": [6.0, 7.5],
        "n_range": [30, 50],
        "p_range": [20, 40],
        "k_range": [20, 40],
        "duration_days": 365,
        "water_req": "Low-Medium (500-800 mm)",
        "expected_yield_t_ha": 4.0,
        "yield_range": [2.0, 7.0],
        "description": "High-value semi-parasitic fragrant timber tree prized for precious santalol-rich heartwood and essential oil.",
        "diseases": [
            {
                "name": "Sandal Spike Disease (Phytoplasma)",
                "symptoms": "Severe reduction in leaf size, leaves become erect like spikes, complete loss of flowering and eventual death.",
                "organic": ["Rogue out spike-affected trees to prevent insect vector transmission."],
                "chemical": ["Tetracycline antibiotic stem injection."],
                "preventive": ["Plant healthy secondary hosts (e.g., Casuarina, Crotalaria) and maintain plantation isolation."]
            }
        ]
    }
}

# Helper lookups
def get_all_crop_names() -> List[str]:
    return list(COMPREHENSIVE_CROP_DATABASE.keys())

def get_all_categories() -> List[str]:
    categories = set()
    for meta in COMPREHENSIVE_CROP_DATABASE.values():
        categories.add(meta["category"])
    return sorted(list(categories))

def get_crops_by_category(category: str) -> List[str]:
    return [
        name for name, meta in COMPREHENSIVE_CROP_DATABASE.items()
        if meta.get("category", "").lower() == category.lower()
    ]

def get_crops_by_month(month: str) -> List[str]:
    return [
        name for name, meta in COMPREHENSIVE_CROP_DATABASE.items()
        if month in meta.get("suitable_months", [])
    ]
