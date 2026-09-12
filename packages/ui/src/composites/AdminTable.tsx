/**
 * @atlas/ui — AdminTable
 *
 * A full admin grid: filter bar + bulk actions + selection + pagination +
 * optional alert (composes `FilterBar` + `BulkActionsBar` + `DataTable`).
 *
 * @example
 *   <AdminTable columns={cols} rows={rows} selectable selected={sel} onSelectionChange={setSel} onSearchChange={setQ} />
 */
import type { ReactNode } from 'react'
import { text } from '../tokens'
import { FONT } from '../tokens'
import { FilterBar } from '../display/FilterBar'
import { BulkActionsBar } from '../display/BulkActionsBar'
import { DataTable, type DataTableColumn } from '../display/DataTable'
import { Alert } from '../display/Alert'
import { Button } from '../atoms/Button'

export interface AdminTableProps {
  columns: DataTableColumn[]
  rows: Record<string, ReactNode>[]
  selected?: number[]
  onSelectionChange?: (indices: number[]) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  page?: number
  onPageChange?: (page: number) => void
  pageSize?: number
  actions?: ReactNode
  alert?: { title?: string; description?: string }
}

export function AdminTable({
  columns,
  rows,
  selected = [],
  onSelectionChange,
  searchValue,
  onSearchChange,
  page = 0,
  onPageChange,
  pageSize = 20,
  actions,
  alert,
}: AdminTableProps) {
  const filtered = searchValue
    ? rows.filter((r) =>
        Object.values(r).some(
          (v) => (typeof v === 'string' || typeof v === 'number') && String(v).toLowerCase().includes((searchValue ?? '').toLowerCase()),
        ),
      )
    : rows

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const slice = filtered.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      {alert ? <Alert variant="info" title={alert.title} description={alert.description} /> : null}
      {onSearchChange ? <FilterBar searchValue={searchValue} onSearchChange={onSearchChange} /> : null}
      {onSelectionChange ? (
        <BulkActionsBar selectedCount={selected.length} onClear={() => onSelectionChange([])} actions={actions} />
      ) : null}

      <DataTable columns={columns} rows={slice} selectable={Boolean(onSelectionChange)} selected={selected} onSelectionChange={onSelectionChange} />

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <text style={{ fontSize: 11.5, color: text.muted, fontFamily: FONT }}>{filtered.length} rows</text>
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
