/**
 * @atlas/ui — GhostDragPreview
 *
 * A cursor-following "ghost" card for drag feedback. The app drives `x`/`y`
 * (parent-relative pixels, from its drag `onMouseMove`); this renders the
 * floating card so drop targets can remain static.
 *
 * @example
 *   <GhostDragPreview active={dragging} x={dragX} y={dragY}>{card}</GhostDragPreview>
 */
import type { ReactNode } from 'react'
import { surface, border } from '../tokens'

export interface GhostDragPreviewProps {
  active: boolean
  x: number
  y: number
  children?: ReactNode
  offsetX?: number
  offsetY?: number
}

export function GhostDragPreview({ active, x, y, children, offsetX = 0, offsetY = -20 }: GhostDragPreviewProps) {
  if (!active) return null

  return (
    <div
      style={{
        position: 'absolute',
        left: x + offsetX,
        top: y + offsetY,
        padding: 8,
        borderRadius: 8,
        backgroundColor: surface.overlay,
        borderWidth: 1,
        borderColor: border.strong,
        boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  )
}
