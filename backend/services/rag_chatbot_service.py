import os
import re
import logging
from dotenv import load_dotenv
import httpx
from typing import Dict, Any, Optional, List, Tuple

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "")

# ----------------------------------------------------
# 1. COMPREHENSIVE MULTILINGUAL AGRICULTURAL KNOWLEDGE BASE
# ----------------------------------------------------
KNOWLEDGE_BASE = [
    {
        "category": "disease",
        "title": "Tomato Early & Late Blight & Leaf Curl Management",
        "keywords": ["tomato", "blight", "spots", "fungus", "mancozeb", "leaves", "yellow", "black spots", "leaf curl", "ಟೊಮೆಟೊ", "ಚುಕ್ಕೆ", "ತೊಗಲು", "ರೋಗ", "ಎಲೆ", "ಟೊಮೋಟೊ", "ಮುರುಟು", "ಹುಳು", "ಹಳದಿ", "टमाटर", "झुलसा", "தக்காளி", "టమోటా", "টমেটো", "टोमॅटो", "ટમેટા", "ਟਮਾਟਰ", "ଟମାଟୋ", "টমেটো", "ٹماٹر"],
        "content_en": "Tomato Early Blight (Alternaria solani) causes concentric brown-black target spots on lower leaves. Treatment: Spray Mancozeb 75% WP @ 2g/L or Chlorothalonil 75% WP @ 2g/L or Copper Oxychloride @ 2.5g/L. Organic: Spray Neem Oil (Azadirachtin 10,000 ppm) @ 3-5ml/L or Trichoderma harzianum @ 5g/L. For Leaf Curl (whitefly vector), spray Diafenthiuron 50% WP @ 1g/L or install yellow sticky traps @ 10/acre. Avoid overhead watering and remove infected bottom leaves.",
        "content_kn": "ಟೊಮೆಟೊ ಎಲೆ ಚುಕ್ಕೆ ಮತ್ತು ಬ್ಲೈಟ್ ರೋಗಕ್ಕೆ ಲೀಟರ್ ನೀರಿಗೆ ೨ ಗ್ರಾಂ ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP ಅಥವಾ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ೨.೫ ಗ್ರಾಂ ಸಿಂಪಡಿಸಿ. ಎಲೆ ಮುರುಟು ರೋಗಕ್ಕೆ ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣಕ್ಕಾಗಿ ಹಳದಿ ಜಿಗುಟು ಬಲೆಗಳನ್ನು ಎಕರೆಗೆ ೧೦ ಅಳವಡಿಸಿ ಹಾಗೂ ಡಯಾಫೆಂಥಿಯುರಾನ್ ೧ ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ. ಸಾವಯವ ಪರಿಹಾರವಾಗಿ ೫ ಮಿಲಿ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.",
        "content_hi": "टमाटर के अगेती/पछेती झुलसा रोग (Blight) के लिए 2 ग्राम मैंकोज़ेब 75% WP प्रति लीटर पानी में या कॉपर ऑक्सीक्लोराइड 2.5 ग्राम/लीटर का छिड़काव करें। जैविक उपाय: 5ml नीम का तेल प्रति लीटर पानी में मिलाकर स्प्रे करें।"
    },
    {
        "category": "disease",
        "title": "Paddy / Rice Blast & Stem Borer Management",
        "keywords": ["paddy", "rice", "blast", "stem borer", "dead heart", "sheath blight", "bph", "ಭತ್ತ", "ಬೆಂಕಿ ರೋಗ", "ಕಾಂಡ ಕೊರೆಯುವ", "ನೆಲ್ಲು", "ತೆನೆ", "ಸುಳಿ", "ಸೊರಗು", "धान", "भत्ता", "వరి", "அரிசி", "ধান", "भात", "ડાંગર", "ਝੋਨਾ", "ଚାଉଳ", "ধান", "چاول"],
        "content_en": "Rice Blast creates spindle-shaped lesions with grey centers. Treatment: Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L. For Yellow Stem Borer (dead hearts), apply Chlorantraniliprole 18.5% SC @ 0.3ml/L or Cartap Hydrochloride 4G granules @ 10kg/acre. Biological: Install Pheromone traps @ 8/acre and Trichogramma egg cards.",
        "content_kn": "ಭತ್ತದ ಬೆಂಕಿರೋಗಕ್ಕೆ ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ ೭೫% ಡಬ್ಲ್ಯೂಪಿ ೦.೬ ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ. ಕಾಂಡ ಕೊರೆಯುವ ಹುಳುಗೆ ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ ೦.೩ ಮಿಲಿ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ ಅಥವಾ ಎಕರೆಗೆ ೮ ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
        "content_hi": "धान के झुलसा (Blast) रोग के लिए ट्राईसाइक्लाज़ोल 0.6 ग्राम/लीटर छिड़कें। तना छेदक (Stem Borer) के लिए क्लोरेंट्रानिलीप्रोल 0.3 मिली/लीटर या फेरोमोन ट्रैप (8 प्रति एकड़) लगाएं।"
    },
    {
        "category": "disease",
        "title": "Arecanut / Coconut Koleroga & Bud Rot Management",
        "keywords": ["arecanut", "coconut", "koleroga", "mahali", "bud rot", "nut drop", "adike", "thengu", "tengu", "ಅಡಿಕೆ", "ತೆಂಗು", "ಕೊಳೆರೋಗ", "ಮಹಾಳಿ", "ಹಿಂಗಾರ", "ಕಾಯಿ ಉದುರುವಿಕೆ", "ಸುಳಿ ಕೊಳೆ", "ಸುಪಾರಿ", "ನಾರಿಕೇಳ", "सुपारी", "नारियल", "కొబ్బరి", "పోక", "தேங்காய்", "பாக்கு", "নারকেল", "ਸੁਪਾਰੀ", "ନଡ଼ିଆ"],
        "content_en": "Arecanut Koleroga / Mahali causes rotting and shedding of nuts during monsoon. Treatment: Prophylactic spraying of 1% Bordeaux mixture (1kg Copper Sulphate + 1kg Lime in 100L water) or Metalaxyl-Mancozeb @ 2g/L before onset of monsoon. Polythene covering of bunches helps in heavy rain zones.",
        "content_kn": "ಅಡಿಕೆ ಮಹಾಳಿ / ಕೊಳೆರೋಗಕ್ಕೆ ಮುಂಗಾರು ಮಳೆ ಆರಂಭಕ್ಕೂ ಮುನ್ನ ಶೇ. ೧ ರ ಬೋರ್ಡೋ ಮಿಶ್ರಣವನ್ನು ಹಿಂಗಾರ ಹಾಗೂ ಗೊಂಚಲುಗಳಿಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಸಿಂಪಡಿಸಿ. ಮೆಟಾಲಾಕ್ಸಿಲ್ + ಮ್ಯಾಂಕೋಜೆಬ್ ೨ ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        "content_hi": "सुपारी और नारियल में कोलोरोग (महाली) के लिए मानसून से पहले 1% बोर्डो मिश्रण का छिड़काव करें या रिडोमिल 2 ग्राम/लीटर का स्प्रे करें।"
    },
    {
        "category": "crop_nutrients",
        "title": "Soil Nutrients & Balanced NPK Fertilization",
        "keywords": ["npk", "nitrogen", "phosphorus", "potassium", "fertilizer", "soil", "urea", "dap", "micronutrients", "zinc", "boron", "ಗೊಬ್ಬರ", "ರಸಗೊಬ್ಬರ", "ಯೂರಿಯಾ", "ರಂಜಕ", "ಪೊಟ್ಯಾಷ್", "ಮಣ್ಣು", "ಜಿಂಕ್", "ಬೋರಾನ್", "खाद", "उर्वरक", "ఎరువులు", "உரம்", "সার", "खत", "ખાતર", "ਖਾਦ", "ଖତ"],
        "content_en": "Balanced NPK application is vital: Nitrogen (N) for vegetative growth; Phosphorus (P) for root development; Potassium (K) for disease resistance. Standard dosage: 120:60:40 kg/ha. Apply Nitrogen in 3 splits. Supplement micronutrients like Zinc Sulphate (10kg/acre) and Borax (2kg/acre).",
        "content_kn": "ಬೆಳೆಗಳಿಗೆ ಸಮತೋಲಿತ NPK ಗೊಬ್ಬರ ೧೨೦:೬೦:೪೦ ಕೆಜಿ/ಹೆಕ್ಟೇರ್ ಪ್ರಮಾಣದಲ್ಲಿ ಒದಗಿಸಿ. ಯೂರಿಯಾವನ್ನು ೩ ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ. ಜಿಂಕ್ ಸಲ್ಫೇಟ್ ಮತ್ತು ಬೋರಾನ್ ಕೊರತೆ ನೀಗಿಸಿ.",
        "content_hi": "फसलों को संतुलित NPK 120:60:40 किग्रा/हेक्टेयर दें। यूरिया को 3 भागों में बांटकर डालें और जिंक सल्फेट का प्रयोग करें।"
    },
    {
        "category": "schemes",
        "title": "Central & State Government Agricultural Schemes",
        "keywords": ["pm-kisan", "pmfby", "scheme", "subsidy", "insurance", "kcc", "raitha siri", "krishi bhagya", "kusum", "ಯೋಜನೆ", "ಪಿಎಂ ಕಿಸಾನ್", "ಸಹಾಯಧನ", "ವಿಮೆ", "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್", "ಸಾಲ", "योजना", "सब्सिडी", "बीमा", "పథకాలు", "திட்டங்கள்", "প্রকল্প", "योजना", "યોજનાઓ", "ਸਕੀਮਾਂ", "ଯୋଜନା", "اسکیمیں"],
        "content_en": "Key Farmer Schemes: 1) PM-KISAN: ₹6,000/year direct financial support in 3 installments. 2) PMFBY: Crop insurance (2% Kharif, 1.5% Rabi). 3) KCC: Crop loans up to ₹3 Lakh at 4% subsidized interest rate. 4) PMKSY: Up to 55-90% subsidy for drip and sprinkler irrigation.",
        "content_kn": "ಪ್ರಮುಖ ಯೋಜನೆಗಳು: ಪಿಎಂ-ಕಿಸಾನ್ ₹೬,೦೦೦ ನೆರವು, ಪಿಎಂ ಫಸಲ್ ಬಿಮಾ ಬೆಳೆ ವಿಮೆ, ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ೪% ಬಡ್ಡಿದರದಲ್ಲಿ ₹೩ ಲಕ್ಷ ಸಾಲ, ಹನಿ ನೀರಾವರಿಗೆ ೯೦% ಸಬ್ಸಿಡಿ.",
        "content_hi": "प्रमुख किसान योजनाएं: पीएम-किसान (₹6,000 सालाना), पीएम फसल बीमा (PMFBY), किसान क्रेडिट कार्ड (4% ब्याज दर पर ₹3 लाख ऋण), ड्रिप सिंचाई पर सब्सिडी।"
    }
]

