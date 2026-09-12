/**
 * @atlas/ui — ThinkingIndicator
 *
 * A "model is thinking" row with pulsing dots (composes `Spinner`).
 *
 * @example
 *   <ThinkingIndicator label="Searching" />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Spinner } from '../effects/Spinner'

export interface ThinkingIndicatorProps {
  label?: string
  active?: boolean
}

export function ThinkingIndicator({ label = 'Thinking', active = true }: ThinkingIndicatorProps) {
  if (!active) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Spinner size={12} />
      <text style={{ fontSize: 12, color: text.muted, fontFamily: FONT }}>{label}…</text>
    </div>
  )
}
