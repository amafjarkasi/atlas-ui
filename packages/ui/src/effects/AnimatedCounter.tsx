import React, { useRef, useState, useEffect } from 'react'
import { motion } from '@gpuix/react'
import { FONT } from '../tokens'

// ── Types ────────────────────────────────────────────────────────────────────

export interface AnimatedCounterProps {
  value: number
  color?: string
  fontSize?: number
  fontWeight?: number | string
}

// ── AnimatedCounter ──────────────────────────────────────────────────────────

/**
 * A number that GPU-slides (slot-machine flip) when it changes.
 * The outgoing value slides up & fades out while the incoming value
 * slides in from below. Returns null when value is 0.
 */
export function AnimatedCounter({
  value,
  color = '#ECECEE',
  fontSize = 14,
  fontWeight = 600,
}: AnimatedCounterProps) {
  const prevValueRef = useRef<number>(value)
  const [displayedPrev, setDisplayedPrev] = useState<number>(value)
  const [displayedNext, setDisplayedNext] = useState<number>(value)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (value === prevValueRef.current) return

    const prev = prevValueRef.current
    setDisplayedPrev(prev)
    setDisplayedNext(value)
    setAnimating(true)

    const timer = setTimeout(() => {
      prevValueRef.current = value
      setAnimating(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [value])

  if (value === 0) return null

  const containerHeight = Math.round(fontSize * 1.4)

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: containerHeight,
        width: String(value).length * (fontSize * 0.62) + fontSize * 0.3,
      }}
    >
      {/* Outgoing number — slides up and fades out */}
      {animating && (
        <motion.div
          initial={{ top: 0, opacity: 1 }}
          animate={{ top: -fontSize, opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
          }}
        >
          <text
            style={{
              color,
              fontSize,
              fontWeight,
              fontFamily: FONT,
              lineHeight: containerHeight,
            }}
          >
            {String(displayedPrev)}
          </text>
        </motion.div>
      )}

      {/* Incoming number — slides in from below */}
      <motion.div
        key={value}
        initial={{ top: animating ? fontSize : 0, opacity: animating ? 0 : 1 }}
        animate={{ top: 0, opacity: 1 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
        }}
      >
        <text
          style={{
            color,
            fontSize,
            fontWeight,
            fontFamily: FONT,
            lineHeight: containerHeight,
          }}
        >
          {String(displayedNext)}
        </text>
      </motion.div>
    </div>
  )
}
