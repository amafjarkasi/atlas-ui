/** @atlas/ui — SelectionToPrompt — act on a text selection (explain / summarize / …). */
import { surface, border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { ActionChips } from '../display/ActionChips'

export interface SelectionToPromptProps {
  text: string
  onAction?: (action: string, text: string) => void
  actions?: string[]
  previewMaxChars?: number
}

export function SelectionToPrompt({ text, onAction, actions = ['Explain', 'Summarize', 'Translate', 'Fix'], previewMaxChars = 240 }: SelectionToPromptProps) {
  const preview = text.length > previewMaxChars ? `${text.slice(0, previewMaxChars)}…` : text

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 14, paddingBottom: 14, paddingLeft: 12, paddingRight: 12, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
      <text style={{ fontSize: 11, fontWeight: 600, color: t.muted, fontFamily: FONT, lineHeight: 1 }}>SELECTED TEXT</text>
      <text style={{ fontSize: 12, color: t.secondary, fontFamily: FONT, lineHeight: 1.5, whiteSpace: 'normal' }}>{preview}</text>
      <ActionChips actions={actions.map((a) => ({ id: a, label: a }))} onAction={(c) => onAction?.(c.id, text)} />
    </div>
  )
}
