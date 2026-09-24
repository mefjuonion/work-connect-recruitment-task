import { parseAsFloat, parseAsNumberLiteral, parseAsStringLiteral } from 'nuqs';

import { CURRENCIES, VAT_RATES } from '@/shared/CONSTANTS';
import { productPriceDefaultValues as defaults } from '@/shared/schemas/product-price';

export const productPriceSearchParams = {
  netPrice: parseAsFloat.withDefault(defaults.netPrice),
  vatRate: parseAsNumberLiteral(VAT_RATES).withDefault(defaults.vatRate),
  currency: parseAsStringLiteral(CURRENCIES).withDefault(defaults.currency),
};