# ----------------------------------------------------
# 2. UNIVERSAL AUTOMATIC LANGUAGE & SCRIPT DETECTOR (13+ LANGUAGES)
# ----------------------------------------------------
LANGUAGE_DEFINITIONS = {
    "kn": {"name": "Kannada (ಕನ್ನಡ)", "tag": "kn-IN", "script_re": r'[\u0C80-\u0CFF]'},
    "hi": {"name": "Hindi (हिंदी)", "tag": "hi-IN", "script_re": r'[\u0900-\u097F]'},
    "te": {"name": "Telugu (తెలుగు)", "tag": "te-IN", "script_re": r'[\u0C00-\u0C7F]'},
    "ta": {"name": "Tamil (தமிழ்)", "tag": "ta-IN", "script_re": r'[\u0B80-\u0BFF]'},
    "mr": {"name": "Marathi (मराठी)", "tag": "mr-IN", "script_re": r'[\u0900-\u097F]'},
    "bn": {"name": "Bengali (বাংলা)", "tag": "bn-IN", "script_re": r'[\u0980-\u09FF]'},
    "ml": {"name": "Malayalam (മലയാളം)", "tag": "ml-IN", "script_re": r'[\u0D00-\u0D7F]'},
    "gu": {"name": "Gujarati (ગુજરાતી)", "tag": "gu-IN", "script_re": r'[\u0A80-\u0AFF]'},
    "pa": {"name": "Punjabi (ਪੰਜਾਬੀ)", "tag": "pa-IN", "script_re": r'[\u0A00-\u0A7F]'},
    "or": {"name": "Odia (ଓଡ଼ିଆ)", "tag": "or-IN", "script_re": r'[\u0B00-\u0B7F]'},
    "as": {"name": "Assamese (অসমীয়া)", "tag": "as-IN", "script_re": r'[\u0980-\u09FF]'},
    "ur": {"name": "Urdu (اردو)", "tag": "ur-IN", "script_re": r'[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]'},
    "en": {"name": "English", "tag": "en-IN", "script_re": r'[a-zA-Z]'}
}

