/**
 * @atlas/ui — useFocusVisible
 *
 * Tracks whether focus arrived by keyboard (for visible focus rings). Spread
 * `props` onto the focusable element.
 */
import { useCallback, useState } from 'react'
import type { EventPayload } from '@gpuix/react'

export function useFocusVisible() {
  const [isFocusVisible, setFocusVisible] = useState(false)
  const viaKeyboard = { current: false }

  const props = {
    onKeyDown: useCallback(() => {
      viaKeyboard.current = true
    }, [viaKeyboard]),
    onMouseDown: useCallback(() => {
      viaKeyboard.current = false
    }, [viaKeyboard]),
    onFocus: useCallback((e: EventPayload) => setFocusVisible(viaKeyboard.current || e.modifiers !== undefined), [viaKeyboard]),
    onBlur: useCallback(() => setFocusVisible(false), []),
  }

  return { isFocusVisible, props }
}
