/**
 * @atlas/ui — useInterval & useTimeout
 *
 * Declarative timers. Pass `null` as the delay to pause.
 *
 * @example
 *   useInterval(() => tick(), 1000)
 *   useTimeout(() => close(), open ? 3000 : null)
 */
import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, delayMs: number | null) {
  const saved = useRef(callback)
  useEffect(() => {
    saved.current = callback
  }, [callback])

  useEffect(() => {
    if (delayMs === null) return
    const id = setInterval(() => saved.current(), delayMs)
    return () => clearInterval(id)
  }, [delayMs])
}

export function useTimeout(callback: () => void, delayMs: number | null) {
  const saved = useRef(callback)
  useEffect(() => {
    saved.current = callback
  }, [callback])

  useEffect(() => {
    if (delayMs === null) return
    const id = setTimeout(() => saved.current(), delayMs)
    return () => clearTimeout(id)
  }, [delayMs])
}
