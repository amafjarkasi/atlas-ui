/**
 * @atlas/ui — CalendarHeatmap
 *
 * A GitHub-style contribution grid: weeks as columns, days as rows, cell alpha
 * scaled by value. Dates are `YYYY-MM-DD` strings.
 *
 * @example
 *   <CalendarHeatmap data={[{ date: '2024-08-01', value: 4 }]} weeks={26} />
 */
import { surface } from '../tokens'

export interface CalendarHeatmapDatum {
  date: string
  value: number
}

export interface CalendarHeatmapProps {
  data: CalendarHeatmapDatum[]
  weeks?: number
  cellSize?: number
  gap?: number
  color?: string
}

function fmt(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function CalendarHeatmap({ data, weeks = 26, cellSize = 12, gap = 3, color = '#3B82F6' }: CalendarHeatmapProps) {
  const map = new Map(data.map((d) => [d.date, d.value]))
  const max = Math.max(...data.map((d) => d.value), 1)

  const alpha = (v: number) => {
    const a = Math.round(Math.max(0.08, Math.min(1, v / max)) * 255)
    return a.toString(16).padStart(2, '0')
  }

  const today = new Date()
  const end = new Date(today)
  end.setDate(today.getDate() - today.getDay()) // Sunday of the current week
  const start = new Date(end)
  start.setDate(end.getDate() - (weeks - 1) * 7)

  const columns: Date[][] = []
  for (let w = 0; w < weeks; w++) {
    const col: Date[] = []
    for (let d = 0; d < 7; d++) {
      const day = new Date(start)
      day.setDate(start.getDate() + w * 7 + d)
      col.push(day)
    }
    columns.push(col)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap }}>
      {columns.map((col, w) => (
        <div key={w} style={{ display: 'flex', flexDirection: 'column', gap }}>
          {col.map((day, d) => {
            const v = map.get(fmt(day)) ?? 0
            return (
              <div
                key={d}
                style={{
                  width: cellSize,
                  height: cellSize,
                  borderRadius: 2,
                  backgroundColor: v <= 0 ? surface.selected : color + alpha(v),
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
