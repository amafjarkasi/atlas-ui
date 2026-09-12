/**
 * @atlas/ui — StackedBarChart
 *
 * A bar chart where each bar is divided into stacked colored segments
 * (e.g. sent vs received per day).
 *
 * @example
 *   <StackedBarChart data={[{ label: 'Mon', segments: [{ value: 5, color: '#3B82F6' }, { value: 3, color: '#22C55E' }] }]} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'

export interface StackedBarSegment {
  value: number
  color: string
}

export interface StackedBarDatum {
  label?: string
  segments: StackedBarSegment[]
}

export interface StackedBarChartProps {
  data: StackedBarDatum[]
  width?: number
  height?: number
  barGap?: number
}

export function StackedBarChart({ data, width = 240, height = 140, barGap = 8 }: StackedBarChartProps) {
  const n = data.length
  const maxTotal = Math.max(...data.map((d) => d.segments.reduce((s, x) => s + x.value, 0)), 1)
  const hasLabels = data.some((d) => d.label)
  const labelH = hasLabels ? 16 : 0
  const plotH = height - labelH
  const barW = n > 0 ? Math.max(2, (width - barGap * (n - 1)) / n) : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: barGap, width, height: plotH }}>
        {data.map((d, i) => {
          const total = d.segments.reduce((s, x) => s + x.value, 0)
          const h = Math.max(2, (total / maxTotal) * plotH)
          return (
            <div key={i} style={{ width: barW, flexShrink: 0, height: plotH, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div
                style={{
                  width: barW,
                  height: h,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  overflow: 'hidden',
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                }}
              >
                {d.segments.map((seg, j) => (
                  <div
                    key={j}
                    style={{ width: '100%', height: Math.max(1, (seg.value / (total || 1)) * h), backgroundColor: seg.color }}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {hasLabels ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: barGap, width, height: labelH, alignItems: 'flex-start' }}>
          {data.map((d, i) => (
            <div key={i} style={{ width: barW, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
              <text style={{ fontSize: 9.5, color: text.muted, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {d.label ?? ''}
              </text>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
