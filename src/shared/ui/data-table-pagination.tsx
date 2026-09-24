'use client';

import type { MouseEvent, ReactNode } from 'react';

import type { PaginationModel } from '@/shared/hooks/use-pagination';
import { cn } from '@/shared/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';

type DataTablePaginationProps = {
  pagination: PaginationModel;
  summary?: ReactNode;
  className?: string;
};

export function DataTablePagination({
  pagination,
  summary,
  className,
}: DataTablePaginationProps) {
  const { page, totalPages, canPrevious, canNext, setPage } = pagination;

  const goTo = (target: number) => (event: MouseEvent) => {
    event.preventDefault();
    setPage(target);
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 py-4 md:flex-row md:justify-between md:border-t md:bg-muted/30 md:px-4',
        className
      )}
    >
      <p className="text-xs whitespace-nowrap text-muted-foreground">
        Strona {page} z {totalPages}
        {summary && <> · {summary}</>}
      </p>
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              text="Wstecz"
              href="#"
              onClick={goTo(page - 1)}
              aria-disabled={!canPrevious}
              className={cn(
                !canPrevious && 'pointer-events-none text-muted-foreground'
              )}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                isActive={n === page}
                href="#"
                onClick={goTo(n)}
                className={cn(
                  n === page &&
                    'border-transparent bg-brand text-white hover:bg-brand/90 hover:text-white'
                )}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              text="Dalej"
              href="#"
              onClick={goTo(page + 1)}
              aria-disabled={!canNext}
              className={cn(
                !canNext && 'pointer-events-none text-muted-foreground'
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
