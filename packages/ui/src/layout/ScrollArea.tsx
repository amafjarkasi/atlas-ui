/**
 * @atlas/ui — ScrollArea
 *
 * A bounded scroll region with an optional bottom fade edge that hints at more
 * content. GPUIX scrolls via `overflowY: 'scroll'` on the inner div.
 *
 * @example
 *   <ScrollArea height={240} fadeEdge>
 *     {longListOfRows}
 *   </ScrollArea>
 */
import type { ReactNode } from 'react'
import { surface } from '../tokens'

export interface ScrollAreaProps {
  children?: ReactNode
  width?: number | string
  height?: number | string
  maxHeight?: number | string
  /** Paint a soft fade at the bottom edge. */
  fadeEdge?: boolean
  onScroll?: (e: { deltaY?: number; y?: number }) => void
}

export function ScrollArea({
  children,
  width = '100%',
  height,
  maxHeight,
  fadeEdge = false,
  onScroll,
}: ScrollAreaProps) {
  return (
    <div style={{ position: 'relative', width, height, maxHeight }}>
      <div
        onScroll={onScroll as any}
        style={{
          width: '100%',
          height: '100%',
          flexGrow: 1,
          overflowY: 'scroll',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>

      {fadeEdge ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 18,
            pointerEvents: 'none',
            background: {
              type: 'linear-gradient',
              angle: 180,
              stops: [
                { color: '#14141600', position: 0 },
                { color: surface.base, position: 1 },
              ],
              colorSpace: 'srgb',
            },
          }}
        />
      ) : null}
    </div>
  )
}
