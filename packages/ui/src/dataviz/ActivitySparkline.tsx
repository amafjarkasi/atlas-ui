/**
 * @atlas/ui — ActivitySparkline
 *
 * A bar sparkline rendered from pure GPUIX `<div>` elements (the `<canvas>`
 * primitive exposes no draw API in @gpuix/react v0.7, so charts are built from
 * layout primitives instead). Values are normalized to the maximum.
 *
 * @example
 *   <ActivitySparkline data={[4, 12, 7, 18, 9, 21, 13]} width={180} height={40} />
 */
import { border, semantic } from '../tokens'

export interface SparklineDataPoint {
  value: number
  label?: string
}

export interface ActivitySparklineProps {
  data: number[] | SparklineDataPoint[]
  width?: number
  height?: number
  color?: string
  barGap?: number
  showBaseline?: boolean
  borderRadius?: number
}

export function ActivitySparkline({
  data,
  width = 160,
  height = 36,
  color = semantic.accent,
  barGap = 2,
  showBaseline = true,
  borderRadius = 2,
}: ActivitySparklineProps) {
  const values = data.map((d) => (typeof d === 'number' ? d : d.value))
  const n = values.length
  const max = Math.max(...values, 1)
  const barWidth = n > 0 ? Math.max(1, (width - barGap * (n - 1)) / n) : 0

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: barGap,
        width,
        height,
        position: 'relative',
      }}
    >
      {showBaseline ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 1,
            backgroundColor: border.subtle,
          }}
        />
      ) : null}

      {values.map((v, i) => {
        const h = Math.max(2, (v / max) * (height - 4))
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: h,
              backgroundColor: color,
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
              opacity: 0.85,
              flexShrink: 0,
            }}
          />
        )
      })}
    </div>
  )
}
