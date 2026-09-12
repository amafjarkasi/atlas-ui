/**
 * @atlas/ui — Toolbar
 *
 * A horizontal tool surface that lays out buttons, toggle segments, and icons
 * with a divider-friendly gap.
 *
 * @example
 *   <Toolbar><SegmentedControl … /><Divider orientation="vertical" /><IconButton icon="settings" /></Toolbar>
 */
import type { ReactNode } from 'react'
import { surface, border } from '../tokens'

export interface ToolbarProps {
  children?: ReactNode
  height?: number
}

export function Toolbar({ children, height = 40 }: ToolbarProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        height,
        paddingLeft: 8,
        paddingRight: 8,
        borderBottomWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.pill,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}
