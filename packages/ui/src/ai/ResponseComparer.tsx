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

function Pane({ r, onCopy }: { r: ComparableResponse; onCopy?: (id: string, content: string) => void }) {
  return (
    <Card padding={12} width="50%">
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, paddingBottom: 8 }}>
        <text style={{ fontSize: 12, fontWeight: 600, color: textTokens.secondary, fontFamily: FONT, flexGrow: 1 }}>{r.label}</text>
        <CopyButton value={r.content} onCopy={onCopy ? () => onCopy(r.id, r.content) : undefined} />
      </div>
      <text style={{ fontSize: 12.5, color: textTokens.primary, fontFamily: FONT, whiteSpace: 'normal', lineHeight: 1.5 }}>{r.content}</text>
    </Card>
  )
}

export function ResponseComparer({ left, right, onPick, onCopy }: ResponseComparerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'stretch' }}>
        <Pane r={left} onCopy={onCopy} />
        <Divider orientation="vertical" />
        <Pane r={right} onCopy={onCopy} />
      </div>
      {onPick ? (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
          <Button size="sm" variant="ghost" onClick={() => onPick(left.id)}>Use A</Button>
          <Button size="sm" onClick={() => onPick(right.id)}>Use B</Button>
        </div>
      ) : null}
    </div>
  )
}
