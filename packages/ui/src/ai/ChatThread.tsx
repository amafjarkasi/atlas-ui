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
  name?: string
  avatarLetter?: string
  avatarSrc?: string
  timestamp?: string
}

export interface ChatThreadProps {
  title?: string
  messages: ChatThreadMessage[]
  onSend: (text: string) => void
  loading?: boolean
  placeholder?: string
  suggestions?: string[]
  userName?: string
  assistantName?: string
}

export function ChatThread({
  title,
  messages = [],
  onSend,
  loading = false,
  placeholder,
  suggestions,
  userName,
  assistantName,
}: ChatThreadProps) {
  const [draft, setDraft] = useState('')
  const safeMessages = messages ?? []

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
          height: 48,
          flexShrink: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 16,
          paddingRight: 16,
          borderBottomWidth: 1,
          borderColor: border.subtle,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title ?? 'Chat'}</text>
          <div style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: '#22C55E' }} />
        </div>
        {loading && (
          <div style={{ backgroundColor: '#3B82F618', borderRadius: 4, paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2 }}>
            <text style={{ fontSize: 10.5, color: '#60A5FA', fontFamily: FONT }}>GENERATING…</text>
          </div>
        )}
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <MessageScroller height="100%">
          {safeMessages.map((m) => {
            const isUser = m.role === 'user'
            const authorName = m.name ?? (isUser ? userName : assistantName)
            const letter = m.avatarLetter ?? (isUser ? 'U' : 'A')
            return (
              <ChatBubble
                key={m.id}
                role={m.role}
                content={m.content}
                name={authorName}
                avatarLetter={letter}
                avatarSrc={m.avatarSrc}
                timestamp={m.timestamp}
              />
            )
          })}
        </MessageScroller>
      </div>

      <div style={{ padding: 12, borderTopWidth: 1, borderColor: border.subtle }}>
        <PromptInput value={draft} onChange={setDraft} onSubmit={send} loading={loading} placeholder={placeholder} suggestions={suggestions} />
      </div>
    </div>
  )
}
