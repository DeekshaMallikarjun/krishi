import React, { useState, useEffect } from 'react';
import { fetchStatesDistricts, fetchLocationByGps, predictCropV2 } from '../services/api';
import { CropRecommendationResultV2 } from '../types';
import { Sprout, Sparkles, CheckCircle2, Info, Loader2, ArrowRight, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CropRecommendationPage: React.FC = () => {
  const { t } = useLanguage();
  const [statesDistricts, setStatesDistricts] = useState<Record<string, string[]>>({});
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);

  const [form, setForm] = useState({
    state: 'Karnataka',
    district: 'Mandya',
    town: '',
    season: 'Kharif',
    soil_type: 'Red Loam',
    n: 90.0,
    p: 40.0,
    k: 40.0,
    temp: 26.0,
    humidity: 70.0,
    ph: 6.5,
    rainfall: 850.0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CropRecommendationResultV2 | null>(null);

  useEffect(() => {
    loadStates();
  }, []);

  const loadStates = async () => {
    try {
      const data = await fetchStatesDistricts();
      setStatesDistricts(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    const districts = statesDistricts[newState] || [];
    setForm(prev => ({
      ...prev,
      state: newState,
      district: districts.length > 0 ? districts[0] : ''
    }));
  };

  const handleUseGps = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const loc = await fetchLocationByGps(pos.coords.latitude, pos.coords.longitude);
          setForm(prev => ({
            ...prev,
            state: loc.state,
            district: loc.district,
            town: `GPS (${loc.distance_km} km match)`
          }));
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        setLoadingLocation(false);
        alert("GPS detection fallback: Selected nearest district.");
      }
    );
  };

  const applySoilPreset = (type: string) => {
    if (type === 'black') {
      setForm(prev => ({ ...prev, soil_type: 'Black Cotton', n: 115, p: 48, k: 50, temp: 28.0, humidity: 60.0, ph: 7.8, rainfall: 85.0 }));
    } else if (type === 'red') {
      setForm(prev => ({ ...prev, soil_type: 'Red Loam', n: 45, p: 35, k: 40, temp: 26.5, humidity: 65.0, ph: 6.2, rainfall: 140.0 }));
    } else if (type === 'alluvial') {
      setForm(prev => ({ ...prev, soil_type: 'Alluvial', n: 105, p: 55, k: 42, temp: 21.0, humidity: 75.0, ph: 6.8, rainfall: 180.0 }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await predictCropV2(form);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Agriculture Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=1920')` }}
      />
      
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-emerald-950/95 via-gray-900/90 to-teal-950/95 p-8 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <Sprout className="w-4 h-4" /> India-Wide Agro-Climatic Recommendation Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Smart Crop Suitability & Recommendation
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
              India-wide location support across all 28 States, 8 UTs, and GPS geocoding. Evaluates <span className="text-emerald-400 font-bold">soil, NPK, pH, temperature, humidity, rainfall, location, and season (Kharif, Rabi, Zaid)</span> to recommend top 3–5 optimal crops with suitability scores, duration, water requirements, and expected yields.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => applySoilPreset('black')} className="px-3 py-1.5 rounded-xl bg-gray-950/80 hover:bg-gray-800 text-xs text-emerald-300 border border-emerald-500/40 font-semibold shadow-md">
              Black Cotton Soil
            </button>
            <button onClick={() => applySoilPreset('red')} className="px-3 py-1.5 rounded-xl bg-gray-950/80 hover:bg-gray-800 text-xs text-amber-300 border border-amber-500/40 font-semibold shadow-md">
              Red Loam Soil
            </button>
            <button onClick={() => applySoilPreset('alluvial')} className="px-3 py-1.5 rounded-xl bg-gray-950/80 hover:bg-gray-800 text-xs text-teal-300 border border-teal-500/40 font-semibold shadow-md">
              Alluvial Soil
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Parameters Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-gray-900/80 border border-gray-800 p-6 rounded-3xl space-y-4 backdrop-blur-md shadow-xl">
          
          <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" /> Location & Season Setup
            </span>
            
            {/* GPS Detect Button */}
            <button
              type="button"
              onClick={handleUseGps}
              disabled={loadingLocation}
              className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-xl flex items-center gap-1 font-bold hover:bg-emerald-500/30 transition-all"
            >
              {loadingLocation ? <Loader2 className="w-3 h-3 animate-spin" /> : <Compass className="w-3 h-3 text-emerald-400" />}
              <span>Use GPS</span>
            </button>
          </h3>

          {/* State & District Selectors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">State / UT</label>
              <select
                value={form.state}
                onChange={handleStateChange}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs font-bold text-emerald-400 outline-none focus:border-emerald-500"
              >
                {Object.keys(statesDistricts).map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">District</label>
              <select
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              >
                {(statesDistricts[form.state] || []).map(dt => (
                  <option key={dt} value={dt}>{dt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">City / Town (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Mandya Town"
                value={form.town}
                onChange={(e) => setForm({ ...form, town: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Cropping Season</label>
              <select
                value={form.season}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold outline-none focus:border-emerald-500"
              >
                <option value="Kharif">Kharif (Monsoon: Jun - Oct)</option>
                <option value="Rabi">Rabi (Winter: Nov - Apr)</option>
                <option value="Zaid">Zaid (Summer: Mar - Jun)</option>
              </select>
            </div>
          </div>

          {/* Soil & Nutrient Parameters */}
          <div className="border-t border-gray-800 pt-3">
            <label className="block text-xs font-medium text-gray-300 mb-1">Soil Profile Type</label>
            <select
              value={form.soil_type}
              onChange={(e) => setForm({ ...form, soil_type: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 outline-none focus:border-emerald-500"
            >
              {['Red Loam', 'Black Cotton', 'Alluvial', 'Clay Loam', 'Laterite', 'Sandy Loam', 'Coastal Alluvial'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">N (kg/ha)</label>
              <input
                type="number"
                value={form.n}
                onChange={(e) => setForm({ ...form, n: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-2 py-1.5 text-xs text-emerald-400 font-bold outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">P (kg/ha)</label>
              <input
                type="number"
                value={form.p}
                onChange={(e) => setForm({ ...form, p: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-2 py-1.5 text-xs text-emerald-400 font-bold outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1">K (kg/ha)</label>
              <input
                type="number"
                value={form.k}
                onChange={(e) => setForm({ ...form, k: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-2 py-1.5 text-xs text-emerald-400 font-bold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Temp (°C)</label>
              <input
                type="number"
                step="0.1"
                value={form.temp}
                onChange={(e) => setForm({ ...form, temp: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Humidity (%)</label>
              <input
                type="number"
                step="0.1"
                value={form.humidity}
                onChange={(e) => setForm({ ...form, humidity: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Soil pH</label>
              <input
                type="number"
                step="0.1"
                value={form.ph}
                onChange={(e) => setForm({ ...form, ph: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Rainfall (mm)</label>
              <input
                type="number"
                step="1"
                value={form.rainfall}
                onChange={(e) => setForm({ ...form, rainfall: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span>Evaluate Best Suitable Crops</span>
          </button>
        </form>

        {/* Output Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="bg-gray-900/90 border border-emerald-500/50 p-6 rounded-3xl space-y-6 backdrop-blur-md shadow-2xl animate-fadeIn">
              
              {/* Winner Crop Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-950/90 to-teal-950/90 border border-emerald-400/40">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Top Recommended Crop</span>
                  <h3 className="text-3xl font-extrabold text-white mt-0.5">{result.recommended_crop}</h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Duration: <span className="text-white font-bold">{result.growth_period_days} Days</span> • Water: <span className="text-white font-bold">{result.water_requirement}</span> • Exp Yield: <span className="text-amber-300 font-bold">{result.expected_yield_t_ha} t/ha</span>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-amber-400">{result.confidence}%</div>
                  <span className="text-[10px] text-gray-300">Suitability Score</span>
                </div>
              </div>

              {/* Regional Agro Explanation */}
              <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 text-xs text-gray-200">
                <span className="font-bold text-emerald-400 block mb-1">Agro-Climatic Explanation:</span>
                <p className="leading-relaxed text-gray-300">{result.explanation}</p>
              </div>

              {/* Nutrient Advice */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Nutrient & Soil Guidance</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800">
                    <div className="font-bold text-white mb-1">Nitrogen (N)</div>
                    <p className="text-gray-300 text-[11px]">{result.nitrogen_advice}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800">
                    <div className="font-bold text-white mb-1">Phosphorus (P)</div>
                    <p className="text-gray-300 text-[11px]">{result.phosphorus_advice}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800">
                    <div className="font-bold text-white mb-1">Potassium (K)</div>
                    <p className="text-gray-300 text-[11px]">{result.potassium_advice}</p>
                  </div>
                </div>
              </div>

              {/* Ranked Top 3-5 Crops */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top 5 Best Suitable Crops for {result.state} ({result.district})</h4>
                <div className="space-y-2.5">
                  {result.top_crops.map((c, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-gray-800 flex items-center justify-center font-bold text-emerald-400 text-xs">{idx + 1}</span>
                          <span className="font-bold text-white text-sm">{c.crop}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-28 bg-gray-800 h-2 rounded-full overflow-hidden hidden sm:block">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${c.suitability_score}%` }} />
                          </div>
                          <span className="font-bold text-emerald-400 text-sm">{c.suitability_score}%</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-400">{c.description}</p>

                      <div className="flex flex-wrap items-center justify-between pt-2 border-t border-gray-900 text-[10px] text-gray-300 gap-2">
                        <span>Duration: <strong className="text-white">{c.duration_days} days</strong></span>
                        <span>Water: <strong className="text-blue-300">{c.water_requirement}</strong></span>
                        <span>Expected Yield: <strong className="text-amber-300">{c.expected_yield_t_ha} t/ha</strong> ({c.yield_range[0]}-{c.yield_range[1]} t/ha)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center text-gray-400 space-y-4">
              <Sprout className="w-12 h-12 text-emerald-500/40 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-gray-300">Ready for Crop Recommendation</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Select your state, district, season, and soil nutrients to generate top 3-5 suitable crop recommendations with yield and water requirements.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
