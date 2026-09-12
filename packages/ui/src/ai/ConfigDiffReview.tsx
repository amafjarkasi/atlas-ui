/** @atlas/ui — ConfigDiffReview — review an agent's proposed config/JSON change. */
import { border, surface, text as t } from '../tokens'
import { FONT, FONT_MONO } from '../tokens'
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <text style={{ fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: FONT, lineHeight: 1 }}>{title}</text>
        <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT, lineHeight: 1 }}>{lines.length} lines</text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 260, overflowY: 'scroll', backgroundColor: surface.code, borderRadius: 8, padding: 8, borderWidth: 1, borderColor: border.subtle }}>
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              minHeight: 20,
              paddingLeft: 6,
              paddingRight: 6,
              borderRadius: 3,
              backgroundColor: l.type === 'add' ? '#22C55E14' : l.type === 'del' ? '#ED424514' : 'transparent',
              gap: 6,
            }}
          >
            <div style={{ width: 14, flexShrink: 0 }}>
              <text style={{ fontSize: 11.5, color: color[l.type], fontFamily: FONT_MONO, fontWeight: 600 }}>
                {prefix[l.type]}
              </text>
            </div>
            <text style={{ fontSize: 11.5, color: color[l.type], fontFamily: FONT_MONO, lineHeight: 1.45, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {l.text}
            </text>
          </div>
        ))}
      </div>
      {onAccept || onReject ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'flex-end', paddingTop: 4 }}>
          {onReject ? <Button size="sm" variant="ghost" onClick={onReject}>{rejectLabel}</Button> : null}
          {onAccept ? <Button size="sm" onClick={onAccept}>{acceptLabel}</Button> : null}
        </div>
      ) : null}
    </div>
  )
}
