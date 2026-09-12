/**
 * @atlas/ui — WindowDragArea
 *
 * A transparent titlebar hit region. On macOS with `titlebarTransparent`,
 * GPUIX/GPUI handles window dragging natively in this region; this component
 * marks it and disables text selection so drags don't start a selection.
 *
 * @example
 *   <WindowDragArea height={48}>…titlebar content…</WindowDragArea>
 */
import type { ReactNode } from 'react'

export interface WindowDragAreaProps {
  children?: ReactNode
  height?: number
}

export function WindowDragArea({ children, height = 48 }: WindowDragAreaProps) {
  return (
    <div
      style={{
        width: '100%',
        height,
        flexShrink: 0,
        flexDirection: 'row',
        alignItems: 'center',
        userSelect: 'none',
        cursor: 'default',
      }}
    >
      {children}
    </div>
  )
}
