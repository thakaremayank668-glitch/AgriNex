import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, CheckCircle2, ArrowRight, CornerDownLeft } from 'lucide-react';
import { VOICE_SAMPLE_QUERIES } from '../../data/mockData';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToFairPrice?: () => void;
  onNavigateToPools?: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigateToFairPrice,
  onNavigateToPools,
}) => {
  const [selectedLang, setSelectedLang] = useState<'gu' | 'hi' | 'en'>('gu');
  const [isListening, setIsListening] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setIsSpeaking(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSample = VOICE_SAMPLE_QUERIES.find((q) => q.lang === selectedLang) || VOICE_SAMPLE_QUERIES[0];

  const handleStartListening = () => {
    setIsListening(true);
    setAssistantResponse(null);
    setActiveQuery(currentSample.query);

    // Simulate listening for 2 seconds, then return response & speak
    setTimeout(() => {
      setIsListening(false);
      handleTriggerQuery(currentSample.query, currentSample.responseAudioText);
    }, 1800);
  };

  const handleTriggerQuery = (queryText: string, responseText: string) => {
    setActiveQuery(queryText);
    setAssistantResponse(responseText);

    // Use Web Speech API if supported
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(responseText);
      utterance.rate = 0.95;
      if (selectedLang === 'hi') utterance.lang = 'hi-IN';
      else if (selectedLang === 'gu') utterance.lang = 'gu-IN';
      else utterance.lang = 'en-IN';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 4000);
    }
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-stone-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Kisan Voice Assistant</h2>
              <p className="text-xs text-stone-400">Rural-first Vernacular Decision Support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Tabs */}
        <div className="p-4 bg-stone-950/60 border-b border-stone-800">
          <p className="text-xs font-medium text-stone-400 mb-2">Select Language / ભાષા પસંદ કરો / भाषा चुनें:</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'gu', label: 'ગુજરાતી', sub: 'Gujarati' },
              { id: 'hi', label: 'हिन्दी', sub: 'Hindi' },
              { id: 'en', label: 'English', sub: 'English' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => {
                  setSelectedLang(lang.id as any);
                  setAssistantResponse(null);
                  setActiveQuery('');
                }}
                className={`py-2 px-3 rounded-xl border text-center transition-all ${
                  selectedLang === lang.id
                    ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-md'
                    : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <div className="text-sm font-semibold">{lang.label}</div>
                <div className="text-[10px] opacity-75">{lang.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Central Audio Circle Interaction */}
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            {/* Pulsing visual rings */}
            {isListening && (
              <>
                <div className="absolute inset-0 -m-4 rounded-full bg-amber-500/30 animate-ping" />
                <div className="absolute inset-0 -m-8 rounded-full bg-amber-500/10 animate-pulse" />
              </>
            )}
            {isSpeaking && (
              <div className="absolute inset-0 -m-3 rounded-full bg-emerald-500/40 animate-pulse" />
            )}

            {/* Microphone Button */}
            <button
              onClick={handleStartListening}
              disabled={isListening}
              className={`relative z-10 w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-xl transition-all transform hover:scale-105 active:scale-95 ${
                isListening
                  ? 'bg-gradient-to-tr from-amber-500 to-amber-600 text-white ring-4 ring-amber-400/50'
                  : isSpeaking
                  ? 'bg-gradient-to-tr from-emerald-600 to-emerald-700 text-white ring-4 ring-emerald-400/50'
                  : 'bg-gradient-to-tr from-stone-800 to-stone-700 text-amber-400 hover:text-white border-2 border-amber-500/40'
              }`}
            >
              {isListening ? (
                <Mic className="w-10 h-10 animate-bounce" />
              ) : isSpeaking ? (
                <Volume2 className="w-10 h-10 animate-pulse" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
              <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">
                {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap to Speak'}
              </span>
            </button>
          </div>

          <h3 className="text-xl font-bold text-white mb-1">
            {isListening ? 'સંભળાઈ રહ્યું છે...' : 'How can I help?'}
          </h3>
          <p className="text-xs text-stone-400 max-w-xs">
            Ask any question about crop prices, cost calculation, or nearby pickup pools without typing.
          </p>

          {/* Quick Voice Prompt Chips */}
          <div className="w-full mt-6 text-left">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
              Try asking (Tap to simulate):
            </p>
            <div className="space-y-2">
              {VOICE_SAMPLE_QUERIES.map((sample) => (
                <button
                  key={sample.lang}
                  onClick={() => {
                    setSelectedLang(sample.lang as any);
                    handleTriggerQuery(sample.query, sample.responseAudioText);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    activeQuery === sample.query
                      ? 'bg-stone-800 border-amber-500/80 text-amber-300'
                      : 'bg-stone-900/90 border-stone-800 text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <div>
                    <div className="text-xs text-amber-400 font-mono font-medium">{sample.languageName}</div>
                    <div className="text-sm font-semibold mt-0.5">"{sample.query}"</div>
                  </div>
                  <CornerDownLeft className="w-4 h-4 text-stone-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Audio Response Output Card */}
          {assistantResponse && (
            <div className="w-full mt-6 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-700/60 text-left animate-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>AgriNex Voice Response</span>
                </div>
                {isSpeaking && (
                  <button
                    onClick={handleStopSpeaking}
                    className="text-[11px] text-emerald-300 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>Mute</span>
                  </button>
                )}
              </div>

              <p className="text-sm text-stone-100 font-medium leading-relaxed">
                {assistantResponse}
              </p>

              {/* Actionable Visual Decision Card */}
              <div className="mt-3 pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Calculated Fair Price</span>
                    <span className="text-emerald-400 font-bold text-base">₹30 / kg</span>
                  </div>
                  <div className="border-l border-emerald-800 pl-3">
                    <span className="text-stone-400 block text-[10px]">Mandi Benchmark</span>
                    <span className="text-stone-300 font-semibold line-through">₹28 / kg</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onNavigateToFairPrice && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToFairPrice();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm"
                    >
                      Cost Breakdown
                    </button>
                  )}
                  {onNavigateToPools && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToPools();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs border border-stone-700"
                    >
                      View Pool
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
