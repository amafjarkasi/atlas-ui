/**
 * @atlas/ui — BarChart
 *
 * A div-based bar chart with optional value and label rows.
 *
 * @example
 *   <BarChart data={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }]} showValues />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'

export interface BarChartDatum {
  label?: string
  value: number
}

export interface BarChartProps {
  data: BarChartDatum[]
  width?: number
  height?: number
  color?: string
  showValues?: boolean
  barGap?: number
}

export function BarChart({
  data,
  width = 240,
  height = 140,
  color = '#3B82F6',
  showValues = false,
  barGap = 6,
}: BarChartProps) {
  const n = data.length
  const max = Math.max(...data.map((d) => d.value), 1)
  const hasLabels = data.some((d) => d.label)
  const labelH = hasLabels ? 16 : 0
  const valueH = showValues ? 15 : 0
  const plotH = height - labelH - valueH
  const barW = n > 0 ? Math.max(2, (width - barGap * (n - 1)) / n) : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: barGap, width, height: plotH }}>
        {data.map((d, i) => {
          const h = Math.max(2, (d.value / max) * (plotH - (showValues ? valueH : 0)))
          return (
            <div
              key={i}
              style={{
                width: barW,
                height: plotH,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 2,
                flexShrink: 0,
              }}
            >
              {showValues ? (
                <text style={{ fontSize: 9.5, color: text.muted, fontFamily: FONT }}>{d.value}</text>
              ) : null}
              <div
                style={{
                  width: barW,
                  height: h,
                  backgroundColor: color,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  opacity: 0.9,
                }}
              />
            </div>
          )
        })}
      </div>

      {hasLabels ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: barGap, width, height: labelH, alignItems: 'flex-start' }}>
          {data.map((d, i) => (
            <div key={i} style={{ width: barW, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
              <text
                style={{
                  fontSize: 9.5,
                  color: text.muted,
                  fontFamily: FONT,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {d.label ?? ''}
              </text>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
