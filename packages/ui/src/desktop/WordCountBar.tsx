/** @atlas/ui — WordCountBar — line/word/char counts. */
import { text as t } from '../tokens'
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
    <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT }}>{parts.join(' · ')}</text>
  )
}
