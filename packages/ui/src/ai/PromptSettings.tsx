/** @atlas/ui — PromptSettings — model + sampler + system prompt settings panel. */
import { FormCard } from '../layout/FormCard'
import { ModelPicker, type ModelOption } from './ModelPicker'
import { SamplerControls, type SamplerValues } from './SamplerControls'
import { SystemPromptCard } from './SystemPromptCard'

export interface PromptSettingsProps {
  models?: ModelOption[]
  model?: string
  onModelChange?: (id: string) => void
  sampler?: SamplerValues
  onSamplerChange?: (v: SamplerValues) => void
  systemPrompt?: string
  onSystemPromptChange?: (v: string) => void
  onSave?: () => void
}

export function PromptSettings({ models, model, onModelChange, sampler, onSamplerChange, systemPrompt, onSystemPromptChange, onSave }: PromptSettingsProps) {
  return (
    <FormCard title="Prompt settings" onSubmit={onSave} width={480}>
      {models ? <ModelPicker models={models} value={model} onChange={onModelChange} /> : null}
      {sampler && onSamplerChange ? <SamplerControls values={sampler} onChange={onSamplerChange} /> : null}
      <SystemPromptCard value={systemPrompt ?? ''} onChange={onSystemPromptChange} />
    </FormCard>
  )
}
