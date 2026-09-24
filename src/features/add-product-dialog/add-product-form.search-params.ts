import type { Values } from 'nuqs';

import { calculateGrossPrice } from '@/shared/lib/currencyUtils';

import type { AddProductFormValues } from './add-product-dialog-steps';
import { productAvailabilitySearchParams } from './product-availability/product-availability.search-params';
import { productBaseInfoSearchParams } from './product-base-info/product-base-info.search-params';
import { productPriceSearchParams } from './product-price/product-price.search-params';

export const addProductFormSearchParams = {
  ...productBaseInfoSearchParams,
  ...productPriceSearchParams,
  ...productAvailabilitySearchParams,
};
const URL_PREFIX = 'add-product';

export const ADD_PRODUCT_STEP_URL_KEY = `${URL_PREFIX}.step`;

export const prefixUrlKeys = <TParams extends Record<string, unknown>>(
  params: TParams
) =>
  Object.fromEntries(
    Object.keys(params).map((key) => [key, `${URL_PREFIX}.${key}`])
  ) as Record<keyof TParams, string>;

export const addProductFormUrlKeys = prefixUrlKeys(addProductFormSearchParams);

type AddProductFormQuery = Values<typeof addProductFormSearchParams>;

const finiteOrNull = (value: number) => (Number.isFinite(value) ? value : null);

export const queryToFormValues = (
  query: AddProductFormQuery
): AddProductFormValues => ({
  baseInfo: {
    name: query.name,
    sku: query.sku,
    description: query.description,
    manufacturer: query.manufacturer,
    category: query.category,
    features: query.features,
  },
  price: {
    netPrice: query.netPrice,
    grossPrice: calculateGrossPrice(query.netPrice, query.vatRate),
    vatRate: query.vatRate,
    currency: query.currency,
  },
  availability: {
    isAvailable: query.isAvailable,
    isLimited: query.isLimited,
    stock: query.stock,
    minPerCart: query.minPerCart,
    maxPerCart: query.maxPerCart,
  },
});

export const formValuesToQuery = ({
  baseInfo,
  price,
  availability,
}: AddProductFormValues) => ({
  ...baseInfo,
  currency: price.currency,
  vatRate: price.vatRate,
  netPrice: finiteOrNull(price.netPrice),
  isAvailable: availability.isAvailable,
  isLimited: availability.isLimited,
  stock: availability.stock === null ? null : finiteOrNull(availability.stock),
  minPerCart: finiteOrNull(availability.minPerCart),
  maxPerCart: finiteOrNull(availability.maxPerCart),
});
