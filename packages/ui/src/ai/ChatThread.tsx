/**
 * @atlas/ui — ChatThread
 *
 * A complete chat surface: pinned header + virtualized message scroller +
 * prompt composer (composes `StickyHeader` + `MessageScroller` + `ChatBubble` +
 * `PromptInput`).
 *
 * @example
 *   <ChatThread title="Atlas" messages={msgs} onSend={send} loading={streaming} suggestions={["Summarize"]} />
 */
import { useState } from 'react'
import { border, text } from '../tokens'
import { FONT } from '../tokens'
import { MessageScroller } from './MessageScroller'
import { ChatBubble, type ChatRole } from './ChatBubble'
import { PromptInput } from './PromptInput'

export interface ChatThreadMessage {
  id: string
  role: ChatRole
  content: string
}

export interface ChatThreadProps {
  title?: string
  messages: ChatThreadMessage[]
  onSend: (text: string) => void
  loading?: boolean
  placeholder?: string
  suggestions?: string[]
}

export function ChatThread({ title, messages, onSend, loading = false, placeholder, suggestions }: ChatThreadProps) {
  const [draft, setDraft] = useState('')

  const send = () => {
    const t = draft.trim()
    if (!t) return
    onSend(t)
    setDraft('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div
        style={{
          width: '100%',
          height: 44,
          flexShrink: 0,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 14,
          paddingRight: 14,
          borderBottomWidth: 1,
          borderColor: border.subtle,
        }}
      >
        <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title ?? 'Chat'}</text>
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <MessageScroller height="100%">
          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role} content={m.content} />
          ))}
        </MessageScroller>
      </div>

      <div style={{ padding: 12, borderTopWidth: 1, borderColor: border.subtle }}>
        <PromptInput value={draft} onChange={setDraft} onSubmit={send} loading={loading} placeholder={placeholder} suggestions={suggestions} />
      </div>
    </div>
  )
}
