import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface OfflineBannerProps {
  language: LanguageCode;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ language }) => {
  const isOnline = useOnlineStatus();
  const t = TRANSLATIONS[language]?.offline || TRANSLATIONS.en.offline;

  if (isOnline) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-amber-500 text-stone-950 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 border border-amber-300 font-medium text-xs sm:text-sm animate-bounce">
      <div className="p-1.5 rounded-lg bg-black/10 shrink-0">
        <WifiOff className="w-4 h-4 text-stone-950" />
      </div>
      <div className="flex-1 leading-tight">
        <p className="font-bold">{t.banner}</p>
        <p className="text-[11px] sm:text-xs opacity-90">{t.offlineMessage}</p>
      </div>
    </div>
  );
};
