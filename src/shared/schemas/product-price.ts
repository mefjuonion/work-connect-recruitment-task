import { z } from 'zod';

import { CURRENCIES, VAT_RATES } from '@/shared/CONSTANTS';
import COPY from '@/shared/copy/product-price';
import { calculateGrossPrice } from '@/shared/lib/currencyUtils';

const price = z
  .number({ error: COPY.validation.priceRequired })
  .positive({ error: COPY.validation.pricePositive })
  .multipleOf(0.01, { error: COPY.validation.priceDecimals });

const toCents = (value: number) => Math.round(value * 100);

export const productPriceSchema = z
  .object({
    netPrice: price,
    grossPrice: price,
    vatRate: z.literal(VAT_RATES, { error: COPY.validation.vatRateInvalid }),
    currency: z.enum(CURRENCIES, { error: COPY.validation.currencyInvalid }),
  })
  .refine(
    // Compared in whole cents: a gross → net → gross round trip may be off by
    // one cent, and float subtraction would push that just over 0.01.
    (values) =>
      Math.abs(
        toCents(calculateGrossPrice(values.netPrice, values.vatRate)) -
          toCents(values.grossPrice)
      ) <= 1,
    { error: COPY.validation.grossPriceMismatch, path: ['grossPrice'] }
  );

export type ProductPriceFormValues = z.input<typeof productPriceSchema>;

export const productPriceDefaultValues: ProductPriceFormValues = {
  netPrice: 0,
  grossPrice: 0,
  vatRate: 23,
  currency: 'PLN',
};
