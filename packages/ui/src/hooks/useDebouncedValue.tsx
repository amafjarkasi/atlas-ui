/**
 * @atlas/ui — useDebouncedValue
 *
 * Returns `value` after it has stopped changing for `delayMs`.
 *
 * @example
 *   const q = useDebouncedValue(query, 300)
 */
import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delayMs = 250): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])

  return debounced
}
