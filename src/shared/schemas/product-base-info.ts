import { z } from 'zod';

import { CATEGORIES, FEATURES, MANUFACTURERS } from '@/shared/CONSTANTS';
import COPY from '@/shared/copy/product-base-info';

export const productBaseInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: COPY.validation.nameRequired, abort: true })
    .min(3, { error: COPY.validation.nameMin }),
  sku: z
    .string()
    .trim()
    .min(1, { error: COPY.validation.skuRequired, abort: true })
    .max(24, { error: COPY.validation.skuMax })
    .regex(/^[a-z0-9]+$/i, { error: COPY.validation.skuFormat }),
  description: z.string().trim(),
  manufacturer: z
    .string()
    .pipe(z.enum(MANUFACTURERS, { error: COPY.validation.manufacturerInvalid })),
  category: z
    .string()
    .pipe(z.enum(CATEGORIES, { error: COPY.validation.categoryInvalid })),
  features: z
    .array(z.enum(FEATURES, { error: COPY.validation.featureInvalid }))
    .min(1, { error: COPY.validation.featuresMin }),
});

export type ProductBaseInfoFormValues = z.input<typeof productBaseInfoSchema>;

export const productBaseInfoDefaultValues: ProductBaseInfoFormValues = {
  name: '',
  sku: '',
  description: '',
  manufacturer: '',
  category: '',
  features: [],
};
