/**
 * @atlas/ui — CandlestickChart
 *
 * An OHLC candlestick chart rendered from SVG rects (body) + lines (wicks).
 * Green = close ≥ open, red = close < open.
 *
 * @example
 *   <CandlestickChart data={[{ open: 10, high: 12, low: 9, close: 11.5 }]} width={280} height={140} />
 */

export interface Candle {
  open: number
  high: number
  low: number
  close: number
}

export interface CandlestickChartProps {
  data: Candle[]
  width?: number
  height?: number
}

const r = (x: number) => Math.round(x * 100) / 100

export function CandlestickChart({ data, width = 240, height = 120 }: CandlestickChartProps) {
  const n = data.length
  if (n === 0) return <div style={{ width, height }} />

  const highs = data.map((c) => c.high)
  const lows = data.map((c) => c.low)
  const max = Math.max(...highs)
  const min = Math.min(...lows)
  const range = max - min || 1
  const pad = 6
  const innerH = height - pad * 2
  const slot = width / n
  const bodyW = Math.max(1, slot * 0.6)

  const y = (v: number) => pad + (1 - (v - min) / range) * innerH

  const parts = data
    .map((c, i) => {
      const cx = r(i * slot + slot / 2)
      const up = c.close >= c.open
      const color = up ? '#22C55E' : '#ED4245'
      const bodyTop = r(y(Math.max(c.open, c.close)))
      const bodyH = Math.max(1, Math.abs(y(c.open) - y(c.close)))
      const wickTop = r(y(c.high))
      const wickBottom = r(y(c.low))
      return (
        `<line x1="${cx}" y1="${wickTop}" x2="${cx}" y2="${wickBottom}" stroke="${color}" stroke-width="1"/>` +
        `<rect x="${r(cx - bodyW / 2)}" y="${bodyTop}" width="${r(bodyW)}" height="${r(bodyH)}" fill="${color}"/>`
      )
    })
    .join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${parts}</svg>`

  return <svg source={svg} style={{ width, height }} />
}
