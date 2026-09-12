/**
 * @atlas/ui — Chart
 *
 * A composite chart card: optional title/description and a legend row around a
 * plot passed as children (e.g. `<LineChart>` / `<BarChart>` / `<Heatmap>`).
 *
 * @example
 *   <Chart title="Weekly volume" legend={[{ label: 'Sent', color: '#3B82F6' }]}>
 *     <LineChart data={[4, 12, 7, 18]} />
 *   </Chart>
 */
import type { ReactNode } from 'react'
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Card } from '../layout/Card'

export interface ChartLegendItem {
  label: string
  color: string
}

export interface ChartProps {
  title?: string
  description?: string
  legend?: ChartLegendItem[]
  children: ReactNode
  width?: number | string
}

export function Chart({ title, description, legend, children, width = '100%' }: ChartProps) {
  return (
    <Card padding={14} width={width}>
      {title || description ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBottom: 12 }}>
          {title ? (
            <text style={{ fontSize: 13.5, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>{title}</text>
          ) : null}
          {description ? (
            <text style={{ fontSize: 11.5, color: textTokens.muted, fontFamily: FONT }}>{description}</text>
          ) : null}
        </div>
      ) : null}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>

      {legend && legend.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 12, flexWrap: 'wrap', paddingTop: 12 }}>
          {legend.map((l, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: l.color }} />
              <text style={{ fontSize: 11, color: textTokens.secondary, fontFamily: FONT }}>{l.label}</text>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  )
}
