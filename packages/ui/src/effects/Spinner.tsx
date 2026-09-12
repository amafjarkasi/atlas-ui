/**
 * @atlas/ui — Spinner
 *
 * A loading indicator. GPUIX has no CSS `rotate`, so this uses a wave of
 * pulsing dots (staggered opacity) instead of a rotating ring.
 *
 * @example
 *   <Spinner size={16} color="#3B82F6" />
 */
import { useEffect, useState } from 'react'
import { motion } from '@gpuix/react'

export interface SpinnerProps {
  size?: number
  color?: string
  dots?: number
}

export function Spinner({ size = 16, color = '#3B82F6', dots = 3 }: SpinnerProps) {
  const [phase, setPhase] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => !p), 500)
    return () => clearInterval(id)
  }, [])

  const dotSize = Math.max(4, Math.round(size * 0.3))

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3, height: size }}>
      {Array.from({ length: dots }, (_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: phase ? 1 : 0.25 }}
          transition={{ duration: 0.4, delay: i * 0.12, ease: 'easeInOut' }}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  )
}
