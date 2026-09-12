/** @atlas/ui — AutoSavePill — "Saving… / Saved ✓" indicator. */
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Spinner } from '../effects/Spinner'

export interface AutoSavePillProps {
  state: 'saving' | 'saved' | 'idle' | 'error'
  label?: string
}

export function AutoSavePill({ state, label }: AutoSavePillProps) {
  const saved = state === 'saved'
  const color = state === 'error' ? '#ED4245' : saved ? '#22C55E' : t.muted
  const text = label ?? (state === 'saving' ? 'Saving…' : state === 'error' ? 'Save failed' : state === 'idle' ? 'Autosave' : 'Saved')
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 10,
        borderRadius: 999,
        backgroundColor: surface.card,
        borderWidth: 1,
        borderColor: border.subtle,
        alignSelf: 'flex-start',
      }}
    >
      {state === 'saving' ? (
        <Spinner size={10} />
      ) : (
        <div style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: color, flexShrink: 0 }} />
      )}
      <text style={{ fontSize: 11, color, fontFamily: FONT }}>{text}</text>
    </div>
  )
}
