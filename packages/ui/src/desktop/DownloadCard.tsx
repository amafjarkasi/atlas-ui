/** @atlas/ui — DownloadCard — download progress with cancel/open. */
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { ProgressBar } from '../inputs/ProgressBar'

export type DownloadState = 'downloading' | 'done' | 'error'

export interface DownloadCardProps {
  name: string
  state?: DownloadState
  progress?: number
  size?: string
  onCancel?: () => void
  onOpen?: () => void
}

export function DownloadCard({ name, state = 'downloading', progress = 0, size, onCancel, onOpen }: DownloadCardProps) {
  const color = state === 'error' ? '#ED4245' : state === 'done' ? '#22C55E' : '#3B82F6'
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
      <Icon name={state === 'done' ? 'checkCircle' : state === 'error' ? 'alertCircle' : 'download'} size={16} color={color} />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <text style={{ fontSize: 12.5, color: t.primary, fontFamily: FONT }}>{name}</text>
          {size ? <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT }}>{size}</text> : null}
        </div>
        {state === 'downloading' ? <ProgressBar value={progress} height={4} /> : null}
      </div>
      {state === 'downloading' && onCancel ? (
        <div onClick={onCancel} style={{ cursor: 'pointer', padding: 3 }}><Icon name="x" size={12} color={t.muted} /></div>
      ) : state === 'done' && onOpen ? (
        <div onClick={onOpen} style={{ cursor: 'pointer', padding: 3 }}><Icon name="external" size={13} color={t.muted} /></div>
      ) : null}
    </div>
  )
}
