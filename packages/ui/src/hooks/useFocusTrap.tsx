/**
 * @atlas/ui — useFocusTrap
 *
 * Best-effort focus scoping for modals. GPUIX has no DOM focus-traversal API,
 * so this moves native focus into the scope on activation (via
 * `renderer.focusElement`) and returns props to attach to the scope element;
 * Escape / outside-click dismissal stays with the caller (Dialog etc.).
 *
 * @example
 *   const { ref, focusProps } = useFocusTrap(open)
 *   <div ref={ref} {...focusProps}>…</div>
 */
import { useEffect, useRef } from 'react'
import { useGpuix } from '@gpuix/react'

export function useFocusTrap(active = true) {
  const ref = useRef<any>(null)
  const { renderer } = useGpuix()

  useEffect(() => {
    if (active && renderer?.focusElement) {
      const id = ref.current?.id
      if (id != null) renderer.focusElement(id)
    }
  }, [active, renderer])

  return { ref, focusProps: { tabIndex: 0, autoFocus: active } as any }
}
