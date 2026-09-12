/**
 * @atlas/ui — ChatBubble
 *
 * A chat message bubble. Assistant messages render as markdown on a neutral
 * card; user messages render as plain text on the accent, right-aligned.
 *
 * @example
 *   <ChatBubble role="assistant" name="Atlas" avatarLetter="A" content="## Summary\n- shipped" />
 *   <ChatBubble role="user" content="Sounds good!" />
 */
import { surface, border, text, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Avatar } from '../atoms/Avatar'

export type ChatRole = 'user' | 'assistant'

export interface ChatBubbleProps {
  role: ChatRole
  content: string
  avatarSrc?: string
  avatarLetter?: string
  name?: string
  timestamp?: string
  /** Render `content` as markdown (defaults to true for assistant). */
  markdown?: boolean
}

export function ChatBubble({
  role,
  content,
  avatarSrc,
  avatarLetter,
  name,
  timestamp,
  markdown = role === 'assistant',
}: ChatBubbleProps) {
  const isUser = role === 'user'
  const bubbleBg = isUser ? semantic.accent : surface.card

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      {!isUser && <Avatar src={avatarSrc} letter={avatarLetter ?? 'A'} size={28} />}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: isUser ? 'flex-end' : 'flex-start',
          maxWidth: '75%',
        }}
      >
        {name && !isUser ? (
          <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{name}</text>
        ) : null}

        <div
          style={{
            paddingLeft: 14,
            paddingRight: 14,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 12,
            backgroundColor: bubbleBg,
            borderWidth: isUser ? 0 : 1,
            borderColor: border.subtle,
          }}
        >
          {markdown ? (
            <markdown source={content} />
          ) : (
            <text
              style={{
                fontSize: 13,
                color: isUser ? '#FFFFFF' : text.primary,
                fontFamily: FONT,
                whiteSpace: 'normal',
                lineHeight: 1.5,
              }}
            >
              {content}
            </text>
          )}
        </div>

        {timestamp ? (
          <text style={{ fontSize: 10, color: text.ghost, fontFamily: FONT }}>{timestamp}</text>
        ) : null}
      </div>

      {isUser && <Avatar src={avatarSrc} letter={avatarLetter ?? 'U'} size={28} />}
    </div>
  )
}
