import React from 'react';
import { 
  Sprout, ScanLine, TrendingUp, CloudSun, Bot, 
  Sparkles, ArrowRight, ShieldCheck, Cpu, Activity, Droplets
} from 'lucide-react';
import { WeatherData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DashboardHeroProps {
  onNavigate: (tab: string) => void;
  weather?: WeatherData;
  farmerName?: string;
  district?: string;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  onNavigate,
  weather,
  farmerName = "Ramesh Patel",
  district = "Mandya, Karnataka"
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-[85vh] rounded-3xl overflow-hidden mb-8 border border-emerald-800/40 shadow-2xl flex flex-col justify-between p-6 sm:p-10 lg:p-12">
      
      {/* Background Indian Farm Artwork */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('/assets/hero_bg.png')` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/40 backdrop-brightness-[0.85]" />

      {/* Top Header Badge Row */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Farmer Welcome Badge */}
        <div className="flex items-center gap-3 bg-gray-950/70 border border-emerald-500/30 px-4 py-2 rounded-2xl backdrop-blur-md">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
            <span className="text-lg">👨‍🌾</span>
          </div>
          <div>
            <div className="text-xs text-gray-300 font-medium">{t.hero.welcome}</div>
            <div className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
              {farmerName} <span className="text-xs text-gray-400">({district})</span>
            </div>
          </div>
        </div>

        {/* Live Weather & AI Node Sensor Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-2 rounded-2xl backdrop-blur-md text-emerald-300 text-xs">
            <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-semibold">{t.hero.sensorsOnline}</span>
          </div>

          <div className="flex items-center gap-2 bg-amber-950/70 border border-amber-500/40 px-3.5 py-2 rounded-2xl backdrop-blur-md text-amber-300 text-xs font-medium">
            <CloudSun className="w-4 h-4 text-amber-400" />
            <span>{weather ? `${weather.temperature}°C • ${weather.weather_condition}` : '28.5°C • Clear Sky'}</span>
          </div>
        </div>
      </div>

      {/* Hero Central Title & Concept Statement */}
      <div className="relative z-10 max-w-3xl my-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{t.hero.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4 drop-shadow-md">
          {t.hero.titleStart} <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed drop-shadow max-w-2xl">
          {t.hero.subtitle}
        </p>

        {/* Live Weather Advisory Banner */}
        {weather?.agricultural_alert && (
          <div className="mt-5 p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm flex items-center gap-3 backdrop-blur-md">
            <Activity className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{weather.agricultural_alert}</span>
          </div>
        )}
      </div>

      {/* Quick Action Cards Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Card 1: Crop Rec */}
        <button
          onClick={() => onNavigate('crop')}
          className="group p-4 rounded-2xl bg-gray-950/80 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/60 transition-all text-left backdrop-blur-md flex flex-col justify-between min-h-[120px] shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-emerald-300">{t.hero.cardCrop}</div>
            <div className="text-[10px] text-gray-400">{t.hero.cardCropSub}</div>
          </div>
        </button>

        {/* Card 2: Disease Scanner */}
        <button
          onClick={() => onNavigate('disease')}
          className="group p-4 rounded-2xl bg-gray-950/80 border border-teal-500/30 hover:border-teal-400 hover:bg-teal-950/60 transition-all text-left backdrop-blur-md flex flex-col justify-between min-h-[120px] shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <ScanLine className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-teal-300">{t.hero.cardDisease}</div>
            <div className="text-[10px] text-gray-400">{t.hero.cardDiseaseSub}</div>
          </div>
        </button>

        {/* Card 3: Price Forecast */}
        <button
          onClick={() => onNavigate('prices')}
          className="group p-4 rounded-2xl bg-gray-950/80 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-950/60 transition-all text-left backdrop-blur-md flex flex-col justify-between min-h-[120px] shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-amber-300">{t.hero.cardPrices}</div>
            <div className="text-[10px] text-gray-400">{t.hero.cardPricesSub}</div>
          </div>
        </button>

        {/* Card 4: Smart Irrigation */}
        <button
          onClick={() => onNavigate('weather')}
          className="group p-4 rounded-2xl bg-gray-950/80 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-950/60 transition-all text-left backdrop-blur-md flex flex-col justify-between min-h-[120px] shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Droplets className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-blue-300">{t.hero.cardIrrigation}</div>
            <div className="text-[10px] text-gray-400">{t.hero.cardIrrigationSub}</div>
          </div>
        </button>

        {/* Card 5: Mandi Market */}
        <button
          onClick={() => onNavigate('market')}
          className="group p-4 rounded-2xl bg-gray-950/80 border border-orange-500/30 hover:border-orange-400 hover:bg-orange-950/60 transition-all text-left backdrop-blur-md flex flex-col justify-between min-h-[120px] shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-orange-300">{t.hero.cardMarket}</div>
            <div className="text-[10px] text-gray-400">{t.hero.cardMarketSub}</div>
          </div>
        </button>

        {/* Card 6: AI Chatbot */}
        <button
          onClick={() => onNavigate('chatbot')}
          className="group p-4 rounded-2xl bg-gradient-to-br from-emerald-950/90 to-teal-950/90 border border-emerald-400/50 hover:border-emerald-300 transition-all text-left backdrop-blur-md flex flex-col justify-between min-h-[120px] shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-400 flex items-center justify-center text-gray-950 group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5 font-bold" />
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-300">{t.hero.cardChat}</div>
            <div className="text-[10px] text-gray-300">{t.hero.cardChatSub}</div>
          </div>
        </button>

      </div>
    </div>
  );
};
