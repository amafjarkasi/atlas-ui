/**
 * @atlas/ui — PromptInput
 *
 * An AI prompt composer: auto-growing textarea, send/stop button, and optional
 * suggested prompt chips.
 *
 * @example
 *   <PromptInput value={draft} onChange={setDraft} onSubmit={send} onStop={stop} loading={streaming} suggestions={["Summarize", "Draft reply"]} />
 */
import { useState } from 'react'
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface PromptInputProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: () => void
  onStop?: () => void
  loading?: boolean
  placeholder?: string
  disabled?: boolean
  suggestions?: string[]
}

export function PromptInput({
  value: controlled,
  onChange,
  onSubmit,
  onStop,
  loading = false,
  placeholder = 'Ask anything…',
  disabled = false,
  suggestions = [],
}: PromptInputProps) {
  const [internal, setInternal] = useState('')
  const value = controlled !== undefined ? controlled : internal
  const set = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: disabled ? 0.5 : 1 }}>
      {suggestions.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
          {suggestions.map((s) => (
            <div
              key={s}
              onClick={() => set(s)}
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 4,
                paddingBottom: 4,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: border.strong,
                backgroundColor: surface.card,
                cursor: 'pointer',
                hover: { borderColor: semantic.accent },
              }}
            >
              <text style={{ fontSize: 11, color: text.secondary, fontFamily: FONT, whiteSpace: 'nowrap' }}>{s}</text>
            </div>
          ))}
        </div>
      ) : null}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 8,
          padding: 10,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: border.strong,
          backgroundColor: surface.card,
        }}
      >
        <textarea
          value={value}
          placeholder={placeholder}
          minRows={1}
          maxRows={6}
          onChange={(e) => set(e.value ?? '')}
          onSubmit={onSubmit}
          style={{ flexGrow: 1, fontSize: 13, color: text.primary, fontFamily: FONT }}
        />

        {loading ? (
          <div
            onClick={onStop}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: '#ED4245',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#FFFFFF' }} />
          </div>
        ) : (
          <div
            onClick={value ? onSubmit : undefined}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: value ? semantic.accent : surface.selected,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: value ? 'pointer' : 'default',
              flexShrink: 0,
            }}
          >
            <Icon name="send" size={13} color={value ? '#FFFFFF' : text.muted} />
          </div>
        )}
      </div>
    </div>
  )
}
