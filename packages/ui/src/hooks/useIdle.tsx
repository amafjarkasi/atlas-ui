/**
 * @atlas/ui — useIdle
 *
 * Inactivity detection (auto-save / session). Spread `props` onto the root
 * that receives activity; `idle` flips true after `timeoutMs` without input.
 */
import { useEffect, useRef, useState } from 'react'

export function useIdle(timeoutMs = 60_000) {
  const [idle, setIdle] = useState(false)
  const lastActive = useRef(Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastActive.current > timeoutMs) setIdle(true)
    }, 1000)
    return () => clearInterval(id)
  }, [timeoutMs])

  const markActive = () => {
    lastActive.current = Date.now()
    setIdle(false)
  }

  return { idle, props: { onMouseMove: markActive, onKeyDown: markActive, onMouseDown: markActive } }
}
