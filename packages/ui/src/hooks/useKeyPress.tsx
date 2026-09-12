/**
 * @atlas/ui — useKeyPress
 *
 * Fires `handler` when `key` is pressed on the element the returned `props`
 * are spread onto (ignores auto-repeat).
 *
 * @example
 *   const press = useKeyPress('enter', submit)
 *   <div tabIndex={0} {...press.props}>…</div>
 */
import { useCallback } from 'react'
import type { EventPayload } from '@gpuix/react'

export interface UseKeyPressReturn {
  props: { onKeyDown: (event: EventPayload) => void }
}

export function useKeyPress(key: string, handler: (event: EventPayload) => void): UseKeyPressReturn {
  const target = key.toLowerCase()

  const onKeyDown = useCallback(
    (event: EventPayload) => {
      if ((event.key ?? '').toLowerCase() === target && !event.isHeld) handler(event)
    },
    [handler, target],
  )

  return { props: { onKeyDown } }
}
