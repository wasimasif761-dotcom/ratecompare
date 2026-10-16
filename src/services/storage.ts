import {
  SendCurrencyCode,
  ReceiveCurrencyCode,
  ProviderRate,
  RateAlert,
  CommunityReport,
  LanguageCode,
  RateHistoryPoint,
  UserFeedback,
  AuthUser,
  CountryConfig,
} from '../types';
import { BASE_INTERBANK_RATES, SEND_CURRENCIES, RECEIVE_CURRENCIES } from '../data/currencies';
import { DEFAULT_PROVIDERS } from '../data/defaultProviders';

const STORAGE_KEYS = {
  PROVIDERS: 'ratecompare_providers_v1',
  RATE_OVERRIDES: 'ratecompare_rate_overrides_v1',
  ALERTS: 'ratecompare_alerts_v1',
  COMMUNITY_REPORTS: 'ratecompare_community_reports_v1',
  SETTINGS: 'ratecompare_settings_v1',
  LAST_SYNC: 'ratecompare_last_sync_v1',
  FEEDBACKS: 'ratecompare_feedbacks_v1',
  AUTH_USER: 'ratecompare_auth_user_v1',
  COUNTRIES: 'ratecompare_countries_v1',
};

export interface AppSettings {
  language: LanguageCode;
  theme: 'dark' | 'light';
  defaultSend: SendCurrencyCode;
  defaultReceive: ReceiveCurrencyCode;
  favoriteProviderIds: string[];
  morningSummaryEnabled: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  theme: 'dark',
  defaultSend: 'SAR',
  defaultReceive: 'PKR',
  favoriteProviderIds: ['barq_pay', 'urpay_sa', 'stc_pay', 'al_rajhi', 'careem_pay'],
  morningSummaryEnabled: true,
};

export const DEFAULT_COUNTRIES: CountryConfig[] = [
  { id: 'sa', name: 'Saudi Arabia', currency: 'SAR', flag: '🇸🇦', code: 'KSA', active: true },
  { id: 'ae', name: 'United Arab Emirates', currency: 'AED', flag: '🇦🇪', code: 'UAE', active: true },
  { id: 'kw', name: 'Kuwait', currency: 'KWD', flag: '🇰🇼', code: 'KWT', active: true },
  { id: 'qa', name: 'Qatar', currency: 'QAR', flag: '🇶🇦', code: 'QAT', active: true },
  { id: 'om', name: 'Oman', currency: 'OMR', flag: '🇴🇲', code: 'OMN', active: true },
  { id: 'bh', name: 'Bahrain', currency: 'BHD', flag: '🇧🇭', code: 'BHR', active: true },
  { id: 'gb', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧', code: 'GBR', active: true },
  { id: 'eu', name: 'European Union', currency: 'EUR', flag: '🇪🇺', code: 'EUR', active: true },
  { id: 'us', name: 'United States', currency: 'USD', flag: '🇺🇸', code: 'USA', active: true },
];

const SEED_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'cr-1',
    userName: 'Muhammad Tariq',
    providerName: 'Barq',
    sendCurrency: 'SAR',
    receiveCurrency: 'PKR',
    rate: 74.92,
    fee: 0,
    city: 'Riyadh (Al Batha)',
    country: 'Saudi Arabia',
    branchOrMethod: 'Mobile App',
    timestamp: '1 hour ago',
    verified: true,
    status: 'approved',
    upvotes: 42,
    comment: 'Barq has zero transfer fee and highest exchange rate today to JazzCash!',
  },
  {
    id: 'cr-2',
    userName: 'Zubair Khan',
    providerName: 'UrPay',
    sendCurrency: 'SAR',
    receiveCurrency: 'PKR',
    rate: 74.88,
    fee: 0,
    city: 'Jeddah',
    country: 'Saudi Arabia',
    branchOrMethod: 'Mobile App',
    timestamp: '3 hours ago',
    verified: true,
    status: 'approved',
    upvotes: 35,
    comment: '100% Free transfer with UrPay. Money reached Meezan Bank in 3 minutes.',
  },
  {
    id: 'cr-3',
    userName: 'Ahmed Al-Masri',
    providerName: 'Careem Pay',
    sendCurrency: 'AED',
    receiveCurrency: 'EGP',
    rate: 13.52,
    fee: 0,
    city: 'Dubai (Deira)',
    country: 'UAE',
    branchOrMethod: 'Careem Super App',
    timestamp: '4 hours ago',
    verified: true,
    status: 'approved',
    upvotes: 28,
    comment: 'Zero fee transfer from Careem Pay directly to Vodafone Cash in Cairo.',
  },
  {
    id: 'cr-4',
    userName: 'Rajesh Sharma',
    providerName: 'LuLu Exchange',
    sendCurrency: 'AED',
    receiveCurrency: 'INR',
    rate: 23.90,
    fee: 14.0,
    city: 'Abu Dhabi',
    country: 'UAE',
    branchOrMethod: 'Mall Branch',
    timestamp: '6 hours ago',
    verified: true,
    status: 'approved',
    upvotes: 15,
    comment: 'Immediate transfer to SBI account. Rate was slightly higher than bank app.',
  },
  {
    id: 'cr-5',
    userName: 'Kamal Hossain',
    providerName: 'Western Union',
    sendCurrency: 'SAR',
    receiveCurrency: 'BDT',
    rate: 32.55,
    fee: 20.0,
    city: 'Dammam',
    country: 'Saudi Arabia',
    branchOrMethod: 'Agent Store',
    timestamp: '8 hours ago',
    verified: true,
    status: 'approved',
    upvotes: 12,
    comment: 'Cash pickup in Dhaka within 10 minutes. Good for urgent family needs.',
  },
];


