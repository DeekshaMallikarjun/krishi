export type Language = 'en' | 'kn' | 'hi';

export interface Translations {
  nav: {
    dashboard: string;
    crop: string;
    yield: string;
    disease: string;
    indiamap: string;
    weather: string;
    community: string;
    market: string;
    prices: string;
    schemes: string;
    chatbot: string;
    profile: string;
    aiLive: string;
    tagline: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    sensorsOnline: string;
    welcome: string;
    cardCrop: string;
    cardCropSub: string;
    cardDisease: string;
    cardDiseaseSub: string;
    cardPrices: string;
    cardPricesSub: string;
    cardIrrigation: string;
    cardIrrigationSub: string;
    cardMarket: string;
    cardMarketSub: string;
    cardChat: string;
    cardChatSub: string;
  };
  dashboard: {
    mandiTitle: string;
    viewAll: string;
    irrigationTitle: string;
    schemesTitle: string;
    schemesActive: string;
    browseSchemes: string;
    irrigationCalc: string;
  };
  crop: {
    engine: string;
    title: string;
    subtitle: string;
    blackSoil: string;
    redSoil: string;
    alluvialSoil: string;
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    temp: string;
    humidity: string;
    ph: string;
    rainfall: string;
    calculateBtn: string;
    topCrop: string;
    confidence: string;
    growthPeriod: string;
    days: string;
    waterReq: string;
    nutrientAdvice: string;
    altCrops: string;
    readyTitle: string;
    readySub: string;
  };
  disease: {
    engine: string;
    title: string;
    subtitle: string;
    inputTitle: string;
    dropText: string;
    dropSub: string;
    runBtn: string;
    testBtn: string;
    diagnosis: string;
    aiConfidence: string;
    damage: string;
    organic: string;
    chemical: string;
    readyTitle: string;
    readySub: string;
  };
  prices: {
    engine: string;
    title: string;
    subtitle: string;
    todayPrice: string;
    predictedPrice: string;
    advice: string;
    trendTitle: string;
  };
  weather: {
    engine: string;
    title: string;
    subtitle: string;
    feelsLike: string;
    humidity: string;
    wind: string;
    rain24h: string;
    forecast7d: string;
    irrTitle: string;
    crop: string;
    soilType: string;
    moisture: string;
    forecastRain: string;
    calculateBtn: string;
    recAction: string;
    volumeReq: string;
    nextCheck: string;
  };
  market: {
    engine: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allStates: string;
    topGainers: string;
    cropHeader: string;
    mandiHeader: string;
    stateHeader: string;
    minHeader: string;
    maxHeader: string;
    modalHeader: string;
    trendHeader: string;
  };
  schemes: {
    engine: string;
    title: string;
    subtitle: string;
    all: string;
    eligibility: string;
    documents: string;
    deadline: string;
    applyBtn: string;
    crawlerActive: string;
  };
  chat: {
    title: string;
    subtitle: string;
    placeholder: string;
    welcomeMsg: string;
    languageBadge: string;
  };
  profile: {
    title: string;
    name: string;
    phone: string;
    state: string;
    district: string;
    landAcres: string;
    soilType: string;
    crops: string;
    prefLang: string;
    saveBtn: string;
    savedMsg: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      dashboard: "Dashboard",
      crop: "Crop Rec",
      yield: "Yield ML",
      disease: "Disease Scanner",
      indiamap: "India Map",
      weather: "Weather & Irrigation",
      community: "Community",
      market: "Mandi Market",
      prices: "Price Forecast",
      schemes: "Govt Schemes",
      chatbot: "AI Assistant",
      profile: "Profile",
      aiLive: "AI LIVE",
      tagline: "Indian Farmer's AI Smart Farming Ecosystem"
    },
    hero: {
      badge: "TRADITIONAL FARMING → AI-POWERED SMART FARMING",
      titleStart: "Empowering Indian Agriculture with",
      titleHighlight: "KrishiAstra AI",
      subtitle: "Real-time precision farming intelligence tailored for your land. AI crop selection, CNN leaf disease detection, LSTM mandi price predictions, and multilingual voice assistant in Kannada, Hindi, and English.",
      sensorsOnline: "AI SENSORS ONLINE",
      welcome: "Welcome Back,",
      cardCrop: "Crop Selection",
      cardCropSub: "Random Forest ML",
      cardDisease: "Leaf Scan AI",
      cardDiseaseSub: "CNN + OpenCV",
      cardPrices: "Price Forecast",
      cardPricesSub: "LSTM Time Series",
      cardIrrigation: "Smart Irrigation",
      cardIrrigationSub: "Moisture & Weather",
      cardMarket: "APMC Mandis",
      cardMarketSub: "Live Crop Rates",
      cardChat: "Multilingual Chat",
      cardChatSub: "ಕನ್ನಡ • हिंदी • Eng"
    },
    dashboard: {
      mandiTitle: "Live APMC Mandi Ticker",
      viewAll: "View All Mandis",
      irrigationTitle: "Smart Irrigation Decision",
      schemesTitle: "Government Schemes Portal",
      schemesActive: "Schemes Active",
      browseSchemes: "Browse Schemes",
      irrigationCalc: "Irrigation Calculator"
    },
    crop: {
      engine: "Random Forest Classifier ML Engine",
      title: "Crop Recommendation Engine",
      subtitle: "Enter your soil test values (N-P-K, pH) & climate parameters to discover optimal crops with maximum yield.",
      blackSoil: "Black Soil Preset",
      redSoil: "Red Soil Preset",
      alluvialSoil: "Alluvial Soil Preset",
      nitrogen: "Nitrogen (N)",
      phosphorus: "Phosphorus (P)",
      potassium: "Potassium (K)",
      temp: "Temperature (°C)",
      humidity: "Humidity (%)",
      ph: "Soil pH (0 - 14)",
      rainfall: "Annual Rainfall (mm)",
      calculateBtn: "Calculate Best Crop",
      topCrop: "Top Recommended Crop",
      confidence: "Match Confidence",
      growthPeriod: "Growth Period",
      days: "Days",
      waterReq: "Water Requirement",
      nutrientAdvice: "Nutrient & Soil Management Advice",
      altCrops: "Alternative Suitable Crops",
      readyTitle: "Ready for Soil Analysis",
      readySub: "Adjust N-P-K parameters or select a soil preset, then click 'Calculate Best Crop'."
    },
    disease: {
      engine: "PyTorch CNN + OpenCV Vision Engine",
      title: "Crop Disease Detection & Care Advice",
      subtitle: "Upload or capture a crop leaf image to instantly diagnose plant pathogens, affected area %, and remedies.",
      inputTitle: "Leaf Photo Input",
      dropText: "Click or drag crop leaf photo",
      dropSub: "Supports JPG, PNG, WEBP",
      runBtn: "Run AI Diagnosis",
      testBtn: "Test Sample Leaf Scan",
      diagnosis: "Disease Diagnosis",
      aiConfidence: "AI Confidence",
      damage: "Surface Damage",
      organic: "Organic & Biological Treatment",
      chemical: "Recommended Chemical Spray Schedule",
      readyTitle: "Ready to Scan Crop Leaf",
      readySub: "Upload a photo on the left or click 'Test Sample Leaf Scan' to view live CNN diagnosis."
    },
    prices: {
      engine: "LSTM Time Series Neural Forecasting Engine",
      title: "30-Day Mandi Price Prediction",
      subtitle: "Historical APMC market arrival analysis and AI price trajectory to optimize harvest selling timing.",
      todayPrice: "Today's Modal Price",
      predictedPrice: "30-Day AI Predicted Price",
      advice: "Selling Timing Advice",
      trendTitle: "Price Trend & Forecast (₹ / Quintal)"
    },
    weather: {
      engine: "Open-Meteo Weather & Irrigation AI Engine",
      title: "Live Weather & Smart Irrigation",
      subtitle: "Hyper-local weather telemetry paired with crop root-zone evapotranspiration models.",
      feelsLike: "Feels like",
      humidity: "Humidity",
      wind: "Wind",
      rain24h: "Rain 24h",
      forecast7d: "7-Day Agricultural Weather Forecast",
      irrTitle: "Soil Moisture & Irrigation Calculator",
      crop: "Target Crop",
      soilType: "Soil Type",
      moisture: "Current Soil Moisture (%)",
      forecastRain: "Forecast Rain (mm in 48h)",
      calculateBtn: "Calculate Water Requirement",
      recAction: "Recommended Action",
      volumeReq: "Volume Required per Acre",
      nextCheck: "Next Soil Moisture Check"
    },
    market: {
      engine: "Agmarknet APMC Mandi Intelligence",
      title: "APMC Mandi Rates & Selling Insights",
      subtitle: "Compare commodity rates across Indian mandis to sell your produce at peak market rates.",
      searchPlaceholder: "Filter Crop (e.g. Tomato)...",
      allStates: "All States",
      topGainers: "Top Mandi Price Gainers Today",
      cropHeader: "Commodity / Crop",
      mandiHeader: "Mandi Name",
      stateHeader: "State",
      minHeader: "Min Rate",
      maxHeader: "Max Rate",
      modalHeader: "Modal Price",
      trendHeader: "Trend"
    },
    schemes: {
      engine: "Verified Indian Government Schemes & Subsidies Portal",
      title: "Government Schemes & Direct Benefits",
      subtitle: "Official Indian Central & State schemes with eligibility criteria, document checklists, and application links.",
      all: "All",
      eligibility: "Eligibility:",
      documents: "Required Documents:",
      deadline: "Deadline:",
      applyBtn: "Apply on Official Portal",
      crawlerActive: "Automated Government Source Crawler Active"
    },
    chat: {
      title: "Multilingual RAG AI Assistant",
      subtitle: "Kannada, Hindi, English, Hinglish & Kanglish Auto-Detection",
      placeholder: "Ask question in Kannada, Hindi, or English...",
      welcomeMsg: "ನಮಸ್ಕಾರ / नमस्ते / Hello! I am KrishiAstra AI Assistant. Ask me any agriculture question in Kannada (ಕನ್ನಡ), Hindi (हिंदी), or English. I automatically detect your language and reply in the same language!",
      languageBadge: "Automatic Same-Language Reply"
    },
    profile: {
      title: "Farmer Profile Details",
      name: "Farmer Full Name",
      phone: "Phone Number",
      state: "State",
      district: "District",
      landAcres: "Land Area (Acres)",
      soilType: "Primary Soil Type",
      crops: "Primary Cultivated Crops",
      prefLang: "App Preferred Language",
      saveBtn: "Save Profile Changes",
      savedMsg: "Profile & Language settings saved!"
    }
  },

  kn: {
    nav: {
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      crop: "ಬೆಳೆ ಶಿಫಾರಸು",
      yield: "ಇಳುವರಿ ML",
      disease: "ರೋಗ ಪತ್ತೆ",
      indiamap: "ಭಾರತ ನಕ್ಷೆ",
      weather: "ಹವಾಮಾನ ಮತ್ತು ನೀರಾವರಿ",
      community: "ರೈತರ ಕಮ್ಯುನಿಟಿ",
      market: "ಮಾರುಕಟ್ಟೆ ದರ",
      prices: "ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
      schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
      chatbot: "AI ಸಹಾಯಕ",
      profile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
      aiLive: "AI ಸಕ್ರಿಯ",
      tagline: "ಭಾರತೀಯ ರೈತರ AI ಕೃಷಿ ವ್ಯವಸ್ಥೆ"
    },
    hero: {
      badge: "ಪಾರಂಪರಿಕ ಕೃಷಿ → AI ಆಧಾರಿತ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
      titleStart: "ಭಾರತೀಯ ಕೃಷಿಗೆ ಶಕ್ತಿ ತುಂಬುವ",
      titleHighlight: "ಕೃಷಿಅಸ್ತ್ರ AI",
      subtitle: "ನಿಮ್ಮ ಭೂಮಿಗೆ ಅನುಗುಣವಾದ ನೈಜ-ಸಮಯದ ನಿಖರ ಕೃಷಿ ಮಾಹಿತಿ. AI ಬೆಳೆ ಆಯ್ಕೆ, CNN ಎಲೆ ರೋಗ ಪತ್ತೆ, LSTM ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಕನ್ನಡ, ಹಿಂದಿ, ಇಂಗ್ಲಿಷ್ ಧ್ವನಿ ಸಹಾಯಕ.",
      sensorsOnline: "AI ಸಂವೇದಕಗಳು ಸಕ್ರಿಯವಾಗಿವೆ",
      welcome: "ಸ್ವಾಗತ,",
      cardCrop: "ಬೆಳೆ ಆಯ್ಕೆ",
      cardCropSub: "ರಾಂಡಮ್ ಫಾರೆಸ್ಟ್ ML",
      cardDisease: "ಎಲೆ ರೋಗ ಪತ್ತೆ",
      cardDiseaseSub: "CNN + OpenCV",
      cardPrices: "ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
      cardPricesSub: "LSTM ಟೈಮ್ ಸರಣಿ",
      cardIrrigation: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ",
      cardIrrigationSub: "ಮಣ್ಣಿನ ತೇವಾಂಶ & ಹವಾಮಾನ",
      cardMarket: "APMC ಮಾರುಕಟ್ಟೆ",
      cardMarketSub: "ನೈಜ ಬೆಳೆ ದರಗಳು",
      cardChat: "ಬಹುಭಾಷಾ AI ಚಾಟ್",
      cardChatSub: "ಕನ್ನಡ • हिंदी • Eng"
    },
    dashboard: {
      mandiTitle: "ನೈಜ APMC ಮಾರುಕಟ್ಟೆ ದರಗಳು",
      viewAll: "ಎಲ್ಲಾ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ನೋಡಿ",
      irrigationTitle: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ನಿರ್ಧಾರ",
      schemesTitle: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಪೋರ್ಟಲ್",
      schemesActive: "ಸಕ್ರಿಯ ಯೋಜನೆಗಳು",
      browseSchemes: "ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
      irrigationCalc: "ನೀರಾವರಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್"
    },
    crop: {
      engine: "ರಾಂಡಮ್ ಫಾರೆಸ್ಟ್ ಕ್ಲಾಸಿಫೈಯರ್ ML ಎಂಜಿನ್",
      title: "ಬೆಳೆ ಶಿಫಾರಸು ಎಂಜಿನ್",
      subtitle: "ಗರಿಷ್ಠ ಇಳುವರಿ ನೀಡುವ ಅತ್ಯುತ್ತಮ ಬೆಳೆಗಳನ್ನು ತಿಳಿಯಲು ನಿಮ್ಮ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ಮೌಲ್ಯಗಳನ್ನು (N-P-K, pH) ನಮೂದಿಸಿ.",
      blackSoil: "ಕಪ್ಪು ಮಣ್ಣು",
      redSoil: "ಕೆಂಪು ಮಣ್ಣು",
      alluvialSoil: "ಸಾರ್ವತ್ರಿಕ ಮಣ್ಣು",
      nitrogen: "ನೈಟ್ರೋಜನ್ (N)",
      phosphorus: "ರಂಜಕ (P)",
      potassium: "ಪೊಟ್ಯಾಷಿಯಂ (K)",
      temp: "ತಾಪಮಾನ (°C)",
      humidity: "ಆರ್ಧ್ರತೆ (%)",
      ph: "ಮಣ್ಣಿನ pH ಮೌಲ್ಯ",
      rainfall: "ವಾರ್ಷಿಕ ಮಳೆ (mm)",
      calculateBtn: "ಉತ್ತಮ ಬೆಳೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ",
      topCrop: "ಅತ್ಯುತ್ತಮ ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ",
      confidence: "ಸೂಕ್ತತೆ ಶೇಕಡಾವಾರು",
      growthPeriod: "ಬೆಳವಣಿಗೆಯ ಅವಧಿ",
      days: "ದಿನಗಳು",
      waterReq: "ನೀರಿನ ಅಗತ್ಯತೆ",
      nutrientAdvice: "ಪೋಷಕಾಂಶ ಮತ್ತು ಮಣ್ಣಿನ ನಿರ್ವಹಣೆ ಸಲಹೆ",
      altCrops: "ಇತರ ಸೂಕ್ತ ಬೆಳೆಗಳು",
      readyTitle: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ",
      readySub: "N-P-K ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ ಮತ್ತು 'ಉತ್ತಮ ಬೆಳೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ' ಕ್ಲಿಕ್ ಮಾಡಿ."
    },
    disease: {
      engine: "PyTorch CNN + OpenCV ವಿಷನ್ ಎಂಜಿನ್",
      title: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಆರೈಕೆ ಸಲಹೆ",
      subtitle: "ರೋಗದ ಲಕ್ಷಣಗಳು, ಹಾನಿಯ ಶೇಕಡಾವಾರು ಮತ್ತು ಸಾವಯವ/ರಾಸಾಯನಿಕ ಪರಿಹಾರಗಳನ್ನು ತಕ್ಷಣ ಪಡೆಯಲು ಬೆಳೆಯ ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      inputTitle: "ಎಲೆಯ ಫೋಟೋ ನಮೂದಿಸಿ",
      dropText: "ಬೆಳೆಯ ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
      dropSub: "JPG, PNG, WEBP ಬೆಂಬಲಿಸುತ್ತದೆ",
      runBtn: "AI ರೋಗ ಪರೀಕ್ಷೆ ಮಾಡಿ",
      testBtn: "ಮಾದರಿ ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      diagnosis: "ರೋಗದ ವಿವರಣೆ",
      aiConfidence: "AI ನಂಬಿಕೆ",
      damage: "ಹಾನಿಗೊಳಗಾದ ಭಾಗ",
      organic: "ಸಾವಯವ ಮತ್ತು ಜೈವಿಕ ಉಪಚಾರ",
      chemical: "ಶಿಫಾರಸು ಮಾಡಿದ ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ",
      readyTitle: "ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಸಿದ್ಧವಾಗಿದೆ",
      readySub: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಮಾದರಿ ಸ್ಕ್ಯಾನ್ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ."
    },
    prices: {
      engine: "LSTM ನ್ಯೂರಲ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮುನ್ಸೂಚನೆ ಎಂಜಿನ್",
      title: "30-ದಿನಗಳ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
      subtitle: "ನಿಮ್ಮ ಫಸಲನ್ನು ಮಾರಾಟ ಮಾಡಲು ಸೂಕ್ತ ಸಮಯವನ್ನು ನಿರ್ಧರಿಸಲು AI ಆಧಾರಿತ 30 ದಿನಗಳ ಬೆಲೆ ಮುನ್ಸೂಚನೆ.",
      todayPrice: "ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
      predictedPrice: "30-ದಿನಗಳ AI ನಿರೀಕ್ಷಿತ ಬೆಲೆ",
      advice: "ಮಾರಾಟ ಸಮಯದ ಸಲಹೆ",
      trendTitle: "ಬೆಲೆ ಟ್ರೆಂಡ್ ಮತ್ತು ಮುನ್ಸೂಚನೆ (₹ / ಕ್ವಿಂಟಾಲ್)"
    },
    weather: {
      engine: "Open-Meteo ಹವಾಮಾನ ಮತ್ತು ನೀರಾವರಿ AI ಎಂಜಿನ್",
      title: "ನೈಜ ಹವಾಮಾನ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ",
      subtitle: "ನಿಮ್ಮ ಹೊಲಕ್ಕೆ ಎಷ್ಟು ನೀರು ಬೇಕು ಎಂಬುದನ್ನು ನಿಖರವಾಗಿ ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ ನೀರು ಪೋಲಾಗುವುದನ್ನು ತಡೆಯಿರಿ.",
      feelsLike: "ಅನುಭವವಾಗುವ ತಾಪಮಾನ",
      humidity: "ಆರ್ಧ್ರತೆ",
      wind: "ಗಾಳಿಯ ವೇಗ",
      rain24h: "24 ಗಂಟೆಯ ಮಳೆ",
      forecast7d: "7-ದಿನಗಳ ಕೃಷಿ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
      irrTitle: "ಮಣ್ಣಿನ ತೇವಾಂಶ ಮತ್ತು ನೀರಾವರಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
      crop: "ಬೆಳೆಯ ಹೆಸರು",
      soilType: "ಮಣ್ಣಿನ ವಿಧ",
      moisture: "ಪ್ರಸ್ತುತ ಮಣ್ಣಿನ ತೇವಾಂಶ (%)",
      forecastRain: "ಮುಂದಿನ 48 ಗಂಟೆಯ ಮಳೆ ಮುನ್ಸೂಚನೆ (mm)",
      calculateBtn: "ನೀರಿನ ಅಗತ್ಯತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ",
      recAction: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
      volumeReq: "ಎಕರೆಗೆ ಅಗತ್ಯವಿರುವ ನೀರಿನ ಪ್ರಮಾಣ",
      nextCheck: "ಮುಂದಿನ ತೇವಾಂಶ ತಪಾಸಣೆ"
    },
    market: {
      engine: "ಅಗ್‌ಮಾರ್ಕ್‌ನೆಟ್ APMC ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
      title: "APMC ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಮಾರಾಟ ಮಾಹಿತಿ",
      subtitle: "ಹೆಚ್ಚಿನ ಬೆಲೆಗೆ ಫಸಲನ್ನು ಮಾರಾಟ ಮಾಡಲು ಭಾರತದ ವಿವಿಧ APMC ಮಾರುಕಟ್ಟೆ ದರಗಳನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ.",
      searchPlaceholder: "ಬೆಳೆಯನ್ನು ಹುಡುಕಿ (ಉದಾ: ಟೊಮೆಟೊ)...",
      allStates: "ಎಲ್ಲಾ ರಾಜ್ಯಗಳು",
      topGainers: "ಇಂದು ಹೆಚ್ಚಿನ ಬೆಲೆ ಏರಿಕೆ ಕಂಡ ಮಾರುಕಟ್ಟೆಗಳು",
      cropHeader: "ಬೆಳೆ",
      mandiHeader: "ಮಾರುಕಟ್ಟೆ ಹೆಸರು",
      stateHeader: "ರಾಜ್ಯ",
      minHeader: "ಕನಿಷ್ಠ ದರ",
      maxHeader: "ಗರಿಷ್ಠ ದರ",
      modalHeader: "ಸರಾಸರಿ ಬೆಲೆ",
      trendHeader: "ಬೆಲೆ ಬದಲಾವಣೆ"
    },
    schemes: {
      engine: "ಖಾತರಿಪಡಿಸಿದ ಭಾರತೀಯ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
      title: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ನೇರ ನೆರವು",
      subtitle: "ಅರ್ಹತಾ ಮಾನದಂಡಗಳು, ಅಗತ್ಯ ದಾಖಲೆಗಳು ಮತ್ತು ಅಧಿಕೃತ ಅರ್ಜಿ ಲಿಂಕ್‌ಗಳೊಂದಿಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು.",
      all: "ಎಲ್ಲಾ",
      eligibility: "ಅರ್ಹತೆ:",
      documents: "ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು:",
      deadline: "ಕೊನೆಯ ದಿನಾಂಕ:",
      applyBtn: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
      crawlerActive: "ಸರ್ಕಾರಿ ಸುದ್ದಿ ಸ್ವಯಂಚಾಲಿತ ಅಪ್‌ಡೇಟ್ ಸಕ್ರಿಯವಾಗಿದೆ"
    },
    chat: {
      title: "ಬಹುಭಾಷಾ AI ಕೃಷಿ ಸಹಾಯಕ",
      subtitle: "ಕನ್ನಡ, ಹಿಂದಿ, ಇಂಗ್ಲಿಷ್ ಸ್ವಯಂಚಾಲಿತ ಭಾಷಾ ಪತ್ತೆ",
      placeholder: "ಕನ್ನಡ, ಹಿಂದಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಪ್ರಶ್ನೆ ಕೇಳಿ...",
      welcomeMsg: "ನಮಸ್ಕಾರ ರೈತ ಬಂಧುವೇ! ನಾನು ಕೃಷಿಅಸ್ತ್ರ AI ಸಹಾಯಕ. ನೀವು ಕನ್ನಡ, ಹಿಂದಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಯಾವುದೇ ಕೃಷಿ ಪ್ರಶ್ನೆ ಕೇಳಬಹುದು, ನಾನು ಅದೇ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರ ನೀಡುತ್ತೇನೆ!",
      languageBadge: "ಸ್ವಯಂಚಾಲಿತ ಸಮಾನ ಭಾಷೆಯ ಉತ್ತರ"
    },
    profile: {
      title: "ರೈತರ ವಿವರಗಳು",
      name: "ರೈತರ ಪೂರ್ಣ ಹೆಸರು",
      phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      state: "ರಾಜ್ಯ",
      district: "ಜಿಲ್ಲೆ",
      landAcres: "ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೆ)",
      soilType: "ಮಣ್ಣಿನ ವಿಧ",
      crops: "ಪ್ರಮುಖ ಬೆಳೆಗಳು",
      prefLang: "ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆ ಆಯ್ಕೆ",
      saveBtn: "ವಿವರಗಳನ್ನು ಉಳಿಸಿ",
      savedMsg: "ನಿಮ್ಮ ವಿವರಗಳು ಮತ್ತು ಭಾಷೆ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!"
    }
  },

  hi: {
    nav: {
      dashboard: "डैशबोर्ड",
      crop: "फसल सिफारिश",
      yield: "पैदावार ML",
      disease: "रोग पहचान",
      indiamap: "भारत नक्शा",
      weather: "मौसम और सिंचाई",
      community: "किसान समुदाय",
      market: "मंडी भाव",
      prices: "मूल्य पूर्वानुमान",
      schemes: "सरकारी योजनाएं",
      chatbot: "AI सहायक",
      profile: "प्रोफाइल",
      aiLive: "AI लाइव",
      tagline: "भारतीय किसानों का AI स्मार्ट कृषि तंत्र"
    },
    hero: {
      badge: "पारंपरिक खेती → AI संचालित स्मार्ट खेती",
      titleStart: "भारतीय कृषि को सशक्त बनाता",
      titleHighlight: "कृषिअस्त्र AI",
      subtitle: "आपकी भूमि के लिए सटीक और वास्तविक समय की कृषि जानकारी। AI फसल चयन, CNN पत्ता रोग पहचान, और कन्नड़, हिंदी, अंग्रेजी में आवाज सहायक।",
      sensorsOnline: "AI सेंसर ऑनलाइन हैं",
      welcome: "स्वागत है,",
      cardCrop: "फसल चयन",
      cardCropSub: "रैंडम फॉरेस्ट ML",
      cardDisease: "पत्ता रोग स्कैन",
      cardDiseaseSub: "CNN + OpenCV",
      cardPrices: "मूल्य पूर्वानुमान",
      cardPricesSub: "LSTM टाइम सीरीज़",
      cardIrrigation: "स्मार्ट सिंचाई",
      cardIrrigationSub: "नमी और मौसम",
      cardMarket: "APMC मंडी",
      cardMarketSub: "लाइव फसल भाव",
      cardChat: "बहुभाषी AI चैट",
      cardChatSub: "ಕನ್ನಡ • हिंदी • Eng"
    },
    dashboard: {
      mandiTitle: "लाइव APMC मंडी भाव",
      viewAll: "सभी मंडियां देखें",
      irrigationTitle: "स्मार्ट सिंचाई निर्णय",
      schemesTitle: "सरकारी योजनाएं पोर्टल",
      schemesActive: "सक्रिय योजनाएं",
      browseSchemes: "योजनाएं देखें",
      irrigationCalc: "सिंचाई कैलकुलेटर"
    },
    crop: {
      engine: "रैंडम फॉरेस्ट क्लासिफायर ML इंजन",
      title: "फसल सिफारिश इंजन",
      subtitle: "अधिकतम पैदावार देने वाली सर्वोत्तम फसलों की जानकारी के लिए अपनी मिट्टी के परीक्षण मान (N-P-K, pH) दर्ज करें।",
      blackSoil: "काली मिट्टी",
      redSoil: "लाल मिट्टी",
      alluvialSoil: "जलोढ़ मिट्टी",
      nitrogen: "नाइट्रोजन (N)",
      phosphorus: "फास्फोरस (P)",
      potassium: "पोटेशियम (K)",
      temp: "तापमान (°C)",
      humidity: "आर्द्रता (%)",
      ph: "मिट्टी का pH मान",
      rainfall: "वार्षिक वर्षा (mm)",
      calculateBtn: "सर्वोत्तम फसल की गणना करें",
      topCrop: "सर्वोत्तम अनुशंसित फसल",
      confidence: "उपयुक्तता प्रतिशत",
      growthPeriod: "अवधि",
      days: "दिन",
      waterReq: "जल आवश्यकता",
      nutrientAdvice: "पोषक तत्व और मृदा प्रबंधन सलाह",
      altCrops: "अन्य उपयुक्त फसलें",
      readyTitle: "मृदा विश्लेषण के लिए तैयार",
      readySub: "N-P-K मान दर्ज करें और 'सर्वोत्तम फसल की गणना करें' पर क्लिक करें।"
    },
    disease: {
      engine: "PyTorch CNN + OpenCV विजन इंजन",
      title: "फसल रोग पहचान और देखभाल सलाह",
      subtitle: "रोग के लक्षण, प्रभावित क्षेत्र प्रतिशत और जैविक/रासायनिक उपचार तुरंत प्राप्त करने के लिए पत्ते की फोटो अपलोड करें।",
      inputTitle: "पत्ते की फोटो दर्ज करें",
      dropText: "फसल के पत्ते की फोटो अपलोड करने के लिए क्लिक करें",
      dropSub: "JPG, PNG, WEBP समर्थित",
      runBtn: "AI रोग जांच करें",
      testBtn: "नमूना स्कैन जांचें",
      diagnosis: "रोग का नाम",
      aiConfidence: "AI सटीकता",
      damage: "क्षतिग्रस्त क्षेत्र",
      organic: "जैविक उपचार",
      chemical: "रासायनिक छिड़काव अनुसूची",
      readyTitle: "स्कैन के लिए तैयार",
      readySub: "फोटो अपलोड करें या नमूना स्कैन बटन पर क्लिक करें।"
    },
    prices: {
      engine: "LSTM न्यूरल मंडी मूल्य पूर्वानुमान इंजन",
      title: "30-दिवसीय मंडी मूल्य पूर्वानुमान",
      subtitle: "फसल बेचने के सही समय का चयन करने के लिए AI आधारित 30-दिवसीय मूल्य पूर्वानुमान।",
      todayPrice: "आज का मंडी भाव",
      predictedPrice: "30-दिवसीय AI अनुमानित भाव",
      advice: "बिक्री समय सलाह",
      trendTitle: "मूल्य रुझान और पूर्वानुमान (₹ / क्विंटल)"
    },
    weather: {
      engine: "Open-Meteo मौसम और सिंचाई AI इंजन",
      title: "लाइव मौसम और स्मार्ट सिंचाई",
      subtitle: "पानी की बर्बादी को रोकने के लिए अपनी फसल की सटीक सिंचाई आवश्यकता की गणना करें।",
      feelsLike: "महसूस होने वाला तापमान",
      humidity: "नमी",
      wind: "हवा की गति",
      rain24h: "24 घंटे की बारिश",
      forecast7d: "7-दिवसीय कृषि मौसम पूर्वानुमान",
      irrTitle: "मृदा नमी और सिंचाई कैलकुलेटर",
      crop: "फसल का नाम",
      soilType: "मिट्टी का प्रकार",
      moisture: "वर्तमान मिट्टी नमी (%)",
      forecastRain: "अगले 48 घंटे बारिश पूर्वानुमान (mm)",
      calculateBtn: "पानी की आवश्यकता निकालें",
      recAction: "अनुशंसित कार्रवाई",
      volumeReq: "प्रति एकड़ आवश्यक जल मात्रा",
      nextCheck: "अगली नमी जांच"
    },
    market: {
      engine: "एगमार्कनेट APMC मंडी गुप्त जानकारी",
      title: "APMC मंडी दरें और बिक्री रुझान",
      subtitle: "उच्चतम मूल्य प्राप्त करने के लिए भारत की विभिन्न मंडियों के भावों की तुलना करें।",
      searchPlaceholder: "फसल खोजें (जैसे टमाटर)...",
      allStates: "सभी राज्य",
      topGainers: "आज सबसे ज्यादा बढ़त वाली मंडियां",
      cropHeader: "फसल",
      mandiHeader: "मंडी का नाम",
      stateHeader: "राज्य",
      minHeader: "न्यूनतम भाव",
      maxHeader: "अधिकतम भाव",
      modalHeader: "औसत भाव",
      trendHeader: "बदलाव"
    },
    schemes: {
      engine: "सत्यापित भारतीय सरकारी योजनाएं पोर्टल",
      title: "सरकारी योजनाएं और प्रत्यक्ष लाभ",
      subtitle: "पात्रता मानदंड, आवश्यक दस्तावेज और आधिकारिक आवेदन लिंक के साथ सरकारी योजनाएं।",
      all: "सभी",
      eligibility: "पात्रता:",
      documents: "आवश्यक दस्तावेज:",
      deadline: "अंतिम तिथि:",
      applyBtn: "आधिकारिक पोर्टल पर आवेदन करें",
      crawlerActive: "सरकारी पोर्टल लाइव अपडेट सक्रिय है"
    },
    chat: {
      title: "बहुभाषी AI कृषि सहायक",
      subtitle: "कन्नड़, हिंदी, अंग्रेजी स्वचालित भाषा पहचान",
      placeholder: "कन्नड़, हिंदी या अंग्रेजी में सवाल पूछें...",
      welcomeMsg: "नमस्कार किसान भाई! मैं कृषिअस्त्र AI सहायक हूं। आप कन्नड़, हिंदी या अंग्रेजी में कोई भी सवाल पूछ सकते हैं, मैं उसी भाषा में उत्तर दूंगा!",
      languageBadge: "स्वचालित समान भाषा उत्तर"
    },
    profile: {
      title: "किसान विवरण",
      name: "किसान का पूरा नाम",
      phone: "फोन नंबर",
      state: "राज्य",
      district: "जिला",
      landAcres: "जमीन (एकड़)",
      soilType: "मिट्टी का प्रकार",
      crops: "मुख्य फसलें",
      prefLang: "ऐप भाषा चुनें",
      saveBtn: "विवरण सहेजें",
      savedMsg: "आपकी भाषा और विवरण सफलतापूर्वक सहेजे गए!"
    }
  }
};
