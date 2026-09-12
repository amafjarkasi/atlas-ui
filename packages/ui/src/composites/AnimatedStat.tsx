/**
 * @atlas/ui — AnimatedStat
 *
 * A KPI card that counts up to its value (composes `Card` + `AnimatedCounter`
 * + `TrendBadge`).
 *
 * @example
 *   <AnimatedStat label="Subscribers" value={12840} delta={4} icon="user" />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Card } from '../layout/Card'
import { AnimatedCounter } from '../effects/AnimatedCounter'
import { TrendBadge } from '../display/TrendBadge'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'

export interface AnimatedStatProps {
  label: string
  value: number
  delta?: number
  icon?: IconName
  color?: string
}

export function AnimatedStat({ label, value, delta, icon, color = '#3B82F6' }: AnimatedStatProps) {
  return (
    <Card padding={14}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {icon ? (
          <div style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={icon} size={16} color={color} />
          </div>
        ) : null}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
          <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{label}</text>
          <AnimatedCounter value={value} fontSize={20} fontWeight={700} color={text.primary} />
          {delta !== undefined ? <TrendBadge value={delta} /> : null}
        </div>
      </div>
    </Card>
  )
}
