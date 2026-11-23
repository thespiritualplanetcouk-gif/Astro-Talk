import type { CurrencyCode } from '../types';

export interface CountryDialOption {
  iso: string;
  name: string;
  dialCode: string;
  defaultTimeZone: string;
  defaultCurrency: CurrencyCode;
}

export const INTERNATIONAL_COUNTRIES: CountryDialOption[] = [
  { iso: 'GB', name: 'United Kingdom', dialCode: '+44', defaultTimeZone: 'Europe/London', defaultCurrency: 'GBP' },
  { iso: 'PK', name: 'Pakistan', dialCode: '+92', defaultTimeZone: 'Asia/Karachi', defaultCurrency: 'PKR' },
  { iso: 'AE', name: 'United Arab Emirates', dialCode: '+971', defaultTimeZone: 'Asia/Dubai', defaultCurrency: 'AED' },
  { iso: 'SA', name: 'Saudi Arabia', dialCode: '+966', defaultTimeZone: 'Asia/Riyadh', defaultCurrency: 'SAR' },
  { iso: 'US', name: 'United States', dialCode: '+1', defaultTimeZone: 'America/New_York', defaultCurrency: 'USD' },
  { iso: 'CA', name: 'Canada', dialCode: '+1', defaultTimeZone: 'America/Toronto', defaultCurrency: 'CAD' },
  { iso: 'AU', name: 'Australia', dialCode: '+61', defaultTimeZone: 'Australia/Sydney', defaultCurrency: 'AUD' },
  { iso: 'DE', name: 'Germany', dialCode: '+49', defaultTimeZone: 'Europe/Berlin', defaultCurrency: 'EUR' },
  { iso: 'FR', name: 'France', dialCode: '+33', defaultTimeZone: 'Europe/Paris', defaultCurrency: 'EUR' },
  { iso: 'NO', name: 'Norway', dialCode: '+47', defaultTimeZone: 'Europe/Oslo', defaultCurrency: 'EUR' },
  { iso: 'ES', name: 'Spain', dialCode: '+34', defaultTimeZone: 'Europe/Madrid', defaultCurrency: 'EUR' },
  { iso: 'IT', name: 'Italy', dialCode: '+39', defaultTimeZone: 'Europe/Rome', defaultCurrency: 'EUR' },
  { iso: 'QA', name: 'Qatar', dialCode: '+974', defaultTimeZone: 'Asia/Qatar', defaultCurrency: 'SAR' },
  { iso: 'KW', name: 'Kuwait', dialCode: '+965', defaultTimeZone: 'Asia/Kuwait', defaultCurrency: 'SAR' },
  { iso: 'OM', name: 'Oman', dialCode: '+968', defaultTimeZone: 'Asia/Muscat', defaultCurrency: 'AED' },
  { iso: 'OTHER', name: 'Other International', dialCode: '+', defaultTimeZone: 'UTC', defaultCurrency: 'USD' },
];

export const COMMON_TIMEZONES: { value: string; label: string }[] = [
  { value: 'Europe/London', label: 'United Kingdom — London (GMT / BST)' },
  { value: 'Asia/Karachi', label: 'Pakistan — Karachi / Lahore / Islamabad (PKT, UTC+5)' },
  { value: 'Asia/Dubai', label: 'UAE — Dubai / Abu Dhabi (GST, UTC+4)' },
  { value: 'Asia/Riyadh', label: 'Saudi Arabia — Riyadh / Jeddah (AST, UTC+3)' },
  { value: 'America/New_York', label: 'USA / Canada — Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'USA / Canada — Central Time (CT)' },
  { value: 'America/Los_Angeles', label: 'USA / Canada — Pacific Time (PT)' },
  { value: 'America/Toronto', label: 'Canada — Toronto (ET)' },
  { value: 'Australia/Sydney', label: 'Australia — Sydney / Melbourne (AEST / AEDT)' },
  { value: 'Europe/Berlin', label: 'Europe — Central European Time (CET / CEST)' },
  { value: 'Europe/Paris', label: 'France — Paris (CET / CEST)' },
  { value: 'Europe/Oslo', label: 'Norway — Oslo (CET / CEST)' },
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
];

export const SUPPORTED_CURRENCIES: { code: CurrencyCode; symbol: string; name: string }[] = [
  { code: 'PKR', symbol: 'PKR', name: 'Pakistani Rupee (Base Fee)' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal' },
];

export function formatTimeInZone(date: Date, timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return date.toUTCString();
  }
}

export function buildWhatsAppUrl(phoneDigits: string, message: string): string {
  const cleanDigits = phoneDigits.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(message)}`;
}

export function buildTelUrl(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/[^0-9+]/g, '');
  return `tel:${cleaned}`;
}
