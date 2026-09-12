/**
 * @atlas/ui — ContextRing
 *
 * A context-window usage ring with used/limit readout (composes `RadialGauge`).
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { RadialGauge } from '../dataviz/RadialGauge'

export interface ContextRingProps {
  used: number
  limit: number
  label?: string
  size?: number
}

export function ContextRing({ used, limit, label = 'context', size = 72 }: ContextRingProps) {
  const pct = Math.max(0, Math.min(100, (used / Math.max(1, limit)) * 100))
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <RadialGauge value={pct} size={size} strokeWidth={9} label={label} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <text style={{ fontSize: 14, fontWeight: 700, color: textTokens.primary, fontFamily: FONT }}>
          {used.toLocaleString()}
        </text>
        <text style={{ fontSize: 11, color: textTokens.muted, fontFamily: FONT }}>/ {limit.toLocaleString()} tokens</text>
      </div>
    </div>
  )
}
