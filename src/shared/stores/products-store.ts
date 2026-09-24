import chunk from 'lodash/chunk';
import type { z } from 'zod';
import { create } from 'zustand';

import type { productAvailabilitySchema } from '@/shared/schemas/product-availability';
import type { productBaseInfoSchema } from '@/shared/schemas/product-base-info';
import type { productPriceSchema } from '@/shared/schemas/product-price';

import { PRODUCTS_PER_PAGE } from '../CONSTANTS';
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
  productsPages: Product[][];
  addProduct: (input: ProductSchema) => Product;
};

export const useProductsStore = create<ProductsState>()((set) => ({
  products: MOCK_PRODUCTS,
  productsPages: chunk(MOCK_PRODUCTS, PRODUCTS_PER_PAGE),

  addProduct: (input) => {
    const product: Product = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const products = [product, ...state.products];
      return { products, productsPages: chunk(products, PRODUCTS_PER_PAGE) };
    });

    return product;
  },
}));
