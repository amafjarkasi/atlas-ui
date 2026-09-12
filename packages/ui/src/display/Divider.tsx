/**
 * @atlas/ui — Divider
 *
 * A horizontal or vertical rule with an optional centered label.
 *
 * @example
 *   <Divider label="Today" />
 *   <Divider orientation="vertical" />
 */
import { border, text } from '../tokens'
import { FONT } from '../tokens'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  color?: string
}

export function Divider({ orientation = 'horizontal', label, color = border.subtle }: DividerProps) {
  if (orientation === 'vertical') {
    return <div style={{ width: 1, alignSelf: 'stretch', backgroundColor: color, flexShrink: 0 }} />
  }

  if (label) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' }}>
        <div style={{ height: 1, flexGrow: 1, backgroundColor: color }} />
        <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT, whiteSpace: 'nowrap' }}>{label}</text>
        <div style={{ height: 1, flexGrow: 1, backgroundColor: color }} />
      </div>
    )
  }

  return <div style={{ height: 1, width: '100%', backgroundColor: color }} />
}
