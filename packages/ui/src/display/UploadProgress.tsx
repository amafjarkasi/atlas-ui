/**
 * @atlas/ui — UploadProgress
 *
 * A transfer/upload row with progress + actions (composes `ProgressBar`).
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { ProgressBar } from '../inputs/ProgressBar'

export type UploadStatus = 'uploading' | 'done' | 'error'

export interface UploadProgressProps {
  name: string
  progress?: number
  status?: UploadStatus
  size?: string
  onCancel?: () => void
  onOpen?: () => void
}

export function UploadProgress({ name, progress = 0, status = 'uploading', size, onCancel, onOpen }: UploadProgressProps) {
  const color = status === 'error' ? '#ED4245' : status === 'done' ? '#22C55E' : '#3B82F6'
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 }}>
      <Icon name={status === 'done' ? 'checkCircle' : status === 'error' ? 'alertCircle' : 'file'} size={16} color={color} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <text style={{ fontSize: 12.5, color: textTokens.primary, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name}</text>
          {size ? <text style={{ fontSize: 11, color: textTokens.muted, fontFamily: FONT }}>{size}</text> : null}
        </div>
        {status === 'uploading' ? <ProgressBar value={progress} height={4} /> : null}
      </div>
      {status === 'uploading' && onCancel ? (
        <div onClick={onCancel} style={{ cursor: 'pointer', padding: 3 }}><Icon name="x" size={12} color={textTokens.muted} /></div>
      ) : status === 'done' && onOpen ? (
        <div onClick={onOpen} style={{ cursor: 'pointer', padding: 3 }}><Icon name="external" size={12} color={textTokens.muted} /></div>
      ) : null}
    </div>
  )
}
