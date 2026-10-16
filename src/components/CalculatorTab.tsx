import React, { useState } from 'react';
import {
  Calculator as CalcIcon,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  CheckCircle,
  HelpCircle,
  Sliders,
} from 'lucide-react';
import {
  SendCurrencyCode,
  ReceiveCurrencyCode,
  LanguageCode,
  ProviderRate,
} from '../types';
import { SEND_CURRENCIES, RECEIVE_CURRENCIES } from '../data/currencies';
import { TRANSLATIONS } from '../data/translations';
import { calculateProviderOutcomes, getInterbankRate } from '../services/storage';

interface CalculatorTabProps {
  sendCurrency: SendCurrencyCode;
  onSendCurrencyChange: (c: SendCurrencyCode) => void;
  receiveCurrency: ReceiveCurrencyCode;
  onReceiveCurrencyChange: (c: ReceiveCurrencyCode) => void;
  sendAmount: number;
  onSendAmountChange: (amt: number) => void;
  providers: ProviderRate[];
  language: LanguageCode;
  theme: 'dark' | 'light';
}

export const CalculatorTab: React.FC<CalculatorTabProps> = ({
  sendCurrency,
  onSendCurrencyChange,
  receiveCurrency,
  onReceiveCurrencyChange,
  sendAmount,
  onSendAmountChange,
  providers,
  language,
  theme,
}) => {
  const t = TRANSLATIONS[language]?.calc || TRANSLATIONS.en.calc;
  const sendInfo = SEND_CURRENCIES[sendCurrency];
  const receiveInfo = RECEIVE_CURRENCIES[receiveCurrency];

  const outcomes = calculateProviderOutcomes(providers, sendAmount, sendCurrency, receiveCurrency);
  const interbank = getInterbankRate(sendCurrency, receiveCurrency);

  // Pick top 4 for side-by-side comparison
  const [selectedIds, setSelectedIds] = useState<string[]>([
    providers[0]?.id || 'stc_pay',
    providers[1]?.id || 'al_rajhi',
    providers[2]?.id || 'al_ansari',
    providers[6]?.id || 'wise',
  ]);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((x) => x !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([...selectedIds.slice(1), id]);
      }
    }
  };

  const comparedOutcomes = outcomes.filter((o) => selectedIds.includes(o.provider.id));
  const maxReceiverGets = Math.max(...comparedOutcomes.map((o) => o.receiverGets), 1);

  const presets = [500, 1000, 2000, 5000, 10000];

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Header and Currency Pair */}
      <div
        className={`p-4 rounded-2xl border transition ${
          theme === 'dark'
            ? 'bg-[#032018]/90 border-emerald-800/40 text-white'
            : 'bg-white border-stone-200 text-stone-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <CalcIcon className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="font-bold text-base">{t.title}</h2>
            <p className="text-xs text-stone-400">{t.subtitle}</p>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-[11px] text-stone-400 font-semibold block mb-1">
              You Send ({sendCurrency})
            </label>
            <select
              value={sendCurrency}
              onChange={(e) => onSendCurrencyChange(e.target.value as SendCurrencyCode)}
              className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-emerald-800 text-white text-xs font-bold"
            >
              {Object.values(SEND_CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-stone-400 font-semibold block mb-1">
              Receiver Gets ({receiveCurrency})
            </label>
            <select
              value={receiveCurrency}
              onChange={(e) => onReceiveCurrencyChange(e.target.value as ReceiveCurrencyCode)}
              className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-emerald-800 text-white text-xs font-bold"
            >
              {Object.values(RECEIVE_CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Amount Input & Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-semibold">{t.amountToSend}</span>
            <span className="font-mono font-bold text-amber-300">
              {sendAmount.toLocaleString()} {sendInfo.code}
            </span>
          </div>

          <div className="relative">
            <input
              type="number"
              min="10"
              max="50000"
              value={sendAmount}
              onChange={(e) => onSendAmountChange(Math.max(1, Number(e.target.value)))}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-950/80 border border-emerald-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Preset Buttons */}
          <div className="flex gap-1.5 justify-between">
            {presets.map((amt) => (
              <button
                key={amt}
                onClick={() => onSendAmountChange(amt)}
                className={`flex-1 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                  sendAmount === amt
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-800/40'
                }`}
              >
                {amt}
              </button>
            ))}
          </div>

          {/* Slider */}
          <input
            type="range"
            min="100"
            max="15000"
            step="100"
            value={sendAmount}
            onChange={(e) => onSendAmountChange(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Side-by-Side Visual Bar Comparison */}
      <div
        className={`p-4 rounded-2xl border transition ${
          theme === 'dark'
            ? 'bg-[#032018]/90 border-emerald-800/40 text-white'
            : 'bg-white border-stone-200 text-stone-900 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">{t.compareUpTo4}</h3>
          <span className="text-[11px] text-stone-400">Tap to toggle providers</span>
        </div>

        {/* Provider selector pill row */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-3">
          {providers.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggleSelect(p.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                    : 'bg-stone-900/50 border-stone-700 text-stone-400 hover:text-stone-200'
                }`}
              >
                {p.shortName || p.name}
              </button>
            );
          })}
        </div>

        {/* Horizontal Visual Comparison Bars */}
        <div className="space-y-3">
          {comparedOutcomes.map((item, idx) => {
            const pct = Math.round((item.receiverGets / maxReceiverGets) * 100);
            const isHighest = idx === 0;

            return (
              <div key={item.provider.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.provider.logoBg }}
                    />
                    <span className="font-bold">{item.provider.name}</span>
                  </div>
                  <span
                    className={`font-mono font-bold ${
                      isHighest ? 'text-amber-400 text-sm' : 'text-stone-300'
                    }`}
                  >
                    {receiveInfo.symbol} {item.receiverGets.toLocaleString()}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-stone-950 rounded-full overflow-hidden p-0.5 border border-stone-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isHighest
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm'
                        : 'bg-emerald-700/80'
                    }`}
                    style={{ width: `${Math.max(pct, 15)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>Rate: {item.exchangeRate.toFixed(2)}</span>
                  <span>Fee: {item.totalFee === 0 ? 'FREE' : `${item.totalFee} ${sendInfo.code}`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hidden Fee & Markup Warning Card */}
      <div
        className={`p-4 rounded-2xl border transition ${
          theme === 'dark'
            ? 'bg-[#021d15] border-amber-400/30 text-stone-300'
            : 'bg-amber-50/80 border-amber-200 text-stone-800'
        }`}
      >
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs">
            <h4 className="font-bold text-amber-400 text-sm">{t.hiddenFeesWarning}</h4>
            <p className="leading-relaxed opacity-90">
              Banks often advertise <strong>"Zero Transfer Fee"</strong> but make high profits by adding a 2% to 4% margin on the exchange rate. With RateCompare, you see the true final payout in your home currency.
            </p>
            <div className="p-2.5 rounded-xl bg-black/30 border border-stone-800 flex justify-between font-mono text-xs">
              <span className="text-stone-400">{t.interbankBenchmark}:</span>
              <span className="font-bold text-white">
                1 {sendInfo.code} = {interbank.toFixed(2)} {receiveInfo.code}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
