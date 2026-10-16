import React, { useState } from 'react';
import {
  X,
  User,
  Settings,
  Sun,
  Moon,
  Globe,
  Share2,
  Star,
  Info,
  Scale,
  ShieldAlert,
  Phone,
  MessageCircle,
  ExternalLink,
  Lock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { LanguageCode, AuthUser } from '../types';

interface OptionsMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenSettings: () => void;
  onOpenFeedback: () => void;
  onOpenAbout: () => void;
  onOpenPrivacy: () => void;
  onOpenAdmin: () => void;
  user?: AuthUser | null;
  onOpenLogin?: () => void;
  onLogout?: () => void;
}

const LANGUAGES: { code: LanguageCode; label: string; flag: string; nativeName: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'ur', label: 'Urdu', flag: '🇵🇰', nativeName: 'اردو' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
  { code: 'ar', label: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
];

export const OptionsMenuDrawer: React.FC<OptionsMenuDrawerProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeToggle,
  language,
  onLanguageChange,
  onOpenSettings,
  onOpenFeedback,
  onOpenAbout,
  onOpenPrivacy,
  onOpenAdmin,
  user,
  onOpenLogin,
  onLogout,
}) => {
  const [langPickerOpen, setLangPickerOpen] = useState(false);
  const [adminPasswordPrompt, setAdminPasswordPrompt] = useState(false);
  const [adminInput, setAdminInput] = useState('');
  const [adminError, setAdminError] = useState(false);

  if (!isOpen) return null;

  const handleShareApp = () => {
    const text = encodeURIComponent(
      `وسیم بھائی، یہ ایپ ڈاؤن لوڈ کریں، آج کا بہترین ایکسچینج ریٹ دیکھیں!\nAl Rajhi، STC Pay، Al Ansari، Wise اور تمام بینکوں کا لائیو موازنہ ایک کلک میں:\n${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminInput.trim() === 'admin123') {
      setAdminPasswordPrompt(false);
      setAdminInput('');
      setAdminError(false);
      onClose();
      onOpenAdmin();
    } else {
      setAdminError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in">
      {/* Background tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-out drawer */}
      <div
        className={`relative w-full max-w-xs sm:max-w-sm h-full flex flex-col border-l shadow-2xl z-10 transition-transform duration-300 overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#021f18] border-emerald-800/60 text-white'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-emerald-900/40 flex items-center justify-between bg-emerald-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center border border-amber-400/30">
              <span className="font-black text-amber-300 text-sm">₨</span>
            </div>
            <div>
              <h2 className="font-extrabold text-sm tracking-tight">
                Rate<span className="text-amber-400">Compare</span>
              </h2>
              <p className="text-[10px] text-emerald-300/80">Menu & More Options</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-emerald-900/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable menu options */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
          {/* User Account / Profile & Preferences */}
          {user ? (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-emerald-900/30 border border-emerald-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-9 h-9 rounded-xl object-cover border border-amber-400/40 shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 font-bold flex items-center justify-center text-sm shrink-0">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <span className="font-bold text-sm block truncate text-white">{user.name}</span>
                  <span className="text-[10px] text-emerald-300/80 truncate block">{user.email}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout?.();
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 shrink-0 transition"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenLogin?.();
              }}
              className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-400/20 via-emerald-950/40 to-emerald-900/20 hover:from-amber-400/30 border border-amber-400/40 flex items-center justify-between transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm block text-amber-300">Sign In / Register</span>
                  <span className="text-[10px] text-stone-400">Save alerts & cloud sync</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-stone-950">
                Login
              </span>
            </button>
          )}

          {/* Profile & Settings (Preferences) */}
          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="w-full p-3 rounded-2xl bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/40 flex items-center justify-between transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm block">App Settings</span>
                <span className="text-[10px] text-stone-400">Default currencies & offline mode</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onThemeToggle}
            className="w-full p-3 rounded-2xl bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/40 flex items-center justify-between transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div>
                <span className="font-bold text-sm block">Display Mode</span>
                <span className="text-[10px] text-stone-400">
                  {theme === 'dark' ? 'Dark Emerald & Gold' : 'Light Clean Mode'}
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-amber-300">
              {theme === 'dark' ? 'Dark' : 'Light'}
            </span>
          </button>

          {/* Language Selector */}
          <div className="rounded-2xl bg-emerald-950/30 border border-emerald-800/40 overflow-hidden">
            <button
              onClick={() => setLangPickerOpen(!langPickerOpen)}
              className="w-full p-3 flex items-center justify-between transition text-left hover:bg-emerald-900/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm block">Language (زبان)</span>
                  <span className="text-[10px] text-stone-400">Current: {language.toUpperCase()}</span>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-stone-400 transition-transform ${
                  langPickerOpen ? 'rotate-90' : ''
                }`}
              />
            </button>

            {langPickerOpen && (
              <div className="p-2 border-t border-emerald-900/40 bg-black/20 space-y-1">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      onLanguageChange(item.code);
                      setLangPickerOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-left transition ${
                      language === item.code
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'hover:bg-emerald-800/40 text-stone-300'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-xs">
                      <span>{item.flag}</span>
                      <span>{item.nativeName}</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono">{item.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Share App (WhatsApp Friendly) */}
          <button
            onClick={handleShareApp}
            className="w-full p-3 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 flex items-center justify-between transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#25D366] text-stone-950 flex items-center justify-center font-bold">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm block text-white">Share App (واٹس ایپ)</span>
                <span className="text-[10px] text-emerald-300">Invite coworkers & friends</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Rate Us & Feedback */}
          <button
            onClick={() => {
              onClose();
              onOpenFeedback();
            }}
            className="w-full p-3 rounded-2xl bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/40 flex items-center justify-between transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <span className="font-bold text-sm block">Rate Us & Feedback</span>
                <span className="text-[10px] text-stone-400">Share your 5-star review</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          {/* About Us & Developer Info */}
          <button
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-950/40 to-emerald-950/40 hover:from-amber-900/50 hover:to-emerald-900/50 border border-amber-400/40 flex items-center justify-between transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 font-black flex items-center justify-center text-xs shadow-md">
                WA
              </div>
              <div>
                <span className="font-bold text-sm block text-amber-300">About & Developer</span>
                <span className="text-[10px] text-emerald-300">Waseem Asif (Full-Stack Dev)</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>

          {/* Privacy Policy & Terms */}
          <button
            onClick={() => {
              onClose();
              onOpenPrivacy();
            }}
            className="w-full p-3 rounded-2xl bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/40 flex items-center justify-between transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm block">Privacy Policy & Terms</span>
                <span className="text-[10px] text-stone-400">Data safety & legal terms</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          {/* Contact Support Direct WhatsApp */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
            <span className="text-[11px] font-bold text-stone-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Contact Support (WhatsApp)</span>
            </span>

            <div className="grid grid-cols-2 gap-2 text-center">
              <a
                href="https://wa.me/966597447275"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-2 rounded-xl bg-[#25D366] text-stone-950 font-bold text-[10px] hover:scale-105 transition flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                <span>+966 59 744 7275</span>
              </a>

              <a
                href="https://wa.me/966597440515"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-2 rounded-xl bg-[#25D366] text-stone-950 font-bold text-[10px] hover:scale-105 transition flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                <span>+966 59 744 0515</span>
              </a>
            </div>
          </div>

          {/* Admin Panel (Password Protected 'admin123') */}
          <div className="pt-2">
            {!adminPasswordPrompt ? (
              <button
                onClick={() => setAdminPasswordPrompt(true)}
                className="w-full py-2.5 px-3 rounded-xl border border-stone-800 text-stone-500 hover:text-amber-400 hover:border-amber-400/40 transition text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Panel (Protected)</span>
              </button>
            ) : (
              <form onSubmit={handleAdminVerify} className="p-3 rounded-xl bg-stone-900 border border-stone-700 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-300 font-semibold">
                  <span>Enter Admin Password:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminPasswordPrompt(false);
                      setAdminError(false);
                    }}
                    className="text-stone-500 hover:text-stone-300"
                  >
                    Cancel
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="admin123"
                  value={adminInput}
                  onChange={(e) => {
                    setAdminInput(e.target.value);
                    setAdminError(false);
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-stone-950 border border-stone-600 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
                {adminError && (
                  <p className="text-[10px] text-rose-400">Incorrect password. (Hint: admin123)</p>
                )}
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs"
                >
                  Unlock Admin Panel
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-emerald-900/40 text-center text-[10px] text-stone-400 bg-emerald-950/20">
          <p>RateCompare PWA • Built with pride for expats</p>
          <p className="text-amber-400 font-medium mt-0.5">Developed by Waseem Asif</p>
        </div>
      </div>
    </div>
  );
};
