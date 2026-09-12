/**
 * @atlas/ui — PromptComposer
 *
 * A prompt box with a model selector, tags, live token meter, and send
 * (composes `PromptInput` + `TagInput` + `ModelPicker` + `TokenMeter`).
 *
 * @example
 *   <PromptComposer value={p} onChange={setP} onSubmit={send} models={models} model={m} onModelChange={setM} tokenUsed={n} tokenLimit={20000} />
 */
import { PromptInput } from '../ai/PromptInput'
import { TagInput } from '../inputs/TagInput'
import { ModelPicker, type ModelOption } from '../ai/ModelPicker'
import { TokenMeter } from '../ai/TokenMeter'

export interface PromptComposerProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  loading?: boolean
  placeholder?: string
  models?: ModelOption[]
  model?: string
  onModelChange?: (id: string) => void
  tags?: string[]
  onTagsChange?: (tags: string[]) => void
  tokenUsed?: number
  tokenLimit?: number
}

export function PromptComposer({
  value,
  onChange,
  onSubmit,
  loading,
  placeholder,
  models,
  model,
  onModelChange,
  tags,
  onTagsChange,
  tokenUsed,
  tokenLimit,
}: PromptComposerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {models && onModelChange ? <ModelPicker models={models} value={model} onChange={onModelChange} /> : null}

      <PromptInput value={value} onChange={onChange} onSubmit={onSubmit} loading={loading} placeholder={placeholder} />

      {tags && onTagsChange ? <TagInput value={tags} onChange={onTagsChange} placeholder="Add tags…" /> : null}

      {tokenLimit !== undefined ? <TokenMeter used={tokenUsed ?? 0} limit={tokenLimit} /> : null}
    </div>
  )
}
