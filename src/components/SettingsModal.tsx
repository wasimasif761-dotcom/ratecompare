import React, { useState } from 'react';
import {
  X,
  Settings as SettingsIcon,
  Globe,
  Sun,
  Moon,
  Share2,
  Download,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  SendCurrencyCode,
  ReceiveCurrencyCode,
  LanguageCode,
} from '../types';
import { SEND_CURRENCIES, RECEIVE_CURRENCIES } from '../data/currencies';
import { TRANSLATIONS } from '../data/translations';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  defaultSend: SendCurrencyCode;
  onDefaultSendChange: (c: SendCurrencyCode) => void;
  defaultReceive: ReceiveCurrencyCode;
  onDefaultReceiveChange: (c: ReceiveCurrencyCode) => void;
  onOpenAdmin: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  defaultSend,
  onDefaultSendChange,
  defaultReceive,
  onDefaultReceiveChange,
  onOpenAdmin,
}) => {
  const t = TRANSLATIONS[language]?.settings || TRANSLATIONS.en.settings;
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const { isInstalled } = usePWAInstall();

  if (!isOpen) return null;

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🔥 آج کا لائیو ایکسچینج ریٹ چیک کریں RateCompare پر!\nسعودی ریال (SAR)، درہم (AED)، دینار (KWD) سے پاکستان (PKR)، انڈیا (INR) اور بنگلہ دیش (BDT) کے لیے تمام بینکوں کا موازنہ ایک کلک میں۔\nوزٹ کریں: ${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-5 sm:p-6 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-[#03241b] via-[#021b14] to-[#01140e] border-emerald-700/50 text-white'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-emerald-900/40 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base">{t.title}</h2>
            <p className="text-xs text-stone-400">{t.preferences}</p>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-3 mb-4">
          {/* Language selector */}
          <div className="flex items-center justify-between gap-3 text-xs p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/40">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span className="font-semibold">{t.language}</span>
            </div>

            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              className="py-1.5 px-3 rounded-xl bg-stone-900 border border-emerald-800 text-white font-bold text-xs"
            >
              <option value="en">English (UK/US)</option>
              <option value="ur">اردو (Urdu)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </div>

          {/* Theme mode */}
          <div className="flex items-center justify-between gap-3 text-xs p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/40">
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-amber-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
              <span className="font-semibold">{t.theme}</span>
            </div>

            <button
              onClick={onThemeToggle}
              className="px-3 py-1.5 rounded-xl bg-stone-900 border border-emerald-800 text-xs font-semibold text-amber-300 hover:bg-stone-800"
            >
              {theme === 'dark' ? t.darkMode : t.lightMode}
            </button>
          </div>

          {/* Default Currency Pair */}
          <div className="flex items-center justify-between gap-3 text-xs p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/40">
            <span className="font-semibold">{t.defaultCurrencyPair}</span>
            <div className="flex items-center gap-2">
              <select
                value={defaultSend}
                onChange={(e) => onDefaultSendChange(e.target.value as SendCurrencyCode)}
                className="py-1 px-2 rounded-lg bg-stone-900 border border-emerald-800 text-white text-xs font-bold"
              >
                {Object.values(SEND_CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
              <span className="text-stone-400">→</span>
              <select
                value={defaultReceive}
                onChange={(e) => onDefaultReceiveChange(e.target.value as ReceiveCurrencyCode)}
                className="py-1 px-2 rounded-lg bg-stone-900 border border-emerald-800 text-white text-xs font-bold"
              >
                {Object.values(RECEIVE_CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* WhatsApp Share Box */}
        <div className="p-3.5 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <Share2 className="w-5 h-5 text-[#25D366] shrink-0" />
            <div>
              <p className="font-bold text-xs">{t.shareWithFriends}</p>
              <p className="text-[10px] text-stone-400">Invite coworkers on WhatsApp</p>
            </div>
          </div>
          <button
            onClick={handleShareWhatsApp}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#25D366] text-stone-950 hover:bg-[#20bd5a] transition"
          >
            {t.shareWhatsApp}
          </button>
        </div>

        {/* PWA App Installation Box */}
        {!isInstalled && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-amber-400/30 flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <Download className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-xs">{t.installApp}</p>
                <p className="text-[10px] text-stone-400">{t.offlineNotice}</p>
              </div>
            </div>
            <button
              onClick={() => setInstallModalOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-400 text-stone-950 hover:bg-amber-300 transition"
            >
              Install
            </button>
          </div>
        )}

        {/* Future Updates in Urdu */}
        <div className="p-4 rounded-2xl border border-amber-400/30 bg-black/30 space-y-2 text-xs" dir="rtl">
          <div className="flex items-center gap-2 text-amber-400">
            <Sparkles className="w-4 h-4" />
            <h3 className="font-bold text-xs">{t.futureRoadmapTitle}:</h3>
          </div>
          <p className="text-[11px] text-stone-300 leading-relaxed">
            • خودکار لائیو اسکریپر اور آفیشل APIs کا انضمام<br />
            • واٹس ایپ ریٹ بوٹ (WhatsApp Rate Alert Bot)<br />
            • قریبی برانچ لوکیٹر اور کاؤنٹر ٹائمنگز (Near Me Locator)<br />
            • قانونی ترسیلات زر پر حکومتی مراعات و انعامی پوائنٹس (Sohni Dharti / PRI Rewards)<br />
            • خصوصی پرومو کوڈز اور ایفلی ایٹ بونس (0 Fee Promo Codes)
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-800 hover:bg-emerald-700 text-white transition"
        >
          Save & Close
        </button>
      </div>

      <PWAInstallModal isOpen={installModalOpen} onClose={() => setInstallModalOpen(false)} />
    </div>
  );
};
