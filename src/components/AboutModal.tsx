import React from 'react';
import {
  X,
  Sparkles,
  Phone,
  MessageCircle,
  Globe,
  Award,
  Heart,
  Youtube,
  Facebook,
  Share2,
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-5 sm:p-6 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-[#03241b] via-[#021a13] to-[#01140e] border-amber-400/40 text-white'
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

        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        {/* App Logo & Header */}
        <div className="flex flex-col items-center text-center mt-2 mb-5">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-950 flex items-center justify-center shadow-xl border-2 border-amber-400/40 mb-3">
            <span className="text-3xl font-black text-amber-300">₨</span>
            <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
          </div>

          <h2 className="text-2xl font-black tracking-tight">
            <span>Rate</span>
            <span className="text-amber-400">Compare</span>
          </h2>
          <p className="text-xs font-semibold text-emerald-400 mt-0.5 tracking-wide">
            "Overseas Pakistanis ka apna Rate App"
          </p>
          <span className="mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
            Version 2.0 (PWA Live)
          </span>
        </div>

        {/* Developer Card (Highlighted in Golden Color) */}
        <div
          className={`p-4 rounded-2xl border mb-4 relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-amber-950/30 via-emerald-950/40 to-amber-950/20 border-amber-400/50 shadow-lg shadow-amber-950/20'
              : 'bg-amber-50/70 border-amber-300 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-stone-950 font-black text-xl flex items-center justify-center shadow-md shrink-0 border border-amber-200">
              WA
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400 block">
                Lead Architect & Creator
              </span>
              <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Waseem Asif
              </h3>
              <p className="text-xs font-medium text-emerald-300/90">
                Full-Stack Developer & Founder
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-stone-300 font-sans">
            Overseas Pakistanis, Indians, and Bangladeshis ke liye banayi gayi ek dedicated platform taake har bhai ko apni mehnat ki kamayi par sab se behtareen exchange rate mil sake.
          </p>
        </div>

        {/* WhatsApp Contact Support Numbers (Clickable) */}
        <div className="space-y-2 mb-4">
          <p className="text-xs font-bold text-stone-300 px-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct WhatsApp Contact & Support</span>
          </p>

          <a
            href="https://wa.me/966597447275"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 transition group text-xs active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center font-bold">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white text-xs block">+966 59 744 7275</span>
                <span className="text-[10px] text-emerald-300">WhatsApp Chat (KSA)</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#25D366] text-stone-950 font-bold text-[11px] group-hover:scale-105 transition">
              Message
            </span>
          </a>

          <a
            href="https://wa.me/966597440515"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 transition group text-xs active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center font-bold">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white text-xs block">+966 59 744 0515</span>
                <span className="text-[10px] text-emerald-300">WhatsApp Chat (Support)</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#25D366] text-stone-950 font-bold text-[11px] group-hover:scale-105 transition">
              Message
            </span>
          </a>
        </div>

        {/* Social Media Channels */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-stone-400 mb-2 px-1">
            Official Channels & Community:
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <a
              href="https://wa.me/966597447275"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 hover:border-emerald-600 transition flex flex-col items-center gap-1 text-stone-300"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span className="text-[10px] font-semibold">WA Channel</span>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 hover:border-emerald-600 transition flex flex-col items-center gap-1 text-stone-300"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span className="text-[10px] font-semibold">YouTube</span>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 hover:border-emerald-600 transition flex flex-col items-center gap-1 text-stone-300"
            >
              <Facebook className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] font-semibold">Facebook</span>
            </a>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="pt-3 border-t border-emerald-900/40 text-center text-[11px] text-stone-400">
          <p>© 2026 RateCompare. All rights reserved.</p>
          <p className="mt-0.5 text-amber-400 font-semibold">
            Designed & Developed by Waseem Asif.
          </p>
        </div>
      </div>
    </div>
  );
};
