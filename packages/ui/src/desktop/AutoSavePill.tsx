/** @atlas/ui — AutoSavePill — "Saving… / Saved ✓" indicator. */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { Spinner } from '../effects/Spinner'

export interface AutoSavePillProps {
  state: 'saving' | 'saved' | 'idle' | 'error'
  label?: string
}

export function AutoSavePill({ state, label }: AutoSavePillProps) {
  const saved = state === 'saved'
  const color = state === 'error' ? '#ED4245' : saved ? '#22C55E' : t.muted
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {state === 'saving' ? <Spinner size={10} /> : null}
      <text style={{ fontSize: 11, color, fontFamily: FONT }}>{label ?? (state === 'saving' ? 'Saving…' : state === 'error' ? 'Save failed' : 'Saved')}</text>
    </div>
  )
}