def detect_language(text: str) -> Tuple[str, str, str]:
    """
    Detects user input language and script across 13 Indian languages + transliterated code-mixed dialects.
    Returns (lang_code, language_display, speech_lang_tag)
    """
    if not text or not text.strip():
        return ("en", "English", "en-IN")

    clean_text = text.strip()
    text_lower = clean_text.lower()

    # 1. Native Script Checks (Unicode Ranges)
    # Kannada: 0C80 - 0CFF
    if len(re.findall(r'[\u0C80-\u0CFF]', clean_text)) > 0:
        return ("kn", "Kannada (ಕನ್ನಡ)", "kn-IN")

    # Telugu: 0C00 - 0C7F
    if len(re.findall(r'[\u0C00-\u0C7F]', clean_text)) > 0:
        return ("te", "Telugu (తెలుగు)", "te-IN")

    # Tamil: 0B80 - 0BFF
    if len(re.findall(r'[\u0B80-\u0BFF]', clean_text)) > 0:
        return ("ta", "Tamil (தமிழ்)", "ta-IN")

    # Malayalam: 0D00 - 0D7F
    if len(re.findall(r'[\u0D00-\u0D7F]', clean_text)) > 0:
        return ("ml", "Malayalam (മലയാളം)", "ml-IN")

    # Gujarati: 0A80 - 0AFF
    if len(re.findall(r'[\u0A80-\u0AFF]', clean_text)) > 0:
        return ("gu", "Gujarati (ગુજરાતી)", "gu-IN")

    # Punjabi / Gurmukhi: 0A00 - 0A7F
    if len(re.findall(r'[\u0A00-\u0A7F]', clean_text)) > 0:
        return ("pa", "Punjabi (ਪੰਜਾਬੀ)", "pa-IN")

    # Odia: 0B00 - 0B7F
    if len(re.findall(r'[\u0B00-\u0B7F]', clean_text)) > 0:
        return ("or", "Odia (ଓଡ଼ିଆ)", "or-IN")

    # Bengali & Assamese: 0980 - 09FF
    if len(re.findall(r'[\u0980-\u09FF]', clean_text)) > 0:
        if 'ৰ' in clean_text or 'ৱ' in clean_text or any(w in clean_text for w in ["খেতি", "কৃষি", "সাৰ", "পানী", "কৰিব", "লাগে", "ধানৰ"]):
            return ("as", "Assamese (অসমীয়া)", "as-IN")
        return ("bn", "Bengali (বাংলা)", "bn-IN")

    # Urdu / Arabic script: 0600 - 06FF, 0750-077F, FB50-FDFF, FE70-FEFF
    if len(re.findall(r'[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]', clean_text)) > 0:
        return ("ur", "Urdu (اردو)", "ur-IN")

    # Devanagari: 0900 - 097F (Distinguish Marathi vs Hindi)
    if len(re.findall(r'[\u0900-\u097F]', clean_text)) > 0:
        marathi_markers = ["पिक", "पिकावर", "शेत", "शेती", "पाणी", "कीड", "खत", "उपाय", "औषध", "झाड", "इत्यादी", "आहे", "करावे", "सांगा", "लागवड", "रोग", "कीटक", "फवारणी", "भाजीपाला", "टोमॅटो", "कांदा", "सोयाबीन", "कपाशी", "उसावर", "ऊस"]
        if 'ळ' in clean_text or any(re.search(r'\b' + m + r'\b', clean_text) for m in marathi_markers[:12]):
            return ("mr", "Marathi (मराठी)", "mr-IN")
        return ("hi", "Hindi (हिंदी)", "hi-IN")

    # 2. Explicit Language Mention Triggers
    explicit_lang_map = [
        ("kn", [r'\bkannada\b', r'\bkannadadalli\b', r'\bkannadadali\b', r'\bkannadalli\b', r'\bin kannada\b', r'\bkannada dalli\b']),
        ("hi", [r'\bhindi\b', r'\bhindime\b', r'\bhindi me\b', r'\bhindi mein\b', r'\bin hindi\b']),
        ("te", [r'\btelugu\b', r'\btelugulo\b', r'\bin telugu\b']),
        ("ta", [r'\btamil\b', r'\bthamizh\b', r'\btamilil\b', r'\bin tamil\b']),
        ("mr", [r'\bmarathi\b', r'\bmarathit\b', r'\bmarathimadhye\b', r'\bin marathi\b']),
        ("bn", [r'\bbengali\b', r'\bbangla\b', r'\bbanglay\b', r'\bin bengali\b', r'\bin bangla\b']),
        ("ml", [r'\bmalayalam\b', r'\bmalayalathil\b', r'\bin malayalam\b']),
        ("gu", [r'\bgujarati\b', r'\bgujaratima\b', r'\bin gujarati\b']),
        ("pa", [r'\bpunjabi\b', r'\bpunjabivich\b', r'\bin punjabi\b']),
        ("or", [r'\bodia\b', r'\boriya\b', r'\bin odia\b']),
        ("as", [r'\bassamese\b', r'\baxomiya\b', r'\bin assamese\b']),
        ("ur", [r'\burdu\b', r'\burdume\b', r'\bin urdu\b'])
    ]
    for code, patterns in explicit_lang_map:
        if any(re.search(p, text_lower) for p in patterns):
            defn = LANGUAGE_DEFINITIONS[code]
            return (code, defn["name"], defn["tag"])

    # 3. Transliterated / Code-Mixed Dialects (Latin Script) with Weighted Scoring
    kanglish_markers = [
        "namma", "nanna", "namage", "nanage", "belage", "belige", "bele", "mannu", "mannina", "neeru", "neeravari",
        "gobbara", "rasagobbara", "elli", "yaavaga", "yavaga", "agide", "aagide", "beku", "beda", "madodhu", "maduvudu",
        "iruvaga", "idhe", "ide", "yenu", "enu", "yavudhu", "yavudu", "hege", "hegide", "madbeku", "kodbeku", "haakbeku",
        "hakbeku", "reitha", "raitha", "raitharu", "gida", "gidada", "ele", "eleyalli", "chukke", "hasiru", "haladi",
        "keli", "namaskara", "namaskaram", "tumba", "swalpa", "kabbina", "kabbu", "bhattada", "bhatta", "togari",
        "adike", "thengu", "tengu", "maavu", "mavinakayi", "hullu", "roga", "rogakke", "hulu", "hulige",
        "oushadha", "aushadha", "marukatte", "dharane", "bithane", "bitthane", "iluvari", "haraju", "sahayadana"
    ]

    hinglish_markers = [
        "mera", "meri", "mere", "mujhe", "humko", "khet", "fasal", "paani", "pani", "kya", "kab",
        "kaise", "kyun", "chahiye", "gai", "gaya", "kisi", "daale", "daalna", "batao", "bataiye", "hoga",
        "dawai", "dawa", "keeda", "keede", "khad", "beej", "karu", "karna", "karein", "kitna",
        "lagta", "hota", "hai", "hain", "kripya", "upay", "patte", "patti", "peela", "jhalas", "namaste",
        "tamatar", "gehu", "dhan", "kaunsa", "spray"
    ]

    marathi_markers_latin = [
        "majha", "majhya", "amhi", "sheti", "shetat", "pik", "pikaver", "rog", "aushadh", "favarni",
        "paani", "khat", "upay", "sang", "sanga", "ahe", "aahe", "karava", "karave", "lagwad", "kanda",
        "soyabean", "kapashi", "tamatar", "bhav", "mandi", "namaskar"
    ]

    tanglish_markers = [
        "enoda", "engalukku", "enakku", "namakku", "thani", "thannir", "marundhu", "marunthu",
        "uruvam", "vilai", "pothu", "panna", "pannalam", "ennadhu", "eppadi", "kidaikkum",
        "payir", "nel", "thakkali", "vanga", "solunga", "solungo", "ilai", "karugu", "uram", "poochi", "vanakkam"
    ]

    tenglish_markers = [
        "maaku", "naaku", "cheyali", "eppudu", "ela", "chudali", "mandu", "chelu",
        "panta", "vari", "mirapa", "pattuko", "emiti", "emi", "veskovali", "dabbulu",
        "raithu", "rythu", "aakulu", "pasupu", "purugu", "eruvulu", "pettali", "namaskaram"
    ]

    benglish_markers = [
        "aamar", "amader", "chas", "chash", "dhan", "dhane", "pokar", "osudh", "oushodh",
        "jol", "paani", "sar", "gach", "pata", "holud", "ki bhabe", "kobe", "kisu", "bolun", "nomoshkar"
    ]

    dialect_scores = {
        "kn": sum(1 for kw in kanglish_markers if re.search(r'\b' + kw + r'\b', text_lower)),
        "hi": sum(1 for kw in hinglish_markers if re.search(r'\b' + kw + r'\b', text_lower)),
        "mr": sum(1 for kw in marathi_markers_latin if re.search(r'\b' + kw + r'\b', text_lower)),
        "ta": sum(1 for kw in tanglish_markers if re.search(r'\b' + kw + r'\b', text_lower)),
        "te": sum(1 for kw in tenglish_markers if re.search(r'\b' + kw + r'\b', text_lower)),
        "bn": sum(1 for kw in benglish_markers if re.search(r'\b' + kw + r'\b', text_lower)),
    }

    best_code = max(dialect_scores, key=dialect_scores.get)
    if dialect_scores[best_code] > 0:
        defn = LANGUAGE_DEFINITIONS[best_code]
        return (best_code, defn["name"], defn["tag"])

    return ("en", "English", "en-IN")


# ----------------------------------------------------
# 3. CONTEXT RETRIEVAL
# ----------------------------------------------------
def search_rag_context(query: str) -> List[Dict[str, Any]]:
    q_words = set(re.findall(r'\w+', query.lower()))
    scored_articles = []
    
    for item in KNOWLEDGE_BASE:
        full_text = f"{item['title']} {item.get('content_en', '')} {item.get('content_kn', '')} {item.get('content_hi', '')} {' '.join(item.get('keywords', []))}".lower()
        score = 0
        for w in q_words:
            if len(w) > 2 and w in full_text:
                score += 3 if w in item.get('keywords', []) else 1
        scored_articles.append((score, item))

    scored_articles.sort(key=lambda x: x[0], reverse=True)
    top_items = [item for sc, item in scored_articles[:3] if sc > 0]
    if not top_items and KNOWLEDGE_BASE:
        top_items = [KNOWLEDGE_BASE[0]]
    return top_items


# ----------------------------------------------------
# 4. MULTI-MODEL GROQ LLM WITH CLEANER
# ----------------------------------------------------
AVAILABLE_GROQ_MODELS = [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "qwen/qwen3.6-27b",
    "groq/compound",
    "groq/compound-mini"
]

def clean_llm_response(text: str) -> str:
    """Removes thinking tags, reasoning fragments, or raw model artifacts."""
    if not text:
        return ""
    cleaned = re.sub(r'<think>.*?</think>', '', text, flags=re.DOTALL)
    if '<think>' in cleaned:
        cleaned = re.sub(r'<think>.*', '', cleaned, flags=re.DOTALL)
    cleaned = re.sub(r'```json\s*\{.*?\}\s*```', '', cleaned, flags=re.DOTALL)
    return cleaned.strip()

def verify_response_script(text: str, lang_code: str) -> bool:
    """Verifies that the generated response contains authentic native script for the target language."""
    if not text:
        return False
    if lang_code == "en":
        return len(re.findall(r'[a-zA-Z]', text)) >= 20
    defn = LANGUAGE_DEFINITIONS.get(lang_code)
    if not defn:
        return True
    pattern = defn["script_re"]
    chars = len(re.findall(pattern, text))
    return chars >= 20

