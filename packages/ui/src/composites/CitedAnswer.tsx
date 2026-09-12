/**
 * @atlas/ui — CitedAnswer
 *
 * A full cited answer block: assistant bubble + source list + action bar
 * (composes `ChatBubble` + `SourceList` + `RegenerateBar`).
 *
 * @example
 *   <CitedAnswer content={answer} sources={sources} onCopy={copy} onRegenerate={redo} />
 */
import { ChatBubble } from '../ai/ChatBubble'
import { SourceList, type Source } from '../ai/SourceList'
import { RegenerateBar } from '../ai/RegenerateBar'

export interface CitedAnswerProps {
  content: string
  sources?: Source[]
  onCopy?: () => void
  onRegenerate?: () => void
  onLike?: () => void
  onDislike?: () => void
}

export function CitedAnswer({ content, sources, onCopy, onRegenerate, onLike, onDislike }: CitedAnswerProps) {
  const hasActions = Boolean(onCopy || onRegenerate || onLike || onDislike)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <ChatBubble role="assistant" content={content} />
      {sources && sources.length > 0 ? <SourceList sources={sources} /> : null}
      {hasActions ? <RegenerateBar onCopy={onCopy} onRegenerate={onRegenerate} onLike={onLike} onDislike={onDislike} /> : null}
    </div>
  )
}
