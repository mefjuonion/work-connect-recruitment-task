import { parseAsInteger, useQueryState } from 'nuqs';

export type UsePaginationOptions = {
  pageSize: number;
  totalItems: number;
  pageParam?: string;
};

export type PaginationModel = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  canPrevious: boolean;
  canNext: boolean;
  setPage: (page: number) => void;
};

export function usePagination({
  pageSize,
  totalItems,
  pageParam = 'page',
}: UsePaginationOptions) {
  const [requestedPage, setPageInUrl] = useQueryState(
    pageParam,
    parseAsInteger.withDefault(1)
  );

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(1, requestedPage), totalPages);

  const setPage = (target: number) => {
    if (target >= 1 && target <= totalPages) void setPageInUrl(target);
  };

  const pagination: PaginationModel = {
    page,
    pageSize,
    totalPages,
    totalItems,
    canPrevious: page > 1,
    canNext: page < totalPages,
    setPage,
  };

  return { requestedPage, pagination };
}
