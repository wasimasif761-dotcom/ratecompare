import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Zap,
  Award,
  ChevronRight,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';
import {
  SendCurrencyCode,
  ReceiveCurrencyCode,
  LanguageCode,
  ProviderRate,
  AppTab,
} from '../types';
import { SEND_CURRENCIES, RECEIVE_CURRENCIES } from '../data/currencies';
import { TRANSLATIONS } from '../data/translations';
import { calculateProviderOutcomes } from '../services/storage';
import { RateHistoryChart } from './RateHistoryChart';
import { getLastUpdatedTimestamp } from '../services/rateService';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface HomeTabProps {
  sendCurrency: SendCurrencyCode;
  onSendCurrencyChange: (c: SendCurrencyCode) => void;
  receiveCurrency: ReceiveCurrencyCode;
  onReceiveCurrencyChange: (c: ReceiveCurrencyCode) => void;
  sendAmount: number;
  onSendAmountChange: (amt: number) => void;
  providers: ProviderRate[];
  language: LanguageCode;
  theme: 'dark' | 'light';
  onNavigateToTab: (tab: AppTab) => void;
}

const POPULAR_PAIRS: { send: SendCurrencyCode; receive: ReceiveCurrencyCode; label: string }[] = [
  { send: 'SAR', receive: 'PKR', label: 'SAR 🇸🇦 → PKR 🇵🇰' },
  { send: 'AED', receive: 'PKR', label: 'AED 🇦🇪 → PKR 🇵🇰' },
  { send: 'KWD', receive: 'PKR', label: 'KWD 🇰🇼 → PKR 🇵🇰' },
  { send: 'QAR', receive: 'PKR', label: 'QAR 🇶🇦 → PKR 🇵🇰' },
  { send: 'SAR', receive: 'INR', label: 'SAR 🇸🇦 → INR 🇮🇳' },
  { send: 'AED', receive: 'INR', label: 'AED 🇦🇪 → INR 🇮🇳' },
  { send: 'SAR', receive: 'BDT', label: 'SAR 🇸🇦 → BDT 🇧🇩' },
  { send: 'AED', receive: 'EGP', label: 'AED 🇦🇪 → EGP 🇪🇬' },
  { send: 'GBP', receive: 'PKR', label: 'GBP 🇬🇧 → PKR 🇵🇰' },
  { send: 'EUR', receive: 'PKR', label: 'EUR 🇪🇺 → PKR 🇵🇰' },
];

