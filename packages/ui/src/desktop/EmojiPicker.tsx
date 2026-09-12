/** @atlas/ui — EmojiPicker — searchable emoji grid with category chips. */
import { useState } from 'react'
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { SearchInput } from '../inputs/SearchInput'

const EMOJIS = [
  '😀', '😁', '😂', '🤣', '😊', '😍', '🥰', '😎',
  '🤔', '😴', '😢', '😭', '👍', '👎', '👏', '🙌',
  '💪', '🔥', '✨', '⭐', '❤️', '💙', '💚', '✅',
  '❌', '🎉', '🚀', '📌', '🔔', '🎯', '💡', '📎',
  '🧠', '🤖', '🌍', '💬',
]

const COLS = 8
const CELL = 40
const GAP = 4
const PAD = 12
const GRID_WIDTH = COLS * CELL + (COLS - 1) * GAP

export interface EmojiPickerProps {
  onPick?: (emoji: string) => void
}

export function EmojiPicker({ onPick }: EmojiPickerProps) {
  const [query, setQuery] = useState('')
  const filtered = query ? EMOJIS.filter((e) => e.includes(query)) : EMOJIS
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: GRID_WIDTH + PAD * 2,
        alignSelf: 'flex-start',
        padding: PAD,
        borderWidth: 1,
        borderColor: border.subtle,
        borderRadius: 10,
        backgroundColor: surface.card,
      }}
    >
      <SearchInput value={query} onChange={setQuery} placeholder="Search emoji…" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: GAP,
          width: GRID_WIDTH,
        }}
      >
        {filtered.map((e) => (
          <div
            key={e}
            onClick={() => onPick?.(e)}
            style={{
              width: CELL,
              height: CELL,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: 8,
              hover: { backgroundColor: '#FFFFFF14' },
            }}
          >
            <text style={{ fontSize: 22 }}>{e}</text>
          </div>
        ))}
        {filtered.length === 0 ? <text style={{ fontSize: 12, color: t.muted, fontFamily: FONT }}>No matches</text> : null}
      </div>
    </div>
  )
}
