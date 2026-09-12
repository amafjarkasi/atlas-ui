/**
 * @atlas/ui — SystemPromptCard
 *
 * An editable system prompt with a live character budget (composes `Field` +
 * `ProgressBar`).
 */
import { text as textTokens } from '../tokens'
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
        minRows={3}
        maxRows={10}
        onChange={(e) => onChange?.(e.value ?? '')}
        style={{ fontSize: 12.5, color: textTokens.primary, fontFamily: FONT, backgroundColor: '#101012', borderRadius: 8, borderWidth: 1, borderColor: textTokens.ghost, padding: 10 }}
      />
      <ProgressBar value={pct} height={3} color={over ? '#ED4245' : '#3B82F6'} />
      <text style={{ fontSize: 10.5, color: over ? '#ED4245' : textTokens.ghost, fontFamily: FONT }}>
        {value.length} / {maxLength} chars
      </text>
    </Field>
  )
}
