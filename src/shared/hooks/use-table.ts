import type { ReactNode } from 'react';

export type ColumnDef<TData> = {
  id: string;
  header: ReactNode;
  cell: (row: TData) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

export type UseTableOptions<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  getRowId: (row: TData) => string;
};

export type TableCellModel = {
  id: string;
  content: ReactNode;
  className?: string;
};

export type TableRowModel<TData> = {
  id: string;
  original: TData;
  cells: TableCellModel[];
};

export type TableHeaderModel = {
  id: string;
  content: ReactNode;
  className?: string;
};

export type TableModel<TData> = {
  headers: TableHeaderModel[];
  rows: TableRowModel<TData>[];
};

export function useTable<TData>({
  data,
  columns,
  getRowId,
}: UseTableOptions<TData>): TableModel<TData> {
  const headers = columns.map((column) => ({
    id: column.id,
    content: column.header,
    className: column.headerClassName,
  }));

  const rows = data.map((row) => ({
    id: getRowId(row),
    original: row,
    cells: columns.map((column) => ({
      id: column.id,
      content: column.cell(row),
      className: column.cellClassName,
    })),
  }));

  return { headers, rows };
}
