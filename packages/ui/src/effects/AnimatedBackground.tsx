/**
 * @atlas/ui — AnimatedBackground
 *
 * An ambient "aurora" background: large translucent color blobs that slowly
 * drift and breathe. GPUIX motion can't loop or animate gradients, so the blobs
 * ease between two positions on a slow phase toggle.
 *
 * @example
 *   <AnimatedBackground width={1280} height={860} colors={['#3B82F6', '#8B5CF6', '#22C55E']} />
 */
import { useEffect, useState } from 'react'
import { motion } from '@gpuix/react'

export interface AnimatedBackgroundProps {
  width?: number
  height?: number
  colors?: string[]
  blobs?: number
  durationMs?: number
}

function rand(i: number, salt: number) {
  const s = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return s - Math.floor(s)
}

export function AnimatedBackground({
  width = 800,
  height = 600,
  colors = ['#3B82F6', '#8B5CF6', '#22C55E'],
  blobs = 4,
  durationMs = 4000,
}: AnimatedBackgroundProps) {
  const [phase, setPhase] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => !p), durationMs)
    return () => clearInterval(id)
  }, [durationMs])

  return (
    <div style={{ position: 'relative', width, height, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: blobs }, (_, i) => {
        const color = colors[i % colors.length]
        const size = (0.4 + rand(i, 1) * 0.5) * Math.max(width, height)
        const x1 = rand(i, 2) * width
        const y1 = rand(i, 3) * height
        const x2 = x1 + (rand(i, 4) - 0.5) * 140
        const y2 = y1 + (rand(i, 5) - 0.5) * 140
        return (
          <motion.div
            key={i}
            initial={{ left: x1, top: y1, opacity: 0.22 }}
            animate={{ left: phase ? x1 : x2, top: phase ? y1 : y2, opacity: phase ? 0.22 : 0.36 }}
            transition={{ duration: durationMs / 1000, delay: i * 0.25, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              opacity: 0.2,
            }}
          />
        )
      })}
    </div>
  )
}
