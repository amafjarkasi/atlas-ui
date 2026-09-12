/**
 * @atlas/ui — AllocationDonut
 *
 * A portfolio allocation donut with a legend (composes `Chart` + `DonutChart`).
 *
 * @example
 *   <AllocationDonut title="Portfolio" segments={[{ label: 'Equities', value: 60, color: '#3B82F6' }, …]} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Chart } from '../dataviz/Chart'
import { DonutChart, type DonutSegment } from '../dataviz/DonutChart'

export interface AllocationSegment extends DonutSegment {
  label: string
}

export interface AllocationDonutProps {
  segments: AllocationSegment[]
  title?: string
  centerLabel?: string
}

export function AllocationDonut({ segments, title = 'Allocation', centerLabel }: AllocationDonutProps) {
  const total = segments.reduce((s, x) => s + x.value, 0)

  return (
    <Chart title={title} legend={segments.map((s) => ({ label: s.label, color: s.color }))}>
      <DonutChart
        segments={segments}
        centerLabel={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <text style={{ fontSize: 16, fontWeight: 700, color: text.primary, fontFamily: FONT }}>
              {centerLabel ?? `${Math.round(total)}`}
            </text>
            <text style={{ fontSize: 9.5, color: text.muted, fontFamily: FONT }}>total</text>
          </div>
        }
      />
    </Chart>
  )
}
