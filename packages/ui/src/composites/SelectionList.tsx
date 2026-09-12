/**
 * @atlas/ui — SelectionList
 *
 * A virtualized checklist with search, select-all, and a bulk-actions bar
 * (composes `SearchableList`-style search + `Checkbox` + `BulkActionsBar`).
 *
 * @example
 *   <SelectionList items={rows} getKey={(r) => r.id} getLabel={(r) => r.title} selected={sel} onSelectionChange={setSel} renderItem={(r) => <Row r={r} />} />
 */
import { useState, type ReactNode } from 'react'
import { text } from '../tokens'
import { FONT } from '../tokens'
import { SearchInput } from '../inputs/SearchInput'
import { Checkbox } from '../inputs/Checkbox'
import { VirtualList } from '../layout/VirtualList'
import { BulkActionsBar } from '../display/BulkActionsBar'
import { useMultiSelect } from '../hooks/useMultiSelect'

export interface SelectionListProps<T> {
  items: T[]
  getKey: (item: T) => string
  getLabel: (item: T) => string
  renderItem: (item: T) => ReactNode
  /** Omit `onSelectionChange` for uncontrolled selection. */
  selected?: string[]
  onSelectionChange?: (keys: string[]) => void
  estimatedItemHeight?: number
  height?: number | string
}

export function SelectionList<T>({
  items,
  getKey,
  getLabel,
  renderItem,
  selected: selectedProp,
  onSelectionChange,
  estimatedItemHeight = 44,
  height = '100%',
}: SelectionListProps<T>) {
  const [query, setQuery] = useState('')
  const internalSel = useMultiSelect({ initial: selectedProp ?? [] })

  const controlled = onSelectionChange !== undefined
  const selected = controlled ? (selectedProp ?? []) : internalSel.selected
  const commit = (keys: string[]) => {
    if (controlled) onSelectionChange?.(keys)
    else internalSel.setSelected(keys)
  }

  const filtered = items.filter((i) => getLabel(i).toLowerCase().includes(query.toLowerCase()))

  const allSelected = filtered.length > 0 && filtered.every((i) => selected.includes(getKey(i)))

  const toggleAll = () => {
    const filteredKeys = new Set(filtered.map((i) => getKey(i)))
    const next = allSelected ? selected.filter((k) => !filteredKeys.has(k)) : Array.from(new Set([...selected, ...filteredKeys]))
    commit(next)
  }

  const toggle = (key: string) => commit(selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height, width: '100%' }}>
      <SearchInput value={query} onChange={setQuery} placeholder="Search…" />
      <BulkActionsBar selectedCount={selected.length} onClear={() => commit([])} />

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 4 }}>
        <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
        <text style={{ fontSize: 11.5, color: text.muted, fontFamily: FONT }}>Select all</text>
      </div>

      <VirtualList<T>
        items={filtered}
        estimatedItemHeight={estimatedItemHeight}
        height="100%"
        renderItem={(item) => {
          const key = getKey(item)
          return (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 4, paddingRight: 4 }}>
              <Checkbox checked={selected.includes(key)} onCheckedChange={() => toggle(key)} />
              <div style={{ flexGrow: 1 }}>{renderItem(item)}</div>
            </div>
          )
        }}
      />
    </div>
  )
}
