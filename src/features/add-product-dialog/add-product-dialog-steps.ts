import { z } from 'zod';

import COPY from '@/shared/copy/add-product-dialog';
import {
  type ProductAvailabilityFormValues,
  productAvailabilitySchema,
} from '@/shared/schemas/product-availability';
import {
  type ProductBaseInfoFormValues,
  productBaseInfoSchema,
} from '@/shared/schemas/product-base-info';
import {
  type ProductPriceFormValues,
  productPriceSchema,
} from '@/shared/schemas/product-price';
import { StepperStep } from '@/shared/ui/stepper';

export const ADD_PRODUCT_STEPPER_STEPS: StepperStep[] = [
  {
    title: COPY.steps.info.title,
    subtitle: COPY.steps.info.description,
  },
  {
    title: COPY.steps.price.title,
    subtitle: COPY.steps.price.description,
  },
  {
    title: COPY.steps.availability.title,
    subtitle: COPY.steps.availability.description,
  },
];

const skip = {
  baseInfo: z.custom<ProductBaseInfoFormValues>(),
  price: z.custom<ProductPriceFormValues>(),
  availability: z.custom<ProductAvailabilityFormValues>(),
};

export const addProductFormSchema = z.object({
  baseInfo: productBaseInfoSchema,
  price: productPriceSchema,
  availability: productAvailabilitySchema,
});

export type AddProductFormValues = z.input<typeof addProductFormSchema>;

export const ADD_PRODUCT_FORM_STEPS: z.ZodType<unknown, AddProductFormValues>[] = [
  z.object({ ...skip, baseInfo: productBaseInfoSchema }),
  z.object({ ...skip, price: productPriceSchema }),
  z.object({ ...skip, availability: productAvailabilitySchema }),
];

export const findFirstInvalidStep = (
  values: AddProductFormValues,
  beforeIndex = ADD_PRODUCT_FORM_STEPS.length
) => {
  const index = ADD_PRODUCT_FORM_STEPS.slice(0, beforeIndex).findIndex(
    (schema) => !schema.safeParse(values).success
  );

  return index === -1 ? null : index;
};
