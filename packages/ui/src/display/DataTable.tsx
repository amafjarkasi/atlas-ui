/**
 * @atlas/ui — DataTable
 *
 * An advanced table built on `DataGrid`: column sorting (click a sortable
 * header) and row selection (optional checkbox column). Column resize is not
 * supported (GPUIX v0.7 has no element-bounds API).
 *
 * @example
 *   <DataTable columns={[{ key: 'name', title: 'Name', sortable: true }, { key: 'count', title: 'Count', sortable: true, sortValue: (r) => Number(r.count) }]}
 *     rows={rows} selectable selected={sel} onSelectionChange={setSel} />
 */
import { useState, type ReactNode } from 'react'
import { surface, border, text, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { useMultiSelect } from '../hooks/useMultiSelect'

export interface DataTableColumn {
  key: string
  title: string
  width?: number
  align?: 'left' | 'right'
  sortable?: boolean
  sortValue?: (row: Record<string, ReactNode>) => string | number
}

export interface DataTableProps {
  columns: DataTableColumn[]
  rows: Record<string, ReactNode>[]
  rowHeight?: number
  onRowClick?: (row: Record<string, ReactNode>) => void
  activeRowIndex?: number
  selectable?: boolean
  selected?: number[]
  onSelectionChange?: (indices: number[]) => void
}

export function DataTable({
  columns,
  rows,
  rowHeight = 34,
  onRowClick,
  activeRowIndex,
  selectable = false,
  selected: selectedProp = [],
  onSelectionChange,
}: DataTableProps) {
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null)
  const internalSel = useMultiSelect({})

  const toggleSort = (col: DataTableColumn) => {
    if (!col.sortable) return
    setSort((s) => (s && s.key === col.key ? (s.dir === 1 ? { key: col.key, dir: -1 } : null) : { key: col.key, dir: 1 }))
  }

  const sortedRows = sort
    ? [...rows].sort((a, b) => {
        const col = columns.find((c) => c.key === sort.key)
        const va = col?.sortValue ? col.sortValue(a) : String(a[sort.key] ?? '')
        const vb = col?.sortValue ? col.sortValue(b) : String(b[sort.key] ?? '')
        const cmp = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb))
        return cmp * sort.dir
      })
    : rows

  const controlledSel = onSelectionChange !== undefined
  const selected = controlledSel ? selectedProp : internalSel.selected.map(Number)
  const commitSel = (next: number[]) => {
    if (controlledSel) onSelectionChange?.(next)
    else internalSel.setSelected(next.map(String))
  }
  const toggleSelect = (i: number) => {
    const has = selected.includes(i)
    commitSel(has ? selected.filter((x) => x !== i) : [...selected, i])
  }

  const selectW = selectable ? 30 : 0

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border.subtle,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 34,
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          borderBottomWidth: 1,
          borderColor: border.subtle,
          backgroundColor: surface.pill,
        }}
      >
        {selectable && <div style={{ width: selectW, flexShrink: 0 }} />}
        {columns.map((c) => (
          <div
            key={c.key}
            onClick={() => toggleSort(c)}
            style={{
              flexGrow: c.width ? 0 : 1,
              flexBasis: c.width,
              width: c.width,
              minWidth: c.width ?? 40,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              cursor: c.sortable ? 'pointer' : 'default',
            }}
          >
            <text
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: text.muted,
                fontFamily: FONT,
                textAlign: c.align ?? 'left',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {c.title}
            </text>
            {c.sortable && sort?.key === c.key && (
              <Icon name={sort.dir === 1 ? 'chevronUp' : 'chevronDown'} size={10} color={text.muted} />
            )}
          </div>
        ))}
      </div>

      {sortedRows.map((row, i) => {
        const isSelected = selected.includes(i)
        return (
          <div
            key={i}
            onClick={() => onRowClick?.(row)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: rowHeight,
              alignItems: 'center',
              paddingLeft: 12,
              paddingRight: 12,
              borderBottomWidth: i < sortedRows.length - 1 ? 1 : 0,
              borderColor: border.subtle,
              backgroundColor: activeRowIndex === i ? surface.selected : isSelected ? semantic.accent + '11' : undefined,
              cursor: onRowClick ? 'pointer' : 'default',
              hover: onRowClick && activeRowIndex !== i ? { backgroundColor: '#FFFFFF08' } : undefined,
            }}
          >
            {selectable && (
              <div onClick={() => toggleSelect(i)} style={{ width: selectW, flexShrink: 0, cursor: 'pointer' }}>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: isSelected ? semantic.accent : border.strong,
                    backgroundColor: isSelected ? semantic.accent : undefined,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && <Icon name="check" size={10} color="#FFFFFF" />}
                </div>
              </div>
            )}

            {columns.map((c) => {
              const cell = row[c.key]
              const isText = typeof cell === 'string' || typeof cell === 'number'
              return (
                <div
                  key={c.key}
                  style={{
                    flexGrow: c.width ? 0 : 1,
                    flexBasis: c.width,
                    width: c.width,
                    minWidth: c.width ?? 40,
                    justifyContent: c.align === 'right' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {isText ? (
                    <text
                      style={{
                        fontSize: 12.5,
                        color: text.secondary,
                        fontFamily: FONT,
                        textAlign: c.align ?? 'left',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {cell}
                    </text>
                  ) : (
                    cell
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
