import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { ModelPerformanceTable, type BenchmarkRow } from './ModelPerformanceTable'
import { ResponseComparer, type ComparableResponse } from './ResponseComparer'
import { ScoringPanel, type ScoreCriterion } from './ScoringPanel'

export interface ModelLabProps {
  models?: BenchmarkRow[]
  metricLabels?: Record<string, string>
  comparer?: { left: ComparableResponse; right: ComparableResponse }
  criteria?: ScoreCriterion[]
  onPick?: (id: string) => void
}

export function ModelLab({ models, metricLabels, comparer, criteria, onPick }: ModelLabProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      {models ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>Model performance benchmarks</text>
          <ModelPerformanceTable models={models} metricLabels={metricLabels} />
        </div>
      ) : null}
      {comparer ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>Side-by-side answer comparison</text>
          <ResponseComparer left={comparer.left} right={comparer.right} onPick={onPick} />
        </div>
      ) : null}
      {criteria ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>Evaluation criteria</text>
          <ScoringPanel criteria={criteria} />
        </div>
      ) : null}
    </div>
  )
}
