/**
 * @atlas/ui — PnlBadge
 *
 * A signed profit/loss badge (green gain / red loss) with a currency symbol.
 *
 * @example
 *   <PnlBadge amount={-240.5} />
 */
import { FONT } from '../tokens'

export interface PnlBadgeProps {
  amount: number
  currency?: string
}

export function PnlBadge({ amount, currency = '$' }: PnlBadgeProps) {
  const positive = amount >= 0
  const color = positive ? '#22C55E' : '#ED4245'
  const sign = positive ? '+' : '-'

  return (
    <div
      style={{
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 9,
        backgroundColor: color + '1A',
        alignSelf: 'flex-start',
      }}
    >
      <text style={{ fontSize: 11, fontWeight: 600, color, fontFamily: FONT, whiteSpace: 'nowrap' }}>
        {sign}
        {currency}
        {Math.abs(amount).toLocaleString()}
      </text>
    </div>
  )
}
