import React, { useState, useEffect } from 'react';
import { fetchMarketPrices } from '../services/api';
import { MandiPrice } from '../types';
import { Store, TrendingUp, Search, ArrowUpRight, ArrowDownRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MarketIntelligencePage: React.FC = () => {
  const { t } = useLanguage();
  const [stateFilter, setStateFilter] = useState<string>('');
  const [cropFilter, setCropFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<{ mandi_prices: MandiPrice[]; top_gainers: MandiPrice[] }>({ mandi_prices: [], top_gainers: [] });

  useEffect(() => {
    loadData();
  }, [stateFilter, cropFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchMarketPrices(stateFilter, cropFilter);
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Agriculture Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1920')` }}
      />
      
      {/* Title Bar with Market Hero Overlay */}
      <div className="relative rounded-3xl overflow-hidden border border-orange-500/30 bg-gradient-to-r from-amber-950/95 via-gray-900/90 to-orange-950/95 p-8 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Store className="w-4 h-4" /> {t.market.engine}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{t.market.title}</h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            {t.market.subtitle}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder={t.market.searchPlaceholder}
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
            className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500"
          />

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none"
          >
            <option value="">{t.market.allStates}</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Punjab">Punjab</option>
            <option value="Delhi">Delhi</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Gujarat">Gujarat</option>
          </select>
        </div>
        </div>
      </div>

      {/* Top Gainers Highlight Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" /> {t.market.topGainers}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.top_gainers.map((g, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-900/80 border border-emerald-500/30 backdrop-blur-md">
              <div className="flex justify-between items-start text-xs text-gray-400 mb-1">
                <span className="font-bold text-white">{g.crop}</span>
                <span className="text-emerald-400 font-bold flex items-center"><ArrowUpRight className="w-3 h-3" />+{g.change_pct}%</span>
              </div>
              <div className="text-xl font-extrabold text-white">₹{g.modal_price.toLocaleString()} <span className="text-[10px] text-gray-400">/{g.unit}</span></div>
              <div className="text-[10px] text-gray-400 mt-1">{g.mandi}, {g.state}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandi Table */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-3xl overflow-hidden backdrop-blur-md shadow-xl">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center text-xs text-gray-400">
          <span>Displaying verified APMC Mandi Records</span>
          <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Live Agmarknet Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-950 text-gray-400 uppercase tracking-wider font-semibold border-b border-gray-800">
              <tr>
                <th className="p-4">{t.market.cropHeader}</th>
                <th className="p-4">{t.market.mandiHeader}</th>
                <th className="p-4">{t.market.stateHeader}</th>
                <th className="p-4">{t.market.minHeader}</th>
                <th className="p-4">{t.market.maxHeader}</th>
                <th className="p-4">{t.market.modalHeader}</th>
                <th className="p-4">{t.market.trendHeader}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-gray-200">
              {data.mandi_prices.map((m, idx) => (
                <tr key={idx} className="hover:bg-gray-800/40 transition-colors">
                  <td className="p-4 font-bold text-white">{m.crop}</td>
                  <td className="p-4 text-emerald-300 font-medium">{m.mandi}</td>
                  <td className="p-4">{m.state}</td>
                  <td className="p-4 text-gray-400">₹{m.min_price}</td>
                  <td className="p-4 text-gray-400">₹{m.max_price}</td>
                  <td className="p-4 font-extrabold text-amber-300">₹{m.modal_price} / {m.unit}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      m.trend === 'UP' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {m.trend} ({m.change_pct > 0 ? `+${m.change_pct}%` : `${m.change_pct}%`})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
