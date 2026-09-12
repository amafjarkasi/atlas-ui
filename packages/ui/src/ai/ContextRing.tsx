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

export function ContextRing({ used = 0, limit = 200000, label = 'Context', size = 76 }: ContextRingProps) {
  const safeUsed = used ?? 0
  const safeLimit = limit ?? 200000
  const pct = Math.max(0, Math.min(100, Math.round((safeUsed / Math.max(1, safeLimit)) * 100)))
  const ringColor = pct >= 90 ? '#ED4245' : pct >= 75 ? '#F59E0B' : '#3B82F6'

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14 }}>
      <RadialGauge value={pct} size={size} strokeWidth={8} color={ringColor} label={`${pct}%`} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <text style={{ fontSize: 11, fontWeight: 600, color: textTokens.muted, fontFamily: FONT }}>{label.toUpperCase()}</text>
        <text style={{ fontSize: 15, fontWeight: 700, color: textTokens.primary, fontFamily: FONT }}>
          {safeUsed.toLocaleString()}
        </text>
        <text style={{ fontSize: 11, color: textTokens.secondary, fontFamily: FONT }}>
          {`of ${safeLimit.toLocaleString()} tokens`}
        </text>
      </div>
    </div>
  )
}
