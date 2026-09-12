/** @atlas/ui — HelpCopilot — document Q&A with a running answer list. */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { DocumentQAPanel, type DocChunk } from './DocumentQAPanel'
import { ChatBubble } from './ChatBubble'

export interface HelpCopilotProps {
  chunks: DocChunk[]
  question?: string
  onQuestionChange?: (q: string) => void
  onAsk?: (question: string, context: string) => void
  loading?: boolean
  answers?: { id: string; content: string }[]
}

export function HelpCopilot({ chunks, question, onQuestionChange, onAsk, loading = false, answers = [] }: HelpCopilotProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <text style={{ fontSize: 14, fontWeight: 600, color: t.primary, fontFamily: FONT, padding: 10 }}>Help copilot</text>
      <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'scroll', padding: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {answers.map((a) => (
          <ChatBubble key={a.id} role="assistant" content={a.content} />
        ))}
      </div>
      <DocumentQAPanel chunks={chunks} question={question} onQuestionChange={onQuestionChange} onAsk={onAsk} loading={loading} />
    </div>
  )
}
