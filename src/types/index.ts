export type SendCurrencyCode = 'SAR' | 'AED' | 'KWD' | 'QAR' | 'OMR' | 'BHD' | 'GBP' | 'EUR' | 'USD';
export type ReceiveCurrencyCode = 'PKR' | 'INR' | 'BDT' | 'EGP' | 'PHP' | 'LKR' | 'NPR';

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
}

export type DeliveryMethod = 'bank' | 'wallet' | 'cash' | 'all';

export interface ProviderRate {
  id: string;
  name: string;
  shortName?: string;
  logoText: string;
  logoBg: string;
  logoColor: string;
  countryOrigin: string; // e.g. 'KSA', 'UAE', 'Global'
  rateMultiplier: number; // base conversion relative to mid-market
  fixedFee: number; // fee in send currency
  percentageFee?: number; // % fee if applicable
  deliveryTime: string;
  deliveryMethods: DeliveryMethod[];
  rating: number; // out of 5
  reviewsCount: number;
  promoBadge?: string;
  verified: boolean;
  notes?: string;
  websiteUrl?: string;
  featured?: boolean;
  isZeroFee?: boolean;
}

export interface RateHistoryPoint {
  date: string;
  rate: number;
  high: number;
  low: number;
}

export interface RateAlert {
  id: string;
  sendCurrency: SendCurrencyCode;
  receiveCurrency: ReceiveCurrencyCode;
  targetRate: number;
  condition: 'above' | 'below';
  createdAt: string;
  active: boolean;
  notes?: string;
}

export interface CommunityReport {
  id: string;
  userName: string;
  providerName: string;
  sendCurrency: SendCurrencyCode;
  receiveCurrency: ReceiveCurrencyCode;
  rate: number;
  fee: number;
  city: string;
  country: string;
  branchOrMethod: string;
  timestamp: string;
  verified: boolean;
  status: 'approved' | 'pending' | 'rejected';
  upvotes: number;
  userUpvoted?: boolean;
  comment?: string;
}

export type LanguageCode = 'en' | 'ur' | 'hi' | 'bn' | 'ar';

export type AppTab = 'home' | 'compare' | 'calculator' | 'alerts' | 'community';

export interface UserFeedback {
  id: string;
  rating: number;
  message: string;
  userName?: string;
  contact?: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  provider: 'google' | 'facebook';
  joinedAt: string;
}

export interface CountryConfig {
  id: string;
  name: string;
  currency: SendCurrencyCode;
  flag: string;
  code: string;
  active: boolean;
}
