/**
 * @atlas/ui — KpiGrid
 *
 * A responsive row/grid of `StatCard`s.
 *
 * @example
 *   <KpiGrid items={[{ label: 'Revenue', value: '$12.4k', delta: 8 }, { label: 'Spend', value: '$2.1k', delta: -18 }]} />
 */
import { StatCard, type StatCardProps } from '../display/StatCard'

export interface KpiGridProps {
  items: StatCardProps[]
}

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      {items.map((it, i) => (
        <div key={i} style={{ flexGrow: 1, flexBasis: 200, minWidth: 160 }}>
          <StatCard {...it} />
        </div>
      ))}
    </div>
  )
}
