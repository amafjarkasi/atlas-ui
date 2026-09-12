/**
 * @atlas/ui — LineChart
 *
 * A single-series line chart rendered from a generated SVG string (the canvas
 * primitive has no draw API in v0.7). Colors are baked into the SVG, so no
 * tint is applied.
 *
 * @example
 *   <LineChart data={[4, 12, 7, 18, 9, 21]} width={240} height={120} fillArea />
 */

export interface LineChartProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  showPoints?: boolean
  fillArea?: boolean
  strokeWidth?: number
}

const r = (x: number) => Math.round(x * 100) / 100

export function LineChart({
  data,
  width = 240,
  height = 120,
  color = '#3B82F6',
  showPoints = false,
  fillArea = false,
  strokeWidth = 2,
}: LineChartProps) {
  const n = data.length
  if (n < 2) return <div style={{ width, height }} />

  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const pad = 6
  const innerW = width - pad * 2
  const innerH = height - pad * 2

  const pts = data.map((v, i) => {
    const x = pad + (i / (n - 1)) * innerW
    const y = pad + (1 - (v - min) / range) * innerH
    return [r(x), r(y)] as const
  })

  const pointsStr = pts.map((p) => p.join(',')).join(' ')
  const areaPoints = `${pad},${height - pad} ${pointsStr} ${width - pad},${height - pad}`
  const circles = showPoints
    ? pts.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="2.5" fill="${color}"/>`).join('')
    : ''

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">` +
    (fillArea ? `<polygon points="${areaPoints}" fill="${color}30"/>` : '') +
    `<polyline points="${pointsStr}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>` +
    circles +
    `</svg>`

  return <svg source={svg} style={{ width, height }} />
}
