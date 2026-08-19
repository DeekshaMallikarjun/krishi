export interface FarmerProfile {
  name: string;
  phone: string;
  state: string;
  district: string;
  land_acres: number;
  soil_type: string;
  primary_crops: string;
  preferred_language: string;
}

export interface CropRecommendationInput {
  n: number;
  p: number;
  k: number;
  temp: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface CropRank {
  crop: string;
  score: number;
}

export interface CropRecommendationResult {
  recommended_crop: string;
  confidence: number;
  nitrogen_advice: string;
  phosphorus_advice: string;
  potassium_advice: string;
  growth_period_days: number;
  water_requirement: string;
  top_crops: CropRank[];
}

export interface ChemicalTreatmentDetail {
  active_ingredient: string;
  formulation: string;
  dosage: string;
  application_guidance: string;
  safety_precautions: string[];
  pre_harvest_interval: string;
  disclaimer: string;
}

export interface CauseFactors {
  pathogen_type: string;
  weather_factors: string;
  soil_irrigation_factors: string;
  farming_practices: string;
  spread_mechanism: string;
}

export interface SymptomsBreakdown {
  leaf_symptoms: string;
  stem_fruit_symptoms: string;
  early_stage: string;
  severe_stage: string;
  manual_identification_guide: string;
}

export interface NutrientManagement {
  npk_guidance: string;
  micronutrients: string;
  organic_soil_inputs: string;
  deficiency_vs_disease_note: string;
}

export interface RecoveryMonitoring {
  improvement_signs: string;
  inspection_interval: string;
  severe_warning_signs: string;
  seek_expert_guidance: string;
}

export interface DiseaseDetectionResult {
  crop_name: string;
  botanical_name?: string;
  crop_category?: string;
  disease_name: string;
  pathogen_scientific_name?: string;
  confidence?: number | null;
  affected_percentage: number;
  severity_level?: 'Low' | 'Moderate' | 'Severe' | 'None' | string;
  status: string;
  symptoms?: string;
  
  // 14-Pillar Comprehensive Report
  causes?: CauseFactors;
  symptoms_detail?: SymptomsBreakdown;
  immediate_actions?: string[];
  organic_treatment: string[];
  chemical_treatment_detail?: ChemicalTreatmentDetail;
  chemical_treatment: string[];
  nutrient_management?: NutrientManagement;
  prevention_measures?: string[];
  preventive_care: string[];
  what_not_to_do?: string[];
  recovery_monitoring?: RecoveryMonitoring;
  
  segmentation_mask_base64?: string;
  is_valid_leaf?: boolean;
  uncertainty_notice?: string | null;
}

export interface HistoricalPrice {
  date: string;
  price_per_quintal: number;
}

export interface ForecastPrice {
  date: string;
  predicted_price: number;
  lower_bound: number;
  upper_bound: number;
}

export interface PricePredictionResult {
  crop: string;
  state: string;
  mandi: string;
  current_price: number;
  predicted_30d_price: number;
  change_percentage: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  recommendation: string;
  historical: HistoricalPrice[];
  forecast: ForecastPrice[];
}

export interface DailyForecast {
  day: string;
  temp_max: number;
  temp_min: number;
  rain_mm: number;
  rain_prob_pct: number;
}

export interface WeatherData {
  location: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  rainfall_24h: number;
  weather_condition: string;
  icon: string;
  forecast_7days: DailyForecast[];
  agricultural_alert?: string;
}

export interface IrrigationInput {
  crop: string;
  soil_type: string;
  soil_moisture_pct: number;
  current_temp: number;
  forecast_rain_mm: number;
}

export interface IrrigationResult {
  decision: 'IRRIGATE NOW' | 'IRRIGATE LATER' | 'NOT REQUIRED';
  water_volume_liters_per_acre: number;
  urgency_level: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
  reasoning: string;
  next_check_hours: number;
}

export interface MandiPrice {
  mandi: string;
  district: string;
  state: string;
  crop: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  unit: string;
  change_pct: number;
  trend: string;
}

export interface GovernmentScheme {
  id?: number;
  title: string;
  category: string;
  authority: string;
  benefit_summary: string;
  eligibility: string;
  documents_required: string[];
  deadline: string;
  official_link: string;
  is_new: boolean;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  detected_language?: string;
  language_display?: string;
  speech_lang_tag?: string;
  sources?: { title: string; excerpt: string }[];
  timestamp: string;
}

export interface CropV2Detail {
  crop: string;
  suitability_score: number;
  duration_days: number;
  water_requirement: string;
  expected_yield_t_ha: number;
  yield_range: [number, number];
  seasons: string[];
  description: string;
}

export interface CropRecommendationInputV2 {
  state: string;
  district: string;
  season: string;
  soil_type: string;
  n: number;
  p: number;
  k: number;
  temp: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface CropRecommendationResultV2 {
  state: string;
  district: string;
  season: string;
  soil_type: string;
  recommended_crop: string;
  confidence: number;
  nitrogen_advice: string;
  phosphorus_advice: string;
  potassium_advice: string;
  explanation: string;
  growth_period_days: number;
  water_requirement: string;
  expected_yield_t_ha: number;
  top_crops: CropV2Detail[];
}

export interface YieldPredictionInput {
  crop: string;
  state: string;
  district?: string;
  month: string;
  soil_type: string;
  area_acres: number;
  rainfall_mm: number;
  temperature_c: number;
  n_kg_ha: number;
  p_kg_ha: number;
  k_kg_ha: number;
}

export interface YieldPredictionResult {
  crop: string;
  state: string;
  district: string;
  month: string;
  area_acres: number;
  area_hectares: number;
  predicted_yield_t_ha: number;
  total_production_tonnes: number;
  yield_range_t_ha: [number, number];
  total_production_range_tonnes: [number, number];
  evaluation_metrics: {
    model_name: string;
    mae: number;
    rmse: number;
    r2_score: number;
    n_samples: number;
  };
  agronomic_advice: string;
  disclaimer: string;
}

export interface IndiaAgriMapData {
  state: string;
  district: string;
  primary_soil: string;
  kharif_crops: CropV2Detail[];
  rabi_crops: CropV2Detail[];
  zaid_crops: CropV2Detail[];
  avg_annual_rainfall_mm: number;
  major_commodities: string[];
}

export interface CommunityComment {
  id: number;
  post_id: number;
  farmer_name: string;
  comment_text: string;
  created_at: string;
}

export interface CommunityPost {
  id: number;
  farmer_name: string;
  state: string;
  district: string;
  crop_tag: string;
  title: string;
  content: string;
  image_url?: string;
  helpful_count: number;
  comments_count: number;
  created_at: string;
  comments: CommunityComment[];
}

export interface CommunitySummary {
  total_posts: number;
  active_districts: string[];
  popular_crops: string[];
  ai_summary_verified_facts: string[];
  farmer_community_opinions: string[];
}

