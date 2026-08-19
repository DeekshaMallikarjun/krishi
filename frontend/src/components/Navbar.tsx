import React, { useState } from 'react';
import { 
  LayoutDashboard, Sprout, ScanLine, TrendingUp, CloudSun, 
  Store, Landmark, Bot, User, Menu, X, Sparkles, ShieldCheck, Globe,
  MapPin, Users, BarChart3
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'crop', label: t.nav.crop, icon: Sprout },
    { id: 'yield', label: t.nav.yield, icon: TrendingUp },
    { id: 'disease', label: t.nav.disease, icon: ScanLine },
    { id: 'indiamap', label: t.nav.indiamap, icon: MapPin },
    { id: 'weather', label: t.nav.weather, icon: CloudSun },
    { id: 'community', label: t.nav.community, icon: Users },
    { id: 'market', label: t.nav.market, icon: Store },
    { id: 'prices', label: t.nav.prices, icon: BarChart3 },
    { id: 'schemes', label: t.nav.schemes, icon: Landmark },
    { id: 'chatbot', label: t.nav.chatbot, icon: Bot },
    { id: 'profile', label: t.nav.profile, icon: User },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case 'kn': return 'ಕನ್ನಡ';
      case 'hi': return 'हिंदी';
      default: return 'English';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-emerald-900/40 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo & Brand Name */}
        <div 
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-gray-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                KrishiAstra
              </h1>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> {t.nav.aiLive}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block">{t.nav.tagline}</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-900/60 p-1.5 rounded-2xl border border-gray-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                    : 'text-gray-300 hover:text-emerald-300 hover:bg-gray-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Language Switcher Selector Dropdown */}
        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs font-bold text-emerald-300 hover:border-emerald-500 transition-all shadow-md"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>🇮🇳 {getLanguageLabel(language)}</span>
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 top-11 bg-gray-900 border border-emerald-500/40 rounded-2xl shadow-2xl p-2 w-36 space-y-1 z-50 animate-fadeIn backdrop-blur-xl">
              <button
                onClick={() => handleLangSelect('en')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  language === 'en' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-emerald-300'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLangSelect('kn')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  language === 'kn' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-emerald-300'
                }`}
              >
                ಕನ್ನಡ (Kannada)
              </button>
              <button
                onClick={() => handleLangSelect('hi')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  language === 'hi' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-emerald-300'
                }`}
              >
                हिंदी (Hindi)
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 bg-gray-900/95 border border-gray-800 rounded-2xl space-y-2 backdrop-blur-xl shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-medium text-left transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-600/30'
                      : 'bg-gray-800/40 text-gray-300 hover:bg-gray-800 border border-gray-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
