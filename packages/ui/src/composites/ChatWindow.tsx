/**
 * @atlas/ui — ChatWindow
 *
 * A full chat surface with optional header/footer and a thinking indicator
 * (composes `ChatThread` + `ThinkingIndicator`).
 *
 * @example
 *   <ChatWindow title="Assistant" messages={msgs} onSend={send} loading={streaming} header={<ModelPicker … />} />
 */
import type { ReactNode } from 'react'
import { ChatThread, type ChatThreadMessage } from '../ai/ChatThread'
import { ThinkingIndicator } from '../ai/ThinkingIndicator'

export interface ChatWindowProps {
  title?: string
  messages: ChatThreadMessage[]
  onSend: (text: string) => void
  loading?: boolean
  placeholder?: string
  suggestions?: string[]
  header?: ReactNode
  footer?: ReactNode
}

export function ChatWindow({ title, messages, onSend, loading = false, placeholder, suggestions, header, footer }: ChatWindowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {header}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <ChatThread title={title} messages={messages} onSend={onSend} loading={loading} placeholder={placeholder} suggestions={suggestions} />
      </div>
      {loading ? (
        <div style={{ paddingLeft: 16, paddingRight: 16 }}>
          <ThinkingIndicator />
        </div>
      ) : null}
      {footer}
    </div>
  )
}
