/**
 * @atlas/ui — HintBar
 *
 * A keyboard-hint footer (label + Kbd pairs) for palettes, dialogs, and
 * empty states.
 *
 * @example
 *   <HintBar hints={[{ keys: 'Ctrl+K', label: 'Open' }, { keys: 'Esc', label: 'Close' }]} />
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Kbd } from '../atoms/Kbd'

export interface HintItem {
  keys: string
  label: string
}

export interface HintBarProps {
  hints: HintItem[]
}

export function HintBar({ hints }: HintBarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14, padding: 6 }}>
      {hints.map((h, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <text style={{ fontSize: 11, color: textTokens.muted, fontFamily: FONT }}>{h.label}</text>
          <Kbd keys={h.keys} />
        </div>
      ))}
    </div>
  )
}
