import React, { useState, useEffect } from 'react';
import { fetchFarmerProfile, updateFarmerProfile } from '../services/api';
import { FarmerProfile } from '../types';
import { User, Save, CheckCircle2, MapPin, Sprout, Layers, Globe, Phone, ShieldCheck, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

export const ProfilePage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [profile, setProfile] = useState<FarmerProfile>({
    name: 'Ramesh Patel',
    phone: '+91 98765 43210',
    state: 'Karnataka',
    district: 'Mandya',
    land_acres: 4.5,
    soil_type: 'Red Loam',
    primary_crops: 'Sugarcane, Paddy, Tomato',
    preferred_language: language === 'kn' ? 'Kannada' : language === 'hi' ? 'Hindi' : 'English'
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await fetchFarmerProfile();
      setProfile(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLangChange = (langStr: string) => {
    let newLang: Language = 'en';
    if (langStr === 'Kannada' || langStr === 'kn') newLang = 'kn';
    else if (langStr === 'Hindi' || langStr === 'hi') newLang = 'hi';
    
    setLanguage(newLang);
    setProfile(prev => ({ ...prev, preferred_language: langStr }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateFarmerProfile(profile);
      setProfile(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Agriculture Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1920')` }}
      />
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-emerald-950/95 via-gray-900/90 to-teal-950/95 p-6 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-2xl shadow-lg">
            👨‍🌾
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{profile.name}</h2>
            <p className="text-xs text-emerald-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {profile.district}, {profile.state} • {profile.land_acres} Acres
            </p>
          </div>
        </div>

        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> Verified KrishiAstra ID
        </span>
        </div>
      </div>

      {/* Form Editor */}
      <form onSubmit={handleSave} className="bg-gray-900/80 border border-gray-800 p-6 rounded-3xl space-y-6 backdrop-blur-md shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
          <User className="w-4 h-4 text-emerald-400" /> {t.profile.title}
        </h3>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t.profile.savedMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t.profile.name}</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t.profile.phone}</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t.profile.state}</label>
            <input
              type="text"
              value={profile.state}
              onChange={(e) => setProfile({ ...profile, state: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t.profile.district}</label>
            <input
              type="text"
              value={profile.district}
              onChange={(e) => setProfile({ ...profile, district: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t.profile.landAcres}</label>
            <input
              type="number"
              step="0.1"
              value={profile.land_acres}
              onChange={(e) => setProfile({ ...profile, land_acres: parseFloat(e.target.value) || 0 })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t.profile.soilType}</label>
            <input
              type="text"
              value={profile.soil_type}
              onChange={(e) => setProfile({ ...profile, soil_type: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t.profile.crops}</label>
            <input
              type="text"
              value={profile.primary_crops}
              onChange={(e) => setProfile({ ...profile, primary_crops: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-emerald-400 font-bold mb-1">{t.profile.prefLang}</label>
            <select
              value={profile.preferred_language}
              onChange={(e) => handleLangChange(e.target.value)}
              className="w-full bg-gray-950 border border-emerald-500/60 rounded-xl px-3 py-2 text-xs text-emerald-300 font-bold outline-none"
            >
              <option value="English">English</option>
              <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
              <option value="Hindi">हिंदी (Hindi)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{t.profile.saveBtn}</span>
        </button>
      </form>

    </div>
  );
};
