import React, { useState, useEffect } from 'react';
import { fetchLiveWeather, fetchIrrigationAdvice } from '../services/api';
import { WeatherData, IrrigationResult } from '../types';
import { CloudSun, Droplets, Wind, Thermometer, AlertCircle, CheckCircle2, Search, Loader2, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WeatherIrrigationPage: React.FC = () => {
  const { t } = useLanguage();
  const [location, setLocation] = useState<string>('mandya');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState<boolean>(true);

  // Irrigation Form State
  const [irrForm, setIrrForm] = useState({
    crop: 'Paddy / Rice',
    soil_type: 'Red Loam',
    soil_moisture_pct: 38.0,
    current_temp: 28.5,
    forecast_rain_mm: 0.0
  });

  const [irrResult, setIrrResult] = useState<IrrigationResult | null>(null);
  const [loadingIrr, setLoadingIrr] = useState<boolean>(false);

  useEffect(() => {
    loadWeatherData();
  }, [location]);

  const loadWeatherData = async () => {
    setLoadingWeather(true);
    try {
      const data = await fetchLiveWeather(location);
      setWeather(data);
      setIrrForm(prev => ({ ...prev, current_temp: data.temperature }));
      const irr = await fetchIrrigationAdvice({
        crop: irrForm.crop,
        soil_type: irrForm.soil_type,
        soil_moisture_pct: irrForm.soil_moisture_pct,
        current_temp: data.temperature,
        forecast_rain_mm: data.forecast_7days[0]?.rain_mm || 0.0
      });
      setIrrResult(irr);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleIrrigationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingIrr(true);
    try {
      const res = await fetchIrrigationAdvice(irrForm);
      setIrrResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingIrr(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Agriculture Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514632595-4944383f2737?q=80&w=1920')` }}
      />
      
      {/* Hero Header Banner with Weather Background */}
      <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-gradient-to-r from-blue-950/95 via-gray-900/90 to-teal-950/95 p-8 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <CloudSun className="w-4 h-4" /> Open-Meteo Weather Telemetry & Smart Irrigation Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Live Weather & Smart Irrigation Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
              Hyper-local satellite weather forecasts, 7-day agricultural rainfall trends, and soil moisture evapotranspiration calculations to schedule irrigation timing accurately.
            </p>
          </div>

          {/* Location Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {['Mandya', 'Punjab', 'Nagpur', 'Nashik', 'Guntur', 'Coimbatore'].map(loc => (
              <button
                key={loc}
                onClick={() => setLocation(loc.toLowerCase())}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  location === loc.toLowerCase() 
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30' 
                    : 'bg-gray-950/80 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Weather Section */}
      {loadingWeather ? (
        <div className="p-12 text-center text-blue-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <span className="text-xs">Fetching Open-Meteo Satellite Weather Feed...</span>
        </div>
      ) : weather ? (
        <div className="space-y-6">
          
          {/* Main Weather Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/80 via-gray-900 to-teal-950/80 border border-blue-500/40 backdrop-blur-md shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300 mb-1">
                  <MapPin className="w-4 h-4 text-blue-400" /> {weather.location}
                </div>
                <h3 className="text-4xl font-extrabold text-white">{weather.temperature}°C</h3>
                <p className="text-xs text-gray-300 mt-0.5">{t.weather.feelsLike} {weather.feels_like}°C • {weather.weather_condition}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-2xl bg-gray-950/60 border border-gray-800">
                  <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">{weather.humidity}%</div>
                  <span className="text-[10px] text-gray-400">{t.weather.humidity}</span>
                </div>

                <div className="p-3 rounded-2xl bg-gray-950/60 border border-gray-800">
                  <Wind className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">{weather.wind_speed} km/h</div>
                  <span className="text-[10px] text-gray-400">{t.weather.wind}</span>
                </div>

                <div className="p-3 rounded-2xl bg-gray-950/60 border border-gray-800">
                  <CloudSun className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-white">{weather.rainfall_24h} mm</div>
                  <span className="text-[10px] text-gray-400">{t.weather.rain24h}</span>
                </div>
              </div>
            </div>

            {/* Weather Alert Bar */}
            {weather.agricultural_alert && (
              <div className="p-3.5 rounded-2xl bg-blue-900/40 border border-blue-400/30 text-xs text-blue-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{weather.agricultural_alert}</span>
              </div>
            )}
          </div>

          {/* 7-Day Weather Forecast */}
          <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white mb-4">{t.weather.forecast7d}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {weather.forecast_7days.map((f, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-gray-950/60 border border-gray-800 text-center">
                  <div className="text-xs font-semibold text-gray-400 mb-1">{f.day}</div>
                  <div className="text-sm font-bold text-white">{f.temp_max}° / {f.temp_min}°</div>
                  <div className="text-[10px] text-blue-400 mt-1 flex items-center justify-center gap-1">
                    <Droplets className="w-3 h-3" /> {f.rain_mm} mm ({f.rain_prob_pct}%)
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : null}

      {/* Smart Irrigation Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        <form onSubmit={handleIrrigationSubmit} className="lg:col-span-5 bg-gray-900/80 border border-gray-800 p-6 rounded-3xl space-y-4 backdrop-blur-md shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
            <Droplets className="w-4 h-4 text-blue-400" /> {t.weather.irrTitle}
          </h3>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t.weather.crop}</label>
            <select
              value={irrForm.crop}
              onChange={(e) => setIrrForm({ ...irrForm, crop: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white font-medium outline-none"
            >
              {['Paddy / Rice', 'Sugarcane', 'Cotton', 'Wheat', 'Tomato', 'Potato', 'Maize', 'Pulses / Gram'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t.weather.soilType}</label>
            <select
              value={irrForm.soil_type}
              onChange={(e) => setIrrForm({ ...irrForm, soil_type: e.target.value })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white font-medium outline-none"
            >
              {['Red Loam', 'Black Cotton Clay', 'Alluvial Silt', 'Coastal Sandy Loam'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-300 mb-1">
              <span>{t.weather.moisture}</span>
              <span className="font-bold text-blue-400">{irrForm.soil_moisture_pct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={irrForm.soil_moisture_pct}
              onChange={(e) => setIrrForm({ ...irrForm, soil_moisture_pct: parseFloat(e.target.value) })}
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t.weather.forecastRain}</label>
            <input
              type="number"
              value={irrForm.forecast_rain_mm}
              onChange={(e) => setIrrForm({ ...irrForm, forecast_rain_mm: parseFloat(e.target.value) || 0 })}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loadingIrr}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loadingIrr ? <Loader2 className="w-5 h-5 animate-spin" /> : <Droplets className="w-5 h-5" />}
            <span>{t.weather.calculateBtn}</span>
          </button>
        </form>

        {/* Irrigation Result Decision Card */}
        <div className="lg:col-span-7">
          {irrResult ? (
            <div className="bg-gray-900/90 border border-blue-500/50 p-6 rounded-3xl space-y-6 backdrop-blur-md shadow-2xl animate-fadeIn">
              
              <div className={`p-6 rounded-2xl border text-center ${
                irrResult.decision === 'IRRIGATE NOW'
                  ? 'bg-red-950/60 border-red-500/50 text-red-300'
                  : irrResult.decision === 'IRRIGATE LATER'
                  ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                  : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              }`}>
                <span className="text-xs font-bold uppercase tracking-widest">{t.weather.recAction}</span>
                <h3 className="text-3xl font-black mt-1 mb-2">{irrResult.decision}</h3>
                <p className="text-xs max-w-md mx-auto leading-relaxed opacity-90">{irrResult.reasoning}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 text-center">
                  <div className="text-2xl font-extrabold text-blue-400">{irrResult.water_volume_liters_per_acre.toLocaleString()} L</div>
                  <span className="text-[10px] text-gray-400">{t.weather.volumeReq}</span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 text-center">
                  <div className="text-2xl font-extrabold text-teal-400">Every {irrResult.next_check_hours} hrs</div>
                  <span className="text-[10px] text-gray-400">{t.weather.nextCheck}</span>
                </div>
              </div>

            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
};
