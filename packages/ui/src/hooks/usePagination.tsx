/**
 * @atlas/ui — usePagination
 *
 * Page state with clamping/prev/next/goTo (used by Pagination / PaginatedTable).
 */
import { useCallback, useState } from 'react'

export interface PaginationOptions {
  totalItems: number
  pageSize: number
  initialPage?: number
}

export interface UsePaginationReturn {
  page: number
  totalPages: number
  isFirst: boolean
  isLast: boolean
  next: () => void
  prev: () => void
  goTo: (page: number) => void
  setPage: (page: number) => void
}

export function usePagination({ totalItems, pageSize, initialPage = 0 }: PaginationOptions): UsePaginationReturn {
  const totalPages = Math.max(1, Math.ceil(totalItems / Math.max(1, pageSize)))
  const [page, setPage] = useState(() => Math.max(0, Math.min(initialPage, totalPages - 1)))

  const goTo = useCallback(
    (p: number) => setPage(Math.max(0, Math.min(totalPages - 1, p))),
    [totalPages],
  )
  const next = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages])
  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])

  return { page, totalPages, isFirst: page === 0, isLast: page >= totalPages - 1, next, prev, goTo, setPage }
}
