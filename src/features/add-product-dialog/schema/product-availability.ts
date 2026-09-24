import { z } from 'zod';

import COPY from '@/shared/copy/product-availability';

const cartQuantity = z
  .int({ error: COPY.validation.cartQuantityInteger })
  .min(1, { error: COPY.validation.cartQuantityMin });

export const productAvailabilitySchema = z
  .object({
    isAvailable: z.boolean(),
    isLimited: z.boolean(),
    stock: z
      .int({ error: COPY.validation.stockInteger })
      .nonnegative({ error: COPY.validation.stockNonNegative })
      .nullable(),
    minPerCart: cartQuantity,
    maxPerCart: cartQuantity,
  })
  .refine((values) => !values.isLimited || values.stock !== null, {
    error: COPY.validation.stockRequired,
    path: ['stock'],
  })
  .refine((values) => values.minPerCart <= values.maxPerCart, {
    error: COPY.validation.maxPerCartBelowMin,
    path: ['maxPerCart'],
  });

export type ProductAvailabilityFormValues = z.infer<
  typeof productAvailabilitySchema
>;

export const productAvailabilityDefaultValues: ProductAvailabilityFormValues = {
  isAvailable: true,
  isLimited: false,
  stock: null,
  minPerCart: 1,
  maxPerCart: 10,
};
