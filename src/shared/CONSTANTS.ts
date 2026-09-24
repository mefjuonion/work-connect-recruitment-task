export const VAT_RATES = [23, 8, 5, 0] as const;
export const CURRENCIES = ['PLN', 'EUR', 'USD'] as const;

export type VatRate = (typeof VAT_RATES)[number];
export type Currency = (typeof CURRENCIES)[number];

export const MANUFACTURERS = ['apple', 'samsung', 'sony', 'bosch', 'xiaomi'] as const;
export const CATEGORIES = ['computers', 'phones', 'tv', 'appliances', 'accessories'] as const;
export const FEATURES = ['new', 'bestseller', 'eco', 'waterproof', 'wireless'] as const;

export type Manufacturer = (typeof MANUFACTURERS)[number];
export type Category = (typeof CATEGORIES)[number];
export type Feature = (typeof FEATURES)[number];
