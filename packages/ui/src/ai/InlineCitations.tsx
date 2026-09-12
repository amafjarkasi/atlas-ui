/**
 * @atlas/ui — InlineCitations
 *
 * Renders an answer's plain text with `[1]`-style markers turned into hoverable
 * citation chips (composes `CitationTooltip`).
 *
 * @example
 *   <InlineCitations text="GPUI is GPU-native [1]. It uses Taffy layout [2]." sources={sources} />
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { CitationTooltip, type CitationTooltipProps } from '../composites/CitationTooltip'

export interface InlineCitationsProps {
  text: string
  sources: { title: string; url?: string; snippet?: string }[]
  fontSize?: number
}

export function InlineCitations({ text = '', sources = [], fontSize = 13 }: InlineCitationsProps) {
  const safeText = text ?? ''
  const safeSources = sources ?? []
  // Split on "[n]" markers.
  const parts: (string | { index: number })[] = []
  const re = /\[(\d+)\]/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(safeText))) {
    if (m.index > last) parts.push(safeText.slice(last, m.index))
    parts.push({ index: Number(m[1]) - 1 })
    last = m.index + m[0].length
  }
  if (last < safeText.length) parts.push(safeText.slice(last))

  return (
    <div style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline' }}>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          <text key={i} style={{ fontSize, color: textTokens.primary, fontFamily: FONT }}>
            {p}
          </text>
        ) : safeSources[p.index] ? (
          <CitationTooltip
            key={i}
            index={p.index + 1}
            title={safeSources[p.index]!.title}
            url={safeSources[p.index]!.url}
            snippet={safeSources[p.index]!.snippet}
          />
        ) : (
          <text key={i} style={{ fontSize, color: textTokens.muted, fontFamily: FONT }}>
            [{p.index + 1}]
          </text>
        ),
      )}
    </div>
  )
}

export type { CitationTooltipProps as InlineCitationSource }
