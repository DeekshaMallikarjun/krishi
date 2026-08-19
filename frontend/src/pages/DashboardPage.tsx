import React, { useEffect, useState } from 'react';
import { DashboardHero } from '../components/DashboardHero';
import { fetchDashboardSummary } from '../services/api';
import { WeatherData, MandiPrice, IrrigationResult } from '../types';
import { 
  TrendingUp, CloudSun, Droplets, Landmark, 
  ArrowUpRight, ArrowDownRight, RefreshCw, ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [summary, setSummary] = useState<{
    farmer?: any;
    weather?: WeatherData;
    market_ticker?: MandiPrice[];
    active_schemes_count?: number;
    irrigation_preview?: IrrigationResult;
  } | null>(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboardSummary();
      setSummary(data);
    } catch (e) {
      console.error("Dashboard summary fetch failed:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Agriculture Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1920')` }}
      />
      
      {/* Hero Section */}
      <DashboardHero 
        onNavigate={onNavigate}
        weather={summary?.weather}
        farmerName={summary?.farmer?.name}
        district={`${summary?.farmer?.district || 'Mandya'}, ${summary?.farmer?.state || 'Karnataka'}`}
      />

      {/* Live Commodity Prices Ticker */}
      <div className="bg-gray-900/80 border border-emerald-900/40 rounded-3xl p-6 backdrop-blur-md shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">{t.dashboard.mandiTitle}</h2>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">Agmarknet Live</span>
          </div>
          <button 
            onClick={() => onNavigate('market')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            {t.dashboard.viewAll} <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary?.market_ticker?.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => onNavigate('market')}
              className="p-4 rounded-2xl bg-gray-950/70 border border-gray-800 hover:border-emerald-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>{item.crop}</span>
                <span className="text-[10px]">{item.mandi}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-lg font-extrabold text-white group-hover:text-emerald-300">
                  ₹{item.modal_price.toLocaleString()} <span className="text-[11px] font-normal text-gray-400">/{item.unit}</span>
                </div>
                <div className={`flex items-center text-xs font-bold ${item.change_pct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.change_pct >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{item.change_pct > 0 ? `+${item.change_pct}%` : `${item.change_pct}%`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Row: Irrigation Preview + Government Schemes Launcher */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Irrigation Preview */}
        <div className="bg-gray-900/80 border border-blue-900/40 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">{t.dashboard.irrigationTitle}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider ${
                summary?.irrigation_preview?.decision === 'IRRIGATE NOW'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {summary?.irrigation_preview?.decision || 'NOT REQUIRED'}
              </span>
            </div>
            
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              {summary?.irrigation_preview?.reasoning || 'Soil moisture level is optimal based on weather and rainfall predictions.'}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <div className="text-xs text-gray-400">
              Rec Volume: <span className="text-white font-bold">{summary?.irrigation_preview?.water_volume_liters_per_acre || 0} L/acre</span>
            </div>
            <button
              onClick={() => onNavigate('weather')}
              className="px-4 py-2 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              {t.dashboard.irrigationCalc} <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Government Schemes Alert */}
        <div className="bg-gray-900/80 border border-amber-900/40 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">{t.dashboard.schemesTitle}</h3>
              </div>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full border border-amber-500/30">
                {summary?.active_schemes_count || 6} {t.dashboard.schemesActive}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800 text-xs text-gray-300 flex items-center justify-between">
                <span className="font-semibold text-white">PM-KISAN ₹6,000 Direct Benefit Transfer</span>
                <span className="text-[10px] text-emerald-400">Verified Scheme</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800 text-xs text-gray-300 flex items-center justify-between">
                <span className="font-semibold text-white">PM Fasal Bima Yojana (PMFBY) Kharif Insurance</span>
                <span className="text-[10px] text-amber-400">Deadline: Aug 31</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> NIC Government Sync Active
            </div>
            <button
              onClick={() => onNavigate('schemes')}
              className="px-4 py-2 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              {t.dashboard.browseSchemes} <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
