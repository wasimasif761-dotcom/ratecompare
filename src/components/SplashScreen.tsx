import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, TrendingUp } from 'lucide-react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish?.();
    }, 1100);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#022c22] text-white select-none"
        >
          {/* Ambient Glows */}
          <div className="absolute w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute w-48 h-48 rounded-full bg-amber-400/15 blur-2xl pointer-events-none translate-y-12" />

          {/* Logo Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative flex flex-col items-center"
          >
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-800 to-emerald-950 p-[2px] shadow-2xl shadow-emerald-900/60 ring-2 ring-amber-400/30">
              <div className="w-full h-full rounded-[22px] bg-[#032018] flex items-center justify-center overflow-hidden relative">
                {/* Rotating subtle ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-emerald-400/20 m-2"
                />
                <span className="text-4xl font-black text-amber-300 drop-shadow-md">₨</span>
                <Sparkles className="w-5 h-5 text-amber-400 absolute top-2 right-2 animate-pulse" />
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-5 text-2xl font-extrabold tracking-tight"
            >
              <span className="text-white">Rate</span>
              <span className="text-amber-400">Compare</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-1 text-xs font-medium text-emerald-300/80 tracking-wide text-center"
            >
              Live GCC & Europe Remittance Rates
            </motion.p>

            <div className="mt-8 flex items-center gap-2 text-[11px] text-emerald-400/70 font-mono">
              <TrendingUp className="w-3.5 h-3.5 animate-bounce" />
              <span>Fetching live bank rates...</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
