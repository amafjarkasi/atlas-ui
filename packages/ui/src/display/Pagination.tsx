/**
 * @atlas/ui — Pagination
 *
 * A standalone prev/page/next control (extracted from `PaginatedTable`).
 *
 * @example
 *   <Pagination page={p} totalPages={12} onPageChange={setP} totalItems={240} />
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Button } from '../atoms/Button'

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange?: (page: number) => void
  totalItems?: number
}

export function Pagination({ page, totalPages, onPageChange, totalItems }: PaginationProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' }}>
      {totalItems !== undefined ? <text style={{ fontSize: 11.5, color: textTokens.muted, fontFamily: FONT }}>{totalItems} items</text> : null}
      <div style={{ flexGrow: 1 }} />
      <Button size="sm" variant="ghost" disabled={page <= 0} onClick={() => onPageChange?.(page - 1)}>
        Prev
      </Button>
      <text style={{ fontSize: 11.5, color: textTokens.secondary, fontFamily: FONT }}>
        {page + 1} / {Math.max(1, totalPages)}
      </text>
      <Button size="sm" variant="ghost" disabled={page >= totalPages - 1} onClick={() => onPageChange?.(page + 1)}>
        Next
      </Button>
    </div>
  )
}
