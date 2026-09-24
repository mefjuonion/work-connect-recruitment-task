import { z } from 'zod';

import { CURRENCIES, VAT_RATES } from '@/shared/CONSTANTS';
import COPY from '@/shared/copy/product-price';
import { calculateGrossPrice } from '@/shared/lib/currencyUtils';

const price = z
  .number({ error: COPY.validation.priceRequired })
  .positive({ error: COPY.validation.pricePositive })
  .multipleOf(0.01, { error: COPY.validation.priceDecimals });

export const productPriceSchema = z
  .object({
    netPrice: price,
    grossPrice: price,
    vatRate: z.literal(VAT_RATES, { error: COPY.validation.vatRateInvalid }),
    currency: z.enum(CURRENCIES, { error: COPY.validation.currencyInvalid }),
  })
  .refine(
    (values) =>
      Math.abs(
        calculateGrossPrice(values.netPrice, values.vatRate) - values.grossPrice
      ) <= 0.01 + Number.EPSILON,
    { error: COPY.validation.grossPriceMismatch, path: ['grossPrice'] }
  );

export type ProductPriceFormValues = z.input<typeof productPriceSchema>;

export const productPriceDefaultValues: ProductPriceFormValues = {
  netPrice: 0,
  grossPrice: 0,
  vatRate: 23,
  currency: 'PLN',
};
