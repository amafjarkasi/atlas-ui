/** @atlas/ui — ConfigDiffReview — review an agent's proposed config/JSON change. */
import { border, text as t } from '../tokens'
import { FONT_MONO } from '../tokens'
import { Button } from '../atoms/Button'
import { diffLines } from './diff'

export interface ConfigDiffReviewProps {
  before?: string | unknown
  after?: string | unknown
  title?: string
  acceptLabel?: string
  rejectLabel?: string
  onAccept?: () => void
  onReject?: () => void
}

const toText = (v: string | unknown): string => (typeof v === 'string' ? v : JSON.stringify(v, null, 2))

export function ConfigDiffReview({ before, after, title = 'Proposed change', acceptLabel = 'Accept', rejectLabel = 'Reject', onAccept, onReject }: ConfigDiffReviewProps) {
  const lines = diffLines(toText(before ?? ''), toText(after ?? ''))
  const color = { add: '#22C55E', del: '#ED4245', keep: '#8A8A90' } as const
  const prefix = { add: '+', del: '-', keep: ' ' } as const

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderWidth: 1, borderColor: border.subtle, borderRadius: 10, padding: 10 }}>
      <text style={{ fontSize: 12.5, fontWeight: 600, color: t.primary, fontFamily: FONT_MONO }}>{title}</text>
      <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 260, overflowY: 'scroll' }}>
        {lines.map((l, i) => (
          <text key={i} style={{ fontSize: 11.5, color: color[l.type], fontFamily: FONT_MONO, lineHeight: 1.5, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {prefix[l.type]} {l.text}
          </text>
        ))}
      </div>
      {onAccept || onReject ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
          {onReject ? <Button size="sm" variant="ghost" onClick={onReject}>{rejectLabel}</Button> : null}
          {onAccept ? <Button size="sm" onClick={onAccept}>{acceptLabel}</Button> : null}
        </div>
      ) : null}
    </div>
  )
}
