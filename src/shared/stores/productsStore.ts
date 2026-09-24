import type { z } from 'zod';
import { create } from 'zustand';

import type { productAvailabilitySchema } from '@/shared/schemas/product-availability';
import type { productBaseInfoSchema } from '@/shared/schemas/product-base-info';
import type { productPriceSchema } from '@/shared/schemas/product-price';

import { MOCK_PRODUCTS } from '../mocks/products';

export type ProductSchema = z.output<typeof productBaseInfoSchema> &
  z.output<typeof productPriceSchema> &
  z.output<typeof productAvailabilitySchema>;

export type Product = ProductSchema & {
  id: string;
  createdAt: string;
};

type ProductsState = {
  products: Product[];
  addProduct: (input: ProductSchema) => Product;
};

export const useProductsStore = create<ProductsState>()((set) => ({
  products: MOCK_PRODUCTS,
  addProduct: (input) => {
    const product: Product = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    set((state) => ({ products: [product, ...state.products] }));

    return product;
  },
}));
