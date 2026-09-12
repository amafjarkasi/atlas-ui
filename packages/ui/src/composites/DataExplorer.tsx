/**
 * @atlas/ui — DataExplorer
 *
 * A filterable, paginated table with a side detail pane showing the selected
 * row as JSON (composes `FilterBar` + `DetailPanel` + `JsonTree`).
 *
 * @example
 *   <DataExplorer rows={rows} searchValue={q} onSearchChange={setQ} />
 */
import { useState, type ReactNode } from 'react'
import { text } from '../tokens'
import { FONT } from '../tokens'
import { FilterBar } from '../display/FilterBar'
import { DetailPanel } from '../display/DetailPanel'
import { JsonTree } from '../display/JsonTree'

export interface DataExplorerProps {
  rows: Record<string, ReactNode>[]
  firstColumnKey?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  height?: number | string
}

export function DataExplorer({ rows, firstColumnKey, searchValue, onSearchChange, height = '100%' }: DataExplorerProps) {
  const [selected, setSelected] = useState<Record<string, ReactNode> | null>(null)

  const filtered = searchValue
    ? rows.filter((r) =>
        Object.values(r).some(
          (v) => (typeof v === 'string' || typeof v === 'number') && String(v).toLowerCase().includes((searchValue ?? '').toLowerCase()),
        ),
      )
    : rows

  const label = (row: Record<string, ReactNode>): string => {
    const keys = Object.keys(row)
    const k = firstColumnKey ?? keys[0] ?? ''
    const v = row[k]
    return typeof v === 'string' || typeof v === 'number' ? String(v) : '(row)'
  }

  const toPlain = (row: Record<string, ReactNode>): Record<string, unknown> => {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(row)) out[k] = typeof v === 'string' || typeof v === 'number' ? v : String(v)
    return out
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height, width: '100%' }}>
      {onSearchChange ? <FilterBar searchValue={searchValue} onSearchChange={onSearchChange} /> : null}
      <div style={{ flexGrow: 1, minHeight: 0 }}>
        <DetailPanel
          items={filtered}
          selected={selected}
          onSelect={setSelected}
          renderItem={(r) => (
            <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT, padding: 10 }}>{label(r)}</text>
          )}
          renderDetail={(r) => <JsonTree data={toPlain(r)} />}
        />
      </div>
    </div>
  )
}
