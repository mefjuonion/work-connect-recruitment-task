import { Badge } from '@/shared/ui/badge';

type ProductStatusBadgeProps = {
  available: boolean;
};

export function ProductStatusBadge({ available }: ProductStatusBadgeProps) {
  return (
    <Badge variant={available ? 'success' : 'destructive'}>
      {available ? 'Dostępny' : 'Niedostępny'}
    </Badge>
  );
}
