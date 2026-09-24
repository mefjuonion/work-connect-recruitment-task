'use client';

import { PRODUCTS_PER_PAGE } from '@/shared/CONSTANTS';
import COPY from '@/shared/copy/products-feed';
import { usePagination } from '@/shared/hooks/use-pagination';
import { useProductsStore } from '@/shared/stores/products-store';
import { DataTablePagination } from '@/shared/ui/data-table-pagination';

import AddProductDialog from '../add-product-dialog/add-product-dialog';
import ProductsList from './products-list';
import ProductsTable from './products-table';

const ProductsFeed = () => {
  const productsPages = useProductsStore((state) => state.productsPages);
  const products = useProductsStore((state) => state.products);

  const { requestedPage, pagination } = usePagination({
    pageSize: PRODUCTS_PER_PAGE,
    totalItems: products.length,
  });
  const currentProductsList = productsPages[requestedPage-1];

  return (
    <section>
      <header className="flex items-center justify-between gap-4 pb-6">
        <div>
          <h1 className="text-xl leading-normal font-semibold">{COPY.title}</h1>
          <p className="text-sm leading-normal text-muted-foreground">{COPY.subtitle}</p>
        </div>

        <AddProductDialog />
      </header>
      
      <div className="md:overflow-hidden md:rounded-xl md:border md:bg-background">
        <ProductsList className="md:hidden">{currentProductsList}</ProductsList>
        <ProductsTable className="hidden md:block">{currentProductsList}</ProductsTable>
      
        <DataTablePagination
          pagination={pagination}
          summary={`${products.length} produktów`}
        />
      </div>
    </section>
  );
};

export default ProductsFeed;