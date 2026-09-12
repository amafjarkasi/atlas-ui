import { useState } from 'react'
import { border, surface, text as t } from '../tokens'
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
  const toVersion = sel && to < sel.versions.length ? sel.versions[to] : null
  const restoreLabel = toVersion ? (toVersion.label.startsWith('v') ? toVersion.label : `v${toVersion.label}`) : ''

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 12, height: 340, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, width: '100%' }}>
      <div style={{ width: 220, borderRightWidth: 1, borderColor: border.subtle, paddingRight: 10, display: 'flex', flexDirection: 'column' }}>
        <SearchableList<VersionedPrompt>
          items={prompts}
          getLabel={(p) => p.title}
          renderItem={(p) => {
            const isSelected = p.id === sel?.id
            return (
              <div
                onClick={() => setSelected(p)}
                style={{
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 6,
                  paddingBottom: 6,
                  borderRadius: 6,
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#3B82F622' : 'transparent',
                }}
              >
                <text style={{ fontSize: 12, color: isSelected ? '#60A5FA' : t.primary, fontFamily: FONT }}>{p.title}</text>
              </div>
            )
          }}
        />
      </div>

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'scroll' }}>
        {sel && sel.versions.length > 1 ? (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6, borderBottomWidth: 1, borderColor: border.subtle }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT }}>from</text>
              <Button size="sm" variant="ghost" onClick={() => setFrom((f) => Math.max(0, f - 1))}>-</Button>
              <div style={{ backgroundColor: '#1E1E22', paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2, borderRadius: 4 }}>
                <text style={{ fontSize: 11.5, color: t.primary, fontFamily: FONT }}>{sel.versions[from]?.label}</text>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setFrom((f) => Math.min(sel.versions.length - 2, f + 1))}>+</Button>
              <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT }}>to</text>
              <div style={{ backgroundColor: '#1E1E22', paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2, borderRadius: 4 }}>
                <text style={{ fontSize: 11.5, color: t.primary, fontFamily: FONT }}>{sel.versions[to]?.label}</text>
              </div>
            </div>
            {toVersion ? (
              <Button size="sm" onClick={() => onRestore?.(sel.id, toVersion)}>
                {`Restore ${restoreLabel}`}
              </Button>
            ) : null}
          </div>
        ) : null}
        {sel && from < sel.versions.length && to < sel.versions.length ? (
          <PromptDiff before={sel.versions[from]!.content} after={sel.versions[to]!.content} />
        ) : null}
      </div>
    </div>
  )
}
