/**
 * @atlas/ui — SearchableList
 *
 * A filterable virtual list (composes `SearchInput` + `VirtualList`).
 *
 * @example
 *   <SearchableList items={contacts} getLabel={(c) => c.name} renderItem={(c) => <ContactRow c={c} />} />
 */
import { useState, type ReactNode } from 'react'
import { SearchInput } from '../inputs/SearchInput'
import { VirtualList } from '../layout/VirtualList'

export interface SearchableListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  getLabel: (item: T) => string
  placeholder?: string
  estimatedItemHeight?: number
  height?: number | string
}

export function SearchableList<T>({
  items = [],
  renderItem,
  getLabel,
  placeholder = 'Search…',
  estimatedItemHeight = 58,
  height = '100%',
}: SearchableListProps<T>) {
  const [query, setQuery] = useState('')
  const safeItems = items ?? []
  const filtered = safeItems.filter((i) => {
    const lbl = getLabel ? getLabel(i) : String(i ?? '')
    return lbl.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height, width: '100%' }}>
      <SearchInput value={query} onChange={setQuery} placeholder={placeholder} />
      <VirtualList<T> items={filtered} renderItem={(it) => renderItem(it)} estimatedItemHeight={estimatedItemHeight} height="100%" />
    </div>
  )
}
