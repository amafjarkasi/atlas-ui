/**
 * @atlas/ui — BulletChart
 *
 * A single-value bar measured against a target marker (performance vs goal).
 *
 * @example
 *   <BulletChart value={62} target={80} max={100} width={220} />
 */
import { surface, semantic } from '../tokens'

export interface BulletChartProps {
  value: number
  target?: number
  max?: number
  width?: number
  height?: number
  color?: string
  targetColor?: string
}

export function BulletChart({
  value,
  target,
  max = 100,
  width = 200,
  height = 18,
  color = semantic.accent,
  targetColor = '#ED4245',
}: BulletChartProps) {
  const vW = Math.max(0, Math.min(1, value / max)) * width
  const tX = target !== undefined ? Math.max(0, Math.min(1, target / max)) * width : undefined

  return (
    <div style={{ position: 'relative', width, height }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius: 4,
          backgroundColor: surface.selected,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: vW,
          borderRadius: 4,
          backgroundColor: color,
        }}
      />
      {tX !== undefined ? (
        <div
          style={{
            position: 'absolute',
            left: tX - 1,
            top: -2,
            bottom: -2,
            width: 2,
            borderRadius: 1,
            backgroundColor: targetColor,
          }}
        />
      ) : null}
    </div>
  )
}
