/**
 * @atlas/ui — useHover
 *
 * Tracks hover state. Spread `props` onto the element.
 */
import { useCallback, useState } from 'react'

export function useHover() {
  const [isHover, setHover] = useState(false)

  const props = {
    onMouseEnter: useCallback(() => setHover(true), []),
    onMouseLeave: useCallback(() => setHover(false), []),
  }

  return { isHover, props }
}