async def query_groq_llm(messages: List[Dict[str, str]]) -> Optional[str]:
    """Tries primary and fallback models on Groq with timeout resilience."""
    if not GROQ_API_KEY or len(GROQ_API_KEY) < 10:
        return None

    for model_name in AVAILABLE_GROQ_MODELS:
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                resp = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"},
                    json={
                        "model": model_name,
                        "messages": messages,
                        "temperature": 0.2,
                        "max_tokens": 1200
                    }
                )
                if resp.status_code == 200:
                    data = resp.json()
                    raw_content = data["choices"][0]["message"]["content"]
                    cleaned = clean_llm_response(raw_content)
                    if cleaned:
                        return cleaned
                else:
                    logging.warning(f"Groq model {model_name} returned status {resp.status_code}")
        except Exception as ex:
            logging.warning(f"Groq model {model_name} invocation error: {ex}")
            continue

    return None


# ----------------------------------------------------
# 5. ZERO-KEY EXPERT MULTILINGUAL FALLBACK GENERATOR (ALL 13 LANGUAGES)
# ----------------------------------------------------
def generate_offline_fallback(user_query: str, lang_code: str, sources: List[Dict[str, Any]]) -> str:
    """
    Guarantees rich, practical, 100% natural responses strictly in the requested language
    even if LLM service is busy, offline, or returns non-native text.
    """
    q_low = user_query.lower()

    # 1. KANNADA (ಕನ್ನಡ)
    if lang_code == "kn":
        if any(k in q_low for k in ["ಟೊಮೆಟೊ", "ಟೊಮೋಟೊ", "tomato", "ಚುಕ್ಕೆ", "ತೊಗಲು", "ಹಳದಿ", "ಮುರುಟು"]):
            return (
                "🌱 **ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ಟೊಮೆಟೊ ಬೆಳೆ ರೋಗ ನಿರ್ವಹಣೆ ಮತ್ತು ಪರಿಹಾರ ಕ್ರಮಗಳು:**\n\n"
                "೧. **ರೋಗದ ಲಕ್ಷಣಗಳು:** ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಅಥವಾ ಕಪ್ಪು ಬಣ್ಣದ ದುಂಡಗಿನ ಚುಕ್ಕೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುವುದು ಹಾಗೂ ಕೆಳಗಿನ ಎಲೆಗಳು ಹಳದಿಯಾಗುವುದು.\n"
                "೨. **ಸಾವಯವ ಪರಿಹಾರ:** ಒಂದು ಲೀಟರ್ ನೀರಿಗೆ ಐದು ಮಿಲಿ ಬೇವಿನ ಎಣ್ಣೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ. ಟ್ರೈಕೋಡರ್ಮಾ ಜೈವಿಕ ಗೊಬ್ಬರವನ್ನು ಐದು ಗ್ರಾಂ ಪ್ರತಿ ಲೀಟರ್‌ನಂತೆ ಮಣ್ಣಿಗೆ ನೀಡಿ.\n"
                "೩. **ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ:** ಒಂದು ಲೀಟರ್ ನೀರಿಗೆ ಎರಡು ಗ್ರಾಂ ಮ್ಯಾಂಕೋಜೆಬ್ ಕರಗುವ ಪುಡಿ ಅಥವಾ ಎರಡು ಬಿಂದು ಐದು ಗ್ರಾಂ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.\n"
                "೪. **ಮುನ್ನೆಚ್ಚರಿಕೆ:** ರೋಗಬಾಧಿತ ಎಲೆಗಳನ್ನು ಕಿತ್ತು ಹೊಲದಿಂದ ದೂರ ಹಾಕಿ ನಾಶಮಾಡಿ. ಹನಿ ನೀರಾವರಿ ಬಳಸಿ."
            )
        elif any(k in q_low for k in ["ಭತ್ತ", "ನೆಲ್ಲು", "paddy", "rice", "ಬೆಂಕಿ", "ಕಾಂಡ", "ಹುಳು", "ತೆನೆ"]):
            return (
                "🌾 **ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ಭತ್ತದ ಬೆಳೆಯ ಬೆಂಕಿರೋಗ ಮತ್ತು ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು ಪರಿಹಾರ:**\n\n"
                "೧. **ಬೆಂಕಿ ರೋಗಕ್ಕೆ:** ಒಂದು ಲೀಟರ್ ನೀರಿಗೆ ಸೊನ್ನೆ ಬಿಂದು ಆರು ಗ್ರಾಂ ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ ಶಿಲೀಂಧ್ರನಾಶಕ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.\n"
                "೨. **ಕಾಂಡ ಕೊರೆಯುವ ಹುಳುಗೆ:** ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ ಸೊನ್ನೆ ಬಿಂದು ಮೂರು ಮಿಲಿ ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ ಸಿಂಪಡಿಸಿ ಅಥವಾ ಎಕರೆಗೆ ಎಂಟು ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.\n"
                "೩. **ಪೋಷಕಾಂಶ:** ಯೂರಿಯಾ ಗೊಬ್ಬರವನ್ನು ಮೂರು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ. ಎಕರೆಗೆ ಐವತ್ತು ಕೆಜಿ ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರ ನೀಡಿ."
            )
        elif any(k in q_low for k in ["ಅಡಿಕೆ", "ತೆಂಗು", "ಕೊಳೆ", "ಮಹಾಳಿ", "adike", "thengu", "tengu", "arecanut", "coconut"]):
            return (
                "🌴 **ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ಅಡಿಕೆ ಮತ್ತು ತೆಂಗಿನ ಮರಗಳ ಕೊಳೆರೋಗ ಅಥವಾ ಮಹಾಳಿ ನಿರ್ವಹಣೆ:**\n\n"
                "೧. **ಕೊಳೆರೋಗಕ್ಕೆ:** ಮುಂಗಾರು ಮಳೆ ಆರಂಭಕ್ಕೂ ಮುನ್ನ ಶೇಕಡಾ ಒಂದರ ಬೋರ್ಡೋ ದ್ರಾವಣವನ್ನು (ಒಂದು ಕೆಜಿ ಮೈಲುತುತ್ತ + ಒಂದು ಕೆಜಿ ಸುಣ್ಣ + ನೂರು ಲೀಟರ್ ನೀರು) ಗೊಂಚಲುಗಳಿಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಸಿಂಪಡಿಸಿ.\n"
                "೨. **ಶಿಲೀಂಧ್ರನಾಶಕ:** ರಿಡೋಮಿಲ್ ಅಥವಾ ಮೆಟಾಲಾಕ್ಸಿಲ್ ಮ್ಯಾಂಕೋಜೆಬ್ ಎರಡು ಗ್ರಾಂ ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ ಸಿಂಪಡಿಸಿ. ಗೊಂಚಲುಗಳಿಗೆ ಪ್ಲಾಸ್ಟಿಕ್ ಚೀಲ ಕಟ್ಟುವುದು ಉತ್ತಮ."
            )
        elif any(k in q_low for k in ["ಯೋಜನೆ", "ಕಿಸಾನ್", "pm-kisan", "ವಿಮೆ", "ಸಹಾಯಧನ", "ಸಾಲ", "kcc"]):
            return (
                "🏛️ **ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ರೈತರಿಗಾಗಿ ಪ್ರಮುಖ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು:**\n\n"
                "೧. **ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ಯೋಜನೆ:** ವಾರ್ಷಿಕ ಆರು ಸಾವಿರ ರೂಪಾಯಿ ನೇರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ.\n"
                "೨. **ಪ್ರಧಾನಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ:** ಖರೀಫ್ ಬೆಳೆಗೆ ಶೇಕಡಾ ಎರಡು ಮತ್ತು ರಬಿ ಬೆಳೆಗೆ ಶೇಕಡಾ ಒಂದು ಬಿಂದು ಐದು ಪ್ರೀಮಿಯಂನಲ್ಲಿ ಬೆಳೆ ವಿಮೆ ರಕ್ಷಣೆ.\n"
                "೩. **ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಯೋಜನೆ:** ಕೇವಲ ಶೇಕಡಾ ನಾಲ್ಕರ ಬಡ್ಡಿದರದಲ್ಲಿ ಮೂರು ಲಕ್ಷ ರೂಪಾಯಿವರೆಗೆ ಕೃಷಿ ಸಾಲ ಸೌಲಭ್ಯ.\n"
                "೪. **ಹನಿ ನೀರಾವರಿ ಯೋಜನೆ:** ಶೇಕಡಾ ನಲವತ್ತೈದರಿಂದ ತೊಂಬತ್ತರವರೆಗೆ ಸಹಾಯಧನ ಲಭ್ಯವಿದೆ."
            )
        else:
            return (
                f"🌱 **ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ಕೃಷಿಅಸ್ತ್ರ AI ಕೃಷಿ ಸಹಾಯ ಕೇಂದ್ರಕ್ಕೆ ಸ್ವಾಗತ.**\n\n"
                f"ನಿಮ್ಮ ಪ್ರಶ್ನೆ: **'{user_query}'**\n\n"
                f"೧. **ಸಮತೋಲಿತ ಪೋಷಕಾಂಶ:** ಮಣ್ಣು ಪರೀಕ್ಷೆ ಆಧಾರದ ಮೇಲೆ NPK ಗೊಬ್ಬರವನ್ನು ನೂರ ಇಪ್ಪತ್ತು, ಅರವತ್ತು, ನಲವತ್ತು ಕೆಜಿ ಪ್ರಮಾಣದಲ್ಲಿ ಒದಗಿಸಿ.\n"
                f"೨. **ರೋಗ ಮತ್ತು ಕೀಟ ತಡೆ:** ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಐದು ಮಿಲಿ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ. ಶಿಫಾರಸು ಮಾಡಿದ ಕೀಟನಾಶಕ ಬಳಸಿ.\n"
                f"೩. **ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ:** ಹನಿ ನೀರಾವರಿ ಪದ್ಧತಿ ಅಳವಡಿಸಿ ನೀರಿನ ಸದ್ಬಳಕೆ ಮಾಡಿಕೊಳ್ಳಿ."
            )

    # 2. HINDI (हिंदी)
    elif lang_code == "hi":
        if any(k in q_low for k in ["रोग", "पत्ता", "धब्बा", "झुलसा", "कीड़ा", "दवाई", "स्प्रे", "टमाटर"]):
            return (
                "🌱 **नमस्ते किसान भाई! फसल रोग निदान एवं उपचार:**\n\n"
                "१. **रासायनिक उपचार:** पत्तों पर धब्बा या झुलसा (Blight) दिखने पर **मैंकोज़ेब 75% WP 2 ग्राम/लीटर** या **कॉपर ऑक्सीक्लोराइड 2.5 ग्राम/लीटर** पानी में मिलाकर छिड़काव करें।\n"
                "२. **जैविक उपाय:** **नीम का तेल (Neem Oil) 5 मिली/लीटर** या ट्राइकोडर्मा 5 ग्राम/लीटर का स्प्रे करें।\n"
                "३. **रोकथाम:** रोगग्रस्त पत्तियों को तोड़कर नष्ट करें और जल निकासी का उचित प्रबंध रखें।"
            )
        elif any(k in q_low for k in ["गेहूं", "धान", "सिंचाई", "खाद", "यूरिया", "डीएपी"]):
            return (
                "🌾 **नमस्ते किसान भाई! संतुलित पोषण एवं सिंचाई प्रबंधन:**\n\n"
                "१. **NPK मात्रा:** फसलों के लिए **120:60:40 किग्रा/हेक्टेयर** NPK दें। फास्फोरस व पोटाश बुआई के समय डालें।\n"
                "२. **यूरिया प्रयोग:** नाइट्रोजन (यूरिया) को 3 भागों में बांटकर (बुआई, कल्ले फूटते समय व फूल आने पर) दें।\n"
                "३. **सिंचाई:** खेत में 30% से कम नमी होने पर सिंचाई करें, सुबह के समय पानी देना अधिक लाभकारी है।"
            )
        elif any(k in q_low for k in ["योजना", "किसान", "बीमा", "पैसा", "सब्सिडी", "ऋण", "लोन", "pm-kisan"]):
            return (
                "🏛️ **नमस्ते किसान भाई! प्रमुख सरकारी कृषि योजनाएं:**\n\n"
                "१. **पीएम-किसान (PM-KISAN):** पात्र किसानों को सालाना ₹6,000 की वित्तीय सहायता 3 किस्तों में सीधे बैंक खाते में मिलती है।\n"
                "२. **पीएम फसल बीमा योजना (PMFBY):** खरीफ पर 2% और रबी फसलों पर 1.5% प्रीमियम देकर फसल सुरक्षा प्राप्त करें।\n"
                "३. **किसान क्रेडिट कार्ड (KCC):** 4% रियायती ब्याज दर पर ₹3 लाख तक का कृषि ऋण उपलब्ध है।"
            )
        else:
            return (
                f"नमस्ते किसान भाई! कृषिअस्त्र AI में आपका स्वागत है।\n\n"
                f"आपके प्रश्न: **'{user_query}'** के संदर्भ में:\n\n"
                f"१. फसल की अच्छी वृद्धि के लिए संतुलित NPK खाद और समय पर जैविक कीटनाशक (नीम तेल) का प्रयोग करें।\n"
                f"२. पानी की बचत और बेहतर पोषण के लिए टपक (ड्रिप) सिंचाई अपनाएं।"
            )

    # 3. TELUGU (తెలుగు)
    elif lang_code == "te":
        return (
            f"🌱 **నమస్కారం రైతు సోదరులారా! కృషిఅస్త్ర AI సలహా:**\n\n"
            f"మీ ప్రశ్న: **'{user_query}'**\n\n"
            f"౧. **తెగుళ్ల నివారణ:** ఆకులపై మచ్చలు లేదా ఎండిపోవడం గమనిస్తే, లీటరు నీటికి **2 గ్రాముల మాంకోజెబ్ (Mancozeb 75% WP)** లేదా **5 మి.లీ. వేప నూనె (Neem Oil)** పిచికారీ చేయండి.\n"
            f"౨. **ఎరువుల యాజమాన్యం:** సమతుల్య NPK ఎరువులను 120:60:40 కిలోలు/హెక్టారుకు అందించండి. నత్రజనిని మూడు దఫాలుగా వేయండి.\n"
            f"౩. **ప్రభుత్వ పథకాలు:** పీఎం-కిసాన్ ద్వారా ఏడాదికి ₹6,000 మరియు పీఎం ఫసల్ బీమా ద్వారా పంట రక్షణ పొందవచ్చు."
        )

    # 4. TAMIL (தமிழ்)
    elif lang_code == "ta":
        return (
            f"🌱 **வணக்கம் விவசாய நண்பரே! கிருஷிஅஸ்த்ரா AI வேளாண்மை ஆலோசனை:**\n\n"
            f"உங்கள் கேள்வி: **'{user_query}'**\n\n"
            f"௧. **நோய் கட்டுப்பாடு:** இலை கருகல் அல்லது புள்ளி நோய்க்கு ஒரு லிட்டர் தண்ணீரில் **2 கிராம் மான்கோசெப் (Mancozeb 75% WP)** அல்லது **5 மி.லி. வேப்பெண்ணெய் (Neem Oil)** கலந்து தெளிக்கவும்.\n"
            f"௨. **உர மேலாண்மை:** சமச்சீர் NPK உரங்களை (120:60:40 கிலோ/ஹெக்டேர்) இடவும். யூரியாவை மூன்று தவணைகளாக பிரித்து இடவும்.\n"
            f"௩. **அரசு திட்டங்கள்:** பிரதம மந்திரி கிசான் திட்டத்தின் கீழ் ஆண்டுக்கு ₹6,000 நிதி உதவி மற்றும் பயிர் காப்பீடு (PMFBY) திட்டங்களை பயன்படுத்தவும்."
        )

    # 5. MARATHI (मराठी)
    elif lang_code == "mr":
        return (
            f"🌱 **शेतकरी मित्रांनो नमस्कार! कृषीअस्त्र AI कृषी सल्ला:**\n\n"
            f"तुमचा प्रश्न: **'{user_query}'**\n\n"
            f"१. **रोग व कीड नियंत्रण:** पानांवर करपा किंवा डाग दिसल्यास प्रति लिटर पाण्यात **२ ग्रॅम मॅनकोझेब (Mancozeb 75% WP)** किंवा **५ मिली निंबोळी अर्क (Neem Oil)** फवारावे.\n"
            f"२. **खत व्यवस्थापन:** पिकांना NPK खतांचा योग्य समतोल (१२०:६०:४০ किलो/हेक्टर) द्या. नत्र (युरिया) ३ हप्त्यांमध्ये विभागून द्यावा.\n"
            f"३. **सरकारी योजना:** पीएम-किसान योजनेअंतर्गत वर्षाला ₹६,००० थेट बँक खात्यात मिळतात तसेच पीएम पीक विमा योजनेचा लाभ घ्यावा."
        )

    # 6. BENGALI (বাংলা)
    elif lang_code == "bn":
        return (
            f"🌱 **নমস্কার কৃষক ভাই! কৃষিওস্ত্র AI কৃষি পরামর্শ:**\n\n"
            f"আপনার প্রশ্ন: **'{user_query}'**\n\n"
            f"১. **রোগ ও পোকা দমন:** পাতার দাগ বা ব্লাইট রোগের জন্য প্রতি লিটার জলে **২ গ্রাম ম্যানকোজেব (Mancozeb)** অথবা **৫ মিলি নিম তেল** মিশিয়ে স্প্রে করুন।\n"
            f"২. **সুষম সার প্রয়োগ:** ফসলে NPK ১২০:৬০:৪০ কেজি/হেক্টর হারে দিন এবং ইউরিয়া ৩ কিস্তিতে প্রয়োগ করুন।\n"
            f"৩. **সরকারি প্রকল্প:** পিএম-কিসান যোজনায় বছরে ₹৬,০০০ আর্থিক সাহায্য এবং ফসল বীমা (PMFBY) সুবিধা নিন।"
        )

    # 7. MALAYALAM (മലയാളം)
    elif lang_code == "ml":
        return (
            f"🌱 **നമസ്കാരം കർഷക സുഹൃത്തേ! കൃഷിഅസ്ത്ര AI കാർഷിക നിർദ്ദേശം:**\n\n"
            f"നിങ്ങളുടെ ചോദ്യം: **'{user_query}'**\n\n"
            f"൧. **രോഗ നിയന്ത്രണം:** ഇലപ്പുള്ളി രോഗത്തിനും കുമിൾ ബാധയ്ക്കും ഒരു ലിറ്റർ വെള്ളത്തിൽ **2 ഗ്രാം മാങ്കോസെബ് (Mancozeb)** അല്ലെങ്കിൽ **5 മില്ലി വേപ്പെണ്ണ** ചേർത്ത് തളിക്കുക.\n"
            f"൨. **വളപ്രയോഗം:** വിളകൾക്ക് സന്തുലിത NPK വളങ്ങൾ നൽകുക. യൂറിയ മൂന്ന് ഘട്ടങ്ങളിലായി വിതറുക.\n"
            f"൩. **പദ്ധതികൾ:** പി.എം-കിസാൻ വഴി വർഷത്തിൽ ₹6,000 ധനസഹായവും വിള ഇൻഷുറൻസ് പദ്ധതികളും പ്രയോജനപ്പെടുത്തുക."
        )

    # 8. GUJARATI (ગુજરાતી)
    elif lang_code == "gu":
        return (
            f"🌱 **નમસ્તે ખેડૂત મિત્રો! કૃષિઅસ્ત્ર AI કૃષિ માર્ગદર્શન:**\n\n"
            f"તમારો પ્રશ્ન: **'{user_query}'**\n\n"
            f"૧. **રોગ અને જીવાત નિયંત્રણ:** પાંદડા પર ટપકા કે સુકારા માટે પ્રતિ લીટર પાણીમાં **૨ ગ્રામ મેન્કોઝેબ (Mancozeb)** અથવા **૫ મિલી લીમડાનું તેલ (Neem Oil)** છંટકાવ કરો.\n"
            f"૨. **ખાતર વ્યવસ્થાપન:** પાકને સંતુલિત NPK ૧૨૦:૬૦:૪૦ કિગ્રા/હેક્ટર આપો અને યુરિયા ૩ હપ્તામાં વહેંચીને આપો.\n"
            f"૩. **સરકારી યોજનાઓ:** પીએમ-કિસાન યોજના હેઠળ વાર્ષિક ₹૬,૦૦૦ સહાય અને પીએમ પાક વીમા યોજનાનો લાભ લો."
        )

    # 9. PUNJABI (ਪੰਜਾਬੀ)
    elif lang_code == "pa":
        return (
            f"🌱 **ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਕ੍ਰਿਸ਼ੀਅਸਤਰ AI ਖੇਤੀਬਾੜੀ ਸਲਾਹ:**\n\n"
            f"ਤੁਹਾਡਾ ਸਵਾਲ: **'{user_query}'**\n\n"
            f"੧. **ਬਿਮਾਰੀ ਅਤੇ ਕੀੜੇ ਦੀ ਰੋਕਥਾਮ:** ਪੱਤਿਆਂ 'ਤੇ ਧੱਬੇ ਜਾਂ ਝੁਲਸਾ ਰੋਗ ਲਈ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ **੨ ਗ੍ਰਾਮ ਮੈਨਕੋਜ਼ੇਬ (Mancozeb)** ਜਾਂ **੫ ਮਿਲੀਲੀਟਰ ਨਿੰਮ ਦਾ ਤੇਲ** ਮਿਲਾ ਕੇ ਛਿੜਕਾਅ ਕਰੋ।\n"
            f"੨. **ਖਾਦ ਪ੍ਰਬੰਧਨ:** ਫਸਲ ਨੂੰ ਸੰਤੁਲਿਤ NPK ੧੨੦:੬੦:੪੦ ਕਿਲੋ/ਹੈਕਟੇਅਰ ਦਿਓ ਅਤੇ ਯੂਰੀਆ ਨੂੰ ੩ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡ ਕੇ ਪਾਓ।\n"
            f"੩. **ਸਰਕਾਰੀ ਸਕੀਮਾਂ:** ਪੀਐੱਮ-ਕਿਸਾਨ ਸਕੀਮ ਤਹਿਤ ਸਾਲਾਨਾ ₹੬,੦੦੦ ਦੀ ਸਹਾਇਤਾ ਅਤੇ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ ਦਾ ਲਾਭ ਉਠਾਓ।"
        )

    # 10. ODIA (ଓଡ଼ିଆ)
    elif lang_code == "or":
        return (
            f"🌱 **ନମସ୍କାର କୃଷକ ଭାଇ! କୃଷିଅସ୍ତ୍ର AI କୃଷି ପରାମର୍ଶ:**\n\n"
            f"ଆପଣଙ୍କ ପ୍ରଶ୍ନ: **'{user_query}'**\n\n"
            f"୧. **ରୋଗ ଓ ପୋକ ନିୟନ୍ତ୍ରଣ:** ପତ୍ର ଚିତା ବା ଝାଉଁଳା ରୋଗ ପାଇଁ ଲିଟର ପିଛା **୨ ଗ୍ରାମ ମାଙ୍କୋଜେବ୍ (Mancozeb)** କିମ୍ବା **୫ ମିଲି ନିମ୍ବ ତେଲ** ସ୍ପ୍ରେ କରନ୍ତୁ।\n"
            f"୨. **ଖତ ଓ ସାର ପରିଚାଳନା:** ସନ୍ତୁଳିତ NPK ୧୨୦:୬୦:୪୦ କିଗ୍ରା/ହେକ୍ଟର ପ୍ରୟୋଗ କରନ୍ତୁ ଏବଂ ୟୁରିଆକୁ ୩ କିସ୍ତିରେ ଦିଅନ୍ତୁ।\n"
            f"୩. **ସରକାରୀ ଯୋଜନା:** ପିଏମ୍-କିଷାନ ଯୋଜନାରେ ବାର୍ଷିକ ₹୬,୦୦୦ ସହାୟତା ଏବଂ ଫସଲ ବୀମା ସୁବିଧା ପାଆନ୍ତୁ।"
        )

    # 11. ASSAMESE (অসমীয়া)
    elif lang_code == "as":
        return (
            f"🌱 **নমস্কাৰ কৃষক ভাইসকল! কৃষিওস্ত্ৰ AI কৃষি পৰামৰ্শ:**\n\n"
            f"আপোনাৰ প্ৰশ্ন: **'{user_query}'**\n\n"
            f"১. **ৰোগ আৰু পোক নিয়ন্ত্ৰণ:** পাতৰ দাগ বা ব্লাইট ৰোগৰ বাবে প্ৰতি লিটাৰ পানীত **২ গ্ৰাম মেনকোজেব (Mancozeb)** অথবা **৫ মিলি নিম তেল** মিহলাই স্প্ৰে কৰক।\n"
            f"২. **সাৰ ব্যৱস্থাপনা:** শস্যত সন্তুলিত NPK সাৰ প্ৰয়োগ কৰক আৰু ইউৰিয়া ৩টা কিস্তিত প্ৰদান কৰক।\n"
            f"৩. **চৰকাৰী আঁচনি:** পিএম-কিষাণ আঁচনিৰ অধীনত বছৰি ₹৬,০০০ আৰ্থিক সাহাৰ্য আৰু শস্য বীমা সুবিধা গ্ৰহণ কৰক।"
        )

    # 12. URDU (اردو)
    elif lang_code == "ur":
        return (
            f"🌱 **محترم کسان بھائی! کرشی استر AI زرعی رہنمائی:**\n\n"
            f"آپ کا سوال: **'{user_query}'**\n\n"
            f"۱. **بیماری اور کیڑوں کا تدارک:** پتوں کے دھبوں اور جھلساؤ کے لیے فی لیٹر پانی میں **۲ گرام مینکوزیب (Mancozeb)** یا **۵ ملی لیٹر نیم کا تیل** ملا کر سپرے کریں۔\n"
            f"۲. **کھاد کا متوازن استعمال:** فصل کو متوازن NPK کھاد فراہم کریں اور یوریا کو ۳ اقساط میں ڈالیں۔\n"
            f"۳. **سرکاری اسکیمیں:** پی ایم-کسان اسکیم کے تحت سالانہ ₹۶,۰۰۰ کی مالی امداد اور فصل بیمہ کی سہولت حاصل کریں۔"
        )

    # 13. DEFAULT: ENGLISH
    else:
        return (
            f"🌱 **Welcome to KrishiAstra AI Smart Farming Assistant!**\n\n"
            f"**Regarding your question:** '{user_query}'\n\n"
            f"1. **Crop Health & Diagnosis:** For leaf spots and fungal blight, spray **Mancozeb 75% WP @ 2g/L** or organic **Neem Oil @ 5ml/L**.\n"
            f"2. **Balanced Nutrition:** Apply **NPK 120:60:40 kg/ha** with Nitrogen split across 3 growth stages.\n"
            f"3. **Smart Irrigation:** Maintain soil moisture between 40-70%, preferably irrigating during early morning.\n"
            f"4. **Government Schemes:** Check out **PM-KISAN (₹6,000/yr)** and **PMFBY crop insurance** on official portals."
        )


