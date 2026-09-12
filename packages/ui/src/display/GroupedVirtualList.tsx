/**
 * @atlas/ui — GroupedVirtualList
 *
 * A virtualized list with section headers (composes `VirtualList`). Groups are
 * flattened to header/item entries and rendered by one render prop.
 *
 * @example
 *   <GroupedVirtualList groups={[{ label: 'Today', items: […] }, { label: 'Yesterday', items: […] }]} renderItem={(t) => <Row t={t} />} />
 */
import type { ReactNode } from 'react'
import { VirtualList } from '../layout/VirtualList'
import { surface, text } from '../tokens'
import { FONT } from '../tokens'

export interface Group<T> {
  label: string
  items: T[]
}

export interface GroupedVirtualListProps<T> {
  groups: Group<T>[]
  renderItem: (item: T) => ReactNode
  estimatedItemHeight?: number
  height?: number | string
}

type Entry<T> = { kind: 'header'; label: string } | { kind: 'item'; item: T }

export function GroupedVirtualList<T>({
  groups,
  renderItem,
  estimatedItemHeight = 58,
  height = '100%',
}: GroupedVirtualListProps<T>) {
  const entries: Entry<T>[] = groups.flatMap((g) => [
    { kind: 'header' as const, label: g.label },
    ...g.items.map((item) => ({ kind: 'item' as const, item })),
  ])

  return (
    <VirtualList<Entry<T>>
      items={entries}
      estimatedItemHeight={estimatedItemHeight}
      height={height}
      renderItem={(e) =>
        e.kind === 'header' ? (
          <div style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 4, backgroundColor: surface.pill }}>
            <text style={{ fontSize: 11, fontWeight: 600, color: text.muted, fontFamily: FONT }}>
              {e.label.toUpperCase()}
            </text>
          </div>
        ) : (
          renderItem(e.item)
        )
      }
    />
  )
}
