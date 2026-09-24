import { CATEGORIES, FEATURES, MANUFACTURERS } from '@/shared/CONSTANTS';
import COPY from '@/shared/copy/product-base-info';

const toOptions = <TValue extends string>(
  values: readonly TValue[],
  labels: Record<TValue, string>
) => values.map((value) => ({ value, label: labels[value] }));

export const MANUFACTURER_OPTIONS = toOptions(
  MANUFACTURERS,
  COPY.options.manufacturer
);
export const CATEGORY_OPTIONS = toOptions(CATEGORIES, COPY.options.category);
export const FEATURE_OPTIONS = toOptions(FEATURES, COPY.options.features);