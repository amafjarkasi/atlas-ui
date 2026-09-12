/**
 * @atlas/ui — PromptStudio
 *
 * A prompt playground with a saved-prompt library and live token count
 * (composes `SearchableList` + `PromptComposer`).
 *
 * @example
 *   <PromptStudio prompts={saved} value={p} onChange={setP} models={models} model={m} onModelChange={setM} tokenUsed={n} tokenLimit={20000} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { border } from '../tokens'
import { SearchableList } from '../display/SearchableList'
import { PromptComposer } from './PromptComposer'
import type { ModelOption } from '../ai/ModelPicker'

export interface SavedPrompt {
  id: string
  title: string
  body: string
}

export interface PromptStudioProps {
  prompts?: SavedPrompt[]
  onSelectPrompt?: (prompt: SavedPrompt) => void
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  models?: ModelOption[]
  model?: string
  onModelChange?: (id: string) => void
  tags?: string[]
  onTagsChange?: (tags: string[]) => void
  tokenUsed?: number
  tokenLimit?: number
}

export function PromptStudio({
  prompts,
  onSelectPrompt,
  value,
  onChange,
  onSubmit,
  models,
  model,
  onModelChange,
  tags,
  onTagsChange,
  tokenUsed,
  tokenLimit,
}: PromptStudioProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 12, height: '100%', width: '100%', alignItems: 'stretch' }}>
      {prompts ? (
        <div style={{ width: 200, flexShrink: 0, borderRightWidth: 1, borderColor: border.subtle, paddingRight: 10 }}>
          <SearchableList<SavedPrompt>
            items={prompts}
            getLabel={(p) => p.title}
            height="100%"
            renderItem={(p) => (
              <div onClick={() => onSelectPrompt?.(p)} style={{ padding: 8, borderRadius: 6, cursor: 'pointer', hover: { backgroundColor: '#FFFFFF08' } }}>
                <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT }}>{p.title}</text>
              </div>
            )}
          />
        </div>
      ) : null}

      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <PromptComposer
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          models={models}
          model={model}
          onModelChange={onModelChange}
          tags={tags}
          onTagsChange={onTagsChange}
          tokenUsed={tokenUsed}
          tokenLimit={tokenLimit}
        />
      </div>
    </div>
  )
}
