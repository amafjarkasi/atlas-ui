/**
 * @atlas/ui — ProgressBar
 *
 * A determinate or indeterminate progress bar. Determinate fills a fraction of
 * the track; indeterminate pulses a full-width fill.
 *
 * @example
 *   <ProgressBar value={62} label="Sync" showValue />
 *   <ProgressBar indeterminate color="#8B5CF6" />
 */
import { useEffect, useState } from 'react'
import { motion } from '@gpuix/react'
import { surface, semantic, text } from '../tokens'
import { FONT } from '../tokens'

export interface ProgressBarProps {
  /** 0..100. Ignored when `indeterminate`. */
  value?: number
  indeterminate?: boolean
  color?: string
  height?: number
  width?: number | string
  label?: string
  showValue?: boolean
}

export function ProgressBar({
  value = 0,
  indeterminate = false,
  color = semantic.accent,
  height = 6,
  width = '100%',
  label,
  showValue = false,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  const [phase, setPhase] = useState(true)
  useEffect(() => {
    if (!indeterminate) return
    const id = setInterval(() => setPhase((p) => !p), 700)
    return () => clearInterval(id)
  }, [indeterminate])

  const fill = indeterminate ? (
    <motion.div
      animate={{ opacity: phase ? 1 : 0.45 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ width: '100%', height: '100%', borderRadius: height / 2, backgroundColor: color }}
    />
  ) : (
    <div style={{ width: `${clamped}%`, height: '100%', borderRadius: height / 2, backgroundColor: color }} />
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width }}>
      {label || showValue ? (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 15, justifyContent: label && showValue ? 'space-between' : label ? 'flex-start' : 'center' }}>
          {label ? (
            <text style={{ fontSize: 12, color: text.secondary, fontFamily: FONT }}>{label}</text>
          ) : null}
          {showValue ? (
            <text style={{ fontSize: 11.5, fontWeight: 600, color: text.secondary, fontFamily: FONT, whiteSpace: 'nowrap' }}>{Math.round(clamped)}</text>
          ) : null}
        </div>
      ) : null}

      <div
        style={{
          width: '100%',
          height,
          borderRadius: height / 2,
          backgroundColor: surface.selected,
          overflow: 'hidden',
        }}
      >
        {fill}
      </div>
    </div>
  )
}
