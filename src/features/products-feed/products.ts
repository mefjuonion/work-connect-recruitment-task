import type { Currency } from '@/shared/CONSTANTS';

const priceFormatter = new Intl.NumberFormat('pl-PL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

export const formatPrice = (value: number, currency: Currency) =>
  `${priceFormatter.format(value)} ${currency}`;
