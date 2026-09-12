/**
 * @atlas/ui — FilterBar
 *
 * A horizontal filter toolbar: a search field plus any additional filter
 * controls passed as children (Select, ToggleGroup, DatePicker, …).
 *
 * @example
 *   <FilterBar searchValue={q} onSearchChange={setQ}>
 *     <SegmentedControl options={viewOptions} value={view} onChange={setView} />
 *   </FilterBar>
 */
import type { ReactNode } from 'react'
import { SearchInput } from '../inputs/SearchInput'

export interface FilterBarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  children?: ReactNode
}

export function FilterBar({ searchValue, onSearchChange, searchPlaceholder, children }: FilterBarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {onSearchChange !== undefined ? (
        <div style={{ width: 220, flexShrink: 0 }}>
          <SearchInput value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder ?? 'Filter…'} />
        </div>
      ) : null}
      {children}
    </div>
  )
}
