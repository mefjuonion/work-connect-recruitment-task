import type { Product } from '@/shared/stores/products-store';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { ProductStatusBadge } from './product-status-badge';
import { formatPrice } from './products';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription>{product.sku}</CardDescription>
        <CardAction>
          <ProductStatusBadge available={product.isAvailable} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
          <div>
            <dt className="text-sm text-muted-foreground">Kategoria</dt>
            <dd className="mt-1">{product.category}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Cena Brutto</dt>
            <dd className="mt-1 font-semibold whitespace-nowrap">
              {formatPrice(product.grossPrice)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Magazyn</dt>
            <dd className="mt-1">{product.stock ?? '—'}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
