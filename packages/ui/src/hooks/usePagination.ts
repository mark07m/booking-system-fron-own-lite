"use client";

import { useMemo, useState } from "react";

interface UsePaginationOptions {
  pageSize?: number;
}

interface UsePaginationReturn<T> {
  page: number;
  setPage: (page: number) => void;
  pages: number;
  total: number;
  data: T[];
}

export function usePagination<T>(
  rows: T[], 
  pageSize = 5
): UsePaginationReturn<T> {
  const [page, setPage] = useState(1);
  const total = rows.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  
  const data = useMemo(() => 
    rows.slice((page - 1) * pageSize, page * pageSize), 
    [rows, page, pageSize]
  );

  return { page, setPage, pages, total, data };
}
