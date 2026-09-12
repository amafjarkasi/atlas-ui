/** @atlas/ui — DocumentQAPanel — searchable document + ask panel (RAG shell). */
import { border, text as t } from '../tokens'
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
  const ask = () => {
    if (!question?.trim()) return
    onAsk?.(question, safeChunks.map((c) => c?.content ?? '').join('\n\n'))
    onQuestionChange?.('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%' }}>
      <div style={{ width: 260, flexShrink: 0, borderRightWidth: 1, borderColor: border.subtle, padding: 8 }}>
        <SearchableList<DocChunk>
          items={safeChunks}
          getLabel={(c) => c?.title ?? (c as any)?.source ?? ''}
          height="100%"
          renderItem={(c) => <text style={{ fontSize: 12, color: t.primary, fontFamily: FONT, padding: 4 }}>{c?.title ?? (c as any)?.source ?? ''}</text>}
        />
      </div>
      <div style={{ flexGrow: 1, padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 8 }}>
        <PromptInput value={question ?? ''} onChange={onQuestionChange} onSubmit={ask} loading={loading} placeholder="Ask about this document…" />
      </div>
    </div>
  )
}
