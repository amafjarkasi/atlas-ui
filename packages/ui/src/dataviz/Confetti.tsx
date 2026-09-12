/**
 * @atlas/ui — Confetti
 *
 * A GPU particle burst of falling `motion.div` pieces for celebrations (e.g.
 * hitting Inbox Zero). Particles use deterministic pseudo-random values so the
 * burst is stable across renders.
 *
 * @example
 *   {inboxZero && <Confetti pieces={80} width={win.width} height={win.height} />}
 */
import { motion } from '@gpuix/react'

export interface ConfettiProps {
  pieces?: number
  active?: boolean
  colors?: string[]
  width?: number
  height?: number
}

const DEFAULT_COLORS = ['#3B82F6', '#8B5CF6', '#22C55E', '#EAB308', '#ED4245', '#0EA5E9']

function rand(i: number, salt: number) {
  const s = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return s - Math.floor(s)
}

export function Confetti({
  pieces = 60,
  active = true,
  colors = DEFAULT_COLORS,
  width = 400,
  height = 300,
}: ConfettiProps) {
  if (!active) return null

  const particles = Array.from({ length: pieces }, (_, i) => ({
    x: rand(i, 1) * width,
    delay: rand(i, 2) * 0.8,
    duration: 1.2 + rand(i, 3) * 1.3,
    size: 5 + rand(i, 4) * 6,
    color: colors[i % colors.length],
    drift: (rand(i, 5) - 0.5) * 90,
    initialTop: -20 - rand(i, 6) * 80,
  }))

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ left: p.x, top: p.initialTop, opacity: 1 }}
          animate={{ left: p.x + p.drift, top: height + 20, opacity: 0 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size * 0.6,
            borderRadius: 1,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  )
}