// Helper to safely access localStorage
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// Providers Management
export function getProviders(): ProviderRate[] {
  return loadFromStorage<ProviderRate[]>(STORAGE_KEYS.PROVIDERS, DEFAULT_PROVIDERS);
}

export function saveProviders(providers: ProviderRate[]): void {
  saveToStorage(STORAGE_KEYS.PROVIDERS, providers);
}

import { getEffectiveRate } from './rateService';

export function getInterbankRate(send: SendCurrencyCode, receive: ReceiveCurrencyCode): number {
  return getEffectiveRate(send, receive);
}

export interface CalculatedProviderOutcome {
  provider: ProviderRate;
  exchangeRate: number;
  sendAmount: number;
  fixedFee: number;
  percentageFeeAmount: number;
  totalFee: number;
  netSendAmount: number;
  receiverGets: number;
  isBest: boolean;
  gainVsLowest: number;
  hiddenMarginPercent: number;
}

export function calculateProviderOutcomes(
  providers: ProviderRate[],
  sendAmount: number,
  sendCurrency: SendCurrencyCode,
  receiveCurrency: ReceiveCurrencyCode
): CalculatedProviderOutcome[] {
  const interbankRate = getInterbankRate(sendCurrency, receiveCurrency);

  const outcomes = providers.map((provider) => {
    // Each provider converts with their rate multiplier
    const rate = Number((interbankRate * provider.rateMultiplier).toFixed(4));
    
    const fixedFee = provider.fixedFee || 0;
    const percentageFeeAmount = provider.percentageFee
      ? (sendAmount * provider.percentageFee) / 100
      : 0;
    const totalFee = fixedFee + percentageFeeAmount;

    // Net converted amount:
    // When sending 'sendAmount', fee is either deducted from principal or added on top.
    // In international remittances (e.g. Al Rajhi, STC Pay, Western Union),
    // if you send 1000 SAR, receiver gets 1000 * rate, and you pay fee 15 SAR at cashier, OR
    // fee is deducted from the converted pool. Let's calculate based on net principal:
    // If sendAmount > totalFee, net is (sendAmount - totalFee) * rate,
    // OR if fee is paid separately, user pays sendAmount + fee.
    // To give users the most accurate "What receiver receives from this budget":
    // If budget is sendAmount:
    const netSend = Math.max(0, sendAmount - (totalFee > 0 ? totalFee : 0));
    const receiverGets = Math.round(netSend * rate);

    const hiddenMarginPercent = Number((((interbankRate - rate) / interbankRate) * 100).toFixed(2));

    return {
      provider,
      exchangeRate: rate,
      sendAmount,
      fixedFee,
      percentageFeeAmount,
      totalFee,
      netSendAmount: netSend,
      receiverGets,
      isBest: false,
      gainVsLowest: 0,
      hiddenMarginPercent,
    };
  });

  // Sort descending by receiverGets
  outcomes.sort((a, b) => b.receiverGets - a.receiverGets);

  if (outcomes.length > 0) {
    outcomes[0].isBest = true;
    const lowestReceived = outcomes[outcomes.length - 1].receiverGets;
    outcomes.forEach((o) => {
      o.gainVsLowest = Math.max(0, o.receiverGets - lowestReceived);
    });
  }

  return outcomes;
}

