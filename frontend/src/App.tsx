import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { CropRecommendationPage } from './pages/CropRecommendationPage';
import { YieldPredictionPage } from './pages/YieldPredictionPage';
import { DiseaseDetectionPage } from './pages/DiseaseDetectionPage';
import { IndiaMapPage } from './pages/IndiaMapPage';
import { PricePredictionPage } from './pages/PricePredictionPage';
import { WeatherIrrigationPage } from './pages/WeatherIrrigationPage';
import { CommunityPage } from './pages/CommunityPage';
import { MarketIntelligencePage } from './pages/MarketIntelligencePage';
import { SchemesPage } from './pages/SchemesPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { ProfilePage } from './pages/ProfilePage';
import { Sparkles } from 'lucide-react';
import { LanguageProvider } from './context/LanguageContext';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onNavigate={setActiveTab} />;
      case 'crop':
        return <CropRecommendationPage />;
      case 'yield':
        return <YieldPredictionPage />;
      case 'disease':
        return <DiseaseDetectionPage />;
      case 'indiamap':
        return <IndiaMapPage />;
      case 'prices':
        return <PricePredictionPage />;
      case 'weather':
        return <WeatherIrrigationPage />;
      case 'community':
        return <CommunityPage />;
      case 'market':
        return <MarketIntelligencePage />;
      case 'schemes':
        return <SchemesPage />;
      case 'chatbot':
        return <ChatbotPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Top Sticky Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-950/60 bg-gray-950 py-8 px-4 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-gray-200 text-sm">KrishiAstra AI</span>
            <span className="text-gray-400">• Smart Agriculture Ecosystem for Indian Farmers</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span>Free Tier Open Tech</span>
            <span>•</span>
            <span>Groq & Pinecone RAG</span>
            <span>•</span>
            <span>Open-Meteo Weather</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