# ----------------------------------------------------
# 6. MAIN RAG CHATBOT RESPONSE GENERATION (STRICT SCRIPT MANDATE)
# ----------------------------------------------------
async def generate_rag_response(
    user_query: str,
    override_lang: Optional[str] = None,
    location_context: Optional[Dict[str, Any]] = None,
    conversation_history: Optional[List[Dict[str, str]]] = None
) -> Dict[str, Any]:
    """
    Main entry point for generating multilingual farmer-centric AI responses.
    Strictly guarantees responses in 100% native script for whichever language the farmer speaks.
    """
    clean_query = user_query.strip()
    lang_code, lang_display, speech_tag = detect_language(clean_query)
    
    # Respect explicit language override if provided (e.g. from UI selector)
    if override_lang and override_lang in LANGUAGE_DEFINITIONS:
        lang_code = override_lang
        defn = LANGUAGE_DEFINITIONS[override_lang]
        lang_display = defn["name"]
        speech_tag = defn["tag"]

    sources = search_rag_context(clean_query)
    sources_summary = "\n".join([f"- {s['title']}: {s.get('content_en', '')}" for s in sources])

    # Construct regional and location telemetry if provided
    loc_info = ""
    if location_context:
        st = location_context.get("state", "Karnataka")
        dt = location_context.get("district", "Mandya")
        cr = location_context.get("crop", "Rice / Paddy")
        so = location_context.get("soil", "Red Loam")
        se = location_context.get("season", "Kharif")
        we = location_context.get("weather", "Optimal temperature 28°C")
        loc_info = f"Farmer Telemetry Context: State={st}, District={dt}, Major Crop={cr}, Soil={so}, Season={se}, Live Weather={we}."

    # Language-specific strict system prompt instructions
    if lang_code == "kn":
        lang_instruction = """
ಕನ್ನಡ ಗ್ರಾಮೀಣ ರೈತ ಸ್ನೇಹಿ ಆಡುಮಾತು ಕಡ್ಡಾಯ ನಿಯಮಗಳು (KANNADA NATURAL FARMER SPOKEN DIALECT MANDATE):
1. ಬಳಕೆದಾರರು ಕನ್ನಡದಲ್ಲಿ ಪ್ರಶ್ನಿಸಿದ್ದಾರೆ. ನೀವು ಕಡ್ಡಾಯವಾಗಿ 100% ಸಂಪೂರ್ಣ ಶುದ್ಧ ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿಯೇ ಉತ್ತರಿಸಬೇಕು.
2. ಯಾವುದೇ ಸಂಕೀರ್ಣ, ಕೃತಕ ಅಥವಾ ಗ್ರಾಂಥಿಕ ಸಂಸ್ಕೃತ ಶಬ್ದಗಳನ್ನು ಬಳಸಬೇಡಿ. ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ರೈತರು ದಿನನಿತ್ಯ ಮಾತನಾಡುವ ಸರಳ, ಮಧುರ ಹಾಗೂ ಗೌರವಯುತ ಆಡುಮಾತಿನ ಕನ್ನಡ ಶೈಲಿಯನ್ನು ("ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ", "ನಿಮ್ಮ ಹೊಲದಲ್ಲಿ...", "ಚಿಂತೆ ಮಾಡಬೇಡಿ, ಈ ಸರಳ ಕ್ರಮಗಳನ್ನು ಮಾಡಿ") ಬಳಸಿ.
3. ಶ್ರವಣ ಹಾಗೂ ಧ್ವನಿ ಸಹಾಯಕಕ್ಕೆ (Speech Synthesis) ಸುಲಭವಾಗಿ ಅರ್ಥವಾಗುವಂತೆ ವಾಕ್ಯಗಳನ್ನು ಚಿಕ್ಕದಾಗಿ, ಸರಳವಾಗಿ ಮತ್ತು ನೈಸರ್ಗಿಕ ಲಯದಲ್ಲಿ ರಚಿಸಿ.
4. ಔಷಧಿಗಳ ಹೆಸರು, ರಾಸಾಯನಿಕಗಳು, ರಸಗೊಬ್ಬರ ಮತ್ತು ಅಳತೆಗಳನ್ನು ಕನ್ನಡದಲ್ಲೇ ನೇರವಾಗಿ ಸ್ಪಷ್ಟವಾಗಿ ಬರೆಯಿರಿ (ಉದಾ: "ಒಂದು ಲೀಟರ್ ನೀರಿಗೆ ಎರಡು ಗ್ರಾಂ ಮ್ಯಾಂಕೋಜೆಬ್ ಪುಡಿ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ", "ಐದು ಮಿಲಿ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ", "ಎಕರೆಗೆ ನೂರ ಇಪ್ಪತ್ತು ಕೆಜಿ ಗೊಬ್ಬರ ಹಾಕಿ").
5. ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಯಾವುದೇ ವಾಕ್ಯ, ಅಕ್ಷರ ಅಥವಾ ಶೀರ್ಷಿಕೆ ನೀಡಬಾರದು.
"""
    elif lang_code == "hi":
        lang_instruction = """
हिंदी भाषा अनिवार्य निर्देश (HINDI STRICT MANDATE):
1. उपयोगकर्ता ने हिंदी में प्रश्न पूछा है। आपको शत-प्रतिशत (100%) शुद्ध हिंदी (देवनागरी लिपि) में ही उत्तर देना है।
2. अंग्रेजी का कोई भी वाक्य या शीर्षक न लिखें।
3. किसान भाइयों के लिए सरल, आदरणीय भाषा ("नमस्ते किसान भाई") और सटीक मात्रा (2 ग्राम/लीटर) हिंदी में लिखें।
"""
    elif lang_code == "te":
        lang_instruction = """
తెలుగు భాష తప్పనిసరి నియమాలు (TELUGU STRICT MANDATE):
1. వినియోగదారుడు తెలుగులో అడిగారు. మీరు 100% ఖచ్చితమైన స్వచ్ఛమైన తెలుగు లిపిలోనే సమాధానం ఇవ్వాలి.
2. ఆంగ్లంలో ఎటువంటి వాక్యాలు ఉపయోగించవద్దు.
3. రైతులకు అర్థమయ్యే సరళమైన గౌరవప్రదమైన తెలుగు భాష ("నమస్కారం రైతు సోదరులారా") మరియు ఖచ్చితమైన మోతాదులు ఇవ్వండి.
"""
    elif lang_code == "ta":
        lang_instruction = """
தமிழ் மொழி கட்டாய உத்தரவு (TAMIL STRICT MANDATE):
1. பயனர் தமிழில் கேட்டுள்ளார். நீங்கள் 100% தூய தமிழ் எழுத்துக்களிலேயே பதிலளிக்க வேண்டும்.
2. ஆங்கிலத்தில் எந்த வாக்கியங்களையும் பயன்படுத்த வேண்டாம்.
3. விவசாயிகளுக்கு புரியும் எளிய மரியாதையான தமிழ் நடை மற்றும் துல்லியமான மருந்தளவு வழங்கவும்.
"""
    elif lang_code == "mr":
        lang_instruction = """
मराठी भाषा अनिवार्य सूचना (MARATHI STRICT MANDATE):
1. वापरकर्त्याने मराठीत विचारले आहे. तुमचे संपूर्ण उत्तर १००% शुद्ध मराठी भाषेत (देवनागरी लिपी) असावे.
2. इंग्रजीचा वापर करू नये.
3. शेतकरी बांधवांसाठी सोपी, आदरयुक्त भाषा ("शेतकरी मित्रांनो नमस्कार") आणि अचूक औषध प्रमाण द्या.
"""
    elif lang_code == "bn":
        lang_instruction = """
বাংলা ভাষার বাধ্যতামূলক নির্দেশিকা (BENGALI STRICT MANDATE):
1. ব্যবহারকারী বাংলায় জিজ্ঞাসা করেছেন। আপনার সম্পূর্ণ উত্তর ১০০% বিশুদ্ধ বাংলা লিপিতেই দিতে হবে।
2. কোনো ইংরেজি ব্যবহার করবেন না।
3. কৃষক ভাইদের জন্য সহজ ও সম্মানজনক ভাষায় সঠিক কীটনাশকের মাত্রা বাংলায় লিখুন।
"""
    elif lang_code == "ml":
        lang_instruction = """
മലയാള ഭാഷാ നിർദ്ദേശം (MALAYALAM STRICT MANDATE):
1. ഉപയോക്താവ് മലയാളത്തിൽ ചോദിച്ചു. നിങ്ങൾ 100% ശുദ്ധ മലയാള ലിപിയിൽ മാത്രമേ മറുപടി നൽകാവൂ.
2. ഇംഗ്ലീഷ് ഉപയോഗിക്കരുത്.
3. കർഷകർക്കായി ലളിതവും വ്യക്തവുമായ നിർദ്ദേശങ്ങളും അളവുകളും നൽകുക.
"""
    elif lang_code == "gu":
        lang_instruction = """
ગુજરાતી ભાષા આદેશ (GUJARATI STRICT MANDATE):
1. વપરાશકર્તાએ ગુજરાતીમાં પૂછ્યું છે. તમારો સંપૂર્ણ જવાબ ૧૦૦% શુદ્ધ ગુજરાતી લિપિમાં જ હોવો જોઈએ.
2. અંગ્રેજીનો ઉપયોગ ન કરવો.
3. ખેડૂત મિત્રો માટે સરળ અને વ્યવહારુ ભાષામાં દવા અને ખાતરનું ચોક્કસ પ્રમાણ આપો.
"""
    elif lang_code == "pa":
        lang_instruction = """
ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਹਦਾਇਤ (PUNJABI STRICT MANDATE):
1. ਉਪਭੋਗਤਾ ਨੇ ਪੰਜਾਬੀ ਵਿੱਚ ਪੁੱਛਿਆ ਹੈ। ਤੁਹਾਡਾ ਪੂਰਾ ਜਵਾਬ 100% ਸ਼ੁੱਧ ਪੰਜਾਬੀ (ਗੁਰਮੁਖੀ ਲਿਪੀ) ਵਿੱਚ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।
2. ਅੰਗਰੇਜ਼ੀ ਦੀ ਵਰਤੋਂ ਨਾ ਕਰੋ।
3. ਕਿਸਾਨ ਵੀਰਾਂ ਲਈ ਸਰਲ, ਸਪੱਸ਼ਟ ਖੇਤੀ ਸਲਾਹ ਅਤੇ ਦਵਾਈ ਦੀ ਸਹੀ ਮਾਤਰਾ ਦਿਓ।
"""
    elif lang_code == "or":
        lang_instruction = """
ଓଡ଼ିଆ ଭାଷା ନିର୍ଦ୍ଦେଶ (ODIA STRICT MANDATE):
1. ଉପଭୋକ୍ତା ଓଡ଼ିଆରେ ପଚାରିଛନ୍ତି। ଆପଣଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ ଉତ୍ତର ୧୦୦% ଶୁଦ୍ଧ ଓଡ଼ିଆ ଲିପିରେ ହେବା ଆବଶ୍ୟକ।
2. କୌଣସି ଇଂରାଜୀ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।
3. କୃଷକ ଭାଇମାନଙ୍କ ପାଇଁ ସରଳ ଓ ସଠିକ ପରାମର୍ଶ ଦିଅନ୍ତୁ।
"""
    elif lang_code == "as":
        lang_instruction = """
অসমীয়া ভাষাৰ নিৰ্দেশনা (ASSAMESE STRICT MANDATE):
1. ব্যৱহাৰকাৰীয়ে অসমীয়াত সুধিছে। আপোনাৰ সম্পূৰ্ণ উত্তৰ ১০০% শুদ্ধ অসমীয়া লিপিত হ'ব লাগিব।
2. কোনো ইংৰাজী ব্যৱহাৰ নকৰিব।
3. কৃষক ভাইসকলৰ বাবে সৰল আৰু সঠিক কৃষি পৰামৰ্শ প্ৰদান কৰক।
"""
    elif lang_code == "ur":
        lang_instruction = """
اردو زبان کی لازمی ہدایت (URDU STRICT MANDATE):
1. صارف نے اردو میں سوال پوچھا ہے۔ آپ کا پورا جواب ۱۰۰٪ خالص اردو رسم الخط میں ہونا چاہیے۔
2. انگریزی کا استعمال نہ کریں۔
3. کسان بھائیوں کے لیے آسان اور واضح زرعی مشورے اور ادویات کی درست مقدار بتائیں۔
"""
    else:
        lang_instruction = """
ENGLISH STRICT MANDATE:
1. Provide comprehensive, structured, polite agricultural guidance in English.
2. Use clear bullet points, exact metric dosages (e.g. 2g/L water), and practical steps.
"""

    system_prompt = f"""You are KrishiAstra AI (ಕೃಷಿಅಸ್ತ್ರ), an expert Indian Agricultural Scientist assisting farmers across India in their native language.

{loc_info}

{lang_instruction}

AGRONOMIC RESPONSE FORMAT:
- Keep the tone respectful, practical, and farmer-friendly.
- Use clear bullet points and numbered steps.
- Provide exact dosages (e.g. 2g/L water, 120:60:40 kg/ha NPK, 5ml/L Neem Oil).

Grounding Knowledge Base:
{sources_summary}
"""

    # Build messages array with multi-turn history
    llm_messages = [{"role": "system", "content": system_prompt}]
    
    if conversation_history and isinstance(conversation_history, list):
        for msg in conversation_history[-6:]:
            role = msg.get("role") or ("user" if msg.get("sender") == "user" else "assistant")
            content = msg.get("content") or msg.get("text") or ""
            if content and role in ["user", "assistant"]:
                llm_messages.append({"role": role, "content": content})

    # Add current user query
    llm_messages.append({"role": "user", "content": clean_query})

    # Query LLM
    llm_reply = await query_groq_llm(llm_messages)

    # Verification: If LLM failed, timed out, or didn't produce the target native script, enforce rich offline fallback
    if not llm_reply or not verify_response_script(llm_reply, lang_code):
        llm_reply = generate_offline_fallback(clean_query, lang_code, sources)

    return {
        "reply": llm_reply,
        "detected_language": lang_code,
        "language_display": lang_display,
        "speech_lang_tag": speech_tag,
        "sources": [{"title": s["title"], "excerpt": s.get("content_en", "")} for s in sources]
    }