// History generator (produces authentic realistic fluctuations for graphs)
export function getRateHistory(
  sendCurrency: SendCurrencyCode,
  receiveCurrency: ReceiveCurrencyCode,
  days: 7 | 30 = 7
): RateHistoryPoint[] {
  const currentRate = getInterbankRate(sendCurrency, receiveCurrency);
  const points: RateHistoryPoint[] = [];

  const now = new Date();
  
  // Seed pseudorandom walk based on currency string so it stays consistent
  let seed = sendCurrency.charCodeAt(0) + receiveCurrency.charCodeAt(0);
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  let simulatedRate = currentRate * (1 - (days === 30 ? 0.025 : 0.012));

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // daily change between -0.4% and +0.6%
    const changePct = (seededRandom() - 0.44) * 0.012;
    simulatedRate = simulatedRate * (1 + changePct);

    // ensure last day matches currentRate
    if (i === 0) {
      simulatedRate = currentRate;
    }

    const variance = simulatedRate * 0.003;
    points.push({
      date: dateStr,
      rate: Number(simulatedRate.toFixed(2)),
      high: Number((simulatedRate + variance).toFixed(2)),
      low: Number((simulatedRate - variance).toFixed(2)),
    });
  }

  return points;
}

// Alerts Management
export function getAlerts(): RateAlert[] {
  return loadFromStorage<RateAlert[]>(STORAGE_KEYS.ALERTS, [
    {
      id: 'alert-default-1',
      sendCurrency: 'SAR',
      receiveCurrency: 'PKR',
      targetRate: 75.50,
      condition: 'above',
      createdAt: '2026-10-15',
      active: true,
      notes: 'Send monthly salary when SAR hits 75.50 PKR',
    },
    {
      id: 'alert-default-2',
      sendCurrency: 'AED',
      receiveCurrency: 'PKR',
      targetRate: 77.00,
      condition: 'above',
      createdAt: '2026-10-14',
      active: true,
      notes: 'Family emergency fund exchange trigger',
    },
  ]);
}

export function saveAlerts(alerts: RateAlert[]): void {
  saveToStorage(STORAGE_KEYS.ALERTS, alerts);
}

// Community Reports
export function getCommunityReports(): CommunityReport[] {
  return loadFromStorage<CommunityReport[]>(STORAGE_KEYS.COMMUNITY_REPORTS, SEED_COMMUNITY_REPORTS);
}

export function saveCommunityReports(reports: CommunityReport[]): void {
  saveToStorage(STORAGE_KEYS.COMMUNITY_REPORTS, reports);
}

// App Settings
export function getAppSettings(): AppSettings {
  return loadFromStorage<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export function saveAppSettings(settings: AppSettings): void {
  saveToStorage(STORAGE_KEYS.SETTINGS, settings);
}

// Feedbacks Management
export function getFeedbacks(): UserFeedback[] {
  return loadFromStorage<UserFeedback[]>(STORAGE_KEYS.FEEDBACKS, []);
}

export function saveFeedback(feedback: UserFeedback): void {
  const existing = getFeedbacks();
  saveToStorage(STORAGE_KEYS.FEEDBACKS, [feedback, ...existing]);
}

// User Authentication
export function getAuthUser(): AuthUser | null {
  return loadFromStorage<AuthUser | null>(STORAGE_KEYS.AUTH_USER, null);
}

export function saveAuthUser(user: AuthUser | null): void {
  if (user) {
    saveToStorage(STORAGE_KEYS.AUTH_USER, user);
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  }
}

// Countries Management
export function getCountries(): CountryConfig[] {
  return loadFromStorage<CountryConfig[]>(STORAGE_KEYS.COUNTRIES, DEFAULT_COUNTRIES);
}

export function saveCountries(countries: CountryConfig[]): void {
  saveToStorage(STORAGE_KEYS.COUNTRIES, countries);
}

