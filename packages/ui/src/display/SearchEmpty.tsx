/**
 * @atlas-ui — SearchEmpty
 *
 * "No results for query" state wired to a search field (composes `SearchInput`
 * + `EmptyState`).
 */
import { SearchInput } from '../inputs/SearchInput'
import { EmptyState } from './EmptyState'

export interface SearchEmptyProps {
  query: string
  onQueryChange?: (query: string) => void
  searchPlaceholder?: string
  onClear?: () => void
}

export function SearchEmpty({ query, onQueryChange, searchPlaceholder, onClear }: SearchEmptyProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <SearchInput value={query} onChange={onQueryChange} onClear={onClear} placeholder={searchPlaceholder ?? 'Search…'} />
      <EmptyState
        icon="search"
        title="No results"
        description={query ? `Nothing matches "${query}". Try a different search.` : 'Type to search'}
      />
    </div>
  )
}
