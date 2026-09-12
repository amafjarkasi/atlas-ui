/**
 * @atlas/ui — SelectField
 *
 * A labeled select (custom anchored dropdown; safe and consistent with the
 * library's own floating pattern).
 */
import { useState } from 'react'
import { surface, border, text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Field } from './Field'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectFieldProps {
  label?: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export function SelectField({ label, options, value, onChange, placeholder = 'Select…' }: SelectFieldProps) {
  const [open, setOpen] = useState(false)
  const current = options.find((o) => o.value === value)

  return (
    <Field label={label}>
      <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
        <div
          onClick={() => setOpen((o) => !o)}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 10, paddingRight: 8, paddingTop: 6, paddingBottom: 6, borderRadius: 8, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, cursor: 'pointer', minWidth: 170, justifyContent: 'space-between' }}
        >
          <text style={{ fontSize: 12.5, color: current ? textTokens.primary : textTokens.muted, fontFamily: FONT }}>{current?.label ?? placeholder}</text>
          <Icon name="chevronDown" size={12} color={textTokens.muted} />
        </div>

        {open ? (
          <anchored side="bottom" align="start" gap={4} fit="switch" onMouseDownOutside={() => setOpen(false)}>
            <div style={{ backgroundColor: surface.overlay, borderWidth: 1, borderColor: border.strong, borderRadius: 8, paddingTop: 4, paddingBottom: 4, minWidth: 190, flexDirection: 'column', boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' }, maxHeight: 240, overflowY: 'scroll' }}>
              {options.map((o) => {
                const selected = o.value === value
                return (
                  <div key={o.value} onClick={() => { onChange?.(o.value); setOpen(false) }} style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6, borderRadius: 5, marginLeft: 4, marginRight: 4, cursor: 'pointer', backgroundColor: selected ? surface.selected : undefined, hover: selected ? undefined : { backgroundColor: '#FFFFFF0A' } }}>
                    <text style={{ fontSize: 12.5, fontWeight: selected ? 600 : 500, color: textTokens.primary, fontFamily: FONT }}>{o.label}</text>
                  </div>
                )
              })}
            </div>
          </anchored>
        ) : null}
      </div>
    </Field>
  )
}