export const HomeTab: React.FC<HomeTabProps> = ({
  sendCurrency,
  onSendCurrencyChange,
  receiveCurrency,
  onReceiveCurrencyChange,
  sendAmount,
  onSendAmountChange,
  providers,
  language,
  theme,
  onNavigateToTab,
}) => {
  const t = TRANSLATIONS[language]?.home || TRANSLATIONS.en.home;
  const tCompare = TRANSLATIONS[language]?.compare || TRANSLATIONS.en.compare;
  const isOnline = useOnlineStatus();
  const lastUpdatedTime = getLastUpdatedTimestamp();

  const outcomes = calculateProviderOutcomes(providers, sendAmount, sendCurrency, receiveCurrency);
  const bestOutcome = outcomes[0];
  const topThree = outcomes.slice(0, 3);

  const sendInfo = SEND_CURRENCIES[sendCurrency];
  const receiveInfo = RECEIVE_CURRENCIES[receiveCurrency];

  const quickAmounts = [500, 1000, 2500, 5000];

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Offline cached notification banner if disconnected */}
      {!isOnline && (
        <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-semibold flex items-center justify-between">
          <span>⚠️ Internet nahi hai, purane rates dikha rahe hain.</span>
          <span className="text-[10px] text-stone-400">Cached Data</span>
        </div>
      )}

      {/* Quick Currency Pair Pills Carousel */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <div className="flex gap-2 min-w-max">
          {POPULAR_PAIRS.map((pair, idx) => {
            const isSelected = pair.send === sendCurrency && pair.receive === receiveCurrency;
            return (
              <button
                key={idx}
                onClick={() => {
                  onSendCurrencyChange(pair.send);
                  onReceiveCurrencyChange(pair.receive);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 border-amber-300 shadow-md scale-105'
                    : theme === 'dark'
                    ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/60'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {pair.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TODAY'S BEST RATE - HERO CARD */}
      <div
        className={`relative rounded-3xl p-5 overflow-hidden border shadow-xl transition-all ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#063326] via-[#03231a] to-[#01140e] border-amber-400/40 text-white shadow-emerald-950/60'
            : 'bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 border-amber-300 text-white shadow-emerald-900/20'
        }`}
      >
        {/* Glow ambient background elements */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

        {/* Top Badges Row */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-bold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>{t.todaysBestRate}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-300/80 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{lastUpdatedTime}</span>
          </div>
        </div>

        {/* Currency Pair and Exchange Rate */}
        <div className="relative z-10 mb-4">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <p className="text-xs text-emerald-200/90 font-medium">
                {t.bestRateSubtitle} {receiveInfo.name}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
                  {bestOutcome ? bestOutcome.exchangeRate.toFixed(2) : '74.85'}
                </span>
                <span className="text-amber-300 text-sm font-bold">
                  {receiveInfo.symbol} / 1 {sendInfo.code}
                </span>
              </div>
            </div>

            {/* 24h Trend badge */}
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                ▲ +0.45%
              </span>
              <p className="text-[10px] text-emerald-300/70 mt-1">{t.trend24h}</p>
            </div>
          </div>
        </div>

        {/* Best Provider Details Banner */}
        {bestOutcome && (
          <div className="relative z-10 p-3 rounded-2xl bg-black/30 border border-amber-400/30 backdrop-blur-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-md shrink-0"
                style={{
                  backgroundColor: bestOutcome.provider.logoBg,
                  color: bestOutcome.provider.logoColor,
                }}
              >
                {bestOutcome.provider.logoText}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white truncate">{bestOutcome.provider.name}</span>
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </div>
                <p className="text-[11px] text-emerald-300 truncate">
                  {bestOutcome.provider.promoBadge || 'Top Provider'} • {bestOutcome.provider.deliveryTime}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-stone-300 block">Fee</span>
              <span className="text-xs font-mono font-bold text-amber-300 whitespace-nowrap">
                {bestOutcome.fixedFee === 0 ? 'FREE' : `${bestOutcome.fixedFee} ${sendInfo.code}`}
              </span>
            </div>
          </div>
        )}

        {/* Instant Receiving Amount Preview Box */}
        <div className="relative z-10 mt-4 p-4 rounded-2xl bg-[#021c14]/80 border border-emerald-700/40">
          <div className="flex items-center justify-between text-xs text-stone-300 mb-2">
            <span>{t.youSend}</span>
            <div className="flex items-center gap-1.5">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => onSendAmountChange(amt)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition ${
                    sendAmount === amt
                      ? 'bg-amber-400 text-stone-950'
                      : 'bg-emerald-950/70 text-emerald-300 hover:bg-emerald-800/60'
                  }`}
                >
                  {amt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <input
                type="number"
                min="10"
                value={sendAmount}
                onChange={(e) => onSendAmountChange(Math.max(1, Number(e.target.value)))}
                className="w-full py-2 px-3 rounded-xl bg-stone-950/70 border border-emerald-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-amber-400"
              />
              <span className="absolute right-3 top-2.5 text-xs text-amber-300 font-bold">
                {sendInfo.code} {sendInfo.flag}
              </span>
            </div>

            <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />

            <div className="flex-1 text-right">
              <span className="text-[10px] text-emerald-300 block">{t.receiverGets}</span>
              <p className="text-xl font-black text-amber-300 font-mono">
                {receiveInfo.symbol} {bestOutcome?.receiverGets.toLocaleString()}
              </p>
            </div>
          </div>

          {bestOutcome && bestOutcome.gainVsLowest > 0 && (
            <p className="text-[11px] text-emerald-300 mt-2 font-medium flex items-center justify-end gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>
                +{receiveInfo.symbol} {bestOutcome.gainVsLowest.toLocaleString()} {tCompare.extraGain}
              </span>
            </p>
          )}
        </div>

        {/* CTA to Compare Tab */}
        <button
          onClick={() => onNavigateToTab('compare')}
          className="relative z-10 w-full mt-4 py-3 px-4 rounded-xl font-extrabold text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 transition flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span>{t.compareAll} ({outcomes.length} Banks)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 7-DAY & 30-DAY RATE HISTORY GRAPH */}
      <RateHistoryChart
        sendCurrency={sendCurrency}
        receiveCurrency={receiveCurrency}
        language={language}
        theme={theme}
      />

      {/* TOP 3 PROVIDERS LEADERBOARD PREVIEW */}
      <div
        className={`rounded-2xl p-4 border transition ${
          theme === 'dark'
            ? 'bg-[#032018]/90 border-emerald-800/40 text-white'
            : 'bg-white border-stone-200 text-stone-900 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm">{t.topProviders}</h3>
          </div>
          <button
            onClick={() => onNavigateToTab('compare')}
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {topThree.map((item, idx) => (
            <div
              key={item.provider.id}
              onClick={() => onNavigateToTab('compare')}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition hover:scale-[1.01] active:scale-[0.99] ${
                idx === 0
                  ? 'border-amber-400/50 bg-amber-400/10'
                  : theme === 'dark'
                  ? 'border-emerald-900/40 bg-emerald-950/20'
                  : 'border-stone-200 bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    idx === 0
                      ? 'bg-amber-400 text-stone-950'
                      : idx === 1
                      ? 'bg-stone-300 text-stone-900'
                      : 'bg-amber-700 text-white'
                  }`}
                >
                  #{idx + 1}
                </span>

                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                  style={{
                    backgroundColor: item.provider.logoBg,
                    color: item.provider.logoColor,
                  }}
                >
                  {item.provider.logoText}
                </div>

                <div>
                  <p className="font-bold text-xs">{item.provider.name}</p>
                  <p className="text-[10px] text-stone-400">
                    Rate: {item.exchangeRate.toFixed(2)} • Fee:{' '}
                    {item.fixedFee === 0 ? 'FREE' : `${item.fixedFee} ${sendInfo.code}`}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-stone-400 block">Payout</span>
                <span className="font-mono font-bold text-xs sm:text-sm text-amber-400">
                  {receiveInfo.symbol} {item.receiverGets.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TAX-FREE REMITTANCE & EXPAT REMITTANCE TIPS */}
      <div
        className={`rounded-2xl p-4 border flex items-start gap-3 ${
          theme === 'dark'
            ? 'bg-[#021d15] border-emerald-800/40 text-stone-300'
            : 'bg-emerald-50/80 border-emerald-200 text-stone-700'
        }`}
      >
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-emerald-400">{t.taxFreeNotice}</p>
          <p className="text-[11px] leading-relaxed opacity-90">
            Pakistan Remittance Initiative (PRI) offers zero fees on transactions over $100 equivalent. Avoid hawala/hundi channels to ensure funds are safe and exempt from withholding taxes.
          </p>
        </div>
      </div>
    </div>
  );
};
