/**
 * @atlas/ui — TypeaheadInput
 *
 * A generic always-on autocomplete: an input with a filtered dropdown of
 * options (Enter/click picks; arrow keys navigate). Generalizes the trigger-
 * based behavior of `MentionInput`.
 *
 * @example
 *   <TypeaheadInput options={users} value={text} onChange={setText} onPick={(o) => pick(o)} />
 */
import { useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface TypeaheadOption {
  id: string
  label: string
  sublabel?: string
}

export interface TypeaheadInputProps {
  options: TypeaheadOption[]
  value?: string
  onChange?: (value: string) => void
  onPick?: (option: TypeaheadOption) => void
  placeholder?: string
  maxResults?: number
  disabled?: boolean
}

export function TypeaheadInput({ options, value = '', onChange, onPick, placeholder = 'Search…', maxResults = 8, disabled = false }: TypeaheadInputProps) {
  const [active, setActive] = useState(0)
  const open = value.length > 0
  const filtered = open ? options.filter((o) => o.label.toLowerCase().includes(value.toLowerCase())).slice(0, maxResults) : []

  const pick = (o: TypeaheadOption) => {
    onPick?.(o)
    onChange?.(o.label)
    setActive(0)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6, paddingLeft: 10, paddingRight: 8, paddingTop: 5, paddingBottom: 5, borderRadius: 8, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
        <Icon name="search" size={13} color={text.muted} />
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange?.(e.value ?? '')
            setActive(0)
          }}
          onKeyDown={(e) => {
            const k = e.key?.toLowerCase()
            if (open && filtered.length > 0) {
              if (k === 'arrowdown') setActive((a) => Math.min(filtered.length - 1, a + 1))
              else if (k === 'arrowup') setActive((a) => Math.max(0, a - 1))
              else if (k === 'enter') pick(filtered[active])
            }
          }}
          style={{ flexGrow: 1, fontSize: 13, color: text.primary, fontFamily: FONT }}
        />
      </div>

      {open && filtered.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 4, borderRadius: 8, borderWidth: 1, borderColor: border.strong, backgroundColor: surface.overlay, boxShadow: { offsetX: 0, offsetY: 6, blurRadius: 20, spreadRadius: 0, color: '#00000055' }, maxHeight: 220, overflowY: 'scroll' }}>
          {filtered.map((o, i) => (
            <div key={o.id} onClick={() => pick(o)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6, paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, borderRadius: 6, backgroundColor: i === active ? surface.selected : undefined, cursor: 'pointer', hover: i === active ? undefined : { backgroundColor: '#FFFFFF0A' } }}>
              <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT, flexGrow: 1 }}>{o.label}</text>
              {o.sublabel ? <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{o.sublabel}</text> : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
