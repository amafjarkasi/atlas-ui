/**
 * @atlas/ui — SearchHighlights
 *
 * Renders text with every match of `query` tinted with the highlight color
 * (pure substring split — generalizes `Marker` to many matches in one label).
 *
 * @example
 *   <SearchHighlights text="The routing board shipped" query="route" />
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'

export interface SearchHighlightsProps {
  text: string
  query: string
  color?: string
  fontSize?: number
}

export function SearchHighlights({ text, query, color = '#EAB308', fontSize = 12.5 }: SearchHighlightsProps) {
  const q = query.trim()
  const parts: { value: string; hit: boolean }[] = []

  if (!q) {
    parts.push({ value: text, hit: false })
  } else {
    const lower = text.toLowerCase()
    const ql = q.toLowerCase()
    let i = 0
    while (i < text.length) {
      const idx = lower.indexOf(ql, i)
      if (idx === -1) {
        parts.push({ value: text.slice(i), hit: false })
        break
      }
      if (idx > i) parts.push({ value: text.slice(i, idx), hit: false })
      parts.push({ value: text.slice(idx, idx + ql.length), hit: true })
      i = idx + ql.length
    }
  }

  return (
    <div style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {parts.map((p, i) => (
        <text key={i} style={{ fontSize, color: p.hit ? color : textTokens.primary, fontFamily: FONT, fontWeight: p.hit ? 700 : 400 }}>
          {p.value}
        </text>
      ))}
    </div>
  )
}
