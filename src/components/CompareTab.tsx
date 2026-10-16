import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Award,
  Zap,
  Building,
  Smartphone,
  Banknote,
  Clock,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Star,
  Info,
  X,
} from 'lucide-react';
import {
  SendCurrencyCode,
  ReceiveCurrencyCode,
  LanguageCode,
  ProviderRate,
  DeliveryMethod,
} from '../types';
import { SEND_CURRENCIES, RECEIVE_CURRENCIES } from '../data/currencies';
import { TRANSLATIONS } from '../data/translations';
import { calculateProviderOutcomes, CalculatedProviderOutcome } from '../services/storage';

interface CompareTabProps {
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

type SortOption = 'payout' | 'rate' | 'fee' | 'speed';

type FilterOption = DeliveryMethod | 'free';

export const CompareTab: React.FC<CompareTabProps> = ({
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
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('payout');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProviderModal, setSelectedProviderModal] = useState<CalculatedProviderOutcome | null>(null);

  const t = TRANSLATIONS[language]?.compare || TRANSLATIONS.en.compare;
  const sendInfo = SEND_CURRENCIES[sendCurrency];
  const receiveInfo = RECEIVE_CURRENCIES[receiveCurrency];

  const outcomes = calculateProviderOutcomes(providers, sendAmount, sendCurrency, receiveCurrency);

  // Filter by search, delivery method, and Free Transfers Only
  const filtered = outcomes.filter((item) => {
    const matchesSearch = item.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.countryOrigin.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (selectedFilter === 'free') {
      return item.totalFee === 0 || item.provider.isZeroFee === true;
    }

    const matchesMethod = selectedFilter === 'all' || item.provider.deliveryMethods.includes(selectedFilter);
    return matchesMethod;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'payout') return b.receiverGets - a.receiverGets;
    if (sortBy === 'rate') return b.exchangeRate - a.exchangeRate;
    if (sortBy === 'fee') return a.totalFee - b.totalFee;
    if (sortBy === 'speed') return a.provider.deliveryTime.localeCompare(b.provider.deliveryTime);
    return 0;
  });

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Top Controller: Currencies & Amount */}
      <div
        className={`p-4 rounded-2xl border transition ${
          theme === 'dark'
            ? 'bg-[#032018]/90 border-emerald-800/40 text-white'
            : 'bg-white border-stone-200 text-stone-900 shadow-sm'
        }`}
      >
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Send Currency Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-400 mb-1">
              Sending From
            </label>
            <select
              value={sendCurrency}
              onChange={(e) => onSendCurrencyChange(e.target.value as SendCurrencyCode)}
              className="w-full py-2 px-3 rounded-xl bg-stone-900/90 border border-emerald-800/80 text-white text-xs sm:text-sm font-bold focus:outline-none focus:border-amber-400"
            >
              {Object.values(SEND_CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.name})
                </option>
              ))}
            </select>
          </div>

          {/* Receive Currency Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-400 mb-1">
              Receiving In
            </label>
            <select
              value={receiveCurrency}
              onChange={(e) => onReceiveCurrencyChange(e.target.value as ReceiveCurrencyCode)}
              className="w-full py-2 px-3 rounded-xl bg-stone-900/90 border border-emerald-800/80 text-white text-xs sm:text-sm font-bold focus:outline-none focus:border-amber-400"
            >
              {Object.values(RECEIVE_CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Amount Input with Quick Buttons */}
        <div>
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
            <span className="font-semibold">Transfer Amount</span>
            <div className="flex gap-1.5">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => onSendAmountChange(amt)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                    sendAmount === amt
                      ? 'bg-amber-400 text-stone-950 font-bold'
                      : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60'
                  }`}
                >
                  {amt}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <input
              type="number"
              min="1"
              value={sendAmount}
              onChange={(e) => onSendAmountChange(Math.max(1, Number(e.target.value)))}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-950/80 border border-emerald-800 text-white font-mono font-bold text-base focus:outline-none focus:border-amber-400"
            />
            <span className="absolute right-3 top-3 text-xs text-amber-300 font-bold">
              {sendInfo.code} {sendInfo.flag}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search provider (e.g. Al Rajhi, STC, Wise)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900/60 border border-emerald-900/40 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="py-2 px-3 rounded-xl bg-stone-900/80 border border-emerald-900/60 text-amber-300 text-xs font-semibold focus:outline-none"
            >
              <option value="payout">💰 Total Received</option>
              <option value="rate">📈 Best Rate</option>
              <option value="fee">🏷️ Lowest Fee</option>
              <option value="speed">⚡ Fastest Speed</option>
            </select>
          </div>
        </div>

        {/* Delivery Method & Zero Fee Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs font-semibold">
          {[
            { id: 'all' as FilterOption, label: t.allMethods, icon: null },
            { id: 'free' as FilterOption, label: '⚡ Free Transfers Only', icon: Zap },
            { id: 'bank' as FilterOption, label: t.bankTransfer, icon: Building },
            { id: 'wallet' as FilterOption, label: t.mobileWallet, icon: Smartphone },
            { id: 'cash' as FilterOption, label: t.cashPickup, icon: Banknote },
          ].map((item) => {
            const isSelected = selectedFilter === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedFilter(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
                  isSelected
                    ? item.id === 'free'
                      ? 'bg-emerald-400 text-stone-950 border-emerald-300 font-black shadow-[0_0_12px_rgba(52,211,153,0.6)]'
                      : 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                    : theme === 'dark'
                    ? 'bg-emerald-950/40 border-emerald-800/40 text-stone-300 hover:bg-emerald-900/40'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${item.id === 'free' ? 'text-amber-400 fill-amber-400' : ''}`} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Providers Comparison Card List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-stone-400 text-xs">
            No providers found matching your filter criteria.
          </div>
        ) : (
          filtered.map((item, index) => {
            const isRankOne = index === 0 && sortBy === 'payout';
            const isZeroFeeProvider = item.provider.isZeroFee || item.totalFee === 0;

            return (
              <div
                key={item.provider.id}
                className={`relative rounded-2xl p-4 transition-all border ${
                  isRankOne
                    ? 'bg-gradient-to-r from-[#063b2c] via-[#04281e] to-[#021f17] border-amber-400 shadow-lg shadow-emerald-950/40 text-white'
                    : isZeroFeeProvider
                    ? 'border-emerald-500/50 bg-[#02241b] shadow-[0_0_12px_rgba(16,185,129,0.15)] text-white hover:border-emerald-400'
                    : theme === 'dark'
                    ? 'bg-[#032018]/90 border-emerald-800/40 text-white hover:border-emerald-700/60'
                    : 'bg-white border-stone-200 text-stone-900 shadow-sm hover:border-emerald-300'
                }`}
              >
                {/* Best Badge */}
                {isRankOne && (
                  <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>{t.bestBadge}</span>
                  </div>
                )}

                {/* Top Row: Provider identity & Payout */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shadow-md shrink-0"
                      style={{
                        backgroundColor: item.provider.logoBg,
                        color: item.provider.logoColor,
                      }}
                    >
                      {item.provider.logoText}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm">{item.provider.name}</span>
                        {item.provider.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                        {isZeroFeeProvider && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)] animate-pulse">
                            100% FREE ⚡
                          </span>
                        )}
                        {item.provider.promoBadge && !isZeroFeeProvider && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {item.provider.promoBadge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                        <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {item.provider.rating}
                        </span>
                        <span>•</span>
                        <span>{item.provider.deliveryTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* High Priority: Receiver Gets */}
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-emerald-300 font-medium block">
                      {t.receiverReceives}
                    </span>
                    <span className="text-lg sm:text-xl font-black font-mono text-amber-400">
                      {receiveInfo.symbol} {item.receiverGets.toLocaleString()}
                    </span>
                    {item.gainVsLowest > 0 && isRankOne && (
                      <span className="text-[10px] font-bold text-emerald-400 block">
                        +{receiveInfo.symbol} {item.gainVsLowest.toLocaleString()} {t.extraGain}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Breakdown & Action Button */}
                <div className="pt-2.5 border-t border-emerald-900/30 flex items-center justify-between text-xs text-stone-300 gap-2">
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <div>
                      <span className="text-[10px] text-stone-400 block">{t.rate}</span>
                      <span className="font-bold text-white">
                        {item.exchangeRate.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">{t.transferFee}</span>
                      <span
                        className={`font-bold ${
                          item.totalFee === 0 ? 'text-emerald-400' : 'text-stone-300'
                        }`}
                      >
                        {item.totalFee === 0
                          ? t.free
                          : `${item.totalFee.toFixed(1)} ${sendInfo.code}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedProviderModal(item)}
                      className="px-2.5 py-1.5 rounded-lg border border-emerald-800/60 bg-emerald-950/40 hover:bg-emerald-900/50 text-[11px] font-semibold text-stone-200 transition"
                    >
                      {t.details}
                    </button>
                    {item.provider.websiteUrl && (
                      <a
                        href={item.provider.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-[11px] bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 hover:from-amber-300 hover:to-amber-400 transition"
                      >
                        <span>{t.sendMoney}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Provider Details Modal Drawer */}
      {selectedProviderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-[#032018] border border-emerald-700/50 text-white p-5 shadow-2xl">
            <button
              onClick={() => setSelectedProviderModal(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shadow-md"
                style={{
                  backgroundColor: selectedProviderModal.provider.logoBg,
                  color: selectedProviderModal.provider.logoColor,
                }}
              >
                {selectedProviderModal.provider.logoText}
              </div>
              <div>
                <h3 className="font-bold text-base">{selectedProviderModal.provider.name}</h3>
                <p className="text-xs text-emerald-300">
                  {selectedProviderModal.provider.countryOrigin} • Rating:{' '}
                  {selectedProviderModal.provider.rating} ★ (
                  {selectedProviderModal.provider.reviewsCount} reviews)
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-800/40 mb-4">
              <div className="flex justify-between">
                <span className="text-stone-400">Exchange Rate Offered:</span>
                <span className="font-mono font-bold text-amber-300">
                  1 {sendInfo.code} = {selectedProviderModal.exchangeRate.toFixed(4)}{' '}
                  {receiveInfo.code}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Transfer Fee:</span>
                <span className="font-mono font-bold text-white">
                  {selectedProviderModal.totalFee === 0
                    ? '0 Fee (FREE)'
                    : `${selectedProviderModal.totalFee} ${sendInfo.code}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Total Money Receiver Gets:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {receiveInfo.symbol} {selectedProviderModal.receiverGets.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Delivery Speed:</span>
                <span className="font-semibold text-white">
                  {selectedProviderModal.provider.deliveryTime}
                </span>
              </div>
            </div>

            {selectedProviderModal.provider.notes && (
              <p className="text-xs text-stone-300 mb-4 bg-stone-900/50 p-3 rounded-lg border border-stone-800">
                💡 {selectedProviderModal.provider.notes}
              </p>
            )}

            {selectedProviderModal.provider.websiteUrl && (
              <a
                href={selectedProviderModal.provider.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 hover:from-amber-300 hover:to-amber-400 flex items-center justify-center gap-1.5 transition"
              >
                <span>Visit Official App / Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
