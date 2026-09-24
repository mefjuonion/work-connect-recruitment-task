import type { TableModel } from '@/shared/hooks/use-table';
import { cn } from '@/shared/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

type DataTableProps<TData> = {
  table: TableModel<TData>;
  className?: string;
};

export function DataTable<TData>({
  table,
  className,
}: DataTableProps<TData>) {
  return (
    <div className={className}>
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent">
            {table.headers.map((header) => (
              <TableHead
                key={header.id}
                className={cn(
                  'px-4 leading-normal text-muted-foreground',
                  header.className
                )}
              >
                {header.content}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.rows.map((row) => (
            <TableRow key={row.id}>
              {row.cells.map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn('h-12 px-4', cell.className)}
                >
                  {cell.content}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
