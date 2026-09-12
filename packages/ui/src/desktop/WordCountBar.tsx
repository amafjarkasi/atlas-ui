/** @atlas/ui — WordCountBar — line/word/char counts. */
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'

export interface WordCountBarProps {
  lines?: number
  words?: number
  characters?: number
}

export function WordCountBar({ lines, words, characters }: WordCountBarProps) {
  const parts = [
    lines !== undefined ? `${lines} lines` : null,
    words !== undefined ? `${words} words` : null,
    characters !== undefined ? `${characters} chars` : null,
  ].filter(Boolean) as string[]
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        backgroundColor: surface.card,
        borderWidth: 1,
        borderColor: border.subtle,
        alignSelf: 'flex-start',
      }}
    >
      <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT }}>{parts.join('  ·  ')}</text>
    </div>
  )
}
