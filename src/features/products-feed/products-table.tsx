import { ComponentProps } from 'react';

import COPY from '@/shared/copy/product-base-info';
import { type ColumnDef, useTable } from '@/shared/hooks/use-table';
import { type Product } from '@/shared/stores/products-store';
import { DataTable } from '@/shared/ui/data-table';

import { ProductStatusBadge } from './product-status-badge';
import { formatPrice } from './products';

const columns: ColumnDef<Product>[] = [
  {
    id: 'name',
    header: 'Nazwa',
    cell: (product) => product.name,
    cellClassName: 'font-medium',
  },
  {
    id: 'sku',
    header: 'SKU',
    cell: (product) => product.sku,
    cellClassName: 'text-xs text-muted-foreground',
  },
  {
    id: 'category',
    header: 'Kategoria',
    cell: (product) => COPY.options.category[product.category],
    cellClassName: 'text-muted-foreground',
  },
  {
    id: 'grossPrice',
    header: 'Cena Brutto',
    cell: (product) => formatPrice(product.grossPrice, product.currency),
    cellClassName: 'font-semibold',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (product) => <ProductStatusBadge available={product.isAvailable} />,
  },
  {
    id: 'stock',
    header: 'Magazyn',
    cell: (product) => product.stock ?? '—',
  },
];

export interface ProductsTableProps extends Omit<ComponentProps<'div'>, 'children'> {
  children: Product[];
}

const ProductsTable = ({ children, ...rest }: ProductsTableProps) => {
  const table = useTable<Product>({
    data: children,
    columns,
    getRowId: product => product.id
  });

  return (
    <DataTable table={table} {...rest}/>
  );
};

export default ProductsTable;
