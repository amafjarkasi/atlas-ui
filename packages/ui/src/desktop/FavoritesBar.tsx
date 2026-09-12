/** @atlas/ui — FavoritesBar — horizontal pinned items with an overflow affordance. */
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms/Icon'

export interface FavoriteItem {
  id: string
  label: string
  icon?: IconName
}

export interface FavoritesBarProps {
  items: FavoriteItem[]
  onSelect?: (id: string) => void
}

export function FavoritesBar({ items, onSelect }: FavoritesBarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 6, overflowX: 'scroll', padding: 6, borderWidth: 1, borderColor: border.subtle, borderRadius: 10, backgroundColor: surface.card, alignItems: 'center' }}>
      {items.map((item) => (
        <div key={item.id} onClick={() => onSelect?.(item.id)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 14, cursor: 'pointer', backgroundColor: surface.pill, hover: { backgroundColor: surface.selected } }}>
          {item.icon ? <Icon name={item.icon} size={11} color={t.muted} /> : null}
          <text style={{ fontSize: 11, color: t.secondary, fontFamily: FONT, whiteSpace: 'nowrap' }}>{item.label}</text>
        </div>
      ))}
    </div>
  )
}
