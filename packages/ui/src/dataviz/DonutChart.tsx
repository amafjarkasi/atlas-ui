/**
 * @atlas/ui — DonutChart
 *
 * A multi-segment donut built from SVG `stroke-dasharray` arcs (same technique
 * as `CircularProgress`, extended to N segments). Optional centered content.
 *
 * @example
 *   <DonutChart segments={[{ value: 60, color: '#3B82F6' }, { value: 40, color: '#8B5CF6' }]} centerLabel={<text>60%</text>} />
 */
import type { ReactNode } from 'react'

export interface DonutSegment {
  value: number
  color: string
  label?: string
}

export interface DonutChartProps {
  segments: DonutSegment[]
  size?: number
  thickness?: number
  centerLabel?: ReactNode
}

export function DonutChart({ segments, size = 120, thickness = 16, centerLabel }: DonutChartProps) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const center = size / 2
  let cum = 0

  const arcs = segments
    .map((seg) => {
      const frac = seg.value / total
      const len = frac * c
      const offset = -cum * c
      cum += frac
      return (
        `<circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="${thickness}" ` +
        `stroke-dasharray="${len} ${c}" stroke-dashoffset="${offset}" transform="rotate(-90 ${center} ${center})"/>`
      )
    })
    .join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${arcs}</svg>`

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg source={svg} style={{ width: size, height: size }} />
      {centerLabel ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {centerLabel}
        </div>
      ) : null}
    </div>
  )
}
