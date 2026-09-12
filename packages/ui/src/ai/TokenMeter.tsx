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

export function TokenMeter({ used = 0, limit = 100, label = 'tokens', color = '#3B82F6' }: TokenMeterProps) {
  const safeUsed = used ?? 0
  const safeLimit = limit ?? 100
  const pct = Math.max(0, Math.min(100, (safeUsed / (safeLimit || 1)) * 100))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <text style={{ fontSize: 11.5, color: text.secondary, fontFamily: FONT, whiteSpace: 'nowrap' }}>{label}</text>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <text style={{ fontSize: 11.5, color: text.primary, fontFamily: FONT, whiteSpace: 'nowrap' }}>
            {`${safeUsed.toLocaleString()} / ${safeLimit.toLocaleString()}`}
          </text>
          <div style={{ backgroundColor: pct >= 90 ? '#ED424522' : '#3B82F622', borderRadius: 4, paddingLeft: 5, paddingRight: 5, paddingTop: 1, paddingBottom: 1 }}>
            <text style={{ fontSize: 10, color: pct >= 90 ? '#ED4245' : '#60A5FA', fontFamily: FONT, fontWeight: 600, whiteSpace: 'nowrap' }}>
              {`${Math.round(pct)}%`}
            </text>
          </div>
        </div>
      </div>

      <div style={{ height: 6, borderRadius: 3, backgroundColor: '#26262B', overflow: 'hidden' }}>
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
