import type { VatRate } from '@/shared/CONSTANTS';

const roundPrice = (value: number) => Math.round(value * 100) / 100;

export const calculateGrossPrice = (netPrice: number, vatRate: VatRate) =>
  roundPrice(netPrice * (1 + vatRate / 100));

export const calculateNetPrice = (grossPrice: number, vatRate: VatRate) =>
  roundPrice(grossPrice / (1 + vatRate / 100));
