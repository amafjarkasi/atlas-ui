/**
 * @atlas/ui — FilterableTable
 *
 * A searchable, paginated table with removable active-filter chips (composes
 * `FilterBar` + `PaginatedTable` + `Badge`).
 *
 * @example
 *   <FilterableTable columns={cols} rows={rows} searchValue={q} onSearchChange={setQ} activeFilters={[{ label: 'Unread' }]} />
 */
import type { ReactNode } from 'react'
import { surface, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { FilterBar } from '../display/FilterBar'
import { PaginatedTable } from '../display/PaginatedTable'
import type { DataTableColumn } from '../display/DataTable'

export interface FilterableTableProps {
  columns: DataTableColumn[]
  rows: Record<string, ReactNode>[]
  searchValue?: string
  onSearchChange?: (value: string) => void
  page?: number
  onPageChange?: (page: number) => void
  pageSize?: number
  activeFilters?: { label: string; onRemove?: () => void }[]
}

export function FilterableTable({
  columns,
  rows,
  searchValue,
  onSearchChange,
  page = 0,
  onPageChange,
  pageSize = 20,
  activeFilters = [],
}: FilterableTableProps) {
  const filtered = searchValue
    ? rows.filter((r) =>
        Object.values(r).some(
          (v) => (typeof v === 'string' || typeof v === 'number') && String(v).toLowerCase().includes((searchValue ?? '').toLowerCase()),
        ),
      )
    : rows

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {onSearchChange ? <FilterBar searchValue={searchValue} onSearchChange={onSearchChange} /> : null}
        {activeFilters.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
            {activeFilters.map((f, i) => (
              <div
                key={i}
                onClick={f.onRemove}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRadius: 12,
                  backgroundColor: surface.selected,
                  cursor: 'pointer',
                }}
              >
                <text style={{ fontSize: 11, color: text.secondary, fontFamily: FONT }}>{f.label}</text>
                <Icon name="x" size={10} color={text.muted} />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <PaginatedTable columns={columns} rows={filtered} page={page} onPageChange={onPageChange} pageSize={pageSize} />
    </div>
  )
}
