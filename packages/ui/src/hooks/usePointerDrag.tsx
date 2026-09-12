/**
 * @atlas/ui — usePointerDrag
 *
 * The delta-drag pattern used by Slider / ReorderableList / KanbanBoard /
 * ResizablePanel / BeforeAfterSlider, extracted. Spread `props` onto a drag
 * container; `onDrag` receives pixel deltas from the pointer-down origin.
 *
 * @example
 *   const drag = usePointerDrag({ onDrag: (dx, dy) => adjust(dx) })
 *   <div {...drag.props}>…</div>
 */
import { useCallback, useRef } from 'react'

export interface PointerDragHandlers {
  onDragStart?: () => void
  onDrag?: (deltaX: number, deltaY: number) => void
  onDragEnd?: () => void
}

export interface UsePointerDragReturn {
  dragging: boolean
  props: {
    onMouseDown: (e: { x?: number; y?: number }) => void
    onMouseMove: (e: { x?: number; y?: number }) => void
    onMouseUp: () => void
  }
}

export function usePointerDrag(handlers: PointerDragHandlers): UsePointerDragReturn {
  const origin = useRef<{ x: number; y: number } | null>(null)

  const props = {
    onMouseDown: useCallback((e: { x?: number; y?: number }) => {
      origin.current = { x: e.x ?? 0, y: e.y ?? 0 }
      handlers.onDragStart?.()
    }, [handlers.onDragStart]),
    onMouseMove: useCallback(
      (e: { x?: number; y?: number }) => {
        const o = origin.current
        if (!o) return
        handlers.onDrag?.((e.x ?? 0) - o.x, (e.y ?? 0) - o.y)
      },
      [handlers.onDrag],
    ),
    onMouseUp: useCallback(() => {
      if (origin.current) {
        origin.current = null
        handlers.onDragEnd?.()
      }
    }, [handlers.onDragEnd]),
  }

  return { dragging: origin.current !== null, props }
}
