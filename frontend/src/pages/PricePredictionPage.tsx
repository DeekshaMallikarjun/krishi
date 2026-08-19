import React, { useState, useEffect } from 'react';
import { fetchPriceForecast } from '../services/api';
import { PricePredictionResult } from '../types';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, DollarSign, Loader2, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

export const PricePredictionPage: React.FC = () => {
  const { t } = useLanguage();
  const [crop, setCrop] = useState<string>('Tomato');
  const [state, setState] = useState<string>('Karnataka');
  const [mandi, setMandi] = useState<string>('Mandya APMC');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<PricePredictionResult | null>(null);

  const cropsList = ['Tomato', 'Potato', 'Onion', 'Wheat', 'Rice / Paddy', 'Cotton', 'Sugarcane', 'Maize'];
  const statesList = ['Karnataka', 'Maharashtra', 'Punjab', 'Delhi', 'Andhra Pradesh', 'Gujarat'];

  useEffect(() => {
    loadForecast();
  }, [crop, state]);

  const loadForecast = async () => {
    setLoading(true);
    try {
      const res = await fetchPriceForecast(crop, state, mandi);
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const combinedChartData = [
    ...(data?.historical.map(h => ({ date: h.date, Price: h.price_per_quintal, type: 'Historical' })) || []),
    ...(data?.forecast.map(f => ({ date: f.date, Price: f.predicted_price, Lower: f.lower_bound, Upper: f.upper_bound, type: 'Forecast' })) || [])
  ];

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Agriculture Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1920')` }}
      />
      
      {/* Page Title Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-amber-950/95 via-gray-900/90 to-emerald-950/95 p-8 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" /> {t.prices.engine}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{t.prices.title}</h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            {t.prices.subtitle}
          </p>
        </div>

        {/* Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={crop} 
            onChange={(e) => setCrop(e.target.value)}
            className="bg-gray-950 border border-amber-900/60 rounded-xl px-3 py-2 text-xs font-bold text-amber-300 outline-none"
          >
            {cropsList.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select 
            value={state} 
            onChange={(e) => setState(e.target.value)}
            className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs font-medium text-gray-200 outline-none"
          >
            {statesList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-amber-400">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3" />
          <div className="text-sm font-semibold">Running LSTM Neural Price Trajectory...</div>
        </div>
      ) : data ? (
        <div className="space-y-6">
          
          {/* Key Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Current Price */}
            <div className="p-5 rounded-3xl bg-gray-900/80 border border-gray-800 backdrop-blur-md">
              <div className="text-xs text-gray-400 mb-1">{t.prices.todayPrice}</div>
              <div className="text-3xl font-black text-white">
                ₹{data.current_price.toLocaleString()} <span className="text-xs font-normal text-gray-400">/Quintal</span>
              </div>
              <div className="text-[10px] text-gray-500 mt-2">{data.mandi} • {data.state}</div>
            </div>

            {/* 30-Day Predicted Price */}
            <div className="p-5 rounded-3xl bg-gray-900/80 border border-amber-500/40 backdrop-blur-md">
              <div className="text-xs text-amber-400 font-semibold mb-1">{t.prices.predictedPrice}</div>
              <div className="text-3xl font-black text-amber-300 flex items-center gap-2">
                ₹{data.predicted_30d_price.toLocaleString()}
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center ${
                  data.change_percentage >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {data.change_percentage >= 0 ? `+${data.change_percentage}%` : `${data.change_percentage}%`}
                </span>
              </div>
              <div className="text-[10px] text-gray-400 mt-2">LSTM Neural Forecast Horizon</div>
            </div>

            {/* Selling Action Card */}
            <div className={`p-5 rounded-3xl border backdrop-blur-md ${
              data.trend === 'UP' 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' 
                : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
            }`}>
              <div className="text-xs font-bold uppercase tracking-wider mb-1">{t.prices.advice}</div>
              <div className="text-sm font-extrabold leading-snug">{data.recommendation}</div>
            </div>

          </div>

          {/* Recharts Price History & Forecast Graph */}
          <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 backdrop-blur-md shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-white">{data.crop} {t.prices.trendTitle}</h3>
                <p className="text-xs text-gray-400">Combining 12-month past Mandi records with 30-day LSTM projection.</p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={combinedChartData}>
                  <defs>
                    <linearGradient id="priceColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} />
                  <YAxis stroke="#9ca3af" fontSize={10} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#030712', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#f59e0b' }}
                  />
                  <Area type="monotone" dataKey="Price" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#priceColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      ) : null}
    </div>
  );
};
