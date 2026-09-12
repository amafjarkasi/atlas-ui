/**
 * @atlas/ui — ScoringPanel
 *
 * Per-criterion quality scores with bars and comments (composes `BulletChart`).
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { BulletChart } from '../dataviz/BulletChart'

export interface ScoreCriterion {
  id: string
  label: string
  score: number
  max?: number
  note?: string
}

export interface ScoringPanelProps {
  criteria: ScoreCriterion[]
  overall?: number
}

export function ScoringPanel({ criteria, overall }: ScoringPanelProps) {
  const max = Math.max(...criteria.map((c) => c.max ?? 100), 1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {overall !== undefined ? (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <text style={{ fontSize: 15, fontWeight: 700, color: textTokens.primary, fontFamily: FONT }}>{overall}/100</text>
          <text style={{ fontSize: 12, color: textTokens.muted, fontFamily: FONT }}>overall</text>
        </div>
      ) : null}

      {criteria.map((c) => (
        <div key={c.id} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <text style={{ fontSize: 12, color: textTokens.secondary, fontFamily: FONT }}>{c.label}</text>
            <text style={{ fontSize: 11.5, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>{c.score}</text>
          </div>
          <BulletChart value={c.score} target={(c.max ?? 100) * 0.8} max={c.max ?? max} width={260} height={10} />
          {c.note ? <text style={{ fontSize: 11, color: textTokens.muted, fontFamily: FONT }}>{c.note}</text> : null}
        </div>
      ))}
    </div>
  )
}
