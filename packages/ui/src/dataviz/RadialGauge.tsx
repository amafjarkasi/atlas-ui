/**
 * @atlas/ui — RadialGauge
 *
 * A full-ring gauge with the value centered (composes `CircularProgress`).
 *
 * @example
 *   <RadialGauge value={62} label="inbox zero" />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { CircularProgress } from './CircularProgress'

export interface RadialGaugeProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}

export function RadialGauge({ value, size = 120, strokeWidth = 12, color = '#3B82F6', label }: RadialGaugeProps) {
  const rounded = Math.round(value)
  const isDuplicateLabel = !label || label === `${rounded}%` || label === `${rounded}`
  return (
    <CircularProgress value={value} size={size} strokeWidth={strokeWidth} color={color}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <text style={{ fontSize: Math.round(size * 0.24), fontWeight: 700, color: text.primary, fontFamily: FONT, lineHeight: 1 }}>
          {`${rounded}%`}
        </text>
        {!isDuplicateLabel ? (
          <text style={{ fontSize: 10, color: text.muted, fontFamily: FONT, marginTop: 2 }}>{label}</text>
        ) : null}
      </div>
    </CircularProgress>
  )
}
