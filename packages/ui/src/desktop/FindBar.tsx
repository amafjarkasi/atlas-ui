/** @atlas/ui — FindBar — search bar with match counter + prev/next (wire to useTextSearch). */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { IconButton } from '../atoms/IconButton'
import { Kbd } from '../atoms/Kbd'
import { SearchInput } from '../inputs/SearchInput'

export interface FindBarProps {
  query: string
  onQueryChange?: (query: string) => void
  index?: number
  total?: number
  onNext?: () => void
  onPrev?: () => void
  onClose?: () => void
}

export function FindBar({ query, onQueryChange, index = 0, total = 0, onNext, onPrev, onClose }: FindBarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, width: 360 }}>
      <SearchInput value={query} onChange={onQueryChange} placeholder="Find…" />
      <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT, minWidth: 34 }}>{total > 0 ? `${index + 1}/${total}` : '0/0'}</text>
      <IconButton icon="chevronUp" size={12} onClick={onPrev} />
      <IconButton icon="chevronDown" size={12} onClick={onNext} />
      <Kbd keys="Esc" />
      {onClose ? <IconButton icon="x" size={12} onClick={onClose} /> : null}
    </div>
  )
}
