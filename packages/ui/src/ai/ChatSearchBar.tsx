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
      <text style={{ fontSize: 11, color: textTokens.muted, fontFamily: FONT, whiteSpace: 'nowrap' }}>
        {total > 0 ? `${index + 1}/${total}` : '0/0'}
      </text>
      <IconButton icon="chevronUp" size={12} onClick={onPrev} />
      <IconButton icon="chevronDown" size={12} onClick={onNext} />
      {onClear ? (
        <div onClick={onClear} style={{ cursor: 'pointer', padding: 3 }}>
          <Icon name="x" size={12} color={textTokens.muted} />
        </div>
      ) : null}
    </div>
  )
}
