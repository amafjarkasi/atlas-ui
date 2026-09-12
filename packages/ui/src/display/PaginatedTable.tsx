/**
 * @atlas/ui — PaginatedTable
 *
 * `DataTable` plus a pagination footer (composes `DataTable` + `Button`).
 *
 * @example
 *   <PaginatedTable columns={cols} rows={rows} pageSize={25} page={p} onPageChange={setP} />
 */
import type { ReactNode } from 'react'
import { text } from '../tokens'
import { FONT } from '../tokens'
import { DataTable, type DataTableColumn } from './DataTable'
import { Button } from '../atoms/Button'

export interface PaginatedTableProps {
  columns: DataTableColumn[]
  rows: Record<string, ReactNode>[]
  pageSize?: number
  page?: number
  onPageChange?: (page: number) => void
}

export function PaginatedTable({ columns, rows, pageSize = 20, page = 0, onPageChange }: PaginatedTableProps) {
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const slice = rows.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <DataTable columns={columns} rows={slice} />

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <text style={{ fontSize: 11.5, color: text.muted, fontFamily: FONT }}>{rows.length} rows</text>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Button size="sm" variant="ghost" disabled={page === 0} onClick={() => onPageChange?.(Math.max(0, page - 1))}>
            Prev
          </Button>
          <text style={{ fontSize: 11.5, color: text.secondary, fontFamily: FONT }}>
            {page + 1} / {totalPages}
          </text>
          <Button size="sm" variant="ghost" disabled={page >= totalPages - 1} onClick={() => onPageChange?.(Math.min(totalPages - 1, page + 1))}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
