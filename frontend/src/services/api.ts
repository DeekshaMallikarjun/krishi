import axios from 'axios';
import {
  FarmerProfile, CropRecommendationInput, CropRecommendationResult,
  CropRecommendationInputV2, CropRecommendationResultV2,
  YieldPredictionInput, YieldPredictionResult, IndiaAgriMapData,
  CommunityPost, CommunityComment, CommunitySummary,
  DiseaseDetectionResult, PricePredictionResult, WeatherData,
  IrrigationInput, IrrigationResult, MandiPrice, GovernmentScheme
} from '../types';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchStatesDistricts = async (): Promise<Record<string, string[]>> => {
  const res = await API.get('/location/states-districts');
  return res.data;
};

export const fetchLocationByGps = async (lat: number, lon: number): Promise<{ state: string; district: string; distance_km: number }> => {
  const res = await API.post(`/location/gps?lat=${lat}&lon=${lon}`);
  return res.data;
};

export const fetchIndiaAgriMap = async (state: string, district?: string): Promise<IndiaAgriMapData> => {
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (district) params.append('district', district);
  const res = await API.get(`/india-agri-map?${params.toString()}`);
  return res.data;
};

export const predictCropV2 = async (input: CropRecommendationInputV2): Promise<CropRecommendationResultV2> => {
  const res = await API.post('/recommend-crop-v2', input);
  return res.data;
};

export const predictYield = async (input: YieldPredictionInput): Promise<YieldPredictionResult> => {
  const res = await API.post('/predict-yield', input);
  return res.data;
};

export const fetchCommunityPosts = async (state?: string, district?: string, cropTag?: string, search?: string): Promise<CommunityPost[]> => {
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (district) params.append('district', district);
  if (cropTag) params.append('crop_tag', cropTag);
  if (search) params.append('search', search);
  const res = await API.get(`/community/posts?${params.toString()}`);
  return res.data;
};

export const createCommunityPost = async (data: { farmer_name?: string; state?: string; district?: string; crop_tag?: string; title: string; content: string; image_url?: string }): Promise<CommunityPost> => {
  const res = await API.post('/community/posts', data);
  return res.data;
};

export const addCommunityComment = async (postId: number, data: { farmer_name?: string; comment_text: string }): Promise<CommunityComment> => {
  const res = await API.post(`/community/posts/${postId}/comments`, data);
  return res.data;
};

export const votePostHelpful = async (postId: number) => {
  const res = await API.post(`/community/posts/${postId}/helpful`);
  return res.data;
};

export const reportPost = async (postId: number) => {
  const res = await API.post(`/community/posts/${postId}/report`);
  return res.data;
};

export const fetchCommunityAiSummary = async (): Promise<CommunitySummary> => {
  const res = await API.get('/community/ai-summary');
  return res.data;
};

export const fetchFarmerProfile = async (): Promise<FarmerProfile> => {
  const res = await API.get('/farmer-profile');
  return res.data;
};

export const updateFarmerProfile = async (data: FarmerProfile): Promise<FarmerProfile> => {
  const res = await API.post('/farmer-profile', data);
  return res.data;
};

export const predictCrop = async (input: CropRecommendationInput): Promise<CropRecommendationResult> => {
  const res = await API.post('/recommend-crop', input);
  return res.data;
};

export const detectDisease = async (file?: File, cropHint?: string): Promise<DiseaseDetectionResult> => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  if (cropHint) {
    formData.append('crop_hint', cropHint);
  }
  const res = await API.post('/detect-disease', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const fetchPriceForecast = async (crop: string, state: string, mandi?: string): Promise<PricePredictionResult> => {
  const res = await API.post('/predict-price', { crop, state, mandi });
  return res.data;
};

export const fetchLiveWeather = async (location: string = 'mandya'): Promise<WeatherData> => {
  const res = await API.get(`/weather?location=${encodeURIComponent(location)}`);
  return res.data;
};

export const fetchIrrigationAdvice = async (input: IrrigationInput): Promise<IrrigationResult> => {
  const res = await API.post('/calculate-irrigation', input);
  return res.data;
};

export const fetchMarketPrices = async (state?: string, crop?: string): Promise<{ mandi_prices: MandiPrice[]; top_gainers: MandiPrice[] }> => {
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (crop) params.append('crop', crop);
  const res = await API.get(`/market-intelligence?${params.toString()}`);
  return res.data;
};

export const fetchGovernmentSchemes = async (category?: string, query?: string): Promise<{ schemes: GovernmentScheme[]; total_count: number }> => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (query) params.append('query', query);
  const res = await API.get(`/government-schemes?${params.toString()}`);
  return res.data;
};

export const monitorSchemeUpdates = async () => {
  const res = await API.get('/trigger-source-monitor');
  return res.data;
};

export const sendChatMessage = async (
  message: string,
  overrideLang?: string,
  locationContext?: any,
  conversationHistory?: any[]
) => {
  const res = await API.post('/chat', {
    message,
    user_language_override: overrideLang,
    location_context: locationContext,
    conversation_history: conversationHistory
  });
  return res.data;
};

export const fetchDashboardSummary = async () => {
  const res = await API.get('/dashboard-summary');
  return res.data;
};

