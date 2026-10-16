import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  Building2,
  Percent,
  Lock,
  Globe,
  Sliders,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { ProviderRate, CommunityReport, CountryConfig, SendCurrencyCode } from '../types';
import { DEFAULT_PROVIDERS } from '../data/defaultProviders';
import { saveAdminRateOverride, getAdminRateOverrides } from '../services/rateService';
import { getCountries } from '../services/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  providers: ProviderRate[];
  onSaveProviders: (providers: ProviderRate[]) => void;
  communityReports: CommunityReport[];
  onSaveCommunityReports: (reports: CommunityReport[]) => void;
  countries?: CountryConfig[];
  onSaveCountries?: (countries: CountryConfig[]) => void;
  theme: 'dark' | 'light';
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  providers,
  onSaveProviders,
  communityReports,
  onSaveCommunityReports,
  countries,
  onSaveCountries,
  theme,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [activeTab, setActiveTab] = useState<'rates' | 'providers' | 'countries' | 'community' | 'overrides'>('rates');
  const [editingProviders, setEditingProviders] = useState<ProviderRate[]>(providers);
  const [editingCountries, setEditingCountries] = useState<CountryConfig[]>(() => countries || getCountries());
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Manual Rate Override state
  const [overridePair, setOverridePair] = useState('SAR_PKR');
  const [overrideRateVal, setOverrideRateVal] = useState('75.20');
  const [currentOverrides, setCurrentOverrides] = useState<Record<string, number>>(() => getAdminRateOverrides());

  // New provider form
  const [newName, setNewName] = useState('');
  const [newOrigin, setNewOrigin] = useState('KSA');
  const [newMultiplier, setNewMultiplier] = useState('1.004');
  const [newFee, setNewFee] = useState('0');
  const [newSpeed, setNewSpeed] = useState('Instant (2-5 mins)');
  const [newPromo, setNewPromo] = useState('Zero Fee ⚡');
  const [newIsZeroFee, setNewIsZeroFee] = useState(true);

  // New country form
  const [newCountryName, setNewCountryName] = useState('');
  const [newCountryCurrency, setNewCountryCurrency] = useState<SendCurrencyCode>('SAR');
  const [newCountryFlag, setNewCountryFlag] = useState('🇸🇦');
  const [newCountryCode, setNewCountryCode] = useState('KSA');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    // Supports admin@ratecompare.com / Admin123 OR PIN admin123
    if (
      (cleanEmail === 'admin@ratecompare.com' && (cleanPass === 'Admin123' || cleanPass === 'admin123')) ||
      cleanPass === 'admin123' ||
      cleanPass === 'Admin123'
    ) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  // Provider edits
  const handleMultiplierChange = (id: string, val: number) => {
    setEditingProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, rateMultiplier: val } : p))
    );
  };

  const handleFeeChange = (id: string, val: number) => {
    setEditingProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, fixedFee: val, isZeroFee: val === 0 } : p))
    );
  };

  const handlePromoChange = (id: string, val: string) => {
    setEditingProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, promoBadge: val || undefined } : p))
    );
  };

  const handleToggleZeroFee = (id: string) => {
    setEditingProviders((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isZeroFee: !p.isZeroFee,
              fixedFee: !p.isZeroFee ? 0 : p.fixedFee || 15,
              promoBadge: !p.isZeroFee ? 'Zero Fee ⚡ (100% Free)' : p.promoBadge,
            }
          : p
      )
    );
  };

  const handleSaveAll = () => {
    onSaveProviders(editingProviders);
    if (onSaveCountries) {
      onSaveCountries(editingCountries);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2200);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all provider rates to factory defaults?')) {
      setEditingProviders(DEFAULT_PROVIDERS);
      onSaveProviders(DEFAULT_PROVIDERS);
    }
  };

  const handleAddNewProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newProv: ProviderRate = {
      id: `prov_${Date.now()}`,
      name: newName,
      shortName: newName.split(' ')[0],
      logoText: newName.substring(0, 3).toUpperCase(),
      logoBg: newIsZeroFee ? '#00c067' : '#047857',
      logoColor: '#ffffff',
      countryOrigin: newOrigin,
      rateMultiplier: parseFloat(newMultiplier) || 1.0,
      fixedFee: parseFloat(newFee) || 0,
      deliveryTime: newSpeed,
      deliveryMethods: ['bank', 'wallet'],
      rating: 4.8,
      reviewsCount: 150,
      promoBadge: newPromo || (newIsZeroFee ? 'Zero Fee ⚡' : undefined),
      verified: true,
      isZeroFee: newIsZeroFee,
      notes: 'Added by Administrator Waseem Asif.',
    };

    const updated = [newProv, ...editingProviders];
    setEditingProviders(updated);
    onSaveProviders(updated);
    setNewName('');
    setNewPromo('');
    setActiveTab('rates');
  };

  const handleDeleteProvider = (id: string) => {
    if (window.confirm('Delete this provider?')) {
      const updated = editingProviders.filter((p) => p.id !== id);
      setEditingProviders(updated);
      onSaveProviders(updated);
    }
  };

  // Country actions
  const handleToggleCountry = (id: string) => {
    const updated = editingCountries.map((c) =>
      c.id === id ? { ...c, active: !c.active } : c
    );
    setEditingCountries(updated);
    onSaveCountries?.(updated);
  };

  const handleDeleteCountry = (id: string) => {
    if (window.confirm('Remove this country from active list?')) {
      const updated = editingCountries.filter((c) => c.id !== id);
      setEditingCountries(updated);
      onSaveCountries?.(updated);
    }
  };

  const handleAddCountry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCountryName.trim()) return;

    const newCountry: CountryConfig = {
      id: `cnt_${Date.now()}`,
      name: newCountryName.trim(),
      currency: newCountryCurrency,
      flag: newCountryFlag || '🌍',
      code: newCountryCode.trim().toUpperCase() || 'GLB',
      active: true,
    };

    const updated = [...editingCountries, newCountry];
    setEditingCountries(updated);
    onSaveCountries?.(updated);
    setNewCountryName('');
  };

  // Community reports moderation
  const handleApproveReport = (id: string) => {
    const updated = communityReports.map((r) =>
      r.id === id ? { ...r, status: 'approved' as const, verified: true } : r
    );
    onSaveCommunityReports(updated);
  };

  const handleRejectReport = (id: string) => {
    const updated = communityReports.map((r) =>
      r.id === id ? { ...r, status: 'rejected' as const, verified: false } : r
    );
    onSaveCommunityReports(updated);
  };

  const handleDeleteReport = (id: string) => {
    const updated = communityReports.filter((r) => r.id !== id);
    onSaveCommunityReports(updated);
  };

  // Rate override submit
  const handleSaveOverride = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(overrideRateVal);
    if (!val) return;

    saveAdminRateOverride(overridePair, val);
    setCurrentOverrides({
      ...currentOverrides,
      [overridePair]: val,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div
        className={`relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#032018] border-amber-400/40 text-white'
            : 'bg-white border-stone-300 text-stone-900'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-emerald-900/40 flex items-center justify-between bg-emerald-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base flex items-center gap-2">
                <span>Global Master Control</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-amber-400 text-stone-950 font-black">
                  ADMIN
                </span>
              </h2>
              <p className="text-xs text-emerald-300/80">
                RateCompare Management Panel • Lead: Waseem Asif
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-emerald-900/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="p-8 text-center space-y-4 max-w-sm mx-auto">
            <div className="w-14 h-14 rounded-3xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto border-2 border-amber-400/40 shadow-lg">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">Admin Authentication</h3>
              <p className="text-xs text-stone-400 mt-1">
                Authorized developer access only. Please enter credentials.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3 text-left">
              <div>
                <label className="text-[11px] text-stone-400 font-semibold block mb-1">
                  Email (Optional for PIN login)
                </label>
                <input
                  type="email"
                  placeholder="admin@ratecompare.com"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    setPasswordError(false);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-400 font-semibold block mb-1">
                  Password / PIN
                </label>
                <input
                  type="password"
                  placeholder="Admin123"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {passwordError && (
                <p className="text-xs text-rose-400 font-bold text-center">
                  Galat credentials! (Hint: Admin123)
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-md transition"
              >
                Sign In to Admin Panel
              </button>
            </form>

            <p className="text-[10px] text-stone-500">
              Default credentials: admin@ratecompare.com / Admin123
            </p>
          </div>
        ) : (
          <>
            {/* Master Navigation Tabs */}
            <div className="flex border-b border-emerald-900/40 text-xs font-semibold px-4 pt-2 gap-3 overflow-x-auto no-scrollbar bg-emerald-950/20">
              <button
                onClick={() => setActiveTab('rates')}
                className={`pb-2.5 transition border-b-2 whitespace-nowrap ${
                  activeTab === 'rates'
                    ? 'border-amber-400 text-amber-300 font-bold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Rates & Zero-Fee ({editingProviders.length})
              </button>
              <button
                onClick={() => setActiveTab('overrides')}
                className={`pb-2.5 transition border-b-2 whitespace-nowrap ${
                  activeTab === 'overrides'
                    ? 'border-amber-400 text-amber-300 font-bold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                ⚡ Live Overrides
              </button>
              <button
                onClick={() => setActiveTab('countries')}
                className={`pb-2.5 transition border-b-2 whitespace-nowrap ${
                  activeTab === 'countries'
                    ? 'border-amber-400 text-amber-300 font-bold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Countries ({editingCountries.length})
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`pb-2.5 transition border-b-2 whitespace-nowrap ${
                  activeTab === 'community'
                    ? 'border-amber-400 text-amber-300 font-bold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Community Queue ({communityReports.filter((r) => r.status === 'pending').length} Pending)
              </button>
              <button
                onClick={() => setActiveTab('providers')}
                className={`pb-2.5 transition border-b-2 whitespace-nowrap ${
                  activeTab === 'providers'
                    ? 'border-amber-400 text-amber-300 font-bold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                + Add Provider
              </button>
            </div>

            {/* Body content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {saveSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Changes saved successfully to LocalStorage!</span>
                </div>
              )}

              {/* 1. PROVIDERS & ZERO FEE RATES TAB */}
              {activeTab === 'rates' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400 pb-1">
                    <span>Manage rates, zero-fee promotions, and fixed fees:</span>
                    <button
                      onClick={handleResetDefaults}
                      className="flex items-center gap-1 text-rose-400 hover:text-rose-300 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset Defaults
                    </button>
                  </div>

                  {editingProviders.map((prov) => (
                    <div
                      key={prov.id}
                      className={`p-3 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        prov.isZeroFee
                          ? 'border-emerald-500/50 bg-[#022b20]'
                          : 'bg-emerald-950/30 border-emerald-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-[190px]">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs"
                          style={{ backgroundColor: prov.logoBg, color: prov.logoColor }}
                        >
                          {prov.logoText}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-bold text-white truncate">{prov.name}</p>
                            {prov.isZeroFee && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-400 font-bold">
                                0 Fee
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-stone-400">
                            {prov.countryOrigin} • {prov.deliveryTime}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 flex-1 sm:max-w-lg">
                        <div>
                          <label className="text-[10px] text-stone-400 block mb-0.5">Rate Mult.</label>
                          <input
                            type="number"
                            step="0.001"
                            value={prov.rateMultiplier}
                            onChange={(e) =>
                              handleMultiplierChange(prov.id, parseFloat(e.target.value) || 1.0)
                            }
                            className="w-full px-2 py-1 rounded bg-stone-900 border border-stone-700 text-amber-300 font-mono font-bold text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-stone-400 block mb-0.5">Fee (Send)</label>
                          <input
                            type="number"
                            step="0.5"
                            value={prov.fixedFee}
                            onChange={(e) =>
                              handleFeeChange(prov.id, parseFloat(e.target.value) || 0)
                            }
                            className="w-full px-2 py-1 rounded bg-stone-900 border border-stone-700 text-stone-200 font-mono text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-stone-400 block mb-0.5">Zero Fee?</label>
                          <button
                            type="button"
                            onClick={() => handleToggleZeroFee(prov.id)}
                            className={`w-full py-1 rounded text-[10px] font-bold transition border ${
                              prov.isZeroFee
                                ? 'bg-emerald-500 text-stone-950 border-emerald-300'
                                : 'bg-stone-800 text-stone-400 border-stone-700'
                            }`}
                          >
                            {prov.isZeroFee ? 'YES (0 Fee)' : 'Standard'}
                          </button>
                        </div>

                        <div>
                          <label className="text-[10px] text-stone-400 block mb-0.5">Promo Tag</label>
                          <input
                            type="text"
                            value={prov.promoBadge || ''}
                            placeholder="e.g. 0 Fee"
                            onChange={(e) => handlePromoChange(prov.id, e.target.value)}
                            className="w-full px-2 py-1 rounded bg-stone-900 border border-stone-700 text-stone-200 text-xs"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteProvider(prov.id)}
                        className="self-end sm:self-center p-1.5 rounded text-stone-500 hover:text-rose-400 transition"
                        title="Delete provider"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. LIVE MANUAL RATE OVERRIDES TAB */}
              {activeTab === 'overrides' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-amber-400/30 space-y-2">
                    <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Instant Manual Benchmark Override</span>
                    </h3>
                    <p className="text-xs text-stone-300">
                      Admin overrides strictly take top priority over all auto-fetched open API rates.
                    </p>

                    <form onSubmit={handleSaveOverride} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div>
                        <label className="text-[11px] text-stone-400 block mb-1">Currency Pair</label>
                        <select
                          value={overridePair}
                          onChange={(e) => setOverridePair(e.target.value)}
                          className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs font-bold"
                        >
                          <option value="SAR_PKR">SAR 🇸🇦 → PKR 🇵🇰</option>
                          <option value="AED_PKR">AED 🇦🇪 → PKR 🇵🇰</option>
                          <option value="KWD_PKR">KWD 🇰🇼 → PKR 🇵🇰</option>
                          <option value="QAR_PKR">QAR 🇶🇦 → PKR 🇵🇰</option>
                          <option value="SAR_INR">SAR 🇸🇦 → INR 🇮🇳</option>
                          <option value="AED_INR">AED 🇦🇪 → INR 🇮🇳</option>
                          <option value="SAR_BDT">SAR 🇸🇦 → BDT 🇧🇩</option>
                          <option value="AED_EGP">AED 🇦🇪 → EGP 🇪🇬</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-stone-400 block mb-1">New Exchange Rate</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={overrideRateVal}
                          onChange={(e) => setOverrideRateVal(e.target.value)}
                          className="w-full py-2 px-3 rounded-xl bg-stone-900 border border-stone-700 text-amber-300 font-mono font-bold text-xs"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs"
                        >
                          Apply Immediate Override
                        </button>
                      </div>
                    </form>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-stone-300 mb-2">Active Admin Overrides:</h4>
                    {Object.keys(currentOverrides).length === 0 ? (
                      <p className="text-xs text-stone-500 italic">No custom overrides active. Using live auto rates.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {Object.entries(currentOverrides).map(([pair, r]) => (
                          <div key={pair} className="p-2.5 rounded-xl bg-stone-900 border border-emerald-900/50 text-xs">
                            <span className="font-bold text-white block">{pair.replace('_', ' → ')}</span>
                            <span className="font-mono text-amber-400 font-bold">{r}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. COUNTRIES MANAGEMENT TAB */}
              {activeTab === 'countries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>Manage sending countries supported by RateCompare:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {editingCountries.map((country) => (
                      <div
                        key={country.id}
                        className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
                          country.active
                            ? 'bg-emerald-950/40 border-emerald-800/50 text-white'
                            : 'bg-stone-900/40 border-stone-800 text-stone-500'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{country.flag}</span>
                          <div>
                            <span className="font-bold text-sm block">{country.name}</span>
                            <span className="text-[10px] text-amber-300 font-mono">
                              Currency: {country.currency} ({country.code})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleCountry(country.id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              country.active
                                ? 'bg-emerald-500 text-stone-950'
                                : 'bg-stone-800 text-stone-400'
                            }`}
                          >
                            {country.active ? 'Active' : 'Disabled'}
                          </button>
                          <button
                            onClick={() => handleDeleteCountry(country.id)}
                            className="p-1 rounded text-stone-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Country Form */}
                  <form onSubmit={handleAddCountry} className="p-3.5 rounded-2xl bg-black/30 border border-stone-800 space-y-2 text-xs">
                    <h4 className="font-bold text-stone-200">+ Add New Country</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Country Name (e.g. Malaysia)"
                        value={newCountryName}
                        onChange={(e) => setNewCountryName(e.target.value)}
                        className="py-1.5 px-3 rounded-lg bg-stone-900 border border-stone-700 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Flag Emoji (e.g. 🇲🇾)"
                        value={newCountryFlag}
                        onChange={(e) => setNewCountryFlag(e.target.value)}
                        className="py-1.5 px-3 rounded-lg bg-stone-900 border border-stone-700 text-white"
                      />
                      <button
                        type="submit"
                        className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                      >
                        Add Country
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* 4. COMMUNITY QUEUE MODERATION TAB */}
              {activeTab === 'community' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>Pending submissions requiring Admin approval before going live:</span>
                  </div>

                  {communityReports.filter((r) => r.status === 'pending').length === 0 ? (
                    <div className="py-8 text-center text-xs text-emerald-400 bg-emerald-950/20 rounded-2xl border border-emerald-900/40">
                      <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                      <span>All community submissions reviewed! No pending queue items.</span>
                    </div>
                  ) : (
                    communityReports
                      .filter((r) => r.status === 'pending')
                      .map((report) => (
                        <div
                          key={report.id}
                          className="p-3.5 rounded-2xl border border-amber-400/40 bg-amber-400/5 text-xs space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-white text-sm">{report.providerName}</span>
                              <span className="text-stone-400 ml-2">Reported by: {report.userName}</span>
                            </div>
                            <span className="font-mono font-black text-amber-400 text-sm">
                              1 {report.sendCurrency} = {report.rate.toFixed(2)} {report.receiveCurrency}
                            </span>
                          </div>

                          <p className="text-stone-300 text-[11px]">
                            📍 {report.city}, {report.country} • Method: {report.branchOrMethod} • Fee: {report.fee}
                          </p>

                          {report.comment && (
                            <p className="text-[11px] text-stone-300 italic bg-stone-900/60 p-2 rounded-xl">
                              "{report.comment}"
                            </p>
                          )}

                          <div className="flex items-center justify-between pt-1 border-t border-emerald-900/30">
                            <span className="text-[10px] text-amber-400 font-bold">Status: Pending Approval</span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApproveReport(report.id)}
                                className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Approve (Make Live)</span>
                              </button>
                              <button
                                onClick={() => handleRejectReport(report.id)}
                                className="px-2.5 py-1 rounded-xl bg-rose-600/30 text-rose-300 hover:bg-rose-600/50 font-bold text-[11px]"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => handleDeleteReport(report.id)}
                                className="p-1 rounded text-stone-500 hover:text-rose-400"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}

                  <h4 className="font-bold text-xs text-stone-300 pt-3">Live Approved Submissions ({communityReports.filter((r) => r.status === 'approved').length}):</h4>
                  <div className="space-y-2">
                    {communityReports
                      .filter((r) => r.status === 'approved')
                      .map((report) => (
                        <div key={report.id} className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-white">{report.providerName}</span>
                            <span className="text-stone-400 ml-2 font-mono">1 {report.sendCurrency} = {report.rate} {report.receiveCurrency}</span>
                            <span className="text-stone-500 text-[10px] ml-2">({report.city})</span>
                          </div>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="p-1 text-stone-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 5. ADD PROVIDER TAB */}
              {activeTab === 'providers' && (
                <form onSubmit={handleAddNewProvider} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">Provider / Wallet Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Barq, UrPay, DinarPay"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-300 mb-1 font-semibold">Origin Country</label>
                      <select
                        value={newOrigin}
                        onChange={(e) => setNewOrigin(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white"
                      >
                        <option value="KSA">Saudi Arabia (KSA)</option>
                        <option value="UAE">United Arab Emirates (UAE)</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Oman">Oman</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="UK">United Kingdom (UK)</option>
                        <option value="Global">Global / Online</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-300 mb-1 font-semibold">Rate Multiplier</label>
                      <input
                        type="number"
                        step="0.001"
                        value={newMultiplier}
                        onChange={(e) => setNewMultiplier(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-amber-300 font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-300 mb-1 font-semibold">Fixed Fee (Send Currency)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={newFee}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setNewFee(e.target.value);
                          if (val === 0) setNewIsZeroFee(true);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-300 mb-1 font-semibold">Zero Fee Promotion?</label>
                      <button
                        type="button"
                        onClick={() => {
                          setNewIsZeroFee(!newIsZeroFee);
                          if (!newIsZeroFee) setNewFee('0');
                        }}
                        className={`w-full py-2 px-3 rounded-xl font-bold border transition ${
                          newIsZeroFee
                            ? 'bg-emerald-500 text-stone-950 border-emerald-400'
                            : 'bg-stone-900 text-stone-400 border-stone-700'
                        }`}
                      >
                        {newIsZeroFee ? '100% Free Transfer (0 Fee)' : 'Standard Transfer Fee'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">Delivery Speed</label>
                    <input
                      type="text"
                      value={newSpeed}
                      onChange={(e) => setNewSpeed(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">Promo Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Zero Fee ⚡"
                      value={newPromo}
                      onChange={(e) => setNewPromo(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 font-bold text-white shadow-lg hover:from-emerald-400 hover:to-emerald-500 transition"
                  >
                    + Save and Add Provider
                  </button>
                </form>
              )}
            </div>

            {/* Footer actions */}
            <div className="p-3.5 border-t border-emerald-900/40 flex items-center justify-between bg-emerald-950/30">
              <span className="text-[11px] text-stone-400">
                Waseem Asif • Super Administrator
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-300 hover:bg-emerald-900/40"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveAll}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-stone-950 hover:bg-amber-300 shadow active:scale-95 transition"
                >
                  <Save className="w-4 h-4" />
                  Save All Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
