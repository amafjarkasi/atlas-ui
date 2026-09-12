/**
 * @atlas/ui — UsageDashboard
 *
 * A metrics dashboard: KPI row, budget card, trend chart, and allocation donut
 * (composes `KpiGrid` + `UsageBudgetCard` + `LineChart` + `DonutChart`).
 *
 * @example
 *   <UsageDashboard kpis={kpis} used={1200} limit={8000} trend={[1, 4, 3, 7]} allocation={segments} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { KpiGrid } from '../finance/KpiGrid'
import type { StatCardProps } from '../display/StatCard'
import { UsageBudgetCard } from '../ai/UsageBudgetCard'
import { LineChart } from '../dataviz/LineChart'
import { DonutChart, type DonutSegment } from '../dataviz/DonutChart'
import { Chart } from '../dataviz/Chart'

export interface UsageDashboardProps {
  kpis?: StatCardProps[]
  used?: number
  limit?: number
  trend?: number[]
  allocation?: DonutSegment[]
  title?: string
}

export function UsageDashboard({ kpis, used, limit, trend, allocation, title }: UsageDashboardProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {title ? <text style={{ fontSize: 15, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text> : null}
      {kpis && kpis.length > 0 ? <KpiGrid items={kpis} /> : null}
      {limit !== undefined ? <UsageBudgetCard used={used ?? 0} limit={limit} /> : null}
      {trend && trend.length > 0 ? (
        <Chart title="Trend">
          <LineChart data={trend} fillArea />
        </Chart>
      ) : null}
      {allocation && allocation.length > 0 ? (
        <Chart title="Allocation" legend={allocation.map((s) => ({ label: s.label ?? '', color: s.color }))}>
          <DonutChart segments={allocation} />
        </Chart>
      ) : null}
    </div>
  )
}
