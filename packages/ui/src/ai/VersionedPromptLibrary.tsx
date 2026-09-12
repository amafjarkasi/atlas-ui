/** @atlas/ui — VersionedPromptLibrary — prompt versions with diff + restore. */
import { useState } from 'react'
import { border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { SearchableList } from '../display/SearchableList'
import { PromptDiff } from './PromptDiff'
import { Button } from '../atoms/Button'

export interface PromptVersion {
  id: string
  label: string
  content: string
}

export interface VersionedPrompt {
  id: string
  title: string
  versions: PromptVersion[]
}

export interface VersionedPromptLibraryProps {
  prompts: VersionedPrompt[]
  onRestore?: (promptId: string, version: PromptVersion) => void
}

export function VersionedPromptLibrary({ prompts, onRestore }: VersionedPromptLibraryProps) {
  const [selected, setSelected] = useState<VersionedPrompt | null>(null)
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(1)

  const sel = selected ?? prompts[0] ?? null

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, height: 320 }}>
      <div style={{ width: 200, borderRightWidth: 1, borderColor: border.subtle, paddingRight: 8 }}>
        <SearchableList<VersionedPrompt>
          items={prompts}
          getLabel={(p) => p.title}
          renderItem={(p) => (
            <div onClick={() => setSelected(p)} style={{ padding: 6, borderRadius: 6, cursor: 'pointer' }}>
              <text style={{ fontSize: 12.5, color: t.primary, fontFamily: FONT }}>{p.title}</text>
            </div>
          )}
        />
      </div>

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'scroll' }}>
        {sel && sel.versions.length > 1 ? (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT }}>from</text>
            <Button size="sm" variant="ghost" onClick={() => setFrom((f) => Math.max(0, f - 1))}>-</Button>
            <text style={{ fontSize: 11.5, color: t.secondary, fontFamily: FONT }}>{sel.versions[from]?.label}</text>
            <Button size="sm" variant="ghost" onClick={() => setFrom((f) => Math.min(sel.versions.length - 2, f + 1))}>+</Button>
            <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT }}>to</text>
            <text style={{ fontSize: 11.5, color: t.secondary, fontFamily: FONT }}>{sel.versions[to]?.label}</text>
          </div>
        ) : null}
        {sel && from < sel.versions.length && to < sel.versions.length ? (
          <PromptDiff before={sel.versions[from]!.content} after={sel.versions[to]!.content} />
        ) : null}
        {sel && to < sel.versions.length ? (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button size="sm" onClick={() => onRestore?.(sel.id, sel.versions[to]!)}>Restore v{sel.versions[to]!.label}</Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
