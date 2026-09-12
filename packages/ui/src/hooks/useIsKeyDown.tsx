/**
 * @atlas/ui — useIsKeyDown
 *
 * Tracks whether `key` is currently held (e.g. Shift for precision during
 * drags). Spread `props` onto the keyboard root.
 *
 * @example
 *   const { isDown, props } = useIsKeyDown('shift')
 *   <div tabIndex={0} {...props}>{isDown ? 'fine step' : 'coarse step'}</div>
 */
import { useCallback, useState } from 'react'
import type { EventPayload } from '@gpuix/react'

export interface UseIsKeyDownReturn {
  isDown: boolean
  props: {
    onKeyDown: (event: EventPayload) => void
    onKeyUp: (event: EventPayload) => void
  }
}

export function useIsKeyDown(key: string): UseIsKeyDownReturn {
  const [down, setDown] = useState(false)
  const target = key.toLowerCase()

  const onKeyDown = useCallback(
    (e: EventPayload) => {
      if ((e.key ?? '').toLowerCase() === target) setDown(true)
    },
    [target],
  )
  const onKeyUp = useCallback(
    (e: EventPayload) => {
      if ((e.key ?? '').toLowerCase() === target) setDown(false)
    },
    [target],
  )

  return { isDown: down, props: { onKeyDown, onKeyUp } }
}
