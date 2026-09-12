/**
 * @atlas/ui — LoadingOverlay
 *
 * A dimmed full-surface overlay with a spinner and optional label (composes
 * `Spinner`).
 *
 * @example
 *   <LoadingOverlay visible={saving} label="Saving…" />
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Spinner } from '../effects/Spinner'

export interface LoadingOverlayProps {
  visible?: boolean
  label?: string
  dim?: number
}

export function LoadingOverlay({ visible = true, label, dim = 0.4 }: LoadingOverlayProps) {
  if (!visible) return null

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#000000', opacity: dim }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <Spinner size={22} />
        {label ? <text style={{ fontSize: 12, color: textTokens.secondary, fontFamily: FONT }}>{label}</text> : null}
      </div>
    </div>
  )
}
