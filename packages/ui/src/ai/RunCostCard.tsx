/**
 * @atlas/ui — RunCostCard
 *
 * A per-run cost summary: token split + estimated spend (composes `Card` +
 * `TokenMeter`).
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Card } from '../layout/Card'
import { TokenMeter } from './TokenMeter'

export interface RunCostCardProps {
  inputTokens?: number
  outputTokens?: number
  totalTokens?: number
  cost?: number
  currency?: string
  title?: string
}

export function RunCostCard({ inputTokens, outputTokens, totalTokens, cost, currency = '$', title = 'Run cost' }: RunCostCardProps) {
  const total = totalTokens ?? (inputTokens ?? 0) + (outputTokens ?? 0)
  return (
    <Card padding={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>{title}</text>
          {cost !== undefined ? (
            <text style={{ fontSize: 14, fontWeight: 700, color: textTokens.primary, fontFamily: FONT }}>
              {currency}
              {cost.toFixed(4)}
            </text>
          ) : null}
        </div>
        {inputTokens !== undefined ? (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
            <text style={{ fontSize: 11, color: textTokens.muted, fontFamily: FONT }}>{inputTokens.toLocaleString()} in</text>
            {outputTokens !== undefined ? <text style={{ fontSize: 11, color: textTokens.muted, fontFamily: FONT }}>{outputTokens.toLocaleString()} out</text> : null}
          </div>
        ) : null}
        <TokenMeter used={total} limit={Math.max(total, 1)} label="tokens" />
      </div>
    </Card>
  )
}
