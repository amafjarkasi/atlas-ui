/**
 * @atlas/ui — GeneratedCodeCard
 *
 * A generated-code result: syntax-highlighted source, copy, and an
 * applied/pending status pill (composes `SyntaxCodeBlock` + `CopyButton` +
 * `Badge`).
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Badge } from '../atoms/Badge'
import { CopyButton } from '../atoms/CopyButton'
import { SyntaxCodeBlock } from '../effects/SyntaxCodeBlock'

export type GeneratedCodeStatus = 'pending' | 'applied' | 'rejected'

export interface GeneratedCodeCardProps {
  code: string
  language?: string
  title?: string
  status?: GeneratedCodeStatus
  onApply?: () => void
  onCopy?: (code: string) => void
}

const STATUS_LABEL: Record<GeneratedCodeStatus, string> = { pending: 'New', applied: 'Applied', rejected: 'Skipped' }
const STATUS_COLOR: Record<GeneratedCodeStatus, string> = { pending: '#3B82F6', applied: '#22C55E', rejected: '#8A8A90' }

export function GeneratedCodeCard({ code, language, title, status = 'pending', onApply, onCopy }: GeneratedCodeCardProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {title ? <text style={{ fontSize: 12.5, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>{title}</text> : null}
        <Badge variant="label" label={STATUS_LABEL[status]} color={STATUS_COLOR[status]} />
        <div style={{ flexGrow: 1 }} />
        {status === 'pending' && onApply ? <CopyButton value={code} onCopy={onApply} label="Apply" copiedLabel="Applied" /> : null}
        <CopyButton value={code} onCopy={onCopy} />
      </div>
      <SyntaxCodeBlock code={code} language={language} showLineNumbers maxHeight={280} />
    </div>
  )
}
