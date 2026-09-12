/**
 * @atlas/ui — StatusBar
 *
 * A bottom status bar for status indicators, cursor info, and shortcut hints.
 *
 * @example
 *   <StatusBar><Badge variant="label" label="Ready" color="#22C55E" /><div style={{flexGrow:1}} /><Kbd keys="Ctrl+K" /></StatusBar>
 */
import type { ReactNode } from 'react'
import { surface, border } from '../tokens'

export interface StatusBarProps {
  children?: ReactNode
  height?: number
}

export function StatusBar({ children, height = 28 }: StatusBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.pill,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}
