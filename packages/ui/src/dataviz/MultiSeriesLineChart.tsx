/**
 * @atlas/ui — MultiSeriesLineChart
 *
 * A multi-series line chart. All series share one scale (so they're comparable);
 * colors are baked into the SVG.
 *
 * @example
 *   <MultiSeriesLineChart series={[{ name: 'Sent', data: [4, 12], color: '#3B82F6' }, { name: 'Received', data: [6, 9], color: '#22C55E' }]} />
 */

export interface MultiLineSeries {
  name: string
  data: number[]
  color: string
}

export interface MultiSeriesLineChartProps {
  series: MultiLineSeries[]
  width?: number
  height?: number
}

const r = (x: number) => Math.round(x * 100) / 100

export function MultiSeriesLineChart({ series, width = 240, height = 120 }: MultiSeriesLineChartProps) {
  const all = series.flatMap((s) => s.data)
  const max = Math.max(...all, 1)
  const min = Math.min(...all, 0)
  const range = max - min || 1
  const pad = 6
  const innerW = width - pad * 2
  const innerH = height - pad * 2

  const polylines = series
    .map((s) => {
      const n = Math.max(s.data.length, 2)
      const pts = s.data
        .map((v, i) => {
          const x = pad + (i / (n - 1)) * innerW
          const y = pad + (1 - (v - min) / range) * innerH
          return `${r(x)},${r(y)}`
        })
        .join(' ')
      return `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    })
    .join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${polylines}</svg>`

  return <svg source={svg} style={{ width, height }} />
}
