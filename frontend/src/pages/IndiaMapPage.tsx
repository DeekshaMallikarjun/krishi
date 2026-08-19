import React, { useState, useEffect } from 'react';
import { fetchStatesDistricts, fetchIndiaAgriMap } from '../services/api';
import { IndiaAgriMapData } from '../types';
import { MapPin, Sprout, CloudSun, Droplets, ShieldCheck, Search, Loader2, Sparkles, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const IndiaMapPage: React.FC = () => {
  const { t } = useLanguage();
  const [statesDistricts, setStatesDistricts] = useState<Record<string, string[]>>({});
  const [selectedState, setSelectedState] = useState<string>('Karnataka');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Mandya');
  const [loading, setLoading] = useState<boolean>(true);
  const [mapData, setMapData] = useState<IndiaAgriMapData | null>(null);

  useEffect(() => {
    loadStatesData();
  }, []);

  useEffect(() => {
    if (selectedState) {
      loadAgriMapData();
    }
  }, [selectedState, selectedDistrict]);

  const loadStatesData = async () => {
    try {
      const data = await fetchStatesDistricts();
      setStatesDistricts(data);
      if (data['Karnataka'] && data['Karnataka'].length > 0) {
        setSelectedDistrict(data['Karnataka'][0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadAgriMapData = async () => {
    setLoading(true);
    try {
      const res = await fetchIndiaAgriMap(selectedState, selectedDistrict);
      setMapData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    if (statesDistricts[newState] && statesDistricts[newState].length > 0) {
      setSelectedDistrict(statesDistricts[newState][0]);
    } else {
      setSelectedDistrict('');
    }
  };

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Agriculture Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920')` }}
      />
      
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-teal-500/30 bg-gradient-to-r from-teal-950/95 via-gray-900/90 to-emerald-950/95 p-8 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1598977123418-454555aa0a3c?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <MapPin className="w-4 h-4" /> India-Wide Regional Crop & Land Intelligence
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              India Agricultural Map & Agro-Climatic Hub
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
              Explore regional soil compositions, seasonal Kharif, Rabi, and Zaid crop suitability, rainfall patterns, and market commodities across all <span className="text-teal-400 font-bold">28 States & 8 Union Territories</span> of India.
            </p>
          </div>

          {/* Location Dropdown Selectors */}
          <div className="flex flex-wrap items-center gap-3 bg-gray-950/80 p-3 rounded-2xl border border-teal-500/40 shadow-xl">
            <div>
              <span className="block text-[10px] text-gray-400 font-bold uppercase mb-1">State / UT</span>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="bg-gray-900 border border-gray-700 text-teal-300 font-bold text-xs rounded-xl px-3 py-2 outline-none focus:border-teal-400"
              >
                {Object.keys(statesDistricts).map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-[10px] text-gray-400 font-bold uppercase mb-1">District</span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white font-semibold text-xs rounded-xl px-3 py-2 outline-none focus:border-teal-400"
              >
                {(statesDistricts[selectedState] || []).map(dt => (
                  <option key={dt} value={dt}>{dt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-teal-400">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3" />
          <div className="text-sm font-semibold">Loading Regional Agro-Climatic Intelligence...</div>
        </div>
      ) : mapData ? (
        <div className="space-y-6">
          
          {/* Key Regional Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-3xl bg-gray-900/80 border border-gray-800 backdrop-blur-md">
              <div className="text-xs text-gray-400 mb-1">Region</div>
              <div className="text-xl font-black text-white">{mapData.district}</div>
              <div className="text-xs text-teal-400 font-semibold mt-1">{mapData.state}</div>
            </div>

            <div className="p-5 rounded-3xl bg-gray-900/80 border border-teal-500/30 backdrop-blur-md">
              <div className="text-xs text-gray-400 mb-1">Dominant Soil Profile</div>
              <div className="text-xl font-black text-teal-300">{mapData.primary_soil}</div>
              <div className="text-[10px] text-gray-500 mt-1">Rich organic nutrient base</div>
            </div>

            <div className="p-5 rounded-3xl bg-gray-900/80 border border-blue-500/30 backdrop-blur-md">
              <div className="text-xs text-gray-400 mb-1">Avg Annual Rainfall</div>
              <div className="text-xl font-black text-blue-300">{mapData.avg_annual_rainfall_mm} mm</div>
              <div className="text-[10px] text-gray-500 mt-1">Monsoon benchmark baseline</div>
            </div>

            <div className="p-5 rounded-3xl bg-gray-900/80 border border-amber-500/30 backdrop-blur-md">
              <div className="text-xs text-gray-400 mb-1">Key Commodities</div>
              <div className="text-sm font-extrabold text-amber-300 truncate">
                {mapData.major_commodities.join(', ')}
              </div>
              <div className="text-[10px] text-gray-500 mt-1">APMC Mandi High Volume</div>
            </div>

          </div>

          {/* Seasonal Crops Breakdown Tabs & Cards */}
          <div className="space-y-6">
            
            {/* Kharif Crops */}
            <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <h3 className="text-base font-bold text-white">Kharif Season (Monsoon: Jun – Oct)</h3>
                </div>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                  Top Monsoon Crops
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mapData.kharif_crops.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-2 hover:border-emerald-500/40 transition-all">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-white text-sm">{c.crop}</span>
                      <span className="text-xs font-black text-emerald-400">{c.suitability_score}%</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug line-clamp-2">{c.description}</p>
                    <div className="text-[10px] text-gray-400 pt-1 border-t border-gray-900 flex justify-between">
                      <span>Duration: {c.duration_days}d</span>
                      <span>Yield: ~{c.expected_yield_t_ha} t/ha</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rabi Crops */}
            <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <h3 className="text-base font-bold text-white">Rabi Season (Winter: Nov – Apr)</h3>
                </div>
                <span className="text-xs text-amber-400 font-semibold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
                  Cool Season Crops
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mapData.rabi_crops.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-2 hover:border-amber-500/40 transition-all">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-white text-sm">{c.crop}</span>
                      <span className="text-xs font-black text-amber-400">{c.suitability_score}%</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug line-clamp-2">{c.description}</p>
                    <div className="text-[10px] text-gray-400 pt-1 border-t border-gray-900 flex justify-between">
                      <span>Duration: {c.duration_days}d</span>
                      <span>Yield: ~{c.expected_yield_t_ha} t/ha</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zaid Crops */}
            <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-500" />
                  <h3 className="text-base font-bold text-white">Zaid Season (Summer: Mar – Jun)</h3>
                </div>
                <span className="text-xs text-teal-400 font-semibold bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800/40">
                  Summer Short Duration Crops
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mapData.zaid_crops.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-2 hover:border-teal-500/40 transition-all">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-white text-sm">{c.crop}</span>
                      <span className="text-xs font-black text-teal-400">{c.suitability_score}%</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug line-clamp-2">{c.description}</p>
                    <div className="text-[10px] text-gray-400 pt-1 border-t border-gray-900 flex justify-between">
                      <span>Duration: {c.duration_days}d</span>
                      <span>Yield: ~{c.expected_yield_t_ha} t/ha</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : null}
    </div>
  );
};
