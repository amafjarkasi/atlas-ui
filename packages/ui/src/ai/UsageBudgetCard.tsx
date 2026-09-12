import { border, surface, text } from '../tokens'
import { FONT } from '../tokens'
import { TokenMeter } from './TokenMeter'

export interface UsageBudgetCardProps {
  title?: string
  used: number
  limit?: number
  label?: string
}

export function UsageBudgetCard({ title = 'Usage & Quotas', used, limit = 100, label }: UsageBudgetCardProps) {
  const safeUsed = used ?? 0
  const safeLimit = limit ?? 100
  const pct = Math.round((safeUsed / (safeLimit || 1)) * 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text>
        <div style={{ backgroundColor: pct >= 90 ? '#ED42451A' : '#3B82F61A', borderWidth: 1, borderColor: pct >= 90 ? '#ED424540' : '#3B82F640', borderRadius: 10, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2 }}>
          <text style={{ fontSize: 10.5, color: pct >= 90 ? '#ED4245' : '#60A5FA', fontWeight: 600, fontFamily: FONT }}>
            {pct >= 90 ? 'NEARING LIMIT' : 'HEALTHY'}
          </text>
        </div>
      </div>
      <TokenMeter used={used} limit={limit} label={label ?? 'Quota consumed'} />
    </div>
  )
}
