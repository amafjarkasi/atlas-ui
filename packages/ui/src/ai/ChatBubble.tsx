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

const AVATAR_SIZE = 28
const BUBBLE_PAD = 12
const AVATAR_GAP = 10
const NAME_GAP = 8
const CONTENT_INDENT = AVATAR_SIZE + AVATAR_GAP

function AvatarSlot({
  avatarSrc,
  avatarLetter,
  fallbackLetter,
}: {
  avatarSrc?: string
  avatarLetter?: string
  fallbackLetter: string
}) {
  return (
    <div
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        flexShrink: 0,
        marginRight: AVATAR_GAP,
      }}
    >
      <Avatar src={avatarSrc} letter={avatarLetter ?? fallbackLetter} size={AVATAR_SIZE} />
    </div>
  )
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
  const fallbackLetter = isUser ? 'U' : 'A'

  const nameLabel = name ? (
    <text
      style={{
        fontSize: 11,
        color: text.muted,
        fontFamily: FONT,
        lineHeight: 1.2,
      }}
    >
      {name}
    </text>
  ) : null

  const bubble = (
    <div
      style={{
        paddingLeft: BUBBLE_PAD,
        paddingRight: BUBBLE_PAD,
        paddingTop: BUBBLE_PAD,
        paddingBottom: BUBBLE_PAD,
        borderRadius: 10,
        backgroundColor: bubbleBg,
        borderWidth: isUser ? 0 : 1,
        borderColor: border.subtle,
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
        maxWidth: 520,
      }}
    >
      {markdown ? (
        <markdown
          source={content}
          style={{
            fontSize: 13,
            lineHeight: 18,
            color: text.primary,
            fontFamily: FONT,
          }}
        />
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
  )

  if (isUser) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: NAME_GAP,
            alignItems: 'flex-end',
            maxWidth: 520,
            marginRight: AVATAR_GAP,
          }}
        >
          {nameLabel}
          {bubble}
          {timestamp ? (
            <text style={{ fontSize: 10, color: text.ghost, fontFamily: FONT, lineHeight: 1.2 }}>{timestamp}</text>
          ) : null}
        </div>
        <div style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, flexShrink: 0 }}>
          <Avatar src={avatarSrc} letter={avatarLetter ?? fallbackLetter} size={AVATAR_SIZE} />
        </div>
      </div>
    )
  }

  if (name) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: NAME_GAP,
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <AvatarSlot avatarSrc={avatarSrc} avatarLetter={avatarLetter} fallbackLetter={fallbackLetter} />
          {nameLabel}
        </div>

        <div style={{ paddingLeft: CONTENT_INDENT, width: '100%' }}>{bubble}</div>

        {timestamp ? (
          <div style={{ paddingLeft: CONTENT_INDENT, width: '100%' }}>
            <text style={{ fontSize: 10, color: text.ghost, fontFamily: FONT, lineHeight: 1.2 }}>{timestamp}</text>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <AvatarSlot avatarSrc={avatarSrc} avatarLetter={avatarLetter} fallbackLetter={fallbackLetter} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: NAME_GAP,
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {bubble}
        {timestamp ? (
          <text style={{ fontSize: 10, color: text.ghost, fontFamily: FONT, lineHeight: 1.2 }}>{timestamp}</text>
        ) : null}
      </div>
    </div>
  )
}
