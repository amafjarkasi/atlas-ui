/** @atlas/ui — ModelJourney — per-turn model/timing/token history. */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { Timeline } from '../display/Timeline'

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

export function ModelJourney({ turns }: ModelJourneyProps) {
  return (
    <Timeline
      items={turns.map((x) => ({
        id: x.id,
        title: x.label,
        time: `${x.model}${x.ms !== undefined ? ` · ${x.ms}ms` : ''}${x.tokens !== undefined ? ` · ${x.tokens.toLocaleString()} tok` : ''}${x.cost !== undefined ? ` · $${x.cost.toFixed(4)}` : ''}${x.error ? ' · failed' : ''}`,
        dotColor: x.error ? '#ED4245' : undefined,
      }))}
    />
  )
}
