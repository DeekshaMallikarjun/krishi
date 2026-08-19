import React, { useState } from 'react';
import { predictYield } from '../services/api';
import { YieldPredictionResult } from '../types';
import { TrendingUp, Sparkles, Scale, Info, Loader2, ArrowRight, ShieldCheck, AlertCircle, BarChart3, Calendar, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const YieldPredictionPage: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    crop: 'Rice / Paddy',
    state: 'Karnataka',
    district: 'Mandya',
    month: 'July',
    soil_type: 'Red Loam',
    area_acres: 3.5,
    rainfall_mm: 900.0,
    temperature_c: 28.0,
    n_kg_ha: 90.0,
    p_kg_ha: 40.0,
    k_kg_ha: 40.0
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<YieldPredictionResult | null>(null);

  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const cropsList = [
    // Cereals
    'Rice / Paddy', 'Wheat', 'Maize (Corn)', 'Barley', 'Oats', 'Rye',
    'Sorghum (Jowar)', 'Pearl Millet (Bajra)', 'Finger Millet (Ragi)', 'Foxtail Millet',
    // Pulses & Legumes
    'Chickpea (Gram)', 'Pigeon Pea (Arhar / Tur)', 'Green Gram (Moong)', 'Black Gram (Urad)',
    'Lentil (Masoor)', 'Pea (Green / Field Pea)', 'Soybean', 'Cowpea (Lobia)', 'Kidney Bean (Rajma)',
    // Oilseeds
    'Groundnut (Peanut)', 'Mustard (Rapeseed)', 'Sunflower', 'Sesame (Til)', 'Safflower (Kardi)', 'Castor', 'Linseed (Flaxseed)',
    // Vegetables
    'Tomato', 'Potato', 'Onion', 'Garlic', 'Carrot', 'Radish', 'Cabbage', 'Cauliflower',
    'Okra (Bhindi / Ladyfinger)', 'Brinjal (Eggplant)', 'Chilli (Green & Red)', 'Cucumber',
    'Bottle Gourd (Lauki)', 'Bitter Gourd (Karela)', 'Spinach (Palak)',
    // Fruits
    'Mango', 'Banana', 'Apple', 'Papaya', 'Pomegranate', 'Watermelon', 'Grapes', 'Guava',
    // Spices
    'Turmeric', 'Ginger', 'Black Pepper', 'Cardamom (Green)', 'Coriander (Dhania)', 'Cumin (Jeera)',
    // Commercial & Plantation
    'Cotton', 'Sugarcane', 'Tea', 'Coffee (Arabica & Robusta)', 'Jute', 'Cocoa', 'Rubber (Natural)',
    // Flowers & Ornamentals
    'Marigold', 'Rose', 'Jasmine (Mogra)', 'Chrysanthemum',
    // Medicinal & Aromatic
    'Aloe Vera', 'Ashwagandha (Indian Ginseng)', 'Tulsi (Holy Basil)', 'Lemongrass', 'Neem',
    // Fodder & Agroforestry
    'Alfalfa (Lucerne)', 'Hybrid Napier Grass', 'Berseem (Egyptian Clover)', 'Teak', 'Bamboo', 'Sandalwood'
  ];

  const statesList = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi (NCT)', 'Jammu and Kashmir'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await predictYield(form);
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.response?.data?.detail || "Failed to calculate yield prediction. Please verify farm inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Golden Harvest Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920')` }}
      />

      {/* Hero Header Banner with Golden Harvest Theme */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-emerald-950/95 via-gray-900/90 to-teal-950/95 p-8 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <TrendingUp className="w-4 h-4" /> Calendar Month-Calibrated ML Yield Forecast Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Crop Yield & Production Forecasting
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
              Predict harvest yield in <span className="text-emerald-400 font-bold">tonnes/hectare</span> and calculate total production across all <span className="text-amber-300 font-bold">12 calendar months (January–December)</span> using machine learning trained on global agricultural baselines.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-4 py-2 rounded-2xl text-xs font-bold text-emerald-300 shadow-lg backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>RandomForest Regressor (Month-Calibrated)</span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-3 backdrop-blur-md">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Parameters Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-gray-900/85 border border-gray-800 p-6 rounded-3xl space-y-4 backdrop-blur-md shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Farm Parameters & Sowing Conditions
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Select Crop</label>
              <select
                value={form.crop}
                onChange={(e) => setForm({ ...form, crop: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs font-bold text-emerald-400 outline-none focus:border-emerald-500"
              >
                {cropsList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">State</label>
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 outline-none focus:border-emerald-500"
              >
                {statesList.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">District</label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                placeholder="District name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Sowing Month
              </label>
              <select
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                className="w-full bg-gray-950 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold outline-none focus:border-amber-500"
              >
                {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Soil Type</label>
              <select
                value={form.soil_type}
                onChange={(e) => setForm({ ...form, soil_type: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none focus:border-emerald-500"
              >
                {['Red Loam', 'Black Cotton', 'Alluvial', 'Clay Loam', 'Laterite', 'Sandy Loam', 'Coastal Alluvial', 'Mountain Soil'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Farm Area (Acres)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="1000"
                value={form.area_acres}
                onChange={(e) => setForm({ ...form, area_acres: parseFloat(e.target.value) || 1 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Expected Rainfall (mm)</label>
              <input
                type="number"
                value={form.rainfall_mm}
                onChange={(e) => setForm({ ...form, rainfall_mm: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Mean Temp (°C)</label>
              <input
                type="number"
                step="0.5"
                value={form.temperature_c}
                onChange={(e) => setForm({ ...form, temperature_c: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">N (kg/ha)</label>
              <input
                type="number"
                value={form.n_kg_ha}
                onChange={(e) => setForm({ ...form, n_kg_ha: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-2 py-1.5 text-xs text-emerald-400 font-bold outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">P (kg/ha)</label>
              <input
                type="number"
                value={form.p_kg_ha}
                onChange={(e) => setForm({ ...form, p_kg_ha: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-2 py-1.5 text-xs text-emerald-400 font-bold outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">K (kg/ha)</label>
              <input
                type="number"
                value={form.k_kg_ha}
                onChange={(e) => setForm({ ...form, k_kg_ha: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-2 py-1.5 text-xs text-emerald-400 font-bold outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
            <span>Calculate {form.month} Yield Forecast</span>
          </button>
        </form>

        {/* Prediction Results & Metrics Output */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="bg-gray-900/90 border border-emerald-500/50 p-6 rounded-3xl space-y-6 backdrop-blur-md shadow-2xl animate-fadeIn">
              
              {/* Highlight Harvest Yield & Total Production Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-950/90 to-teal-950/90 border border-emerald-400/40">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    <span>{result.crop} • {result.month}</span>
                  </div>
                  <div className="text-3xl font-black text-white mt-1">
                    {result.predicted_yield_t_ha} <span className="text-sm font-normal text-emerald-300">tonnes / hectare</span>
                  </div>
                  <div className="text-[11px] text-gray-300 mt-1">
                    Yield Range: <span className="font-semibold text-amber-300">{result.yield_range_t_ha[0]} – {result.yield_range_t_ha[1]} t/ha</span>
                  </div>
                </div>

                <div className="border-t sm:border-t-0 sm:border-l border-emerald-800/60 pt-3 sm:pt-0 sm:pl-4">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Estimated Total Production</span>
                  <div className="text-3xl font-black text-amber-300 mt-1">
                    {result.total_production_tonnes} <span className="text-sm font-normal text-amber-200">total tonnes</span>
                  </div>
                  <div className="text-[11px] text-gray-300 mt-1">
                    Farm Area: <span className="font-semibold text-white">{result.area_acres} Acres ({result.area_hectares} Ha)</span>
                  </div>
                </div>
              </div>

              {/* Model Performance Evaluation Metrics Card */}
              <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-300 border-b border-gray-800 pb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <BarChart3 className="w-4 h-4" /> ML Model Performance & Validation Metrics
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    {result.evaluation_metrics.n_samples} Historical Multi-Month Samples
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                  <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="text-xs text-gray-400">R² Accuracy Score</div>
                    <div className="text-base font-black text-emerald-400">{result.evaluation_metrics.r2_score}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="text-xs text-gray-400">MAE (Mean Abs Error)</div>
                    <div className="text-base font-black text-amber-400">{result.evaluation_metrics.mae} t/ha</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="text-xs text-gray-400">RMSE (Root Sq Error)</div>
                    <div className="text-base font-black text-teal-400">{result.evaluation_metrics.rmse} t/ha</div>
                  </div>
                </div>
              </div>

              {/* Agronomic Guidance */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/40 text-xs text-emerald-200 space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> Agronomic Optimization Tip:
                </span>
                <p className="leading-relaxed opacity-90">{result.agronomic_advice}</p>
              </div>

              {/* Realistic Disclaimer */}
              <div className="p-3.5 rounded-xl bg-gray-950/60 border border-gray-800 text-[11px] text-gray-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{result.disclaimer}</span>
              </div>

            </div>
          ) : (
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center text-gray-400 space-y-4">
              <TrendingUp className="w-12 h-12 text-emerald-500/40 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-gray-300">Ready for Yield Forecasting</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Select your crop, sowing month (January–December), location, acreage, and soil nutrients to generate ML yield predictions (t/ha) and total production estimates.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
