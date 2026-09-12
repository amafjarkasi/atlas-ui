/**
 * @atlas/ui — InfiniteScroll
 *
 * An auto-loading virtual list. Composes `VirtualList`; when the native
 * `onVisibleRange` reaches the end of the loaded items it calls `onLoadMore`.
 * A loading row is appended while fetching.
 *
 * @example
 *   <InfiniteScroll items={threads} renderItem={(t) => <ThreadRow thread={t} />}
 *     onLoadMore={fetchMore} loading={loading} hasMore={hasMore} />
 */
import { useEffect, useRef, type ReactNode } from 'react'
import { VirtualList } from './VirtualList'
import { Spinner } from '../effects/Spinner'

export interface InfiniteScrollProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  onLoadMore: () => void
  loading?: boolean
  hasMore?: boolean
  estimatedItemHeight?: number
  height?: number | string
  /** How many items from the end before triggering a load. */
  threshold?: number
}

export function InfiniteScroll<T>({
  items,
  renderItem,
  onLoadMore,
  loading = false,
  hasMore = true,
  estimatedItemHeight = 58,
  height = '100%',
  threshold = 2,
}: InfiniteScrollProps<T>) {
  const pending = useRef(false)

  useEffect(() => {
    if (!loading) pending.current = false
  }, [loading])

  const handleVisible = (range: { startIndex?: number; endIndex?: number }) => {
    if (loading || !hasMore || pending.current) return
    if (range.endIndex !== undefined && range.endIndex >= items.length - threshold) {
      pending.current = true
      onLoadMore()
    }
  }

  return (
    <VirtualList<T>
      items={items}
      renderItem={renderItem}
      estimatedItemHeight={estimatedItemHeight}
      height={height}
      onVisibleRange={handleVisible}
      footer={
        loading ? (
          <div style={{ padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size={14} />
          </div>
        ) : null
      }
    />
  )
}
