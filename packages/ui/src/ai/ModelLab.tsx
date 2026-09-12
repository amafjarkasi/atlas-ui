/** @atlas/ui — ModelLab — benchmarks + A/B comparer + scoring in one panel. */
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {models ? <ModelPerformanceTable models={models} metricLabels={metricLabels} /> : null}
      {comparer ? <ResponseComparer left={comparer.left} right={comparer.right} onPick={onPick} /> : null}
      {criteria ? <ScoringPanel criteria={criteria} /> : null}
    </div>
  )
}
