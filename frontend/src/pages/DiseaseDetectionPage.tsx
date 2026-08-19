import React, { useState, useRef } from 'react';
import { detectDisease } from '../services/api';
import { DiseaseDetectionResult } from '../types';
import { 
  ScanLine, Upload, Camera, ShieldAlert, CheckCircle2, Leaf, 
  Loader2, Sparkles, AlertTriangle, AlertCircle, RefreshCw, FileImage, 
  ShieldCheck, HelpCircle, Stethoscope, Zap, FlaskConical, Pill, 
  Shield, Ban, Calendar, Copy, Check, Volume2, Eye, EyeOff, 
  Info, ChevronDown, ChevronUp, Printer, Sprout
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DiseaseDetectionPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropHint, setCropHint] = useState<string>('Tomato');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showMask, setShowMask] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);

  // Accordion open/close states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    diagnosis: true,
    causes: true,
    symptoms: true,
    immediate: true,
    organic: true,
    chemical: true,
    nutrient: true,
    prevention: true,
    whatNotToDo: true,
    recovery: true
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setErrorMsg(null);
    }
  };

  const handleSampleSelect = async (sampleName: string, hint: string) => {
    setCropHint(hint);
    setLoading(true);
    setErrorMsg(null);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw leaf base
        ctx.fillStyle = '#164e63';
        ctx.fillRect(0, 0, 300, 300);
        ctx.fillStyle = '#059669';
        ctx.beginPath();
        ctx.ellipse(150, 150, 100, 130, 0, 0, Math.PI * 2);
        ctx.fill();

        if (sampleName.includes('Diseased')) {
          // Draw brown fungal target lesions
          ctx.fillStyle = '#451a03';
          ctx.beginPath();
          ctx.arc(120, 110, 24, 0, Math.PI * 2);
          ctx.arc(175, 175, 28, 0, Math.PI * 2);
          ctx.arc(185, 115, 18, 0, Math.PI * 2);
          ctx.fill();
          // Yellow halo
          ctx.strokeStyle = '#eab308';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      canvas.toBlob(async (blob) => {
        if (blob) {
          const testFile = new File([blob], `${sampleName.toLowerCase().replace(/\s+/g, '_')}.png`, { type: 'image/png' });
          setSelectedFile(testFile);
          setPreviewUrl(canvas.toDataURL());
          const res = await detectDisease(testFile, hint);
          setResult(res);
          setLoading(false);
        }
      }, 'image/png');

    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to run sample leaf analysis. Please try uploading an image.");
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setErrorMsg("Please select or capture a plant leaf image first.");
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await detectDisease(selectedFile, cropHint);
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.response?.data?.detail || "Diagnosis failed. Please check image format and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReport = () => {
    if (!result) return;
    const text = `KRISHIASTRA PLANT DISEASE REPORT
Crop: ${result.crop_name} (${result.botanical_name || ''})
Disease: ${result.disease_name}
Status: ${result.status} | Severity: ${result.severity_level || 'Moderate'}
Damage Area: ${result.affected_percentage}%
Pathogen: ${result.pathogen_scientific_name || 'N/A'}

--- WHY IT HAPPENED ---
${result.causes ? `Type: ${result.causes.pathogen_type}\nWeather: ${result.causes.weather_factors}\nSpread: ${result.causes.spread_mechanism}` : ''}

--- SYMPTOMS ---
${result.symptoms_detail ? `Leaf: ${result.symptoms_detail.leaf_symptoms}\nEarly: ${result.symptoms_detail.early_stage}\nSevere: ${result.symptoms_detail.severe_stage}` : result.symptoms || ''}

--- IMMEDIATE ACTIONS ---
${result.immediate_actions?.map((a, i) => `${i+1}. ${a}`).join('\n') || ''}

--- ORGANIC TREATMENT ---
${result.organic_treatment?.map((o, i) => `${i+1}. ${o}`).join('\n') || ''}

--- CHEMICAL TREATMENT ---
${result.chemical_treatment_detail ? `Active: ${result.chemical_treatment_detail.active_ingredient}\nDosage: ${result.chemical_treatment_detail.dosage}\nGuidance: ${result.chemical_treatment_detail.application_guidance}\nPre-Harvest Interval: ${result.chemical_treatment_detail.pre_harvest_interval}` : result.chemical_treatment?.join('\n') || ''}

--- WHAT NOT TO DO ---
${result.what_not_to_do?.map(w => `${w}`).join('\n') || ''}

--- RECOVERY & MONITORING ---
${result.recovery_monitoring ? `Signs: ${result.recovery_monitoring.improvement_signs}\nInterval: ${result.recovery_monitoring.inspection_interval}\nWarning: ${result.recovery_monitoring.severe_warning_signs}` : ''}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  const handleSpeakReport = () => {
    if (!result) return;
    if (speaking) {
      stopSpeaking();
      return;
    }

    if (language === 'kn') {
      // Natural, conversational Kannada farmer diagnosis narration
      const cropKn = result.crop_name || 'ಬೆಳೆ';
      const diseaseKn = result.disease_name || 'ರೋಗ';
      const severityKn = result.severity_level === 'Low' ? 'ಕಡಿಮೆ' : result.severity_level === 'Moderate' ? 'ಮಧ್ಯಮ' : result.severity_level === 'Severe' ? 'ಹೆಚ್ಚು' : 'ಸಾಮಾನ್ಯ';
      const affectedKn = `${Math.round(result.affected_percentage || 0)} ಪ್ರತಿಶತ`;
      const immediateKn = result.immediate_actions?.[0] || 'ಬಾಧಿತ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ನಾಶಮಾಡಿ';
      const organicKn = result.organic_treatment?.[0] || 'ಒಂದು ಲೀಟರ್ ನೀರಿಗೆ ಐದು ಮಿಲಿ ಬೇವಿನ ಎಣ್ಣೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ';
      const chemicalKn = result.chemical_treatment_detail 
        ? `${result.chemical_treatment_detail.active_ingredient} ಕೀಟನಾಶಕವನ್ನು ${result.chemical_treatment_detail.dosage} ಪ್ರಮಾಣದಲ್ಲಿ ಸಿಂಪಡಿಸಿ`
        : (result.chemical_treatment?.[0] || 'ಸೂಕ್ತ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಸಿಂಪಡಿಸಿ');

      const narrationKn = `ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ. ನಿಮ್ಮ ${cropKn} ಬೆಳೆಯ ರೋಗ ಪರೀಕ್ಷಾ ವರದಿ. ರೋಗದ ಹೆಸರು: ${diseaseKn}. ಹಾನಿಯ ತೀವ್ರತೆ: ${severityKn}. ಬಾಧಿತ ಭಾಗ: ${affectedKn}. ತಕ್ಷಣದ ಕ್ರಮ: ${immediateKn}. ಸಾವಯವ ಪರಿಹಾರ: ${organicKn}. ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ: ${chemicalKn}. ಕೃಷಿ ಅಸ್ತ್ರದ ಈ ಸರಳ ಕ್ರಮಗಳನ್ನು ಅನುಸರಿಸಿ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ರಕ್ಷಿಸಿಕೊಳ್ಳಿ.`;

      setSpeaking(true);

      // Clean text for audio streaming
      const cleanedKn = narrationKn.replace(/[#*_`~\[\]\(\)>|]/g, ' ').replace(/\s+/g, ' ').trim();
      const chunks = cleanedKn.split(/(?<=[.!?,\n])\s+/).filter(s => s.length > 0);

      let currentIdx = 0;
      const playNextChunk = () => {
        if (currentIdx >= chunks.length) {
          setSpeaking(false);
          return;
        }
        const chunk = chunks[currentIdx];
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=kn&client=tw-ob&q=${encodeURIComponent(chunk)}`;
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          currentIdx++;
          playNextChunk();
        };

        audio.onerror = () => {
          fallbackSpeech(chunks.slice(currentIdx).join('. '), 'kn-IN', 0.82);
        };

        audio.play().catch(() => {
          fallbackSpeech(chunks.slice(currentIdx).join('. '), 'kn-IN', 0.82);
        });
      };

      playNextChunk();
      return;
    }

    // Default English / Non-Kannada speech synthesis
    const narration = `Plant Disease Diagnosis Report for ${result.crop_name}. Diagnosis: ${result.disease_name}. Status: ${result.status}. Severity Level: ${result.severity_level || 'Moderate'}. Affected area: ${result.affected_percentage} percent. Immediate measure: ${result.immediate_actions?.[0] || 'Prune affected leaves.'} Organic recommendation: ${result.organic_treatment?.[0] || 'Spray neem oil extract.'} For chemical treatment: ${result.chemical_treatment_detail?.active_ingredient || 'Consult label'} at dosage ${result.chemical_treatment_detail?.dosage || 'as recommended'}. Always follow local product label guidelines.`;

    fallbackSpeech(narration, 'en-IN', 0.95);
  };

  const fallbackSpeech = (text: string, lang: string, rate: number) => {
    if (!('speechSynthesis' in window)) {
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;

    if (lang.startsWith('kn')) {
      const voices = window.speechSynthesis.getVoices();
      const knVoice = voices.find(v => v.lang.startsWith('kn') || v.name.toLowerCase().includes('kannada') || v.name.includes('Sapna') || v.name.includes('Gagan'));
      if (knVoice) utterance.voice = knVoice;
    }

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const getSeverityBadge = (level?: string, status?: string) => {
    if (status === 'Healthy' || level === 'None') {
      return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1">🟢 Healthy Foliage</span>;
    }
    if (level === 'Low') {
      return <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1">🟡 Severity: Low (&lt;10%)</span>;
    }
    if (level === 'Moderate') {
      return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1">🟠 Severity: Moderate (10–30%)</span>;
    }
    return <span className="bg-red-500/20 text-red-300 border border-red-500/40 px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 animate-pulse">🔴 Severity: Severe (&gt;30%)</span>;
  };

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* Immersive Plant Pathology Background */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920')` }}
      />

      {/* Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-teal-500/30 bg-gradient-to-r from-teal-950/95 via-gray-900/90 to-emerald-950/95 p-8 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <ScanLine className="w-4 h-4" /> 14-Pillar Farmer-Friendly Plant Pathology Diagnostic Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Crop Leaf Disease & Complete Pathology Report
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
              Upload a plant leaf photo for full-spectrum analysis: <span className="text-teal-400 font-bold">Crop Identification, Pathogen Detection, Environmental Causes, Symptoms, Immediate Measures, Organic & Chemical Remedies, Nutrient Balances, Prevention, and Recovery Timelines</span>.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Crop Context Filter:</span>
            <div className="flex flex-wrap gap-2">
              {['Tomato', 'Potato', 'Rice / Paddy', 'Wheat', 'Cotton', 'Sugarcane', 'Maize (Corn)', 'Apple'].map((crop) => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => setCropHint(crop)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    cropHint === crop 
                      ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-600/30' 
                      : 'bg-gray-950/80 text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-3 backdrop-blur-md">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upload / Specimen Capture Column */}
        <div className="lg:col-span-4 bg-gray-900/85 border border-gray-800 p-6 rounded-3xl space-y-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3 mb-4">
              <Camera className="w-4 h-4 text-teal-400" /> Upload Leaf Specimen
            </h3>

            {/* Drop Zone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 hover:border-teal-500 rounded-2xl p-6 text-center cursor-pointer transition-all bg-gray-950/70 hover:bg-gray-950 flex flex-col items-center justify-center min-h-[220px]"
            >
              {previewUrl ? (
                <div className="relative group">
                  <img src={previewUrl} alt="Leaf Preview" className="max-h-52 rounded-xl object-contain shadow-lg border border-gray-800" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-xs font-bold text-white">
                    Click to change image
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto text-teal-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Click or drag leaf photo here</div>
                    <div className="text-xs text-gray-500 mt-1">JPEG, PNG, WEBP (Min 48x48 px)</div>
                  </div>
                </div>
              )}
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />

            {/* Quick Pathology Demonstration Samples */}
            <div className="mt-4 pt-4 border-t border-gray-800/80">
              <div className="text-[11px] font-semibold text-gray-400 mb-2 flex items-center gap-1.5">
                <FileImage className="w-3.5 h-3.5 text-teal-400" /> Quick Demonstration Samples:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSampleSelect('Tomato Early Blight (Diseased)', 'Tomato')}
                  className="px-3 py-2 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs font-semibold hover:bg-amber-950/60 transition-all text-left flex items-center justify-between"
                >
                  <span>🍂 Tomato Blight</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded font-bold">Infected</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSampleSelect('Rice Healthy Leaf', 'Rice / Paddy')}
                  className="px-3 py-2 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-950/60 transition-all text-left flex items-center justify-between"
                >
                  <span>🌿 Rice Foliage</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">Healthy</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !selectedFile}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-40 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ScanLine className="w-5 h-5" />}
            <span>{loading ? "Generating Full Disease Report..." : "Diagnose & Generate Report"}</span>
          </button>
        </div>

        {/* Complete Diagnostic Report Column */}
        <div className="lg:col-span-8 space-y-6">
          {result ? (
            <div className="bg-gray-900/90 border border-teal-500/50 p-6 rounded-3xl space-y-6 backdrop-blur-md shadow-2xl animate-fadeIn">
              
              {/* Uncertainty / Invalid Leaf Notice */}
              {result.is_valid_leaf === false || result.uncertainty_notice ? (
                <div className="p-6 rounded-2xl bg-amber-950/60 border border-amber-500/50 space-y-3 text-amber-200 shadow-xl">
                  <div className="flex items-center gap-2 text-base font-bold text-amber-300">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <span>Diagnostic Identification Warning</span>
                  </div>
                  <p className="text-sm font-semibold text-amber-100 leading-relaxed bg-amber-900/40 p-3 rounded-xl border border-amber-500/30">
                    {result.uncertainty_notice || "Unable to confidently identify the disease. Please upload a clearer leaf/plant image or consult a local agricultural expert."}
                  </p>
                  <div className="p-4 bg-gray-950/80 rounded-xl text-xs space-y-2 text-gray-300">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-teal-400" /> Recommended Actions for Clear Photo:
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-400">
                      <li>Capture the photo in natural daylight without flash reflection or shadows.</li>
                      <li>Hold camera 15–25 cm away, focusing directly on the leaf lesion.</li>
                      <li>Ensure a single leaf covers at least 60% of the camera frame.</li>
                      <li>If symptoms persist, contact your nearest Krishi Vigyan Kendra (KVK) officer.</li>
                    </ul>
                  </div>
                </div>
              ) : (
                /* Complete 14-Pillar Comprehensive Report */
                <div className="space-y-6">
                  
                  {/* Top Action & Navigation Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-800">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Report Views:</span>
                      {['all', 'immediate', 'organic', 'chemical', 'prevention'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                            activeTab === tab 
                              ? 'bg-teal-600 text-white shadow-md' 
                              : 'bg-gray-950/70 text-gray-400 hover:text-white border border-gray-800'
                          }`}
                        >
                          {tab === 'all' && '📑 All 10 Cards'}
                          {tab === 'immediate' && '⚡ Immediate Actions'}
                          {tab === 'organic' && '🌱 Organic Plan'}
                          {tab === 'chemical' && '💊 Chemical Plan'}
                          {tab === 'prevention' && '🛡️ Prevention & IPM'}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSpeakReport}
                        className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          speaking 
                            ? 'bg-amber-500 text-gray-950 border-amber-400 font-bold animate-pulse' 
                            : 'bg-gray-950/80 text-gray-300 border-gray-800 hover:border-teal-500 hover:text-white'
                        }`}
                        title="Listen to report in voice"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span className="hidden sm:inline">{speaking ? 'Stop Voice' : 'Read Aloud'}</span>
                      </button>

                      <button
                        onClick={handleCopyReport}
                        className="p-2 rounded-xl bg-gray-950/80 text-gray-300 border border-gray-800 hover:border-teal-500 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                        title="Copy full report to clipboard"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                      </button>

                      {result.segmentation_mask_base64 && (
                        <button
                          onClick={() => setShowMask(!showMask)}
                          className="p-2 rounded-xl bg-gray-950/80 text-gray-300 border border-gray-800 hover:border-teal-500 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                          title="Toggle OpenCV lesion overlay"
                        >
                          {showMask ? <EyeOff className="w-4 h-4 text-teal-400" /> : <Eye className="w-4 h-4" />}
                          <span className="hidden sm:inline">{showMask ? 'Hide Mask' : 'Show Mask'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 1. 🔍 DIAGNOSIS HERO CARD */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-950/95 via-gray-950 to-emerald-950/95 border border-teal-500/40 shadow-xl space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[11px] font-extrabold uppercase">
                            🌿 {result.crop_name} {result.botanical_name ? `(${result.botanical_name})` : ''}
                          </span>
                          {getSeverityBadge(result.severity_level, result.status)}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white">{result.disease_name}</h3>
                        {result.pathogen_scientific_name && (
                          <div className="text-xs text-teal-300 font-semibold italic mt-0.5">
                            Pathogen: {result.pathogen_scientific_name}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 bg-gray-950/80 px-4 py-2.5 rounded-2xl border border-gray-800">
                        {result.confidence !== null && result.confidence !== undefined && (
                          <div className="text-center pr-3 border-r border-gray-800">
                            <div className="text-xl font-black text-amber-400">{result.confidence}%</div>
                            <span className="text-[10px] text-gray-400 uppercase font-bold">Confidence</span>
                          </div>
                        )}
                        <div className="text-center">
                          <div className="text-xl font-black text-red-400">{result.affected_percentage}%</div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold">Damage Area</span>
                        </div>
                      </div>
                    </div>

                    {/* OpenCV Mask Overlay */}
                    {result.segmentation_mask_base64 && showMask && (
                      <div className="pt-3 border-t border-gray-800/80">
                        <div className="text-[11px] font-semibold text-gray-300 mb-2 flex items-center justify-between">
                          <span>🔬 OpenCV Color-Space Pathology Lesion Segmentation</span>
                          <span className="text-red-400 text-[10px] font-bold">Red Outlines = Segmented Lesions</span>
                        </div>
                        <img 
                          src={result.segmentation_mask_base64} 
                          alt="OpenCV Mask" 
                          className="max-h-56 mx-auto rounded-xl border border-teal-500/30 shadow-lg" 
                        />
                      </div>
                    )}
                  </div>

                  {/* 2. ❓ WHY IT HAPPENED (CAUSES) */}
                  {(activeTab === 'all') && result.causes && (
                    <div className="rounded-2xl bg-gray-950/80 border border-gray-800 overflow-hidden">
                      <button 
                        onClick={() => toggleSection('causes')}
                        className="w-full p-4 flex items-center justify-between bg-gray-900/60 hover:bg-gray-900 text-left transition-all"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-teal-300">
                          <HelpCircle className="w-4 h-4 text-teal-400" />
                          <span>❓ Why It Happened & Environmental Triggers</span>
                        </div>
                        {openSections.causes ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {openSections.causes && (
                        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-teal-400 font-bold block uppercase text-[10px]">Pathogen Type:</span>
                            <p className="text-gray-300">{result.causes.pathogen_type}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-amber-400 font-bold block uppercase text-[10px]">Weather & Humidity Factors:</span>
                            <p className="text-gray-300">{result.causes.weather_factors}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-blue-400 font-bold block uppercase text-[10px]">Soil & Irrigation Influences:</span>
                            <p className="text-gray-300">{result.causes.soil_irrigation_factors}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-purple-400 font-bold block uppercase text-[10px]">Farming Practices & Spread:</span>
                            <p className="text-gray-300">{result.causes.farming_practices} • {result.causes.spread_mechanism}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. 🩺 SYMPTOMS BREAKDOWN */}
                  {(activeTab === 'all') && result.symptoms_detail && (
                    <div className="rounded-2xl bg-gray-950/80 border border-gray-800 overflow-hidden">
                      <button 
                        onClick={() => toggleSection('symptoms')}
                        className="w-full p-4 flex items-center justify-between bg-gray-900/60 hover:bg-gray-900 text-left transition-all"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                          <Stethoscope className="w-4 h-4 text-amber-400" />
                          <span>🩺 Symptoms & Farmer Identification Guide</span>
                        </div>
                        {openSections.symptoms ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {openSections.symptoms && (
                        <div className="p-5 space-y-3 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                              <span className="text-emerald-400 font-bold block">🍃 Leaf Symptoms:</span>
                              <p className="text-gray-300">{result.symptoms_detail.leaf_symptoms}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                              <span className="text-amber-400 font-bold block">🍅 Stem / Fruit / Root Symptoms:</span>
                              <p className="text-gray-300">{result.symptoms_detail.stem_fruit_symptoms}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                              <span className="text-yellow-400 font-bold block">🟡 Early-Stage Appearance:</span>
                              <p className="text-gray-300">{result.symptoms_detail.early_stage}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                              <span className="text-red-400 font-bold block">🔴 Severe-Stage Progression:</span>
                              <p className="text-gray-300">{result.symptoms_detail.severe_stage}</p>
                            </div>
                          </div>
                          <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 text-teal-200 flex items-start gap-2">
                            <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">Manual Farmer Inspection Tip: </span>
                              <span>{result.symptoms_detail.manual_identification_guide}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4. ⚡ IMMEDIATE ACTIONS */}
                  {(activeTab === 'all' || activeTab === 'immediate') && result.immediate_actions && result.immediate_actions.length > 0 && (
                    <div className="rounded-2xl bg-gray-950/80 border border-amber-500/30 overflow-hidden shadow-lg">
                      <button 
                        onClick={() => toggleSection('immediate')}
                        className="w-full p-4 flex items-center justify-between bg-amber-950/40 hover:bg-amber-950/60 text-left transition-all"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span>⚡ Immediate Containment Measures (What to do Right Now)</span>
                        </div>
                        {openSections.immediate ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {openSections.immediate && (
                        <div className="p-5 space-y-2">
                          {result.immediate_actions.map((action, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-gray-200 flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-300 shrink-0 text-[11px]">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{action}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 5. 🌱 ORGANIC / BIOLOGICAL TREATMENT */}
                  {(activeTab === 'all' || activeTab === 'organic') && result.organic_treatment && result.organic_treatment.length > 0 && (
                    <div className="rounded-2xl bg-gray-950/80 border border-emerald-500/30 overflow-hidden shadow-lg">
                      <button 
                        onClick={() => toggleSection('organic')}
                        className="w-full p-4 flex items-center justify-between bg-emerald-950/40 hover:bg-emerald-950/60 text-left transition-all"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                          <Leaf className="w-4 h-4 text-emerald-400" />
                          <span>🌱 Organic & Biological Treatment Protocols</span>
                        </div>
                        {openSections.organic ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {openSections.organic && (
                        <div className="p-5 space-y-2.5">
                          {result.organic_treatment.map((item, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-gray-200 flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 6. 💊 CHEMICAL / PESTICIDE TREATMENT */}
                  {(activeTab === 'all' || activeTab === 'chemical') && (
                    <div className="rounded-2xl bg-gray-950/80 border border-red-500/30 overflow-hidden shadow-lg">
                      <button 
                        onClick={() => toggleSection('chemical')}
                        className="w-full p-4 flex items-center justify-between bg-red-950/40 hover:bg-red-950/60 text-left transition-all"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-red-300">
                          <Pill className="w-4 h-4 text-red-400" />
                          <span>💊 Evidence-Based Chemical / Pesticide Treatment</span>
                        </div>
                        {openSections.chemical ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {openSections.chemical && (
                        <div className="p-5 space-y-4 text-xs">
                          {result.chemical_treatment_detail ? (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-1">
                                  <span className="text-teal-400 font-bold block uppercase text-[10px]">Active Ingredient:</span>
                                  <p className="text-white font-bold">{result.chemical_treatment_detail.active_ingredient}</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-1">
                                  <span className="text-amber-400 font-bold block uppercase text-[10px]">Exact Dosage & Formulation:</span>
                                  <p className="text-white font-bold">{result.chemical_treatment_detail.dosage}</p>
                                </div>
                              </div>

                              <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-1">
                                <span className="text-blue-400 font-bold block uppercase text-[10px]">Application Guidance:</span>
                                <p className="text-gray-300 leading-relaxed">{result.chemical_treatment_detail.application_guidance}</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-1">
                                  <span className="text-yellow-400 font-bold block uppercase text-[10px]">Pre-Harvest Interval (PHI):</span>
                                  <p className="text-gray-300">{result.chemical_treatment_detail.pre_harvest_interval}</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-1">
                                  <span className="text-red-400 font-bold block uppercase text-[10px]">Safety & Protective Precautions:</span>
                                  <ul className="list-disc pl-4 space-y-0.5 text-gray-300">
                                    {result.chemical_treatment_detail.safety_precautions.map((p, i) => (
                                      <li key={i}>{p}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <span>{result.chemical_treatment_detail.disclaimer}</span>
                              </div>
                            </>
                          ) : (
                            <ul className="space-y-2">
                              {result.chemical_treatment.map((chem, idx) => (
                                <li key={idx} className="p-3 rounded-xl bg-red-950/20 border border-red-900/40 text-gray-200 flex items-start gap-2">
                                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                  <span>{chem}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 7. 🧪 FERTILIZER & NUTRIENT MANAGEMENT */}
                  {(activeTab === 'all') && result.nutrient_management && (
                    <div className="rounded-2xl bg-gray-950/80 border border-gray-800 overflow-hidden shadow-lg">
                      <button 
                        onClick={() => toggleSection('nutrient')}
                        className="w-full p-4 flex items-center justify-between bg-gray-900/60 hover:bg-gray-900 text-left transition-all"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-teal-300">
                          <FlaskConical className="w-4 h-4 text-teal-400" />
                          <span>🧪 Fertilizer & Soil Nutrient Balance</span>
                        </div>
                        {openSections.nutrient ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {openSections.nutrient && (
                        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-emerald-400 font-bold block">NPK Guidance:</span>
                            <p className="text-gray-300">{result.nutrient_management.npk_guidance}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-amber-400 font-bold block">Micronutrient Support:</span>
                            <p className="text-gray-300">{result.nutrient_management.micronutrients}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-purple-400 font-bold block">Organic Soil Inputs:</span>
                            <p className="text-gray-300">{result.nutrient_management.organic_soil_inputs}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-blue-400 font-bold block">Deficiency vs Disease Differential:</span>
                            <p className="text-gray-300">{result.nutrient_management.deficiency_vs_disease_note}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 8. 🛡️ PREVENTION & INTEGRATED PEST MANAGEMENT (IPM) */}
                  {(activeTab === 'all' || activeTab === 'prevention') && result.prevention_measures && result.prevention_measures.length > 0 && (
                    <div className="rounded-2xl bg-gray-950/80 border border-teal-500/30 overflow-hidden shadow-lg">
                      <button 
                        onClick={() => toggleSection('prevention')}
                        className="w-full p-4 flex items-center justify-between bg-teal-950/40 hover:bg-teal-950/60 text-left transition-all"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-teal-300">
                          <Shield className="w-4 h-4 text-teal-400" />
                          <span>🛡️ Long-Term Agronomic Prevention & IPM</span>
                        </div>
                        {openSections.prevention ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {openSections.prevention && (
                        <div className="p-5 space-y-2 text-xs">
                          {result.prevention_measures.map((prev, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-teal-950/20 border border-teal-900/40 text-gray-200 flex items-start gap-2.5">
                              <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{prev}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 9. 🚫 WHAT NOT TO DO */}
                  {(activeTab === 'all') && result.what_not_to_do && result.what_not_to_do.length > 0 && (
                    <div className="rounded-2xl bg-gray-950/80 border border-rose-500/30 overflow-hidden shadow-lg">
                      <button 
                        onClick={() => toggleSection('whatNotToDo')}
                        className="w-full p-4 flex items-center justify-between bg-rose-950/40 hover:bg-rose-950/60 text-left transition-all"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-rose-300">
                          <Ban className="w-4 h-4 text-rose-400" />
                          <span>🚫 What NOT to Do (Common Mistakes that Worsen Disease)</span>
                        </div>
                        {openSections.whatNotToDo ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {openSections.whatNotToDo && (
                        <div className="p-5 space-y-2 text-xs">
                          {result.what_not_to_do.map((mistake, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-gray-200 flex items-start gap-2">
                              <span className="leading-relaxed">{mistake}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 10. 📅 RECOVERY & MONITORING */}
                  {(activeTab === 'all') && result.recovery_monitoring && (
                    <div className="rounded-2xl bg-gray-950/80 border border-gray-800 overflow-hidden shadow-lg">
                      <button 
                        onClick={() => toggleSection('recovery')}
                        className="w-full p-4 flex items-center justify-between bg-gray-900/60 hover:bg-gray-900 text-left transition-all"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span>📅 Recovery Indicators & Scouting Schedule</span>
                        </div>
                        {openSections.recovery ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {openSections.recovery && (
                        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-emerald-400 font-bold block">✨ Signs of Improvement:</span>
                            <p className="text-gray-300">{result.recovery_monitoring.improvement_signs}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-blue-400 font-bold block">🔍 Next Scouting Interval:</span>
                            <p className="text-gray-300">{result.recovery_monitoring.inspection_interval}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-red-400 font-bold block">⚠️ Severe Infection Warning Signs:</span>
                            <p className="text-gray-300">{result.recovery_monitoring.severe_warning_signs}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-gray-900/70 border border-gray-800 space-y-1">
                            <span className="text-amber-400 font-bold block">👨‍🌾 Expert Help Contact:</span>
                            <p className="text-gray-300">{result.recovery_monitoring.seek_expert_guidance}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

            </div>
          ) : (
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-center text-gray-400 space-y-4">
              <ScanLine className="w-12 h-12 text-teal-500/40 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-gray-300">Ready for Complete Plant Pathology Diagnosis</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto leading-relaxed">
                  Upload a crop leaf photograph or select a quick demonstration sample above. The system will analyze foliar damage and generate a full 14-pillar report with immediate measures, organic remedies, chemical dosages, and prevention plans.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
