/**
 * @atlas/ui — FocusScope
 *
 * A modal focus scope. On activation it moves native focus into the scope
 * (via `useFocusTrap`), and two invisible sentinels at the edges bounce Tab /
 * Shift+Tab back inside — GPUIX has no DOM tab-cycle, so this is the closest
 * achievable trap (focus cannot escape the scope while it is active).
 */
import { useRef, type ReactNode } from 'react'
import { useGpuix } from '@gpuix/react'
import type { StyleDesc } from '@gpuix/react'
import { useFocusTrap } from '../hooks/useFocusTrap'

export interface FocusScopeProps {
  active?: boolean
  children: ReactNode
  style?: StyleDesc
}

const SENTINEL_STYLE = { position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' } as const

export function FocusScope({ active = true, children, style }: FocusScopeProps) {
  const { ref, focusProps } = useFocusTrap(active)
  const { renderer } = useGpuix()
  const startRef = useRef<any>(null)
  const endRef = useRef<any>(null)

  return (
    <div ref={ref} {...focusProps} style={{ position: 'relative', ...style }}>
      {/* Leading sentinel: Shift+Tab from the first child lands here → bounce to the first real tab stop. */}
      <div ref={startRef} tabIndex={0} onFocus={() => renderer?.focusNext?.()} style={SENTINEL_STYLE} />
      {children}
      {/* Trailing sentinel: Tab past the last child → bounce back to the last real tab stop. */}
      <div ref={endRef} tabIndex={0} onFocus={() => renderer?.focusPrevious?.()} style={SENTINEL_STYLE} />
    </div>
  )
}
