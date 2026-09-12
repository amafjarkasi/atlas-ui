/**
 * @atlas/ui — TableChrome
 *
 * A full data-table shell: search + column visibility + virtual-free table +
 * summary footer + pagination (composes `DataTable` + `FilterBar` +
 * `ColumnVisibilityMenu` + `SummaryFooter` + `Pagination`, with
 * `usePagination`).
 */
import type { ReactNode } from 'react'
import { FilterBar } from './FilterBar'
import { ColumnVisibilityMenu } from './ColumnVisibilityMenu'
import { DataTable, type DataTableColumn } from './DataTable'
import { SummaryFooter } from './SummaryFooter'
import { Pagination } from './Pagination'
import { usePagination } from '../hooks/usePagination'

export interface TableChromeProps {
  columns: DataTableColumn[]
  rows: Record<string, ReactNode>[]
  searchValue?: string
  onSearchChange?: (value: string) => void
  hidden?: string[]
  onHiddenChange?: (hidden: string[]) => void
  summaryValues?: Record<string, ReactNode>
  summaryLabel?: string
  pageSize?: number
}

export function TableChrome({ columns, rows, searchValue, onSearchChange, hidden, onHiddenChange, summaryValues, summaryLabel, pageSize = 20 }: TableChromeProps) {
  const filtered = searchValue
    ? rows.filter((r) =>
        Object.values(r).some((v) => (typeof v === 'string' || typeof v === 'number') && String(v).toLowerCase().includes((searchValue ?? '').toLowerCase())),
      )
    : rows

  const pag = usePagination({ totalItems: filtered.length, pageSize })
  const slice = filtered.slice(pag.page * pageSize, (pag.page + 1) * pageSize)
  const visibleColumns = hidden ? columns.filter((c) => !hidden.includes(c.key)) : columns

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {onSearchChange ? <div style={{ flexGrow: 1, maxWidth: 320 }}><FilterBar searchValue={searchValue} onSearchChange={onSearchChange} /></div> : null}
        <div style={{ flexGrow: 1 }} />
        {onHiddenChange ? <ColumnVisibilityMenu columns={columns} hidden={hidden ?? []} onChange={onHiddenChange} /> : null}
      </div>

      <DataTable columns={visibleColumns} rows={slice} />

      {summaryValues ? <SummaryFooter columns={visibleColumns} values={summaryValues} label={summaryLabel} /> : null}

      <Pagination page={pag.page} totalPages={pag.totalPages} onPageChange={pag.goTo} totalItems={filtered.length} />
    </div>
  )
}
