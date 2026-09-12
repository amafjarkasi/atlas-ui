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

export function ModelPerformanceTable({ models = [], metricLabels = {}, metricMax = {} }: ModelPerformanceTableProps) {
  const safeModels = models ?? []
  const metricKeys = safeModels.length > 0 && safeModels[0]?.metrics ? Object.keys(safeModels[0].metrics) : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: 34, alignItems: 'center', backgroundColor: '#1A1A1D', borderBottomWidth: 1, borderColor: border.subtle }}>
        <div style={{ width: 140, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 12, borderRightWidth: metricKeys.length > 0 ? 1 : 0, borderColor: border.subtle }}>
          <text style={{ fontSize: 11.5, fontWeight: 600, color: text.muted, fontFamily: FONT, lineHeight: 1 }}>Model</text>
        </div>
        {metricKeys.map((k, kIdx) => {
          const isLast = kIdx === metricKeys.length - 1
          return (
            <div key={k} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0, height: '100%', display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 12, borderRightWidth: isLast ? 0 : 1, borderColor: border.subtle }}>
              <text style={{ fontSize: 11.5, fontWeight: 600, color: text.muted, fontFamily: FONT, lineHeight: 1 }}>{metricLabels[k] ?? k}</text>
            </div>
          )
        })}
      </div>
      {safeModels.map((m, idx) => (
        <div key={m.id ?? m.name ?? idx} style={{ display: 'flex', flexDirection: 'row', height: 42, alignItems: 'center', borderBottomWidth: idx === safeModels.length - 1 ? 0 : 1, borderColor: border.subtle, hover: { backgroundColor: '#FFFFFF06' } }}>
          <div style={{ width: 140, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 12, borderRightWidth: metricKeys.length > 0 ? 1 : 0, borderColor: border.subtle }}>
            <text style={{ fontSize: 12.5, fontWeight: 600, color: text.primary, fontFamily: FONT, lineHeight: 1 }}>{m.name}</text>
          </div>
          {metricKeys.map((k, kIdx) => {
            const isLast = kIdx === metricKeys.length - 1
            const max = metricMax[k] ?? 100
            const val = m.metrics[k] ?? 0
            const pct = Math.min(100, Math.max(0, (val / max) * 100))
            return (
              <div key={k} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0, height: '100%', paddingLeft: 12, paddingRight: 12, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, borderRightWidth: isLast ? 0 : 1, borderColor: border.subtle }}>
                <div style={{ flexGrow: 1, height: 6, borderRadius: 3, backgroundColor: surface.selected, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', backgroundColor: pct > 80 ? '#3B82F6' : pct > 50 ? '#EAB308' : '#ED4245', borderRadius: 3 }} />
                </div>
                <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT, width: 28, textAlign: 'right', lineHeight: 1 }}>{val}</text>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
