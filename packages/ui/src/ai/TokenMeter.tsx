/**
 * @atlas/ui — TokenMeter
 *
 * A token/usage meter for AI features. Turns red past 90% usage.
 *
 * @example
 *   <TokenMeter used={18200} limit={20000} label="context tokens" />
 */
import { surface, text } from '../tokens'
import { FONT } from '../tokens'

export interface TokenMeterProps {
  used: number
  limit?: number
  label?: string
  color?: string
}

export function TokenMeter({ used, limit = 100, label = 'tokens', color = '#3B82F6' }: TokenMeterProps) {
  const pct = Math.max(0, Math.min(100, (used / (limit || 1)) * 100))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{label}</text>
        <text style={{ fontSize: 11, color: text.secondary, fontFamily: FONT }}>
          {used.toLocaleString()} / {limit.toLocaleString()}
        </text>
      </div>

      <div style={{ height: 6, borderRadius: 3, backgroundColor: surface.selected, overflow: 'hidden' }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: 3,
            backgroundColor: pct >= 90 ? '#ED4245' : color,
          }}
        />
      </div>
    </div>
  )
}
