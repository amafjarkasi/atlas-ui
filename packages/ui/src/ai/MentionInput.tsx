/**
 * @atlas/ui — MentionInput
 *
 * A composer with @-mention autocomplete. Typing the trigger character shows a
 * filtered option list; click/Enter inserts the mention, Escape dismisses it.
 *
 * @example
 *   <MentionInput value={draft} onChange={setDraft} mentions={[{ id: 'n', label: 'Nora' }]} onSubmit={send} />
 */
import { useState } from 'react'
import { surface, border, text, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Spinner } from '../effects/Spinner'

export interface MentionOption {
  id: string
  label: string
  sublabel?: string
}

export interface MentionInputProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: () => void
  mentions?: MentionOption[]
  placeholder?: string
  loading?: boolean
  trigger?: string
}

export function MentionInput({
  value = '',
  onChange,
  onSubmit,
  mentions = [],
  placeholder,
  loading = false,
  trigger = '@',
}: MentionInputProps) {
  const [active, setActive] = useState(0)

  const idx = value.lastIndexOf(trigger)
  const tail = value.slice(idx + trigger.length)
  const open = idx >= 0 && /^\w*$/.test(tail) && mentions.length > 0
  const query = open ? tail : ''
  const filtered = open ? mentions.filter((m) => m.label.toLowerCase().startsWith(query.toLowerCase())).slice(0, 8) : []

  const set = (v: string) => {
    setActive(0)
    onChange?.(v)
  }

  const select = (m: MentionOption) => {
    const before = value.slice(0, idx)
    const after = value.slice(idx + trigger.length + query.length)
    set(`${before}${trigger}${m.label} ${after}`)
  }

  const submit = () => {
    const t = value.trim()
    if (t) onSubmit?.()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
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
          placeholder={placeholder ?? `Type ${trigger} to mention…`}
          minRows={1}
          maxRows={6}
          onChange={(e) => set(e.value ?? '')}
          onKeyDown={(e) => {
            const k = e.key?.toLowerCase()
            if (open && filtered.length > 0) {
              if (k === 'arrowdown') setActive((a) => Math.min(filtered.length - 1, a + 1))
              else if (k === 'arrowup') setActive((a) => Math.max(0, a - 1))
              else if (k === 'enter') select(filtered[active])
              else if (k === 'escape') set(value.slice(0, idx))
            } else if (k === 'enter' && !e.modifiers?.shift) {
              submit()
            }
          }}
          style={{ flexGrow: 1, fontSize: 13, color: text.primary, fontFamily: FONT }}
        />

        {loading ? (
          <Spinner size={14} />
        ) : (
          <div
            onClick={value ? submit : undefined}
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

      {open && filtered.length > 0 ? (
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 0,
            right: 0,
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            padding: 6,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: border.strong,
            backgroundColor: surface.overlay,
            boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000088' },
            maxHeight: 220,
            overflowY: 'scroll',
          }}
        >
          {filtered.map((m, i) => (
            <div
              key={m.id}
              onClick={() => select(m)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 6,
                paddingBottom: 6,
                borderRadius: 6,
                backgroundColor: i === active ? surface.selected : undefined,
                cursor: 'pointer',
                hover: i === active ? undefined : { backgroundColor: '#FFFFFF0A' },
              }}
            >
              <Icon name="at" size={12} color={text.muted} />
              <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT, flexGrow: 1 }}>{m.label}</text>
              {m.sublabel ? <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{m.sublabel}</text> : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
