/** @atlas/ui — ModelJourney — per-turn model/timing/token history. */
import { text as t, border } from '../tokens'
import { FONT } from '../tokens'

export interface JourneyTurn {
  id: string
  label: string
  model: string
  ms?: number
  tokens?: number
  cost?: number
  error?: boolean
}

export interface ModelJourneyProps {
  turns: JourneyTurn[]
}

const ROW_HEIGHT = 13

export function ModelJourney({ turns }: ModelJourneyProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {turns.map((x, i) => {
        const metaParts = [
          x.ms !== undefined ? `${x.ms}ms` : null,
          x.tokens !== undefined ? `${x.tokens.toLocaleString()} tok` : null,
          x.cost !== undefined ? `\$${x.cost.toFixed(4)}` : null,
          x.error ? 'failed' : null,
        ].filter(Boolean)
        const meta = metaParts.join(' · ')
        const dotColor = x.error ? '#ED4245' : '#3B82F6'
        return (
          <div
            key={x.id ?? i}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingTop: 9,
              paddingBottom: 9,
              borderBottomWidth: i < turns.length - 1 ? 1 : 0,
              borderColor: border.subtle,
            }}
          >
            <div style={{ width: 7, height: ROW_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: dotColor }} />
            </div>
            <text style={{ fontSize: 12.5, fontWeight: 600, color: x.error ? '#ED4245' : t.primary, fontFamily: FONT, lineHeight: 1, flexGrow: 1 }}>
              {x.label || x.model || `Step ${i + 1}`}
            </text>
            {meta ? (
              <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT, lineHeight: 1, whiteSpace: 'nowrap', flexShrink: 0 }}>{meta}</text>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
