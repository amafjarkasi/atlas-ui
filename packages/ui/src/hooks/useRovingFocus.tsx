/**
 * @atlas/ui — useRovingFocus
 *
 * Arrow-key index navigation over a list (used by Tabs, RadioGroup,
 * SegmentedControl). Returns the active index and a keydown handler.
 *
 * @example
 *   const { activeIndex, onKeyDown } = useRovingFocus({ length: options.length, onSelect: (i) => setValue(options[i]) })
 *   <div tabIndex={0} onKeyDown={onKeyDown}>…</div>
 */
import { useCallback, useState } from 'react'
import type { EventPayload } from '@gpuix/react'

export interface RovingFocusOptions {
  length: number
  initialIndex?: number
  onSelect?: (index: number) => void
}

export function useRovingFocus({ length, initialIndex = 0, onSelect }: RovingFocusOptions) {
  const last = Math.max(0, length - 1)
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, Math.min(initialIndex, last)))

  const moveTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(last, next))
      setActiveIndex(clamped)
      onSelect?.(clamped)
    },
    [last, onSelect],
  )

  const onKeyDown = useCallback(
    (event: EventPayload) => {
      const k = (event.key ?? '').toLowerCase()
      if (k === 'arrowdown' || k === 'arrowright') moveTo(activeIndex + 1)
      else if (k === 'arrowup' || k === 'arrowleft') moveTo(activeIndex - 1)
      else if (k === 'home') moveTo(0)
      else if (k === 'end') moveTo(last)
    },
    [activeIndex, last, moveTo],
  )

  return { activeIndex, setActiveIndex, onKeyDown }
}
