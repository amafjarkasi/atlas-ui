/**
 * @atlas/ui — RegenerateBar
 *
 * A compact action row for an AI answer: copy, regenerate, like, dislike
 * (composes `IconButton`).
 *
 * @example
 *   <RegenerateBar onCopy={copy} onRegenerate={redo} onLike={up} />
 */
import { IconButton } from '../atoms/IconButton'

export interface RegenerateBarProps {
  onCopy?: () => void
  onRegenerate?: () => void
  onLike?: () => void
  onDislike?: () => void
}

export function RegenerateBar({ onCopy, onRegenerate, onLike, onDislike }: RegenerateBarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      {onCopy ? <IconButton icon="copy" onClick={onCopy} /> : null}
      {onRegenerate ? <IconButton icon="refresh" onClick={onRegenerate} /> : null}
      {onLike ? <IconButton icon="thumbsUp" onClick={onLike} /> : null}
      {onDislike ? <IconButton icon="block" onClick={onDislike} /> : null}
    </div>
  )
}
