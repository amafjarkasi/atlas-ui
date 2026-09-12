/**
 * @atlas/ui — useScrollPosition
 *
 * Tracks a scroll container's native offset. Attach `ref` + `onScroll` to the
 * scrollable element; `position.y` is negative when scrolled down.
 *
 * @example
 *   const { ref, onScroll, position } = useScrollPosition()
 *   <div ref={ref} onScroll={onScroll}>…</div>
 */
import { useCallback, useRef, useState } from 'react'
import { useGpuix } from '@gpuix/react'

export interface ScrollPosition {
  x: number
  y: number
}

export function useScrollPosition() {
  const ref = useRef<any>(null)
  const { renderer } = useGpuix()
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 })

  const onScroll = useCallback(() => {
    const id = ref.current?.id
    if (id == null || !renderer?.getScrollOffset) return
    const offset = renderer.getScrollOffset(id)
    if (offset) setPosition({ x: offset[0], y: offset[1] })
  }, [renderer])

  return { ref, onScroll, position }
}
