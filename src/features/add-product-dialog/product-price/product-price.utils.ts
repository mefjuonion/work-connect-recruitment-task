import { CURRENCIES, VAT_RATES } from '@/shared/CONSTANTS';

export const VAT_OPTIONS = VAT_RATES.map((rate) => ({ value: rate, label: `${rate}%` }));
export const CURRENCY_OPTIONS = CURRENCIES.map((currency) => ({
  value: currency,
  label: currency,
}));