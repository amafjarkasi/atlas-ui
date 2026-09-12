/**
 * @atlas/ui — SparklineStat
 *
 * A KPI card with an embedded sparkline (composes `Card` + `ActivitySparkline`).
 *
 * @example
 *   <SparklineStat label="Weekly volume" value={128} delta={12} data={[4, 9, 7, 14, 11, 18]} />
 */
import { semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { Card } from '../layout/Card'
import { ActivitySparkline } from '../dataviz/ActivitySparkline'
import { TrendBadge } from './TrendBadge'

export interface SparklineStatProps {
  label: string
  value: string | number
  delta?: number
  data: number[]
  color?: string
}

export function SparklineStat({ label, value, delta, data, color = semantic.accent }: SparklineStatProps) {
  return (
    <Card padding={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{label}</text>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, height: 24 }}>
          <text style={{ fontSize: 20, fontWeight: 700, color: text.primary, fontFamily: FONT, lineHeight: 24, whiteSpace: 'nowrap' }}>{value}</text>
          {delta !== undefined ? <TrendBadge value={delta} /> : null}
        </div>
        <ActivitySparkline data={data} width={140} height={30} color={color} />
      </div>
    </Card>
  )
}
