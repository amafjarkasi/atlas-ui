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

const ROW_HEIGHT = 20

export function DownloadCard({ name, state = 'downloading', progress = 0, size, onCancel, onOpen }: DownloadCardProps) {
  const color = state === 'error' ? '#ED4245' : state === 'done' ? '#22C55E' : '#3B82F6'
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
        width: 440,
        alignSelf: 'flex-start',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.card,
      }}
    >
      <div style={{ width: 16, height: ROW_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon
          name={state === 'done' ? 'checkCircle' : state === 'error' ? 'alertCircle' : 'download'}
          size={16}
          color={color}
        />
      </div>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            minHeight: ROW_HEIGHT,
          }}
        >
          <text style={{ fontSize: 12.5, color: t.primary, fontFamily: FONT, flexGrow: 1 }}>{name}</text>
          {size ? <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT, flexShrink: 0 }}>{size}</text> : null}
        </div>
        {state === 'downloading' ? <ProgressBar value={progress} height={4} /> : null}
      </div>
      {state === 'downloading' && onCancel ? (
        <div
          onClick={onCancel}
          style={{
            cursor: 'pointer',
            width: 24,
            height: ROW_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon name="x" size={13} color={t.muted} />
        </div>
      ) : state === 'done' && onOpen ? (
        <div
          onClick={onOpen}
          style={{
            cursor: 'pointer',
            width: 24,
            height: ROW_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon name="external" size={13} color={t.muted} />
        </div>
      ) : null}
    </div>
  )
}
