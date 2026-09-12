/**
 * @atlas/ui — ChatSearchBar
 *
 * Search-within-conversation bar: match counter + prev/next + close. Wire it to
 * `useTextSearch` on the scroller at the app level.
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { IconButton } from '../atoms/IconButton'
import { SearchInput } from '../inputs/SearchInput'

export interface ChatSearchBarProps {
  query: string
  onQueryChange?: (query: string) => void
  index?: number
  total?: number
  onNext?: () => void
  onPrev?: () => void
  onClear?: () => void
}

export function ChatSearchBar({ query, onQueryChange, index = 0, total = 0, onNext, onPrev, onClear }: ChatSearchBarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, padding: 6 }}>
      <div style={{ flexGrow: 1 }}>
        <SearchInput value={query} onChange={onQueryChange} onClear={onClear} placeholder="Search conversation…" />
      </div>
      <div style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3, borderRadius: 10, backgroundColor: '#27272A', display: 'flex', alignItems: 'center' }}>
        <text style={{ fontSize: 11, fontWeight: 500, color: textTokens.secondary, fontFamily: FONT }}>
          {total > 0 ? `${index + 1} of ${total}` : '0 results'}
        </text>
      </div>
      <IconButton icon="chevronUp" size={13} pad={24} onClick={onPrev} />
      <IconButton icon="chevronDown" size={13} pad={24} onClick={onNext} />
      {onClear ? (
        <IconButton icon="x" size={12} pad={24} onClick={onClear} />
      ) : null}
    </div>
  )
}
