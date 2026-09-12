/**
 * @atlas/ui — UsageBudgetCard
 *
 * A token/quota usage card (composes `Card` + `TokenMeter`).
 *
 * @example
 *   <UsageBudgetCard title="Context window" used={18200} limit={20000} label="tokens" />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Card } from '../layout/Card'
import { TokenMeter } from './TokenMeter'

export interface UsageBudgetCardProps {
  title?: string
  used: number
  limit?: number
  label?: string
}

export function UsageBudgetCard({ title = 'Usage', used, limit = 100, label }: UsageBudgetCardProps) {
  return (
    <Card padding={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text>
        <TokenMeter used={used} limit={limit} label={label} />
      </div>
    </Card>
  )
}
