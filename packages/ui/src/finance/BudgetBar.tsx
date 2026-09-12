/**
 * @atlas/ui — BudgetBar
 *
 * A budget usage bar (composes `ProgressBar`). Turns red past 90%.
 *
 * @example
 *   <BudgetBar label="Marketing" used={8200} limit={10000} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { ProgressBar } from '../inputs/ProgressBar'

export interface BudgetBarProps {
  label?: string
  used: number
  limit: number
  currency?: string
}

export function BudgetBar({ label = 'Budget', used, limit, currency = '$' }: BudgetBarProps) {
  const pct = (used / (limit || 1)) * 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <text style={{ fontSize: 12, color: text.secondary, fontFamily: FONT }}>{label}</text>
        <text style={{ fontSize: 12, color: text.muted, fontFamily: FONT }}>
          {currency}
          {used.toLocaleString()} / {currency}
          {limit.toLocaleString()}
        </text>
      </div>
      <ProgressBar value={pct} color={pct >= 90 ? '#ED4245' : '#3B82F6'} />
    </div>
  )
}
