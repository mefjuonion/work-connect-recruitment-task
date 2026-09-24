import { parseAsArrayOf, parseAsString, parseAsStringLiteral } from 'nuqs';

import { FEATURES } from '@/shared/CONSTANTS';

import { productBaseInfoDefaultValues as defaults } from '../schema/product-base-info';

export const productBaseInfoSearchParams = {
  name: parseAsString.withDefault(defaults.name),
  sku: parseAsString.withDefault(defaults.sku),
  description: parseAsString.withDefault(defaults.description),
  manufacturer: parseAsString.withDefault(defaults.manufacturer),
  category: parseAsString.withDefault(defaults.category),
  features: parseAsArrayOf(parseAsStringLiteral(FEATURES)).withDefault(
    defaults.features
  ),
};
