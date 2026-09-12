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
  compact?: boolean
}

export function ContextRing({ used = 0, limit = 200000, label = 'Context', size = 76, compact = false }: ContextRingProps) {
  const safeUsed = used ?? 0
  const safeLimit = limit ?? 200000
  const pct = Math.max(0, Math.min(100, Math.round((safeUsed / Math.max(1, safeLimit)) * 100)))
  const ringColor = pct >= 90 ? '#ED4245' : pct >= 75 ? '#F59E0B' : '#3B82F6'

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <RadialGauge value={pct} size={size} strokeWidth={compact ? 6 : 8} color={ringColor} label={`${pct}%`} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!compact && label ? (
          <div style={{ height: 14 }}>
            <text style={{ fontSize: 11, fontWeight: 600, color: textTokens.muted, fontFamily: FONT, whiteSpace: 'nowrap', lineHeight: 1 }}>{label.toUpperCase()}</text>
          </div>
        ) : null}
        <div style={{ height: compact ? 16 : 18, marginTop: !compact && label ? 2 : 0 }}>
          <text style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: textTokens.primary, fontFamily: FONT, whiteSpace: 'nowrap', lineHeight: 1 }}>
            {compact ? `${safeUsed.toLocaleString()} / ${safeLimit.toLocaleString()}` : safeUsed.toLocaleString()}
          </text>
        </div>
        <div style={{ height: 14, marginTop: 2 }}>
          <text style={{ fontSize: 10.5, color: textTokens.secondary, fontFamily: FONT, whiteSpace: 'nowrap', lineHeight: 1 }}>
            {compact ? 'tokens used' : `of ${safeLimit.toLocaleString()} tokens`}
          </text>
        </div>
      </div>
    </div>
  )
}
