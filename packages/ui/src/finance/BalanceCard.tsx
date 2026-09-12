/**
 * @atlas/ui — BalanceCard
 *
 * An account balance card with a delta badge and sparkline (composes `Card` +
 * `TrendBadge` + `ActivitySparkline`).
 *
 * @example
 *   <BalanceCard label="Total balance" value={12480} delta={3.2} data={[10, 12, 11, 13]} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Card } from '../layout/Card'
import { ActivitySparkline } from '../dataviz/ActivitySparkline'
import { TrendBadge } from '../display/TrendBadge'

export interface BalanceCardProps {
  label: string
  value: number
  delta?: number
  data: number[]
  currency?: string
}

export function BalanceCard({ label, value, delta, data, currency = '$' }: BalanceCardProps) {
  return (
    <Card padding={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{label}</text>
            <text style={{ fontSize: 20, fontWeight: 700, color: text.primary, fontFamily: FONT }}>
              {currency}
              {value.toLocaleString()}
            </text>
          </div>
          {delta !== undefined ? <TrendBadge value={delta} inverse /> : null}
        </div>
        <ActivitySparkline data={data} width={170} height={32} />
      </div>
    </Card>
  )
}
