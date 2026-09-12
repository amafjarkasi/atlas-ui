/**
 * @atlas/ui — useCounter
 *
 * Tiny counter helpers.
 *
 * @example
 *   const { count, inc, dec, reset } = useCounter(5)
 */
import { useCallback, useState } from 'react'

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)
  const inc = useCallback((step = 1) => setCount((c) => c + step), [])
  const dec = useCallback((step = 1) => setCount((c) => c - step), [])
  const reset = useCallback(() => setCount(initial), [initial])
  return { count, setCount, inc, dec, reset }
}
