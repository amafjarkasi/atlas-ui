/**
 * @atlas/ui — StatCard
 *
 * A KPI card: label, large value, and an optional up/down delta.
 *
 * @example
 *   <StatCard label="Idle spend" value="$1.2k" delta={-18} icon="zap" />
 */
import { semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'
import { Card } from '../layout/Card'

export interface StatCardProps {
  label: string
  value: string | number
  /** Signed percent change; sign controls color/arrow. */
  delta?: number
  icon?: IconName
  color?: string
}

export function StatCard({ label, value, delta, icon, color = semantic.accent }: StatCardProps) {
  const positive = delta !== undefined && delta >= 0
  const deltaColor = delta === undefined ? undefined : positive ? '#22C55E' : '#ED4245'

  return (
    <Card padding={14}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {icon ? (
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: color + '22',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon name={icon} size={16} color={color} />
          </div>
        ) : null}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
          <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{label}</text>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6, height: 24 }}>
            <text style={{ fontSize: 20, fontWeight: 700, color: text.primary, fontFamily: FONT, lineHeight: 24, whiteSpace: 'nowrap' }}>{value}</text>
            {delta !== undefined ? (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                <Icon name={positive ? 'arrowUp' : 'arrowDown'} size={10} color={deltaColor} />
                <text style={{ fontSize: 12, fontWeight: 700, color: deltaColor, fontFamily: FONT, lineHeight: 12, whiteSpace: 'nowrap' }}>
                  {Math.abs(delta)}
                </text>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  )
}
