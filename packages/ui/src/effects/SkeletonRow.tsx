/**
 * @atlas/ui — SkeletonTimelineRow
 *
 * A timeline-row shaped loading placeholder: a circular avatar skeleton next to
 * a column of text-line skeletons.
 *
 * @example
 *   <SkeletonTimelineRow avatarSize={32} lines={2} />
 */
import { Skeleton } from './Skeleton'

export interface SkeletonTimelineRowProps {
  avatarSize?: number
  lines?: number
  width?: number | string
}

export function SkeletonTimelineRow({ avatarSize = 32, lines = 2, width = '100%' }: SkeletonTimelineRowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 10, paddingBottom: 10, width }}>
      <Skeleton width={avatarSize} height={avatarSize} borderRadius={avatarSize / 2} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexGrow: 1 }}>
        {Array.from({ length: lines }, (_, i) => (
          <Skeleton
            key={i}
            width={i === lines - 1 ? '55%' : '90%'}
            height={10}
            borderRadius={4}
          />
        ))}
      </div>
    </div>
  )
}
