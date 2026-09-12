/**
 * @atlas/ui — SystemPromptCard
 *
 * An editable system prompt with a live character budget (composes `ProgressBar`).
 */
import { surface, border, text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { ProgressBar } from '../inputs/ProgressBar'

export interface SystemPromptCardProps {
  value?: string
  onChange?: (value: string) => void
  label?: string
  maxLength?: number
  /** When true, omits outer card chrome for embedding inside FormCard. */
  embedded?: boolean
}

export function SystemPromptCard({ value = '', onChange, label = 'System prompt', maxLength = 4000, embedded = false }: SystemPromptCardProps) {
  const pct = Math.min(100, (value.length / maxLength) * 100)
  const over = value.length > maxLength

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <text style={{ fontSize: 12, fontWeight: 600, color: textTokens.secondary, fontFamily: FONT, lineHeight: 1.2 }}>
        {label}
      </text>
      <textarea
        value={value}
        minRows={4}
        maxRows={8}
        onChange={(e) => onChange?.(e.value ?? '')}
        style={{ fontSize: 12.5, color: textTokens.primary, fontFamily: FONT, backgroundColor: '#101012', borderRadius: 8, borderWidth: 1, borderColor: border.subtle, padding: 10, lineHeight: 1.5 }}
      />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <ProgressBar value={pct} height={4} color={over ? '#ED4245' : '#3B82F6'} />
        </div>
        <text style={{ fontSize: 11, color: over ? '#ED4245' : textTokens.muted, fontFamily: FONT, whiteSpace: 'nowrap', lineHeight: 1, flexShrink: 0 }}>
          {`${value.length.toLocaleString()} / ${maxLength.toLocaleString()} chars`}
        </text>
      </div>
    </div>
  )

  if (embedded) return content

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.card,
        width: 480,
        alignSelf: 'flex-start',
      }}
    >
      {content}
    </div>
  )
}
