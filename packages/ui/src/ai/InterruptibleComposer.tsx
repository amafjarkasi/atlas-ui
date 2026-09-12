/** @atlas/ui — InterruptibleComposer — a composer with stop + regenerate-last affordances. */
import { surface, border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { PromptInput } from './PromptInput'
import { Spinner } from '../effects/Spinner'
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
      {isStreaming ? (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 4, paddingRight: 4, height: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Spinner size={13} color="#3B82F6" />
            <text style={{ fontSize: 12, color: t.primary, fontWeight: 500, fontFamily: FONT }}>Generating response…</text>
          </div>
          {onStop ? (
            <div
              onClick={onStop}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingLeft: 10,
                paddingRight: 10,
                height: 24,
                borderRadius: 6,
                backgroundColor: '#ED42451A',
                borderWidth: 1,
                borderColor: '#ED424544',
                cursor: 'pointer',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: 1, backgroundColor: '#ED4245' }} />
              <text style={{ fontSize: 11, fontWeight: 600, color: '#ED4245', fontFamily: FONT }}>Stop</text>
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
