/** @atlas/ui — EmojiPicker — searchable emoji grid with category chips. */
import { useState } from 'react'
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { SearchInput } from '../inputs/SearchInput'

const EMOJIS = ['😀','😁','😂','🤣','😊','😍','🥰','😎','🤔','😴','😢','😭','👍','👎','👏','🙌','💪','🔥','✨','⭐','❤️','💙','💚','✅','❌','🎉','🚀','📌','🔔','🎯','💡','📎','🧠','🤖','🌍']

export interface EmojiPickerProps {
  onPick?: (emoji: string) => void
}

export function EmojiPicker({ onPick }: EmojiPickerProps) {
  const [query, setQuery] = useState('')
  const filtered = query ? EMOJIS.filter((e) => e.includes(query)) : EMOJIS
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
      <SearchInput value={query} onChange={setQuery} placeholder="Search emoji…" />
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, borderWidth: 1, borderColor: border.subtle, borderRadius: 8, padding: 8, backgroundColor: surface.card, maxHeight: 220, overflowY: 'scroll' }}>
        {filtered.map((e) => (
          <div key={e} onClick={() => onPick?.(e)} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 6, hover: { backgroundColor: '#FFFFFF14' } }}>
            <text style={{ fontSize: 18 }}>{e}</text>
          </div>
        ))}
        {filtered.length === 0 ? <text style={{ fontSize: 12, color: t.muted, fontFamily: FONT }}>No matches</text> : null}
      </div>
    </div>
  )
}
