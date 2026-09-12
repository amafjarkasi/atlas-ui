/**
 * @atlas/ui — ModelPerformanceTable
 *
 * A benchmark table with per-metric bars (composes `DataGrid` + `ProgressBar`).
 */
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'

export interface BenchmarkRow {
  id: string
  name: string
  metrics: Record<string, number>
}

export interface ModelPerformanceTableProps {
  models: BenchmarkRow[]
  metricLabels?: Record<string, string>
  metricMax?: Record<string, number>
}

export function ModelPerformanceTable({ models, metricLabels = {}, metricMax = {} }: ModelPerformanceTableProps) {
  const metricKeys = models.length > 0 ? Object.keys(models[0]!.metrics) : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 8, borderWidth: 1, borderColor: border.subtle, overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: 30, alignItems: 'center', paddingLeft: 10, backgroundColor: surface.pill, borderBottomWidth: 1, borderColor: border.subtle }}>
        <div style={{ width: 110 }} />
        {metricKeys.map((k) => (
          <text key={k} style={{ flexGrow: 1, fontSize: 11, fontWeight: 600, color: text.muted, fontFamily: FONT }}>{metricLabels[k] ?? k}</text>
        ))}
      </div>
      {models.map((m) => (
        <div key={m.id} style={{ display: 'flex', flexDirection: 'row', height: 34, alignItems: 'center', paddingLeft: 10, borderBottomWidth: 1, borderColor: border.subtle, hover: { backgroundColor: '#FFFFFF06' } }}>
          <text style={{ width: 110, flexShrink: 0, fontSize: 12.5, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{m.name}</text>
          {metricKeys.map((k) => {
            const max = metricMax[k] ?? 100
            return (
              <div key={k} style={{ flexGrow: 1, paddingRight: 14 }}>
                <div style={{ height: 6, borderRadius: 3, backgroundColor: surface.selected, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (m.metrics[k] / max) * 100)}%`, height: '100%', backgroundColor: '#3B82F6' }} />
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
