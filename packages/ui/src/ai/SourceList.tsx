/**
 * @atlas/ui — SourceList
 *
 * Numbered citations for an AI answer. Each source row is a `HoverCard` showing
 * its snippet/URL on hover.
 *
 * @example
 *   <SourceList sources={[{ title: 'GPUIX docs', url: 'https://…', snippet: '…' }]} />
 */
import { text } from '../tokens'
import { FONT, FONT_MONO } from '../tokens'
import { HoverCard } from '../display/HoverCard'

export interface Source {
  title: string
  url?: string
  snippet?: string
}

export interface SourceListProps {
  sources: Source[]
}

export function SourceList({ sources }: SourceListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {sources.map((s, i) => (
        <HoverCard
          key={i}
          side="top"
          trigger={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 6,
                hover: { backgroundColor: '#FFFFFF0A' },
              }}
            >
              <text style={{ fontSize: 11, fontWeight: 600, color: text.muted, fontFamily: FONT, whiteSpace: 'nowrap', lineHeight: 1, flexShrink: 0 }}>
                {`[${i + 1}]`}
              </text>
              <text style={{ fontSize: 12.5, color: text.secondary, fontFamily: FONT, lineHeight: 1.4, flexGrow: 1 }}>{s.title}</text>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 260 }}>
            {s.snippet ? (
              <text style={{ fontSize: 11.5, color: text.secondary, fontFamily: FONT, lineHeight: 1.4 }}>{s.snippet}</text>
            ) : null}
            {s.url ? (
              <text style={{ fontSize: 10.5, color: text.muted, fontFamily: FONT_MONO }}>{s.url}</text>
            ) : null}
          </div>
        </HoverCard>
      ))}
    </div>
  )
}
