/**
 * @atlas/ui — VirtualList
 *
 * A generic wrapper over the native `<virtual-list>` with an items/render-prop
 * API, an optional footer row, and an `onVisibleRange` passthrough (for
 * InfiniteScroll-style auto-load).
 *
 * @example
 *   <VirtualList items={threads} estimatedItemHeight={58} renderItem={(t) => <ThreadRow thread={t} />} />
 */
import type { ReactNode } from 'react'

export interface VirtualListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  estimatedItemHeight?: number
  overdraw?: number
  followTail?: boolean
  height?: number | string
  /** Extra row rendered after all items (e.g. a loading indicator). */
  footer?: ReactNode
  /** Fires when the visible item window changes; `endIndex` is exclusive. */
  onVisibleRange?: (range: { startIndex?: number; endIndex?: number }) => void
}

export function VirtualList<T>({
  items,
  renderItem,
  estimatedItemHeight = 58,
  overdraw = 2,
  followTail = false,
  height = '100%',
  footer,
  onVisibleRange,
}: VirtualListProps<T>) {
  return (
    <virtual-list
      estimatedItemHeight={estimatedItemHeight}
      overdraw={overdraw}
      followTail={followTail}
      onVisibleRange={onVisibleRange as any}
      style={{ height, flexGrow: 1 }}
    >
      {items.map((item, i) => (
        <div key={i}>{renderItem(item, i)}</div>
      ))}
      {footer}
    </virtual-list>
  )
}
