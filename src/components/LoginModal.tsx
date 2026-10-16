import React, { useState } from 'react';
import {
  X,
  Lock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  LogIn,
} from 'lucide-react';
import { AuthUser } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  theme: 'dark' | 'light';
  reasonMessage?: string | null;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  theme,
  reasonMessage,
}) => {
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'facebook' | null>(null);

  if (!isOpen) return null;

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setLoadingProvider(provider);

    // Realistic seamless social authentication
    setTimeout(() => {
      const mockUser: AuthUser = provider === 'google'
        ? {
            id: `usr_${Date.now()}`,
            name: 'Muhammad Tariq',
            email: 'tariq.expat@gmail.com',
            photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
            provider: 'google',
            joinedAt: new Date().toISOString(),
          }
        : {
            id: `usr_${Date.now()}`,
            name: 'Zubair Khan',
            email: 'zubair.khan@facebook.com',
            photoURL: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
            provider: 'facebook',
            joinedAt: new Date().toISOString(),
          };

      setLoadingProvider(null);
      onLoginSuccess(mockUser);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className={`relative w-full max-w-sm rounded-3xl border shadow-2xl p-5 sm:p-6 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-[#03241b] via-[#021c15] to-[#01140e] border-amber-400/40 text-white'
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
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col items-center text-center mt-2 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30 mb-2.5">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black tracking-tight">Sign In to RateCompare</h2>
          <p className="text-xs text-emerald-400 font-medium mt-0.5">
            100% Free • Save alerts & report rates
          </p>
        </div>

        {/* Friendly reason notice if triggered by restricted action */}
        {reasonMessage && (
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs text-center font-medium mb-4 leading-relaxed">
            {reasonMessage}
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-4">
          {/* Continue with Google */}
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={loadingProvider !== null}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-3 border border-stone-200 active:scale-[0.98] disabled:opacity-50"
          >
            {/* Google SVG Icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {loadingProvider === 'google' ? 'Connecting...' : 'Continue with Google'}
            </span>
          </button>

          {/* Continue with Facebook */}
          <button
            onClick={() => handleSocialLogin('facebook')}
            disabled={loadingProvider !== null}
            className="w-full py-3 px-4 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
          >
            {/* Facebook SVG Icon */}
            <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>
              {loadingProvider === 'facebook' ? 'Connecting...' : 'Continue with Facebook'}
            </span>
          </button>
        </div>

        {/* Perks list */}
        <div className="space-y-2 text-[11px] text-stone-300 bg-emerald-950/40 p-3 rounded-2xl border border-emerald-900/50">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Set custom WhatsApp & push rate alerts</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Report verified exchange rates from your city</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Save favorite providers for 1-tap comparison</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-xs text-stone-400 hover:text-stone-200"
        >
          Skip / Continue as Guest
        </button>
      </div>
    </div>
  );
};
