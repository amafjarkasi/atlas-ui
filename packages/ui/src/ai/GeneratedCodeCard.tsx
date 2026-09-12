/**
 * @atlas/ui — GeneratedCodeCard
 *
 * A generated-code result: syntax-highlighted source, copy, and an
 * applied/pending status pill (composes `SyntaxCodeBlock` + `CopyButton` +
 * `Badge`).
 */
import { surface, border, text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Badge } from '../atoms/Badge'
import { CopyButton } from '../atoms/CopyButton'
import { SyntaxCodeBlock } from '../effects/SyntaxCodeBlock'

export type GeneratedCodeStatus = 'pending' | 'applied' | 'rejected' | 'success'

export interface GeneratedCodeCardProps {
  code: string
  language?: string
  title?: string
  status?: GeneratedCodeStatus
  onApply?: () => void
  onCopy?: (code: string) => void
}

const STATUS_LABEL: Record<GeneratedCodeStatus, string> = { pending: 'New', applied: 'Applied', success: 'Applied', rejected: 'Skipped' }
const STATUS_COLOR: Record<GeneratedCodeStatus, string> = { pending: '#3B82F6', applied: '#22C55E', success: '#22C55E', rejected: '#8A8A90' }

export function GeneratedCodeCard({ code, language, title, status = 'pending', onApply, onCopy }: GeneratedCodeCardProps) {
  const displayTitle = title || (language ? `${language.charAt(0).toUpperCase() + language.slice(1)} snippet` : 'Generated snippet')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <text style={{ fontSize: 13, fontWeight: 600, color: textTokens.primary, fontFamily: FONT, lineHeight: 1 }}>{displayTitle}</text>
        <Badge variant="label" label={STATUS_LABEL[status] ?? 'New'} color={STATUS_COLOR[status] ?? '#3B82F6'} />
        <div style={{ flexGrow: 1 }} />
        {status === 'pending' && onApply ? <CopyButton value={code} onCopy={onApply} label="Apply" copiedLabel="Applied" /> : null}
        <CopyButton value={code} onCopy={onCopy} />
      </div>
      <SyntaxCodeBlock code={code} language={language} showLineNumbers maxHeight={280} />
    </div>
  )
}
