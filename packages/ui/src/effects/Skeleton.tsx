import React, { useState, useEffect } from 'react'
import { motion } from '@gpuix/react'
import type { StyleDesc } from '@gpuix/react'
import { C } from '../tokens'

// ── Types ────────────────────────────────────────────────────────────────────

export interface SkeletonProps {
  width?: number | string
  height?: number | string
  borderRadius?: number
  style?: StyleDesc
}

export interface SkeletonTextProps {
  lines?: number
  width?: number | string
  lineHeight?: number
  gap?: number
  borderRadius?: number
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

/**
 * A single GPU-shimmer loading placeholder block.
 * Uses a `motion.div` opacity pulse over a `linear-gradient` background in
 * oklab color space for a smooth, perceptually-uniform shimmer.
 */
export function Skeleton({ width = '100%', height = 16, borderRadius = 6, style }: SkeletonProps) {
  const [phase, setPhase] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setPhase(p => !p)
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        width,
        height,
        borderRadius: borderRadius ?? 6,
        overflow: 'hidden',
        ...style,
      }}
    >
      <motion.div
        animate={{ opacity: phase ? 0.4 : 0.9 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        style={{
          width: '100%',
          height: '100%',
          background: {
            type: 'linear-gradient',
            angle: 90,
            stops: [
              { color: '#2A2A2F', position: 0 },
              { color: '#3A3A40', position: 1 },
            ],
            colorSpace: 'oklab',
          },
        }}
      />
    </div>
  )
}

// ── SkeletonText ─────────────────────────────────────────────────────────────

/**
 * A column of `<Skeleton>` blocks that mimics multi-line text loading state.
 * Each subsequent line has a slightly lower opacity to create visual depth.
 */
export function SkeletonText({
  lines = 3,
  width = '100%',
  lineHeight = 14,
  gap = 8,
  borderRadius = 4,
}: SkeletonTextProps) {
  const lineWidths = ['100%', '80%', '60%', '90%', '70%']

  return (
    <div
      style={{
        flexDirection: 'column',
        gap,
      }}
    >
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          style={{
            opacity: 1 - i * 0.1,
            width: typeof width === 'string' ? width : width,
          }}
        >
          <Skeleton
            width={lineWidths[i % lineWidths.length]}
            height={lineHeight}
            borderRadius={borderRadius}
          />
        </div>
      ))}
    </div>
  )
}
