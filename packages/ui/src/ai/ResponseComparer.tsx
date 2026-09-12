/**
 * @atlas/ui — ResponseComparer
 *
 * A/B side-by-side comparison of two model answers with copy + pick actions.
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Card } from '../layout/Card'
import { CopyButton } from '../atoms/CopyButton'
import { Button } from '../atoms/Button'
import { Divider } from '../display/Divider'

export interface ComparableResponse {
  id: string
  label: string
  content: string
}

export interface ResponseComparerProps {
  left: ComparableResponse
  right: ComparableResponse
  onPick?: (id: string) => void
  onCopy?: (id: string, content: string) => void
}

function Pane({ r, onCopy }: { r?: ComparableResponse; onCopy?: (id: string, content: string) => void }) {
  if (!r) return <Card padding={14}><text style={{ color: textTokens.muted, fontFamily: FONT }}>No response</text></Card>
  return (
    <Card padding={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottomWidth: 1, borderColor: '#27272A' }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>{r.label ?? 'Response'}</text>
          <CopyButton value={r.content ?? ''} onCopy={onCopy ? () => onCopy(r.id, r.content ?? '') : undefined} />
        </div>
        <div style={{ flexGrow: 1, overflowY: 'scroll' }}>
          <text style={{ fontSize: 12.5, color: textTokens.secondary, fontFamily: FONT, whiteSpace: 'normal', lineHeight: 1.6 }}>{r.content ?? ''}</text>
        </div>
      </div>
    </Card>
  )
}

export function ResponseComparer({ left, right, onPick, onCopy }: ResponseComparerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 14, alignItems: 'stretch' }}>
        <div style={{ flexGrow: 1, flexBasis: 0, minWidth: 0 }}>
          <Pane r={left} onCopy={onCopy} />
        </div>
        <Divider orientation="vertical" />
        <div style={{ flexGrow: 1, flexBasis: 0, minWidth: 0 }}>
          <Pane r={right} onCopy={onCopy} />
        </div>
      </div>
      {onPick ? (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
          <Button size="sm" variant="ghost" onClick={() => onPick(left.id)}>Use {left?.label ?? 'Variant A'}</Button>
          <Button size="sm" variant="primary" onClick={() => onPick(right.id)}>Use {right?.label ?? 'Variant B'}</Button>
        </div>
      ) : null}
    </div>
  )
}
