import { SendCurrencyCode, ReceiveCurrencyCode } from '../types';
import { BASE_INTERBANK_RATES } from '../data/currencies';
import { loadFromStorage, saveToStorage } from './storage';

const STORAGE_KEYS = {
  AUTO_RATES: 'ratecompare_auto_rates_v1',
  LAST_FETCHED_TIME: 'ratecompare_last_fetched_time_v1',
  ADMIN_RATE_OVERRIDES: 'ratecompare_admin_rate_overrides_v1',
};

export interface AutoRatesState {
  rates: Record<string, Record<string, number>>; // e.g. { SAR: { PKR: 74.85, INR: 23.4, ... } }
  lastUpdated: string; // formatted string e.g. "Just now" or ISO timestamp
  source: string;
}

// Check if rate override exists by Admin
export function getAdminRateOverrides(): Record<string, number> {
  return loadFromStorage<Record<string, number>>(STORAGE_KEYS.ADMIN_RATE_OVERRIDES, {});
}

export function saveAdminRateOverride(pairKey: string, rate: number): void {
  const overrides = getAdminRateOverrides();
  overrides[pairKey] = rate;
  saveToStorage(STORAGE_KEYS.ADMIN_RATE_OVERRIDES, overrides);
}

// Fetch rates with primary and fallbacks
export async function fetchLiveRates(baseCurrency: SendCurrencyCode = 'SAR'): Promise<AutoRatesState | null> {
  const lowerBase = baseCurrency.toLowerCase();

  const endpoints = [
    // Primary: jsdelivr / fawazahmed0 currency-api
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${lowerBase}.json`,
    // Fallback: NemesisX1 currency-api mirror
    `https://cdn.jsdelivr.net/gh/NemesisX1/currency-api@main/v1/currencies/${lowerBase}.json`,
  ];

  for (let i = 0; i < endpoints.length; i++) {
    const url = endpoints[i];
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) continue;

      const data = await res.json();
      const extractedRates: Record<string, number> = {};

      if (data && data[lowerBase]) {
        // fawazahmed0 & NemesisX1 currency-api schema
        const sub = data[lowerBase];
        if (sub['pkr']) extractedRates['PKR'] = sub['pkr'];
        if (sub['inr']) extractedRates['INR'] = sub['inr'];
        if (sub['bdt']) extractedRates['BDT'] = sub['bdt'];
        if (sub['egp']) extractedRates['EGP'] = sub['egp'];
        if (sub['php']) extractedRates['PHP'] = sub['php'];
        if (sub['lkr']) extractedRates['LKR'] = sub['lkr'];
        if (sub['npr']) extractedRates['NPR'] = sub['npr'];
      } else if (data && data.rates) {
        // Standard rates fallback
        if (data.rates['PKR']) extractedRates['PKR'] = data.rates['PKR'];
        if (data.rates['INR']) extractedRates['INR'] = data.rates['INR'];
        if (data.rates['BDT']) extractedRates['BDT'] = data.rates['BDT'];
        if (data.rates['EGP']) extractedRates['EGP'] = data.rates['EGP'];
        if (data.rates['PHP']) extractedRates['PHP'] = data.rates['PHP'];
        if (data.rates['LKR']) extractedRates['LKR'] = data.rates['LKR'];
        if (data.rates['NPR']) extractedRates['NPR'] = data.rates['NPR'];
      }

      // If we got PKR, valid response!
      if (extractedRates['PKR']) {
        const currentSaved = loadFromStorage<Record<string, Record<string, number>>>(
          STORAGE_KEYS.AUTO_RATES,
          BASE_INTERBANK_RATES
        );

        currentSaved[baseCurrency] = {
          ...currentSaved[baseCurrency],
          ...extractedRates,
        };

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
        const lastUpdated = `${dateStr}, ${timeStr}`;

        saveToStorage(STORAGE_KEYS.AUTO_RATES, currentSaved);
        saveToStorage(STORAGE_KEYS.LAST_FETCHED_TIME, lastUpdated);

        return {
          rates: currentSaved,
          lastUpdated,
          source: i === 0 ? 'jsdelivr/fawazahmed0 API' : 'NemesisX1 Fallback API',
        };
      }
    } catch (err) {
      console.warn(`Rate fetch failed on source ${i + 1} (${url}):`, err);
    }
  }

  return null;
}

// Get the latest effective rate with Admin Overrides having top priority
export function getEffectiveRate(send: SendCurrencyCode, receive: ReceiveCurrencyCode): number {
  const overrides = getAdminRateOverrides();
  const pairKey = `${send}_${receive}`;
  if (overrides[pairKey]) {
    return overrides[pairKey];
  }

  const cached = loadFromStorage<Record<string, Record<string, number>>>(
    STORAGE_KEYS.AUTO_RATES,
    BASE_INTERBANK_RATES
  );

  if (cached[send] && cached[send][receive]) {
    return cached[send][receive];
  }

  return BASE_INTERBANK_RATES[send]?.[receive] || 74.85;
}

export function getLastUpdatedTimestamp(): string {
  return loadFromStorage<string>(STORAGE_KEYS.LAST_FETCHED_TIME, 'Today, 8:00 AM (Auto Synced)');
}
