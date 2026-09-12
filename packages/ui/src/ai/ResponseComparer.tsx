/**
 * @atlas/ui — ResponseComparer
 *
 * A/B side-by-side comparison of two model answers with copy + pick actions.
 */
import { surface, border, text as textTokens } from '../tokens'
import { FONT } from '../tokens'
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
  if (!r) {
    return (
      <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
        <text style={{ color: textTokens.muted, fontFamily: FONT, fontSize: 12.5 }}>No response</text>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 180, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, overflow: 'hidden' }}>
      <div style={{ paddingLeft: 12, paddingRight: 8, paddingTop: 10, paddingBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: border.subtle }}>
        <text style={{ fontSize: 12.5, fontWeight: 600, color: textTokens.primary, fontFamily: FONT, lineHeight: 1 }}>{r.label ?? 'Response'}</text>
        <CopyButton value={r.content ?? ''} onCopy={onCopy ? () => onCopy(r.id, r.content ?? '') : undefined} />
      </div>
      <div style={{ flexGrow: 1, padding: 12, overflowY: 'scroll' }}>
        <text style={{ fontSize: 12.5, color: textTokens.secondary, fontFamily: FONT, whiteSpace: 'normal', lineHeight: 1.5 }}>{r.content ?? ''}</text>
      </div>
    </div>
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
