import React, { useState, useEffect } from 'react';
import { fetchGovernmentSchemes, monitorSchemeUpdates } from '../services/api';
import { GovernmentScheme } from '../types';
import { Landmark, ExternalLink, FileText, CheckCircle2, Bell, RefreshCw, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SchemesPage: React.FC = () => {
  const { t } = useLanguage();
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [monitorStatus, setMonitorStatus] = useState<any>(null);

  useEffect(() => {
    loadSchemes();
    checkMonitor();
  }, [category, query]);

  const loadSchemes = async () => {
    setLoading(true);
    try {
      const res = await fetchGovernmentSchemes(category === 'All' ? undefined : category, query);
      setSchemes(res.schemes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const checkMonitor = async () => {
    try {
      const status = await monitorSchemeUpdates();
      setMonitorStatus(status);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Agriculture Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1920')` }}
      />
      
      {/* Page Title Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-emerald-950/95 via-gray-900/90 to-teal-950/95 p-8 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Landmark className="w-4 h-4" /> {t.schemes.engine}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{t.schemes.title}</h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            {t.schemes.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {['All', 'Direct Income', 'Insurance', 'Credit', 'Irrigation', 'Machinery'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                category === cat
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-600/30'
                  : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        </div>
      </div>

      {/* Automated Government Source Monitor Banner */}
      {monitorStatus && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4 text-xs text-emerald-200 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                {t.schemes.crawlerActive}
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/40">Pinecone Sync Ready</span>
              </div>
              <div className="text-[11px] text-gray-300">Pipeline: Official Source → Detect Notification → Validate → Vector Embedding → Chatbot Knowledge Base</div>
            </div>
          </div>

          <div className="text-right text-[11px] text-gray-400">
            Last Checked: <span className="text-emerald-300 font-semibold">{monitorStatus.timestamp}</span>
          </div>
        </div>
      )}

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 hover:border-amber-500/50 transition-all backdrop-blur-md flex flex-col justify-between space-y-4 shadow-xl">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {scheme.category}
                </span>
                {scheme.is_new && (
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                    <Bell className="w-3 h-3 text-emerald-400" /> New Update
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{scheme.title}</h3>
              <div className="text-xs text-amber-400 font-medium mb-3">{scheme.authority}</div>

              <p className="text-xs text-gray-300 leading-relaxed mb-4">{scheme.benefit_summary}</p>

              {/* Eligibility */}
              <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800 text-xs mb-3">
                <span className="font-bold text-gray-300 block mb-1">{t.schemes.eligibility}</span>
                <p className="text-gray-400 text-[11px]">{scheme.eligibility}</p>
              </div>

              {/* Document Checklist */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-amber-400" /> {t.schemes.documents}
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {scheme.documents_required.map((doc, dIdx) => (
                    <span key={dIdx} className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded-md border border-gray-700">
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="text-[11px] text-gray-400">
                {t.schemes.deadline} <span className="text-amber-300 font-bold">{scheme.deadline}</span>
              </div>

              <a
                href={scheme.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <span>{t.schemes.applyBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
