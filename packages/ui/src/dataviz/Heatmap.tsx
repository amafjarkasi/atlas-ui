/**
 * @atlas/ui — Heatmap
 *
 * A GitHub-contribution-style intensity grid. Each cell's alpha is scaled by
 * its value relative to the maximum; zero cells render as the muted surface.
 *
 * @example
 *   <Heatmap data={[[0,1,2,0],[3,0,1,4],[0,2,0,1]]} cellSize={14} />
 */
import { surface } from '../tokens'

export interface HeatmapProps {
  data: number[][]
  cellSize?: number
  gap?: number
  color?: string
}

export function Heatmap({ data, cellSize = 12, gap = 2, color = '#3B82F6' }: HeatmapProps) {
  const flat = data.flat()
  const max = Math.max(...flat, 1)

  const alphaHex = (intensity: number) => {
    const a = Math.round(Math.max(0.08, Math.min(1, intensity)) * 255)
    return a.toString(16).padStart(2, '0')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {data.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', flexDirection: 'row', gap }}>
          {row.map((v, ci) => (
            <div
              key={ci}
              style={{
                width: cellSize,
                height: cellSize,
                borderRadius: 2,
                backgroundColor: v <= 0 ? surface.selected : color + alphaHex(v / max),
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
