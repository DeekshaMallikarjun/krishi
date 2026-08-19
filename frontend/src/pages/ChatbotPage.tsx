import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';
import { ChatMessage } from '../types';
import { 
  Bot, Send, Mic, MicOff, Sparkles, RefreshCcw, ShieldCheck, 
  User, Globe, Volume2, VolumeX, Radio, AlertCircle, Copy, Check, Trash2, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VoiceOption {
  code: string;
  name: string;
  native: string;
}

const SUPPORTED_VOICE_LANGS: VoiceOption[] = [
  { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'hi-IN', name: 'Hindi', native: 'हिंदी' },
  { code: 'te-IN', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்' },
  { code: 'mr-IN', name: 'Marathi', native: 'मराठी' },
  { code: 'bn-IN', name: 'Bengali', native: 'বাংলা' },
  { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'or-IN', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as-IN', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur-IN', name: 'Urdu', native: 'اردو' },
  { code: 'en-IN', name: 'English', native: 'English' },
];

export const ChatbotPage: React.FC = () => {
  const { t, language } = useLanguage();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'ನಮಸ್ಕಾರ! Welcome to KrishiAstra AI Assistant. You can speak or type in any language: Kannada, Hindi, Telugu, Tamil, Marathi, Bengali, Hinglish, Kanglish, English, or any Indian language. How can I assist your farming today?',
      detected_language: 'all',
      language_display: 'Universal Multilingual AI (13+ Languages & Dialects)',
      speech_lang_tag: 'kn-IN',
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [currentlySpeakingIdx, setCurrentlySpeakingIdx] = useState<number | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  
  // Voice input target language (defaults to auto / matches active UI or user choice)
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<string>(() => {
    if (language === 'kn') return 'kn-IN';
    if (language === 'hi') return 'hi-IN';
    return 'kn-IN'; // Default to Kannada or versatile IN
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Pre-load browser speech synthesis voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          setAvailableVoices(voices);
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Stop any active audio (SpeechSynthesis or HTML5 Audio)
  const stopSpeaking = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCurrentlySpeakingIdx(null);
  };

  // Kannada-specific phonetic normalizer for 100% human-understandable rural farmer pronunciation
  const normalizeKannadaForSpeech = (text: string): string => {
    let cleaned = text;

    // 1. Remove markdown symbols, bold, headings, URLs, table bars, bullet symbols, emojis
    cleaned = cleaned
      .replace(/[*#_`~\[\]\(\)>|]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[🌱🌾🌴🏛️🟢🟡🟠🔴•]/g, ' ')
      .replace(/---+/g, ' ');

    // 2. Transliterate English agricultural, botanical, chemical & scheme terms into smooth spoken Kannada
    cleaned = cleaned
      .replace(/\bEarly\s*Blight\b/gi, 'ಮುಂಚಿನ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ')
      .replace(/\bLate\s*Blight\b/gi, 'ತಡವಾದ ಬೆಂಕಿ ರೋಗ')
      .replace(/\bBlight\b/gi, 'ಬೆಂಕಿ ರೋಗ')
      .replace(/\bBlast\b/gi, 'ಬೆಂಕಿ ರೋಗ')
      .replace(/\bStem\s*Borer\b/gi, 'ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು')
      .replace(/\bLeaf\s*Curl\b/gi, 'ಎಲೆ ಮುರುಟು ರೋಗ')
      .replace(/\bKoleroga\b/gi, 'ಕೊಳೆರೋಗ')
      .replace(/\bMahali\b/gi, 'ಮಹಾಳಿ ರೋಗ')
      .replace(/\bBud\s*Rot\b/gi, 'ಸುಳಿ ಕೊಳೆ ರೋಗ')
      .replace(/\bMancozeb\b/gi, 'ಮ್ಯಾಂಕೋಜೆಬ್ ಶಿಲೀಂಧ್ರನಾಶಕ')
      .replace(/\bTricyclazole\b/gi, 'ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ ಶಿಲೀಂಧ್ರನಾಶಕ')
      .replace(/\bChlorantraniliprole\b/gi, 'ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ ಕೀಟನಾಶಕ')
      .replace(/\bDiafenthiuron\b/gi, 'ಡಯಾಫೆಂಥಿಯುರಾನ್ ಕೀಟನಾಶಕ')
      .replace(/\bMetalaxyl\b/gi, 'ಮೆಟಾಲಾಕ್ಸಿಲ್')
      .replace(/\bCopper\s*Oxychloride\b/gi, 'ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್')
      .replace(/\bChlorothalonil\b/gi, 'ಕ್ಲೋರೋಥಲೋನಿಲ್')
      .replace(/\bNeem\s*Oil\b/gi, 'ಬೇವಿನ ಎಣ್ಣೆ')
      .replace(/\bAzadirachtin\b/gi, 'ಅಜಾಡಿರಾಕ್ಟಿನ್ ಬೇವಿನ ಅಂಶ')
      .replace(/\bTrichoderma\s*harzianum\b/gi, 'ಟ್ರೈಕೋಡರ್ಮಾ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ')
      .replace(/\bTrichoderma\b/gi, 'ಟ್ರೈಕೋಡರ್ಮಾ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ')
      .replace(/\bBordeaux\s*mixture\b/gi, 'ಬೋರ್ಡೋ ದ್ರಾವಣ')
      .replace(/\bCartap\s*Hydrochloride\b/gi, 'ಕಾರ್ಟಾಪ್ ಹೈಡ್ರೋಕ್ಲೋರೈಡ್')
      .replace(/\bIsoprothiolane\b/gi, 'ಐಸೊಪ್ರೊಥಿಯೋಲೇನ್')
      .replace(/\bZinc\s*Sulphate\b/gi, 'ಜಿಂಕ್ ಸಲ್ಫೇಟ್')
      .replace(/\bBorax\b/gi, 'ಬೋರಾಕ್ಸ್')
      .replace(/\bUrea\b/gi, 'ಯೂರಿಯಾ ಗೊಬ್ಬರ')
      .replace(/\bNPK\b/gi, 'ಎನ್ ಪಿ ಕೆ ಸಮತೋಲಿತ ಗೊಬ್ಬರ')
      .replace(/\bDAP\b/gi, 'ಡಿ ಎ ಪಿ ಗೊಬ್ಬರ')
      .replace(/\bMOP\b/gi, 'ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರ')
      .replace(/\bPM-KISAN\b/gi, 'ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ಯೋಜನೆ')
      .replace(/\bPMFBY\b/gi, 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಬೆಳೆ ವಿಮೆ ಯೋಜನೆ')
      .replace(/\bKCC\b/gi, 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಸಾಲ ಯೋಜನೆ')
      .replace(/\bICAR\b/gi, 'ಕೃಷಿ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ')
      .replace(/\bAPMC\b/gi, 'ಎ ಪಿ ಎಂ ಸಿ ಮಾರುಕಟ್ಟೆ')
      .replace(/\bAI\b/g, 'ಎ ಐ');

    // 3. Convert Kannada numerals (೧, ೨, ೩...) to spoken Kannada words for natural voice cadence
    const knNumMap: [RegExp, string][] = [
      [/೧೦೦/g, 'ನೂರು'], [/೧೦/g, 'ಹತ್ತು'], [/೧೧/g, 'ಹನ್ನೊಂದು'], [/೧೨/g, 'ಹನ್ನೆರಡು'], [/೧೫/g, 'ಹದಿನೈದು'],
      [/೨೦/g, 'ಇಪ್ಪತ್ತು'], [/೩೦/g, 'ಮೂವತ್ತು'], [/೪೦/g, 'ನಲವತ್ತು'], [/೪೫/g, 'ನಲವತ್ತೈದು'], [/೫೦/g, 'ಐವತ್ತು'],
      [/೬೦/g, 'ಅರವತ್ತು'], [/೭೦/g, 'ಎಪ್ಪತ್ತು'], [/೭೫/g, 'ಎಪ್ಪತ್ತೈದು'], [/೮೦/g, 'ಎಂಬತ್ತು'], [/೯೦/g, 'ತೊಂಬತ್ತು'],
      [/೧/g, 'ಒಂದು'], [/೨/g, 'ಎರಡು'], [/೩/g, 'ಮೂರು'], [/೪/g, 'ನಾಲ್ಕು'], [/೫/g, 'ಐದು'],
      [/೬/g, 'ಆರು'], [/೭/g, 'ಏಳು'], [/೮/g, 'ಎಂಟು'], [/೯/g, 'ಒಂಬತ್ತು'], [/೦/g, 'ಸೊನ್ನೆ']
    ];
    for (const [re, word] of knNumMap) {
      cleaned = cleaned.replace(re, ` ${word} `);
    }

    // 4. Convert dosages, formulations & units into clear spoken Kannada
    cleaned = cleaned
      .replace(/120\s*:\s*60\s*:\s*40/g, 'ನೂರ ಇಪ್ಪತ್ತು, ಅರವತ್ತು, ನಲವತ್ತು')
      .replace(/10,?000\s*ppm/gi, 'ಹತ್ತು ಸಾವಿರ ಪಿಪಿಎಂ')
      .replace(/(\d+)\s*g\/L/gi, 'ಒಂದು ಲೀಟರ್ ನೀರಿಗೆ $1 ಗ್ರಾಂ ')
      .replace(/(\d+)\s*ml\/L/gi, 'ಒಂದು ಲೀಟರ್ ನೀರಿಗೆ $1 ಮಿಲಿ ')
      .replace(/(\d+)\s*kg\/ha/gi, 'ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ $1 ಕೆಜಿ ')
      .replace(/(\d+)\s*kg\/acre/gi, 'ಪ್ರತಿ ಎಕರೆಗೆ $1 ಕೆಜಿ ')
      .replace(/(\d+)\s*%/g, 'ಶೇಕಡಾ $1 ')
      .replace(/@\s*/g, 'ಪ್ರಮಾಣ ')
      .replace(/75\s*%\s*WP/gi, 'ಎಪ್ಪತ್ತೈದು ಪ್ರತಿಶತ ಕರಗುವ ಪುಡಿ')
      .replace(/50\s*%\s*WP/gi, 'ಐವತ್ತು ಪ್ರತಿಶತ ಕರಗುವ ಪುಡಿ')
      .replace(/18\.5\s*%\s*SC/gi, 'ಹದಿನೆಂಟು ಬಿಂದು ಐದು ಪ್ರತಿಶತ ದ್ರಾವಣ')
      .replace(/40\s*%\s*EC/gi, 'ನಲವತ್ತು ಪ್ರತಿಶತ ದ್ರಾವಣ')
      .replace(/WP/gi, 'ಕರಗುವ ಪುಡಿ')
      .replace(/EC/gi, 'ದ್ರಾವಣ')
      .replace(/SC/gi, 'ದ್ರಾವಣ')
      .replace(/SG/gi, 'ಹರಳು');

    // 5. Convert standard digits and currencies in Kannada context
    cleaned = cleaned
      .replace(/₹\s*6,?000/g, 'ಆರು ಸಾವಿರ ರೂಪಾಯಿ')
      .replace(/₹\s*3\s*(ಲಕ್ಷ|Lakh|lakh)/gi, 'ಮೂರು ಲಕ್ಷ ರೂಪಾಯಿ')
      .replace(/₹\s*(\d+)/g, '$1 ರೂಪಾಯಿ')
      .replace(/\b100\b/g, 'ನೂರು')
      .replace(/\b75\b/g, 'ಎಪ್ಪತ್ತೈದು')
      .replace(/\b60\b/g, 'ಅರವತ್ತು')
      .replace(/\b50\b/g, 'ಐವತ್ತು')
      .replace(/\b45\b/g, 'ನಲವತ್ತೈದು')
      .replace(/\b40\b/g, 'ನಲವತ್ತು')
      .replace(/\b30\b/g, 'ಮೂವತ್ತು')
      .replace(/\b20\b/g, 'ಇಪ್ಪತ್ತು')
      .replace(/\b15\b/g, 'ಹದಿನೈದು')
      .replace(/\b12\b/g, 'ಹನ್ನೆರಡು')
      .replace(/\b10\b/g, 'ಹತ್ತು')
      .replace(/\b9\b/g, 'ಒಂಬತ್ತು')
      .replace(/\b8\b/g, 'ಎಂಟು')
      .replace(/\b7\b/g, 'ಏಳು')
      .replace(/\b6\b/g, 'ಆರು')
      .replace(/\b5\b/g, 'ಐದು')
      .replace(/\b4\b/g, 'ನಾಲ್ಕು')
      .replace(/\b3\b/g, 'ಮೂರು')
      .replace(/\b2\b/g, 'ಎರಡು')
      .replace(/\b1\b/g, 'ಒಂದು');

    // 6. Clean punctuation, insert natural rhythm breathing pauses
    cleaned = cleaned
      .replace(/[:\-–—]/g, ', ')
      .replace(/([.!?])\s*/g, '$1 , ')
      .replace(/\s+/g, ' ')
      .trim();

    return cleaned;
  };

  // Strip markdown for other languages
  const cleanMarkdownForSpeech = (text: string, langCode?: string): string => {
    const code = (langCode || '').toLowerCase();
    if (code.includes('kn') || code.includes('kannada') || code.includes('kanglish')) {
      return normalizeKannadaForSpeech(text);
    }
    return text
      .replace(/[*#_`~\[\]\(\)>|]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/•/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Dedicated High-Clarity Kannada Native Human Voice Player with Audio Stream & Web Speech fallback
  const playKannadaSpeech = (cleanText: string, msgIdx?: number) => {
    if (!cleanText) return;

    stopSpeaking();
    setCurrentlySpeakingIdx(msgIdx ?? (messages.length));
    setSpeechError(null);

    // Split text into natural sentence chunks for smooth, high-quality audio streaming
    const sentences = cleanText
      .split(/(?<=[.!?,\n])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (sentences.length === 0) {
      setCurrentlySpeakingIdx(null);
      return;
    }

    // Try playing high-fidelity Native Kannada voice audio chunks
    let currentSentenceIdx = 0;

    const playNextSentence = () => {
      if (currentSentenceIdx >= sentences.length) {
        setCurrentlySpeakingIdx(null);
        return;
      }

      const chunk = sentences[currentSentenceIdx];
      // Build safe URL for authentic Kannada neural/human audio
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=kn&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;

      audio.onended = () => {
        currentSentenceIdx++;
        playNextSentence();
      };

      audio.onerror = () => {
        // Fallback to browser SpeechSynthesis tuned for natural Kannada
        audioPlayerRef.current = null;
        fallbackWebSpeechKannada(sentences.slice(currentSentenceIdx).join('. '), msgIdx);
      };

      audio.play().catch(() => {
        // Browser autoplay policy or offline: fall back immediately to SpeechSynthesis
        audioPlayerRef.current = null;
        fallbackWebSpeechKannada(sentences.slice(currentSentenceIdx).join('. '), msgIdx);
      });
    };

    playNextSentence();
  };

  // Browser SpeechSynthesis fallback tailored specifically for authentic Kannada farmer accent
  const fallbackWebSpeechKannada = (text: string, msgIdx?: number) => {
    if (!('speechSynthesis' in window)) {
      setCurrentlySpeakingIdx(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'kn-IN';

    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();

    // Prioritize natural/online Kannada voices
    const knVoice = voices.find(v => 
      v.lang === 'kn-IN' || 
      v.lang === 'kn_IN' ||
      v.lang.toLowerCase().startsWith('kn') ||
      v.name.toLowerCase().includes('kannada') ||
      v.name.includes('ಕನ್ನಡ') ||
      v.name.includes('Sapna') ||
      v.name.includes('Gagan') ||
      v.name.includes('Shruti')
    );

    if (knVoice) {
      utterance.voice = knVoice;
    } else {
      // Fallback to Indian English / Indian Hindi multilingual voice with Indian intonation
      const indianVoice = voices.find(v => 
        v.lang === 'hi-IN' || 
        v.lang === 'en-IN' || 
        v.name.toLowerCase().includes('india')
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
    }

    // Natural rural Kannada cadence: calm, relaxed rate (0.82) and warm human pitch (0.98)
    utterance.rate = 0.82;
    utterance.pitch = 0.98;

    utterance.onstart = () => {
      setCurrentlySpeakingIdx(msgIdx ?? (messages.length));
      setSpeechError(null);
    };

    utterance.onend = () => {
      setCurrentlySpeakingIdx(null);
    };

    utterance.onerror = (e) => {
      console.warn("Kannada Speech synthesis error:", e);
      setCurrentlySpeakingIdx(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Text-to-Speech (Audio Output) dispatcher
  const speakText = (text: string, langCode?: string, msgIdx?: number) => {
    if (msgIdx !== undefined && currentlySpeakingIdx === msgIdx) {
      stopSpeaking();
      return;
    }

    const code = (langCode || '').toLowerCase();

    // 1. Specialized Kannada Natural Farmer Accent Engine (Kannada Only)
    if (code.includes('kn') || code.includes('kannada') || code.includes('kanglish')) {
      const cleanKnText = normalizeKannadaForSpeech(text);
      if (!cleanKnText) return;
      playKannadaSpeech(cleanKnText, msgIdx);
      return;
    }

    // 2. Standard Engine for all other languages (unchanged)
    if (!('speechSynthesis' in window)) {
      setSpeechError("Speech synthesis (audio playback) is not supported in this browser.");
      return;
    }

    stopSpeaking();

    const cleanText = cleanMarkdownForSpeech(text, langCode);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();

    if (code.includes('hi') || code.includes('hindi') || code.includes('hinglish')) {
      utterance.lang = 'hi-IN';
      const hiVoice = voices.find(v => v.lang === 'hi-IN' || v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi'));
      if (hiVoice) utterance.voice = hiVoice;
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
    } else if (code.includes('te') || code.includes('telugu') || code.includes('tenglish')) {
      utterance.lang = 'te-IN';
      const teVoice = voices.find(v => v.lang === 'te-IN' || v.lang.startsWith('te'));
      if (teVoice) utterance.voice = teVoice;
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
    } else if (code.includes('ta') || code.includes('tamil') || code.includes('tanglish')) {
      utterance.lang = 'ta-IN';
      const taVoice = voices.find(v => v.lang === 'ta-IN' || v.lang.startsWith('ta'));
      if (taVoice) utterance.voice = taVoice;
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
    } else if (code.includes('ml') || code.includes('malayalam')) {
      utterance.lang = 'ml-IN';
      const mlVoice = voices.find(v => v.lang === 'ml-IN' || v.lang.startsWith('ml'));
      if (mlVoice) utterance.voice = mlVoice;
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
    } else if (code.includes('mr') || code.includes('marathi') || code.includes('marathish')) {
      utterance.lang = 'mr-IN';
      const mrVoice = voices.find(v => v.lang === 'mr-IN' || v.lang.startsWith('mr'));
      if (mrVoice) utterance.voice = mrVoice;
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
    } else if (code.includes('bn') || code.includes('bengali') || code.includes('benglish')) {
      utterance.lang = 'bn-IN';
      const bnVoice = voices.find(v => v.lang === 'bn-IN' || v.lang.startsWith('bn'));
      if (bnVoice) utterance.voice = bnVoice;
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
    } else if (code.includes('gu') || code.includes('gujarati')) {
      utterance.lang = 'gu-IN';
      const guVoice = voices.find(v => v.lang === 'gu-IN' || v.lang.startsWith('gu'));
      if (guVoice) utterance.voice = guVoice;
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
    } else if (code.includes('pa') || code.includes('punjabi')) {
      utterance.lang = 'pa-IN';
      const paVoice = voices.find(v => v.lang === 'pa-IN' || v.lang.startsWith('pa'));
      if (paVoice) utterance.voice = paVoice;
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
    } else if (code.includes('or') || code.includes('odia')) {
      utterance.lang = 'or-IN';
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
    } else if (code.includes('as') || code.includes('assamese')) {
      utterance.lang = 'as-IN';
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
    } else if (code.includes('ur') || code.includes('urdu')) {
      utterance.lang = 'ur-IN';
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
    } else {
      utterance.lang = 'en-IN';
      const enVoice = voices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india'));
      if (enVoice) utterance.voice = enVoice;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
    }

    utterance.onstart = () => {
      setCurrentlySpeakingIdx(msgIdx ?? (messages.length));
      setSpeechError(null);
    };

    utterance.onend = () => {
      setCurrentlySpeakingIdx(null);
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      setCurrentlySpeakingIdx(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleClearChat = () => {
    stopSpeaking();
    setMessages([
      {
        sender: 'bot',
        text: 'Chat history cleared. You can start a new conversation in any language or script!',
        detected_language: 'all',
        language_display: 'Universal Multilingual AI',
        timestamp: 'Just now'
      }
    ]);
  };

  const handleSend = async (textToSend?: string, triggeredByVoice: boolean = false) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    stopSpeaking();

    const userMsg: ChatMessage = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    if (!textToSend) setInput('');
    setLoading(true);
    setSpeechError(null);

    // Format conversation history for API
    const historyPayload = nextHistory.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    try {
      const res = await sendChatMessage(
        query,
        undefined, // Let backend automatically detect language dynamically per message
        undefined, // locationContext
        historyPayload
      );

      const botMsg: ChatMessage = {
        sender: 'bot',
        text: res.reply,
        detected_language: res.detected_language,
        language_display: res.language_display,
        speech_lang_tag: res.speech_lang_tag,
        sources: res.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => {
        const nextList = [...prev, botMsg];
        const newMsgIdx = nextList.length - 1;
        
        // If Auto Speak is enabled or user asked via voice, speak response aloud!
        if (autoSpeak || triggeredByVoice) {
          setTimeout(() => {
            speakText(res.reply, res.detected_language, newMsgIdx);
          }, 200);
        }
        return nextList;
      });

    } catch (e) {
      console.error(e);
      const errReply = 'Apologies, I encountered a temporary connection issue. Please try asking again.';
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: errReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Speech-to-Text (Voice Input)
  const toggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError("Voice input is not supported in your browser. Please use Google Chrome, Edge, or Safari.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      
      // Use chosen voice recognition language
      recognition.lang = selectedVoiceLang || 'kn-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
        stopSpeaking();
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          setIsListening(false);
          // Automatically send query for full hands-free Speech-to-Speech loop!
          handleSend(transcript, true);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError("Microphone access was blocked. Please grant microphone permissions in your browser address bar.");
        } else if (event.error !== 'no-speech') {
          setSpeechError(`Voice recognition error: ${event.error}. Please try again or type your question.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      console.error(err);
      setIsListening(false);
      setSpeechError("Could not initialize microphone. Please verify browser permissions.");
    }
  };

  const samplePrompts = [
    { text: "ನನ್ನ ಟೊಮೆಟೊ ಬೆಳೆಗೆ ಎಲೆ ಚುಕ್ಕೆ ಇದೆ, ಪರಿಹಾರ ತಿಳಿಸಿ", lang: "ಕನ್ನಡ (Kannada)", tag: "kn" },
    { text: "गेहूं में पहली सिंचाई कब और कितनी करनी चाहिए?", lang: "हिंदी (Hindi)", tag: "hi" },
    { text: "వరి పంటలో ఆకులు ఎండిపోతున్నాయి, ఏమి చేయాలి?", lang: "తెలుగు (Telugu)", tag: "te" },
    { text: "கத்தரி செடிக்கு உரம் என்ன போட வேண்டும்?", lang: "தமிழ் (Tamil)", tag: "ta" },
    { text: "माझ्या टोमॅटो पिकावर करपा रोग आला आहे, काय उपाय करावा?", lang: "मराठी (Marathi)", tag: "mr" },
    { text: "ধানের জমিতে ব্লাইট রোগ হয়েছে, কি ঔষধ দেব?", lang: "বাংলা (Bengali)", tag: "bn" },
    { text: "വാഴ കൃഷിയിൽ ഇല മഞ്ഞളിപ്പ് മാറ്റാൻ എന്ത് ചെയ്യണം?", lang: "മലയാളം (Malayalam)", tag: "ml" },
    { text: "કપાસમાં ઈયળ નિયંત્રણ માટે કઈ દવા છાંટવી?", lang: "ગુજરાતી (Gujarati)", tag: "gu" },
    { text: "ਝੋਨੇ ਵਿੱਚ ਤਣਾ ਛੇਦਕ ਕੀੜੇ ਦੀ ਰੋਕਥਾਮ ਕਿਵੇਂ ਕਰੀਏ?", lang: "ਪੰਜਾਬੀ (Punjabi)", tag: "pa" },
    { text: "ଧାନ ଫସଲରେ ପତ୍ର ପୋଡ଼ା ରୋଗ ପାଇଁ କଣ ଔଷଧ ଦେବି?", lang: "ଓଡ଼ିଆ (Odia)", tag: "or" },
    { text: "ধান খেতিত ব্লাইট ৰোগৰ বাবে কি ঔষধ দিব লাগে?", lang: "অসমীয়া (Assamese)", tag: "as" },
    { text: "ٹماٹر کی فصل میں کیڑوں سے بچاؤ کے لیے کون سی دوا استعمال کریں؟", lang: "اردو (Urdu)", tag: "ur" },
    { text: "namma paddy belige gobbara yenu beku?", lang: "Kanglish", tag: "kn" },
    { text: "tamatar me keeda lag gaya hai kaunsa spray karu?", lang: "Hinglish", tag: "hi" },
    { text: "How to apply for PM-KISAN ₹6,000 scheme?", lang: "English", tag: "en" }
  ];

  return (
    <div className="relative min-h-[90vh] rounded-3xl overflow-hidden max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Immersive Agriculture Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 bg-cover bg-center bg-fixed opacity-15 mix-blend-screen"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1920')` }}
      />
      
      {/* Hero Header Banner with Multilingual Speech-to-Speech Controls */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-emerald-950/95 via-gray-900/90 to-teal-950/95 p-6 shadow-2xl backdrop-blur-xl">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1920')` }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 flex items-center justify-center text-gray-950 font-bold shadow-lg shadow-emerald-500/20">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {t.chat.title}
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-semibold">
                  Universal Multilingual AI (13+ Indian Languages)
                </span>
              </h2>
              <p className="text-xs text-gray-300 mt-0.5">
                Speak or type in any language: <strong className="text-emerald-400">Kannada, Hindi, Telugu, Tamil, Marathi, Bengali, Malayalam, Gujarati, Punjabi, Odia, Assamese, Urdu, Hinglish, Kanglish & English</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Auto-Voice Speak Toggle */}
            <button
              onClick={() => {
                const next = !autoSpeak;
                setAutoSpeak(next);
                if (!next) stopSpeaking();
              }}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all ${
                autoSpeak 
                  ? 'bg-emerald-600/30 border-emerald-400/60 text-emerald-300 shadow-md' 
                  : 'bg-gray-950/80 border-gray-800 text-gray-400 hover:text-white'
              }`}
              title="Toggle Auto Voice Read Aloud"
            >
              {autoSpeak ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span className="font-semibold">{autoSpeak ? "Voice Read Aloud ON" : "Voice Read Aloud OFF"}</span>
            </button>

            {/* Clear Chat Button */}
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border border-gray-800 bg-gray-950/80 text-gray-400 hover:text-red-300 hover:border-red-500/40 transition-all"
              title="Clear Conversation History"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Voice Language Mic Dialect Quick Selector */}
        <div className="relative z-10 mt-4 pt-3 border-t border-gray-800/80 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-medium text-gray-400 shrink-0 flex items-center gap-1">
            <Mic className="w-3.5 h-3.5 text-emerald-400" /> Language & Mic:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {SUPPORTED_VOICE_LANGS.map((vl) => (
              <button
                key={vl.code}
                onClick={() => setSelectedVoiceLang(vl.code)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedVoiceLang === vl.code
                    ? 'bg-emerald-500 text-gray-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-gray-900/90 text-gray-300 hover:text-white hover:bg-gray-800 border border-gray-800'
                }`}
              >
                {vl.native} ({vl.name})
              </button>
            ))}
          </div>
        </div>
      </div>

      {speechError && (
        <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs flex items-center gap-3 backdrop-blur-md animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{speechError}</span>
        </div>
      )}

      {/* Suggested Multilingual Prompt Chips */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-1">
          Suggested Questions in Indian Languages (Click to ask):
        </div>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.text)}
              className="text-[11px] bg-gray-900/90 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-800 hover:border-emerald-500/50 rounded-xl px-3 py-2 transition-all text-left flex items-center gap-2 group shadow-sm"
            >
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-1.5 py-0.5 rounded shrink-0">
                {p.lang}
              </span>
              <span className="truncate max-w-xs">{p.text}</span>
              <ArrowRight className="w-3 h-3 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-auto" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-4 sm:p-6 backdrop-blur-md shadow-2xl flex flex-col h-[550px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none shadow-lg shadow-emerald-600/20 font-medium'
                    : 'bg-gray-950/90 border border-gray-800 text-gray-200 rounded-tl-none space-y-2.5 shadow-md'
                }`}
              >
                {/* Language Header for Bot Messages */}
                {msg.sender === 'bot' && (
                  <div className="text-[10px] text-emerald-400 font-semibold flex items-center justify-between border-b border-gray-800/90 pb-1.5 gap-2">
                    <span className="flex items-center gap-1.5 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/60">
                      <Globe className="w-3 h-3" />
                      {msg.language_display || 'Detected Language'}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      {/* Copy Advice Button */}
                      <button
                        onClick={() => handleCopy(msg.text, idx)}
                        className="p-1 rounded-md text-gray-400 hover:text-white bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all"
                        title="Copy text to clipboard"
                      >
                        {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>

                      {/* Listen / Stop Voice Readout */}
                      <button
                        onClick={() => speakText(msg.text, msg.detected_language || msg.speech_lang_tag, idx)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition-all text-[10px] ${
                          currentlySpeakingIdx === idx 
                            ? 'bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/50 animate-pulse' 
                            : 'text-gray-400 hover:text-emerald-300 bg-gray-900 border border-gray-800'
                        }`}
                        title={currentlySpeakingIdx === idx ? "Stop Audio" : "Listen to answer (Speech-to-Speech)"}
                      >
                        {currentlySpeakingIdx === idx ? (
                          <>
                            <Radio className="w-3 h-3 text-emerald-400 animate-spin" />
                            <span>Speaking...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Message Body */}
                <div className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</div>

                {/* Grounded RAG Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-2 border-t border-gray-800 text-[11px] space-y-1 text-gray-400">
                    <div className="font-bold text-gray-300 text-[10px] uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified Agricultural RAG Context:
                    </div>
                    {msg.sources.map((s, sIdx) => (
                      <div key={sIdx} className="p-2 rounded-lg bg-gray-900/60 border border-emerald-900/40 text-emerald-300/90 text-[11px]">
                        <strong className="text-emerald-400">• {s.title}:</strong> {s.excerpt}
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-[9px] text-gray-400 text-right mt-1 opacity-70">{msg.timestamp}</div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-1 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-xs text-emerald-400 bg-gray-950/80 border border-emerald-500/30 p-3 rounded-2xl max-w-sm animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Analyzing in your language & querying Agricultural Knowledge Base...</span>
            </div>
          )}

          {isListening && (
            <div className="flex items-center gap-3 text-xs text-red-300 bg-red-950/40 border border-red-500/40 p-3 rounded-2xl animate-pulse">
              <Radio className="w-4 h-4 text-red-400 animate-spin" />
              <span>Listening to your voice in <strong>{selectedVoiceLang}</strong>... Speak your farming question now.</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Multilingual Input Bar */}
        <div className="pt-4 border-t border-gray-800 flex items-center gap-2">
          {/* Microphone Voice Input Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-3.5 rounded-xl border transition-all flex items-center justify-center ${
              isListening
                ? 'bg-red-600 text-white border-red-500 animate-pulse shadow-lg shadow-red-600/40'
                : 'bg-gray-950 border-gray-800 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/50'
            }`}
            title={isListening ? "Stop Listening" : "Start Voice Input (Speech-to-Speech)"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-emerald-400" />}
          </button>

          <input
            type="text"
            placeholder={isListening ? "Listening... Speak your question now..." : "Type your farming question in any Indian language or dialect (ಕನ್ನಡ, हिंदी, తెలుగు, தமிழ், Hinglish, etc.)..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
          />

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 disabled:opacity-50 transition-all flex items-center justify-center cursor-pointer"
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
