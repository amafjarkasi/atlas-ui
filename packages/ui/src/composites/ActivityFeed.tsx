/**
 * @atlas/ui — ActivityFeed
 *
 * An infinite-scrolling reverse-chronological event stream (composes
 * `InfiniteScroll` + `Avatar` + `RelativeTime`).
 *
 * @example
 *   <ActivityFeed events={events} onLoadMore={fetchMore} loading={loading} hasMore={hasMore} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Avatar } from '../atoms/Avatar'
import { InfiniteScroll } from '../layout/InfiniteScroll'
import { RelativeTime } from '../display/RelativeTime'

export interface ActivityEvent {
  id: string
  title: string
  time: Date | string | number
  actor?: { letter?: string; src?: string }
}

export interface ActivityFeedProps {
  events: ActivityEvent[]
  onLoadMore?: () => void
  loading?: boolean
  hasMore?: boolean
}

export function ActivityFeed({ events, onLoadMore, loading = false, hasMore = true }: ActivityFeedProps) {
  return (
    <InfiniteScroll
      items={events}
      onLoadMore={onLoadMore ?? (() => {})}
      loading={loading}
      hasMore={hasMore}
      estimatedItemHeight={48}
      renderItem={(e) => (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, paddingTop: 6, paddingBottom: 6, alignItems: 'flex-start' }}>
          <Avatar letter={e.actor?.letter ?? 'A'} src={e.actor?.src} size={24} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT }}>{e.title}</text>
            <RelativeTime value={e.time} />
          </div>
        </div>
      )}
    />
  )
}
