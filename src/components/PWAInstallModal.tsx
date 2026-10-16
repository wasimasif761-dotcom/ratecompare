import React from 'react';
import { Download, Share, PlusSquare, X, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#032018] border border-emerald-500/30 text-white p-6 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-emerald-400/80 hover:text-white hover:bg-emerald-800/40"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center border border-amber-400/40 shadow-md">
            <span className="text-xl font-bold text-amber-300">₨</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Install RateCompare App</h3>
            <p className="text-xs text-emerald-300/80">Offline Access • Instant Live Rates</p>
          </div>
        </div>

        <div className="space-y-2.5 my-4 text-xs text-stone-300 bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Opens like a native app without browser bars</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-300">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Works 100% offline at bank counters</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>No app store account needed (free PWA)</span>
          </div>
        </div>

        {isIOS ? (
          <div className="space-y-3 text-xs bg-stone-900/60 p-4 rounded-xl border border-stone-800 text-stone-200">
            <p className="font-semibold text-amber-300">How to install on iPhone / iPad:</p>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">1</span>
              <p>
                Tap the <strong className="text-white">Share</strong> button <Share className="inline w-3.5 h-3.5 mx-0.5 text-blue-400" /> at bottom of Safari.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">2</span>
              <p>
                Scroll down and select <strong className="text-white">Add to Home Screen</strong> <PlusSquare className="inline w-3.5 h-3.5 mx-0.5 text-emerald-400" />.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">3</span>
              <p>Tap <strong className="text-white">Add</strong> in top right. You're ready!</p>
            </div>
          </div>
        ) : isInstallable ? (
          <button
            onClick={async () => {
              const res = await install();
              if (res) onClose();
            }}
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <Download className="w-4 h-4" />
            Install App Now (1 Tap)
          </button>
        ) : (
          <div className="text-center py-2 text-xs text-stone-400">
            <p>To install, open your browser menu (<span className="text-white">⋮</span>) and tap <strong className="text-amber-400">"Install app"</strong> or <strong className="text-amber-400">"Add to Home screen"</strong>.</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-xs text-stone-400 hover:text-stone-200"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
};
