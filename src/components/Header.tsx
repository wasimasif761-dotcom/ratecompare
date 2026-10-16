import React, { useState } from 'react';
import {
  Globe,
  Sun,
  Moon,
  Download,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  MoreVertical,
  User,
  LogIn,
  LogOut,
} from 'lucide-react';
import { LanguageCode, SendCurrencyCode, ReceiveCurrencyCode, AuthUser } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BASE_INTERBANK_RATES } from '../data/currencies';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';

interface HeaderProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  onOpenAdmin: () => void;
  onOpenMenu: () => void;
  user: AuthUser | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

const LANGUAGES: { code: LanguageCode; label: string; flag: string; nativeName: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'ur', label: 'Urdu', flag: '🇵🇰', nativeName: 'اردو' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
  { code: 'ar', label: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
];

const TICKER_PAIRS: { from: SendCurrencyCode; to: ReceiveCurrencyCode; change: string; isUp: boolean }[] = [
  { from: 'SAR', to: 'PKR', change: '+0.45%', isUp: true },
  { from: 'AED', to: 'PKR', change: '+0.38%', isUp: true },
  { from: 'KWD', to: 'PKR', change: '+1.20%', isUp: true },
  { from: 'QAR', to: 'PKR', change: '+0.15%', isUp: true },
  { from: 'SAR', to: 'INR', change: '+0.22%', isUp: true },
  { from: 'AED', to: 'INR', change: '+0.19%', isUp: true },
  { from: 'SAR', to: 'BDT', change: '-0.10%', isUp: false },
  { from: 'AED', to: 'EGP', change: '+0.65%', isUp: true },
  { from: 'GBP', to: 'PKR', change: '+0.85%', isUp: true },
  { from: 'EUR', to: 'PKR', change: '+0.30%', isUp: true },
];

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  onOpenAdmin,
  onOpenMenu,
  user,
  onOpenLogin,
  onLogout,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const { isInstalled } = usePWAInstall();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors ${
          theme === 'dark'
            ? 'bg-[#022c22]/95 border-b border-emerald-900/40 text-white backdrop-blur-md'
            : 'bg-white/95 border-b border-stone-200 text-stone-900 backdrop-blur-md'
        }`}
      >
        {/* Main Navbar */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2 w-full">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-900 flex items-center justify-center shadow-md shadow-emerald-950/40 border border-amber-400/30 shrink-0">
              <span className="text-base sm:text-lg font-black text-amber-300">₨</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse border border-[#022c22]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight whitespace-nowrap">
                  <span className={theme === 'dark' ? 'text-white' : 'text-stone-900'}>Rate</span>
                  <span className="text-amber-400">Compare</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  LIVE
                </span>
              </div>
              <p
                className={`text-[10px] hidden sm:block truncate ${
                  theme === 'dark' ? 'text-emerald-300/70' : 'text-stone-500'
                }`}
              >
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* PWA Install Button (desktop / larger screens) */}
            {!isInstalled && (
              <button
                onClick={() => setInstallModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-sm hover:from-amber-300 hover:to-amber-400 transition active:scale-95 shrink-0"
                title="Install PWA App"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            )}

            {/* Language Selector Dropdown (shown on sm: screens, inside 3-Dot Drawer on mobile) */}
            <div className="relative hidden sm:block shrink-0">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition ${
                  theme === 'dark'
                    ? 'border-emerald-800/80 bg-emerald-950/40 text-stone-200 hover:bg-emerald-900/50'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold uppercase">{language}</span>
              </button>

              {langMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-44 rounded-xl shadow-xl py-1 z-50 border text-xs ${
                    theme === 'dark'
                      ? 'bg-[#032018] border-emerald-800/80 text-stone-200'
                      : 'bg-white border-stone-200 text-stone-800'
                  }`}
                >
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        onLanguageChange(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 flex items-center justify-between text-left hover:bg-emerald-500/10 transition ${
                        language === item.code ? 'font-bold text-amber-400 bg-emerald-500/15' : ''
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.nativeName}</span>
                      </span>
                      <span className="text-[10px] opacity-60 uppercase">{item.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={onThemeToggle}
              className={`w-9 h-9 flex items-center justify-center rounded-xl border transition shrink-0 active:scale-95 ${
                theme === 'dark'
                  ? 'border-emerald-800/80 bg-emerald-950/40 text-amber-300 hover:bg-emerald-900/50'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile Avatar or Login Button (shown on sm: screens, inside 3-Dot Drawer on mobile) */}
            {user ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-xl border border-amber-400/50 bg-amber-400/10 hover:bg-amber-400/20 transition active:scale-95"
                  title={user.name}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover border border-amber-400/40"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-amber-400 text-stone-950 font-bold flex items-center justify-center text-xs">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </button>

                {userMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl py-2 z-50 border text-xs ${
                      theme === 'dark'
                        ? 'bg-[#032018] border-emerald-800 text-stone-200'
                        : 'bg-white border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="px-3 py-1.5 border-b border-emerald-900/40">
                      <p className="font-bold text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-stone-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full px-3 py-2 text-left text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 font-semibold transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition active:scale-95 shrink-0"
                title="Sign in with Google / Facebook"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Login</span>
              </button>
            )}

            {/* 3-Dot More Menu Button (Always securely visible on top right) */}
            <button
              onClick={onOpenMenu}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition shrink-0 active:scale-95 shadow-sm ${
                theme === 'dark'
                  ? 'border-amber-400/50 bg-amber-400/15 text-amber-300 hover:bg-amber-400/25 shadow-amber-950/30'
                  : 'border-stone-300 bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
              title="More Options"
              aria-label="More Options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Scrolling Rate Ticker */}
        <div
          className={`w-full overflow-hidden border-t py-1.5 text-xs font-mono select-none ${
            theme === 'dark'
              ? 'bg-[#011a14] border-emerald-950/80 text-emerald-300/90'
              : 'bg-emerald-50 border-emerald-100 text-emerald-900'
          }`}
        >
          <div className="flex animate-ticker whitespace-nowrap">
            {[...TICKER_PAIRS, ...TICKER_PAIRS].map((pair, index) => {
              const rateVal = BASE_INTERBANK_RATES[pair.from]?.[pair.to] || 0;
              return (
                <div key={index} className="inline-flex items-center gap-2 mx-4">
                  <span className="font-bold text-amber-400">{pair.from}</span>
                  <span className="text-stone-400">→</span>
                  <span className="font-bold">{pair.to}</span>
                  <span className="font-semibold text-white tracking-wider">
                    {rateVal.toFixed(2)}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      pair.isUp ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {pair.change}
                  </span>
                  <span className="text-stone-600 mx-1">•</span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* PWA Install Modal */}
      <PWAInstallModal isOpen={installModalOpen} onClose={() => setInstallModalOpen(false)} />
    </>
  );
};
