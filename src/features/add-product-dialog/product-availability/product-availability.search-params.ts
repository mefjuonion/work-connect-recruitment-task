import { parseAsBoolean, parseAsInteger } from 'nuqs';

import { productAvailabilityDefaultValues as defaults } from '@/shared/schemas/product-availability';

export const productAvailabilitySearchParams = {
  isAvailable: parseAsBoolean.withDefault(defaults.isAvailable),
  isLimited: parseAsBoolean.withDefault(defaults.isLimited),
  stock: parseAsInteger,
  minPerCart: parseAsInteger.withDefault(defaults.minPerCart),
  maxPerCart: parseAsInteger.withDefault(defaults.maxPerCart),
};
