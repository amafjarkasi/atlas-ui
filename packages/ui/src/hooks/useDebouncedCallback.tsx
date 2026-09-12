/**
 * @atlas/ui — useDebouncedCallback
 *
 * Returns a function that fires only after it stops being called for `delayMs`.
 */
import { useCallback, useEffect, useRef } from 'react'
import { useLatest } from './useLatest'

export function useDebouncedCallback<A extends unknown[]>(callback: (...args: A) => void, delayMs = 250) {
  const latest = useLatest(callback)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debounced = useCallback(
    (...args: A) => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => latest.current(...args), delayMs)
    },
    [delayMs, latest],
  )

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  return debounced
}
