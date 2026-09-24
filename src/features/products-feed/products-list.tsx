import { AllHTMLAttributes, ComponentProps } from 'react';

import { cn } from '@/shared/lib/utils';
import { Product } from '@/shared/stores/products-store';

import { ProductCard } from './product-card';

export interface ProductsListProps extends Omit<ComponentProps<'ul'>, 'children'> {
    children: Product[];
}

const ProductsList = ({ children, className, ...rest }: ProductsListProps) => {
  return (
    <ul className={cn(className, 'flex flex-col gap-3')} {...rest}>
      {children.map((row) => (
        <li key={row.id}>
          <ProductCard product={row} />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;