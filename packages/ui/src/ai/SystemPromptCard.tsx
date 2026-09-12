/**
 * @atlas/ui — SystemPromptCard
 *
 * An editable system prompt with a live character budget (composes `Field` +
 * `ProgressBar`).
 */
import { border, text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Field } from '../inputs/Field'
import { ProgressBar } from '../inputs/ProgressBar'

export interface SystemPromptCardProps {
  value?: string
  onChange?: (value: string) => void
  label?: string
  maxLength?: number
}

export function SystemPromptCard({ value = '', onChange, label = 'System prompt', maxLength = 4000 }: SystemPromptCardProps) {
  const pct = Math.min(100, (value.length / maxLength) * 100)
  const over = value.length > maxLength

  return (
    <Field label={label}>
      <textarea
        value={value}
        minRows={4}
        maxRows={8}
        onChange={(e) => onChange?.(e.value ?? '')}
        style={{ fontSize: 12.5, color: textTokens.primary, fontFamily: FONT, backgroundColor: '#101012', borderRadius: 8, borderWidth: 1, borderColor: border.subtle, padding: 10, lineHeight: 1.5 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4, width: '100%' }}>
        <ProgressBar value={pct} height={4} color={over ? '#ED4245' : '#3B82F6'} />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <text style={{ fontSize: 11, color: over ? '#ED4245' : textTokens.muted, fontFamily: FONT, whiteSpace: 'nowrap', lineHeight: 1 }}>
            {`${value.length.toLocaleString()} / ${maxLength.toLocaleString()} chars`}
          </text>
        </div>
      </div>
    </Field>
  )
}
