/** @atlas/ui — InterruptibleComposer — a composer with stop + regenerate-last affordances. */
import { surface, border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { PromptInput } from './PromptInput'
import { ThinkingIndicator } from './ThinkingIndicator'
import { ActionChips } from '../display/ActionChips'

export interface InterruptibleComposerProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: () => void
  onStop?: () => void
  streaming?: boolean
  lastPrompt?: string
  placeholder?: string
}

export function InterruptibleComposer({ value, onChange, onSubmit, onStop, streaming = false, lastPrompt, placeholder }: InterruptibleComposerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: border.strong, backgroundColor: surface.card }}>
      {streaming ? (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <ThinkingIndicator label="Generating" />
          <div style={{ flexGrow: 1 }} />
          {onStop ? (
            <div onClick={onStop} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 6, backgroundColor: '#ED4245', cursor: 'pointer' }}>
              <text style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', fontFamily: FONT }}>Stop</text>
            </div>
          ) : null}
        </div>
      ) : lastPrompt ? (
        <ActionChips actions={[{ id: 'regen', label: `↻ Regenerate: ${lastPrompt}` }]} onAction={() => onSubmit?.()} />
      ) : null}
      <PromptInput value={value} onChange={onChange} onSubmit={onSubmit} loading={streaming} placeholder={placeholder} />
    </div>
  )
}
