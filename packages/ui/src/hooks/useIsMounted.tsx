/**
 * @atlas/ui — useIsMounted
 *
 * A `() => boolean` guard against setting state after unmount.
 *
 * @example
 *   const isMounted = useIsMounted()
 *   fetch().then((r) => { if (isMounted()) setState(r) })
 */
import { useEffect, useRef } from 'react'

export function useIsMounted(): () => boolean {
  const mounted = useRef(true)

  useEffect(() => {
    return () => {
      mounted.current = false
    }
  }, [])

  return () => mounted.current
}
