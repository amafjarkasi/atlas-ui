/**
 * @atlas/ui — TrendBadge
 *
 * A signed percent/change badge (green up / red down). `inverse` flips the
 * "good" color for metrics where a drop is positive (e.g. idle spend).
 *
 * @example
 *   <TrendBadge value={-18} inverse />
 */
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface TrendBadgeProps {
  value: number
  /** When true, a negative value is colored as good (e.g. spend). */
  inverse?: boolean
  suffix?: string
}

export function TrendBadge({ value, inverse = false, suffix = '' }: TrendBadgeProps) {
  const positive = value >= 0
  const good = inverse ? !positive : positive
  const color = good ? '#22C55E' : '#ED4245'

  return (
    <div
      style={{
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        height: 20,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 10,
        backgroundColor: color + '1A',
      }}
    >
      <Icon name={positive ? 'arrowUp' : 'arrowDown'} size={10} color={color} />
      <text style={{ fontSize: 11, fontWeight: 600, color, fontFamily: FONT, whiteSpace: 'nowrap' }}>
        {Math.abs(value)}
        {suffix}
      </text>
    </div>
  )
}
