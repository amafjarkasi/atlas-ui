/** @atlas/ui — ContextBrowser — scrollable context chunks with search highlight + token counts. */
import { border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { VirtualList } from '../layout/VirtualList'
import { SearchHighlights } from '../display/SearchHighlights'

export interface ContextChunk {
  id: string
  title: string
  text: string
  tokens?: number
}

export interface ContextBrowserProps {
  chunks: ContextChunk[]
  query?: string
  height?: number | string
}

export function ContextBrowser({ chunks, query = '', height = '100%' }: ContextBrowserProps) {
  const filtered = query ? chunks.filter((c) => c.text.toLowerCase().includes(query.toLowerCase()) || c.title.toLowerCase().includes(query.toLowerCase())) : chunks
  return (
    <VirtualList<ContextChunk>
      items={filtered}
      estimatedItemHeight={52}
      height={height}
      renderItem={(c) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: 8, borderBottomWidth: 1, borderColor: border.subtle }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <text style={{ fontSize: 12, fontWeight: 600, color: t.primary, fontFamily: FONT }}>{c.title}</text>
            {c.tokens !== undefined ? (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}>
                <text style={{ fontSize: 10.5, color: t.muted, fontFamily: FONT, whiteSpace: 'nowrap' }}>{`${c.tokens.toLocaleString()} tok`}</text>
              </div>
            ) : null}
          </div>
          <SearchHighlights text={c.text} query={query} fontSize={11.5} />
        </div>
      )}
    />
  )
}
