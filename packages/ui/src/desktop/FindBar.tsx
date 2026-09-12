/** @atlas/ui — FindBar — search bar with match counter + prev/next (wire to useTextSearch). */
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { IconButton } from '../atoms/IconButton'
import { Kbd } from '../atoms/Kbd'

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        gap: 6,
        width: 440,
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingRight: 4,
        borderWidth: 1,
        borderColor: border.subtle,
        borderRadius: 8,
        backgroundColor: surface.card,
      }}
    >
      <Icon name="search" size={13} color={t.muted} />
      <input
        value={query}
        placeholder="Find…"
        onChange={(e) => onQueryChange?.(e.value ?? '')}
        style={{ flexGrow: 1, minWidth: 0, fontSize: 12.5, color: t.primary, fontFamily: FONT }}
      />
      <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT, minWidth: 32, textAlign: 'center' }}>
        {total > 0 ? `${index + 1}/${total}` : '0/0'}
      </text>
      <IconButton icon="chevronUp" size={12} pad={22} onClick={onPrev} />
      <IconButton icon="chevronDown" size={12} pad={22} onClick={onNext} />
      <Kbd keys="Esc" />
      {onClose ? <IconButton icon="x" size={12} pad={22} onClick={onClose} /> : null}
    </div>
  )
}
