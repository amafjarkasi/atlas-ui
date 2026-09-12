/**
 * @atlas/ui — useLatest
 *
 * A ref that always holds the latest value (stable callbacks/closures).
 */
import { useEffect, useRef } from 'react'

export function useLatest<T>(value: T): { readonly current: T } {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
