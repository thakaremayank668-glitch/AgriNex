import React from 'react';
import { 
  Sprout, 
  Wifi, 
  WifiOff, 
  Mic, 
  Sparkles, 
  Layers, 
  Bell, 
  Globe, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  User,
  ShoppingBag,
  Truck,
  Building2,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import { Role, Language } from '../../types';

interface NavbarProps {
  currentRole: Role;
  onSelectRole: (role: Role) => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  onOpenVoiceAssistant: () => void;
  onOpenAiQuality: () => void;
  onOpenDesignSystem: () => void;
  onOpenAuth: () => void;
  unreadNotifsCount: number;
  onOpenNotifications: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  language,
  onChangeLanguage,
  isOfflineMode,
  onToggleOfflineMode,
  onOpenVoiceAssistant,
  onOpenAiQuality,
  onOpenDesignSystem,
  onOpenAuth,
  unreadNotifsCount,
  onOpenNotifications,
  isMobileFrame,
  onToggleMobileFrame,
}) => {
  const roles: { id: Role; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: 'Overview', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'farmer', label: 'Farmer App', icon: <Sprout className="w-3.5 h-3.5" />, badge: 'Mobile-First' },
    { id: 'buyer', label: 'Buyer Portal', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'fpo', label: 'FPO Hub', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'logistics', label: 'Logistics', icon: <Truck className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Admin Analytics', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
  ];

  const languageLabels: Record<Language, string> = {
    en: 'English',
    hi: 'हिन्दी',
    gu: 'ગુજરાતી',
    mr: 'मराठी',
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100 shadow-md">
      {/* Upper Utility Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between border-b border-stone-800 text-xs text-stone-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-400 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider font-mono">Smart India Hackathon 2026 Prototype</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">|</span>
          <span className="text-stone-400 hidden md:inline">
            Connecting 14,000+ Indian Smallholders directly with Institutional Markets
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Low Connectivity / Offline Mode Toggle */}
          <button
            id="nav-offline-toggle"
            onClick={onToggleOfflineMode}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              isOfflineMode 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
            title="Toggle between online and low-connectivity offline mode"
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>Offline Mode (Active)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Online (Tap for Low-Bandwidth)</span>
                <span className="sm:hidden">Online</span>
              </>
            )}
          </button>

          {/* Language Selector */}
          <div className="relative group">
            <button 
              id="nav-language-btn"
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>{languageLabels[language]}</span>
            </button>
            <div className="absolute right-0 mt-1 w-32 bg-stone-800 border border-stone-700 rounded-lg shadow-xl py-1 hidden group-hover:block z-50">
              {(Object.keys(languageLabels) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onChangeLanguage(lang)}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-stone-700 transition-colors ${
                    language === lang ? 'text-emerald-400 font-semibold bg-stone-700/50' : 'text-stone-200'
                  }`}
                >
                  {languageLabels[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Design System Spec Button */}
          <button
            id="nav-design-system-btn"
            onClick={onOpenDesignSystem}
            className="hidden sm:flex items-center gap-1 text-stone-300 hover:text-emerald-400 transition-colors"
            title="Inspect AgriNex UI/UX Design System"
          >
            <Layers className="w-3.5 h-3.5 text-stone-400" />
            <span>Design System</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectRole('landing')} 
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white font-mono">
                  AGRI<span className="text-emerald-400">NEX</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  v2.6 AI
                </span>
              </div>
              <p className="text-[10px] text-stone-400 tracking-wide font-medium hidden sm:block">
                Decision-Support & Fair Aggregation Ecosystem
              </p>
            </div>
          </button>
        </div>

        {/* Persona Switcher Buttons (Role Navigation) */}
        <nav className="hidden lg:flex items-center p-1 bg-stone-800/90 rounded-xl border border-stone-700/80 gap-1">
          {roles.map((role) => {
            const isActive = currentRole === role.id;
            return (
              <button
                key={role.id}
                id={`role-btn-${role.id}`}
                onClick={() => onSelectRole(role.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-700/60'
                }`}
              >
                {role.icon}
                <span>{role.label}</span>
                {role.badge && (
                  <span className={`text-[9px] px-1 rounded ${
                    isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {role.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Shortcuts & User Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile Frame Simulator Toggle for Farmer persona */}
          <button
            id="toggle-mobile-frame-btn"
            onClick={onToggleMobileFrame}
            className={`p-2 rounded-lg border transition-all ${
              isMobileFrame
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
            title={isMobileFrame ? "Switch to Desktop Responsive view" : "Simulate Mobile Frame (Ideal for Farmer view)"}
          >
            {isMobileFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* AI Quality Check Shortcut */}
          <button
            id="quick-ai-quality-btn"
            onClick={onOpenAiQuality}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-700/50 text-xs font-semibold shadow-sm transition-all"
            title="Scan crop with AI Vision Inspection"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">AI Quality Check</span>
            <span className="md:hidden">AI Inspect</span>
          </button>

          {/* Voice Assistant Trigger */}
          <button
            id="quick-voice-btn"
            onClick={onOpenVoiceAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold shadow-sm transition-all animate-pulse"
            title="Speak in Gujarati, Hindi or English"
          >
            <Mic className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Voice Assist</span>
          </button>

          {/* Notification Center */}
          <button
            id="nav-notifs-btn"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
            title="System notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth */}
          <button
            id="nav-auth-btn"
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-medium transition-colors"
          >
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Ramesh Patel (Farmer)</span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Role Switcher Row */}
      <div className="lg:hidden border-t border-stone-800 bg-stone-900/95 overflow-x-auto px-3 py-1.5 flex gap-1.5">
        {roles.map((role) => {
          const isActive = currentRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap font-medium transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-stone-300 bg-stone-800 hover:bg-stone-700'
              }`}
            >
              {role.icon}
              <span>{role.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
