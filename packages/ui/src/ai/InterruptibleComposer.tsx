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
  onSend?: () => void
  onStop?: () => void
  streaming?: boolean
  isGenerating?: boolean
  lastPrompt?: string
  placeholder?: string
}

export function InterruptibleComposer({ value, onChange, onSubmit, onSend, onStop, streaming = false, isGenerating, lastPrompt, placeholder }: InterruptibleComposerProps) {
  const isStreaming = streaming || isGenerating || false
  const handleSubmit = onSubmit || onSend
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: border.strong, backgroundColor: surface.card }}>
      {isStreaming ? (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, paddingLeft: 4, paddingRight: 4 }}>
          <ThinkingIndicator label="Generating response…" />
          <div style={{ flexGrow: 1 }} />
          {onStop ? (
            <div
              onClick={onStop}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 6,
                paddingBottom: 6,
                borderRadius: 6,
                backgroundColor: '#ED4245',
                cursor: 'pointer',
              }}
            >
              <text style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', fontFamily: FONT }}>Stop generation</text>
            </div>
          ) : null}
        </div>
      ) : lastPrompt ? (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <ActionChips actions={[{ id: 'regen', label: `↻ Regenerate: ${lastPrompt}` }]} onAction={() => handleSubmit?.()} />
        </div>
      ) : null}
      <PromptInput value={value} onChange={onChange} onSubmit={handleSubmit} loading={isStreaming} placeholder={placeholder} />
    </div>
  )
}
