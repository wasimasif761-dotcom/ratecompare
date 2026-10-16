import React from 'react';
import {
  Home,
  ArrowLeftRight,
  Calculator,
  Bell,
  Users,
} from 'lucide-react';
import { AppTab, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface BottomNavProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  language: LanguageCode;
  theme: 'dark' | 'light';
  activeAlertsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
  theme,
  activeAlertsCount = 0,
}) => {
  const t = TRANSLATIONS[language]?.tabs || TRANSLATIONS.en.tabs;

  const navItems: { id: AppTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'compare', label: t.compare, icon: ArrowLeftRight },
    { id: 'calculator', label: t.calculator, icon: Calculator },
    { id: 'alerts', label: t.alerts, icon: Bell },
    { id: 'community', label: t.community, icon: Users },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t transition-colors pb-safe ${
        theme === 'dark'
          ? 'bg-[#021f18]/95 border-emerald-900/60 backdrop-blur-lg text-stone-400'
          : 'bg-white/95 border-stone-200 backdrop-blur-lg text-stone-600'
      }`}
    >
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-90 ${
                isActive
                  ? theme === 'dark'
                    ? 'text-amber-400 font-bold'
                    : 'text-emerald-700 font-bold'
                  : 'hover:text-stone-300'
              }`}
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <div
                  className={`absolute -top-1 w-6 h-1 rounded-full ${
                    theme === 'dark' ? 'bg-amber-400' : 'bg-emerald-600'
                  }`}
                />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                {item.id === 'alerts' && activeAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 text-[9px] font-bold rounded-full bg-amber-500 text-stone-950 min-w-3.5 h-3.5 flex items-center justify-center">
                    {activeAlertsCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[62px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
