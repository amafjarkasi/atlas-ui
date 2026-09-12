/**
 * @atlas/ui — Gauge
 *
 * A semicircular speedometer arc (ideal for "Inbox Zero" progress). The filled
 * arc is proportional to `value` within `[min, max]`.
 *
 * @example
 *   <Gauge value={7} min={0} max={10} label="days to zero" />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'

export interface GaugeProps {
  value: number
  min?: number
  max?: number
  size?: number
  color?: string
  label?: string
}

const VBW = 120
const VBH = 70
const CX = 60
const CY = 60
const R = 40

export function Gauge({ value, min = 0, max = 100, size = 140, color = '#3B82F6', label }: GaugeProps) {
  const clamped = Math.max(min, Math.min(max, value))
  const frac = (clamped - min) / (max - min || 1)
  const arc = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`
  const len = Math.PI * R
  const dash = frac * len

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VBW} ${VBH}">` +
    `<path d="${arc}" fill="none" stroke="#3A3A40" stroke-width="10" stroke-linecap="round"/>` +
    `<path d="${arc}" fill="none" stroke="${color}" stroke-width="10" stroke-dasharray="${dash} ${len}" stroke-linecap="round"/>` +
    `</svg>`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <svg source={svg} style={{ width: size, height: Math.round((size * VBH) / VBW) }} />
      <text style={{ fontSize: 15, fontWeight: 700, color: text.primary, fontFamily: FONT }}>
        {Math.round(clamped)}
        {label ? ` ${label}` : ''}
      </text>
    </div>
  )
}
