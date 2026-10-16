import React from 'react';
import { X, ShieldCheck, Scale, Lock, Info, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

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

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Privacy Policy & Terms</h2>
            <p className="text-xs text-stone-400">Legal Disclosures & Data Protection</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-stone-300 leading-relaxed font-sans">
          {/* Section 1 */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>1. Data Safety & Zero Financial Storage</span>
            </div>
            <p className="text-[11px] text-stone-300">
              RateCompare does <strong>NOT</strong> collect, hold, or process your bank account details, credit cards, or remittance passwords. All currency calculations are processed locally inside your web browser.
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>2. Independent Rate Comparison Disclaimer</span>
            </div>
            <p className="text-[11px] text-stone-300">
              RateCompare operates strictly as an informational and comparison utility for overseas workers. We are not a licensed bank, money services business (MSB), or foreign exchange dealer. Remittance transactions take place directly between you and the respective licensed financial providers (e.g., Tahweel Al Rajhi, Al Ansari Exchange, STC Pay, Western Union, Wise, etc.).
            </p>
          </div>

          {/* Section 3 */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>3. Live Exchange Rate Accuracy</span>
            </div>
            <p className="text-[11px] text-stone-300">
              Exchange rates and fee structures fluctuate throughout business hours based on interbank foreign exchange markets. While we endeavor to provide the most precise and timely benchmarks, official counter and app rates offered at the exact time of transfer by the provider are authoritative.
            </p>
          </div>

          {/* Section 4 */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>4. Affiliate & Advertising Disclosure</span>
            </div>
            <p className="text-[11px] text-stone-300">
              To keep RateCompare 100% free for overseas workers, this application may partner with licensed remittance providers or display non-intrusive advertisements (such as Google AdMob). Some outbound links may earn an affiliate commission at no extra charge to you.
            </p>
          </div>

          <div className="pt-2 text-[11px] text-stone-400 text-center">
            Last Updated: October 2026 • Governed by international PWA data protection standards.
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-600 text-white transition"
        >
          I Understand & Agree
        </button>
      </div>
    </div>
  );
};
