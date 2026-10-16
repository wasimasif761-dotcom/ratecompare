import React, { useState } from 'react';
import {
  Bell,
  BellRing,
  Plus,
  Trash2,
  CheckCircle,
  TrendingUp,
  Clock,
  Sparkles,
  Volume2,
} from 'lucide-react';
import {
  SendCurrencyCode,
  ReceiveCurrencyCode,
  LanguageCode,
  RateAlert,
  AuthUser,
} from '../types';
import { SEND_CURRENCIES, RECEIVE_CURRENCIES } from '../data/currencies';
import { TRANSLATIONS } from '../data/translations';
import { getInterbankRate } from '../services/storage';

interface AlertsTabProps {
  alerts: RateAlert[];
  onSaveAlerts: (alerts: RateAlert[]) => void;
  language: LanguageCode;
  theme: 'dark' | 'light';
  user: AuthUser | null;
  onRequestLogin: (reason: string) => void;
}

export const AlertsTab: React.FC<AlertsTabProps> = ({
  alerts,
  onSaveAlerts,
  language,
  theme,
  user,
  onRequestLogin,
}) => {
  const t = TRANSLATIONS[language]?.alerts || TRANSLATIONS.en.alerts;

  const [sendCurrency, setSendCurrency] = useState<SendCurrencyCode>('SAR');
  const [receiveCurrency, setReceiveCurrency] = useState<ReceiveCurrencyCode>('PKR');
  const [targetRate, setTargetRate] = useState<number>(75.50);
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [alertNote, setAlertNote] = useState('');
  const [morningSummary, setMorningSummary] = useState(true);
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const currentRate = getInterbankRate(sendCurrency, receiveCurrency);

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      onRequestLogin('Bhai, yeh feature use karne ke liye login karein. Sirf 5 second ka kaam hai!');
      return;
    }

    if (!targetRate || targetRate <= 0) return;

    const newAlert: RateAlert = {
      id: `alert_${Date.now()}`,
      sendCurrency,
      receiveCurrency,
      targetRate: Number(targetRate.toFixed(2)),
      condition,
      createdAt: new Date().toISOString().split('T')[0],
      active: true,
      notes: alertNote || undefined,
    };

    const updated = [newAlert, ...alerts];
    onSaveAlerts(updated);
    setAlertNote('');
    triggerToast(`Rate alert created for ${sendCurrency} → ${receiveCurrency} at ${targetRate}!`);
  };

  const handleToggleAlert = (id: string) => {
    const updated = alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a));
    onSaveAlerts(updated);
  };

  const handleDeleteAlert = (id: string) => {
    const updated = alerts.filter((a) => a.id !== id);
    onSaveAlerts(updated);
  };

  const triggerToast = (msg: string) => {
    setNotificationBanner(msg);
    setTimeout(() => setNotificationBanner(null), 3500);
  };

  const handleTestNotification = async () => {
    // Request permission if supported
    if ('Notification' in window && Notification.permission !== 'granted') {
      try {
        await Notification.requestPermission();
      } catch (err) {
        console.log('Notification request ignored');
      }
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('RateCompare Surge Alert! 🚀', {
        body: `SAR to PKR just hit 75.80! Tahweel Al Rajhi & STC Pay are offering best rates right now.`,
        icon: '/pwa-192x192.png',
      });
    }

    triggerToast(`🔔 PUSH ALERT: SAR → PKR reached your target! STC Pay rate is 74.95.`);
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Toast popup */}
      {notificationBanner && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm p-3 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs shadow-2xl border border-amber-200 flex items-center gap-2 animate-bounce">
          <BellRing className="w-4 h-4 shrink-0 text-stone-950" />
          <span>{notificationBanner}</span>
        </div>
      )}

      {/* Header card */}
      <div
        className={`p-4 rounded-2xl border transition ${
          theme === 'dark'
            ? 'bg-[#032018]/90 border-emerald-800/40 text-white'
            : 'bg-white border-stone-200 text-stone-900 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base">{t.title}</h2>
              <p className="text-xs text-stone-400">{t.subtitle}</p>
            </div>
          </div>

          <button
            onClick={handleTestNotification}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Test</span>
          </button>
        </div>

        {/* Create Alert Form */}
        <form onSubmit={handleCreateAlert} className="space-y-3 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-stone-400 block mb-1">
                From Currency
              </label>
              <select
                value={sendCurrency}
                onChange={(e) => {
                  const val = e.target.value as SendCurrencyCode;
                  setSendCurrency(val);
                  setTargetRate(Number((getInterbankRate(val, receiveCurrency) * 1.01).toFixed(2)));
                }}
                className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-emerald-800 text-white text-xs font-bold"
              >
                {Object.values(SEND_CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-400 block mb-1">
                To Currency
              </label>
              <select
                value={receiveCurrency}
                onChange={(e) => {
                  const val = e.target.value as ReceiveCurrencyCode;
                  setReceiveCurrency(val);
                  setTargetRate(Number((getInterbankRate(sendCurrency, val) * 1.01).toFixed(2)));
                }}
                className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-emerald-800 text-white text-xs font-bold"
              >
                {Object.values(RECEIVE_CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Current Rate vs Target Rate */}
          <div className="p-3 rounded-xl bg-stone-900/60 border border-emerald-900/40 flex items-center justify-between text-xs">
            <div>
              <span className="text-stone-400 text-[10px] block">{t.currentRate}</span>
              <span className="font-mono font-bold text-white text-sm">
                1 {sendCurrency} = {currentRate.toFixed(2)} {receiveCurrency}
              </span>
            </div>

            <div className="text-right">
              <span className="text-stone-400 text-[10px] block">{t.alertMeWhen}</span>
              <span className="text-emerald-400 font-bold">{t.risesAbove}</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-stone-400 block mb-1">
              {t.targetRate} ({receiveCurrency})
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                required
                value={targetRate}
                onChange={(e) => setTargetRate(parseFloat(e.target.value) || 0)}
                className="w-full py-2 px-3 rounded-xl bg-stone-950 border border-emerald-800 text-amber-300 font-mono font-bold text-base focus:outline-none focus:border-amber-400"
              />
              <span className="absolute right-3 top-2.5 text-xs text-stone-400 font-mono">
                {receiveCurrency}
              </span>
            </div>
            {targetRate > currentRate && (
              <p className="text-[10px] text-emerald-400 mt-1">
                Target is {(targetRate - currentRate).toFixed(2)} {receiveCurrency} higher than current rate.
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Optional label (e.g. Send monthly salary to family)"
              value={alertNote}
              onChange={(e) => setAlertNote(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow hover:from-amber-300 hover:to-amber-400 transition flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>{t.createAlert}</span>
          </button>
        </form>
      </div>

      {/* Active Alerts List */}
      <div
        className={`p-4 rounded-2xl border transition ${
          theme === 'dark'
            ? 'bg-[#032018]/90 border-emerald-800/40 text-white'
            : 'bg-white border-stone-200 text-stone-900 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">{t.activeAlerts} ({alerts.length})</h3>
          <label className="flex items-center gap-2 text-[11px] text-stone-400 cursor-pointer">
            <input
              type="checkbox"
              checked={morningSummary}
              onChange={(e) => setMorningSummary(e.target.checked)}
              className="accent-amber-400 rounded"
            />
            <span>{t.dailySummary}</span>
          </label>
        </div>

        {alerts.length === 0 ? (
          <p className="text-xs text-stone-400 py-6 text-center">{t.noAlerts}</p>
        ) : (
          <div className="space-y-2.5">
            {alerts.map((alert) => {
              const liveRate = getInterbankRate(alert.sendCurrency, alert.receiveCurrency);
              const isHit = liveRate >= alert.targetRate;

              return (
                <div
                  key={alert.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                    isHit
                      ? 'border-amber-400 bg-amber-400/10'
                      : alert.active
                      ? theme === 'dark'
                        ? 'border-emerald-800/60 bg-emerald-950/30'
                        : 'border-stone-200 bg-stone-50'
                      : 'opacity-50 border-stone-800 bg-stone-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleAlert(alert.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                        alert.active ? 'bg-amber-400 text-stone-950' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">
                          {alert.sendCurrency} → {alert.receiveCurrency}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-amber-300">
                          Target: {alert.targetRate.toFixed(2)}
                        </span>
                        {isHit && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-400 text-stone-950 animate-pulse">
                            TARGET HIT!
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        Current: {liveRate.toFixed(2)} • {alert.notes || 'Rate Alert'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="p-1.5 text-stone-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
