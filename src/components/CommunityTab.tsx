import React, { useState } from 'react';
import {
  Users,
  PlusCircle,
  ThumbsUp,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  X,
  MessageSquare,
} from 'lucide-react';
import {
  SendCurrencyCode,
  ReceiveCurrencyCode,
  LanguageCode,
  CommunityReport,
  AuthUser,
} from '../types';
import { SEND_CURRENCIES, RECEIVE_CURRENCIES } from '../data/currencies';
import { TRANSLATIONS } from '../data/translations';

interface CommunityTabProps {
  reports: CommunityReport[];
  onSaveReports: (reports: CommunityReport[]) => void;
  language: LanguageCode;
  theme: 'dark' | 'light';
  user: AuthUser | null;
  onRequestLogin: (reason: string) => void;
}

export const CommunityTab: React.FC<CommunityTabProps> = ({
  reports,
  onSaveReports,
  language,
  theme,
  user,
  onRequestLogin,
}) => {
  const t = TRANSLATIONS[language]?.community || TRANSLATIONS.en.community;

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form states
  const [userName, setUserName] = useState(user?.name || '');
  const [providerName, setProviderName] = useState('Barq');
  const [sendCurrency, setSendCurrency] = useState<SendCurrencyCode>('SAR');
  const [receiveCurrency, setReceiveCurrency] = useState<ReceiveCurrencyCode>('PKR');
  const [rate, setRate] = useState<string>('74.92');
  const [fee, setFee] = useState<string>('0');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Saudi Arabia');
  const [branchOrMethod, setBranchOrMethod] = useState('Mobile App');
  const [comment, setComment] = useState('');

  const handleOpenSubmit = () => {
    if (!user) {
      onRequestLogin('Bhai, yeh feature use karne ke liye login karein. Sirf 5 second ka kaam hai!');
      return;
    }
    setUserName(user.name);
    setIsSubmitOpen(true);
  };

  const handleUpvote = (id: string) => {
    const updated = reports.map((r) => {
      if (r.id === id) {
        const isUpvoted = r.userUpvoted;
        return {
          ...r,
          upvotes: isUpvoted ? r.upvotes - 1 : r.upvotes + 1,
          userUpvoted: !isUpvoted,
        };
      }
      return r;
    });
    onSaveReports(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !rate) return;

    const newReport: CommunityReport = {
      id: `cr_${Date.now()}`,
      userName,
      providerName,
      sendCurrency,
      receiveCurrency,
      rate: parseFloat(rate) || 74.5,
      fee: parseFloat(fee) || 0,
      city: city || 'Riyadh',
      country: country || 'Saudi Arabia',
      branchOrMethod: branchOrMethod || 'Mobile App',
      timestamp: 'Just now',
      verified: false,
      status: 'pending', // Awaits admin approval!
      upvotes: 1,
      userUpvoted: true,
      comment: comment || 'Verified receipt from app/counter.',
    };

    onSaveReports([newReport, ...reports]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitOpen(false);
      setComment('');
      setCity('');
    }, 2200);
  };

  // Only approved reports appear on the public community feed
  const liveReports = reports.filter((r) => r.status === 'approved' || r.status === undefined);

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Header card with action */}
      <div
        className={`p-4 rounded-2xl border transition ${
          theme === 'dark'
            ? 'bg-[#032018]/90 border-emerald-800/40 text-white'
            : 'bg-white border-stone-200 text-stone-900 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base">{t.title}</h2>
              <p className="text-xs text-stone-400">{t.subtitle}</p>
            </div>
          </div>

          <button
            onClick={handleOpenSubmit}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-md hover:from-amber-300 hover:to-amber-400 transition active:scale-95 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.reportRate}</span>
          </button>
        </div>
      </div>

      {/* Community feed cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-400 px-1">
          <span>{t.recentReports}</span>
          <span>Verified by Expats</span>
        </div>

        {liveReports.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition ${
              theme === 'dark'
                ? 'bg-[#032018]/90 border-emerald-800/40 text-white hover:border-emerald-700/60'
                : 'bg-white border-stone-200 text-stone-900 shadow-sm'
            }`}
          >
            {/* Header info */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm">{item.providerName}</span>
                  {item.verified && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {t.verifiedReporter}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>
                    {item.city}, {item.country} • {item.branchOrMethod}
                  </span>
                </p>
              </div>

              {/* Rate pill */}
              <div className="text-right shrink-0">
                <span className="font-mono font-black text-base text-amber-400">
                  {item.rate.toFixed(2)}
                </span>
                <span className="text-[10px] text-stone-400 block font-mono">
                  {item.receiveCurrency} / 1 {item.sendCurrency}
                </span>
              </div>
            </div>

            {/* Comment */}
            {item.comment && (
              <p className="text-xs text-stone-300 bg-stone-900/50 p-2.5 rounded-xl border border-stone-800/80 mb-3">
                "{item.comment}"
              </p>
            )}

            {/* Bottom bar */}
            <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-emerald-900/30">
              <span className="flex items-center gap-1 text-[11px]">
                <Clock className="w-3 h-3 text-stone-500" />
                <span>{item.timestamp}</span>
                <span className="mx-1">•</span>
                <span>By {item.userName}</span>
              </span>

              <button
                onClick={() => handleUpvote(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition text-xs font-semibold ${
                  item.userUpvoted
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold'
                    : 'bg-emerald-950/40 text-stone-300 hover:bg-emerald-900/40 border border-emerald-900/40'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${item.userUpvoted ? 'text-amber-400 fill-amber-400' : ''}`} />
                <span>{item.upvotes}</span>
                <span className="hidden sm:inline">{t.helpful}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-[#032018] border border-emerald-700/50 text-white p-5 shadow-2xl">
            <button
              onClick={() => setIsSubmitOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <PlusCircle className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base">{t.submitReport}</h3>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <p className="font-bold text-sm text-emerald-300">{t.thanksMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asif Mehmood"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg bg-stone-900 border border-stone-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">
                    {t.exchangeHouseName}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Al Rajhi, STC Pay, Al Ansari"
                    value={providerName}
                    onChange={(e) => setProviderName(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg bg-stone-900 border border-stone-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">From</label>
                    <select
                      value={sendCurrency}
                      onChange={(e) => setSendCurrency(e.target.value as SendCurrencyCode)}
                      className="w-full py-2 px-2 rounded-lg bg-stone-900 border border-stone-700 text-white"
                    >
                      {Object.values(SEND_CURRENCIES).map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">To</label>
                    <select
                      value={receiveCurrency}
                      onChange={(e) => setReceiveCurrency(e.target.value as ReceiveCurrencyCode)}
                      className="w-full py-2 px-2 rounded-lg bg-stone-900 border border-stone-700 text-white"
                    >
                      {Object.values(RECEIVE_CURRENCIES).map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">{t.rateReceived}</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 74.90"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg bg-stone-900 border border-stone-700 text-amber-300 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">{t.feePaid}</label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="e.g. 15.0"
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg bg-stone-900 border border-stone-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">{t.branchCity}</label>
                    <input
                      type="text"
                      placeholder="e.g. Riyadh, Deira"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg bg-stone-900 border border-stone-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">Method</label>
                    <select
                      value={branchOrMethod}
                      onChange={(e) => setBranchOrMethod(e.target.value)}
                      className="w-full py-2 px-2 rounded-lg bg-stone-900 border border-stone-700 text-white"
                    >
                      <option value="Branch Counter">Branch Counter</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Online Banking">Online Banking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">Comments</label>
                  <input
                    type="text"
                    placeholder="e.g. Quick service, zero fee promotion"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg bg-stone-900 border border-stone-700 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow hover:from-amber-300 hover:to-amber-400 transition"
                >
                  {t.submitReport}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
