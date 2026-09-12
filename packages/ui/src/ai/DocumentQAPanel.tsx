import { useState } from 'react'
import { surface, border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { SearchableList } from '../display/SearchableList'
import { PromptInput } from './PromptInput'

export interface DocChunk {
  id: string
  title: string
  content: string
}

export interface DocumentQAPanelProps {
  chunks: DocChunk[]
  question?: string
  onQuestionChange?: (q: string) => void
  onAsk?: (question: string, context: string) => void
  loading?: boolean
}

export function DocumentQAPanel({ chunks = [], question, onQuestionChange, onAsk, loading = false }: DocumentQAPanelProps) {
  const safeChunks = chunks ?? []
  const [selectedId, setSelectedId] = useState<string>(safeChunks[0]?.id ?? '')
  const currentChunk = safeChunks.find((c) => c.id === selectedId) ?? safeChunks[0]

  const ask = () => {
    if (!question?.trim()) return
    onAsk?.(question, safeChunks.map((c) => c?.content ?? '').join('\n\n'))
    onQuestionChange?.('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: 420, width: '100%', borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, overflow: 'hidden' }}>
      <div style={{ width: 240, flexShrink: 0, borderRightWidth: 1, borderColor: border.subtle, padding: 10, display: 'flex', flexDirection: 'column' }}>
        <SearchableList<DocChunk>
          items={safeChunks}
          getLabel={(c) => c?.title ?? (c as any)?.source ?? ''}
          renderItem={(c) => {
            const isSelected = c.id === (currentChunk?.id ?? '')
            return (
              <div
                onClick={() => setSelectedId(c.id)}
                style={{
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 6,
                  paddingBottom: 6,
                  borderRadius: 6,
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#3B82F622' : 'transparent',
                }}
              >
                <text style={{ fontSize: 12, color: isSelected ? '#60A5FA' : t.primary, fontFamily: FONT }}>
                  {c?.title ?? (c as any)?.source ?? ''}
                </text>
              </div>
            )
          }}
        />
      </div>

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ height: 44, flexShrink: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 14, paddingRight: 14, borderBottomWidth: 1, borderColor: border.subtle }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: FONT }}>
            {currentChunk?.title ?? 'Document Excerpt'}
          </text>
          <div style={{ backgroundColor: '#22C55E18', borderWidth: 1, borderColor: '#22C55E33', borderRadius: 4, paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2 }}>
            <text style={{ fontSize: 10.5, color: '#22C55E', fontFamily: FONT }}>INDEXED</text>
          </div>
        </div>

        <div style={{ flexGrow: 1, padding: 14, overflowY: 'scroll', backgroundColor: '#101012' }}>
          <text style={{ fontSize: 12.5, color: t.secondary, fontFamily: FONT, lineHeight: 1.6, whiteSpace: 'normal' }}>
            {currentChunk?.content ?? 'Select a document chunk to inspect its contents.'}
          </text>
        </div>

        <div style={{ padding: 12, borderTopWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
          <PromptInput value={question ?? ''} onChange={onQuestionChange} onSubmit={ask} loading={loading} placeholder="Ask about this document…" />
        </div>
      </div>
    </div>
  )
}
