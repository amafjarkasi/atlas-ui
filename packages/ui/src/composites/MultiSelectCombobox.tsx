/**
 * @atlas/ui — MultiSelectCombobox
 *
 * A multi-select with removable chips and a checkmarked option dropdown
 * (composes `Checkbox` + an anchored list).
 *
 * @example
 *   <MultiSelectCombobox options={opts} value={sel} onChange={setSel} />
 */
import { useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Checkbox } from '../inputs/Checkbox'

export interface MultiSelectOption {
  id: string
  label: string
}

export interface MultiSelectComboboxProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (ids: string[]) => void
  placeholder?: string
}

export function MultiSelectCombobox({ options, value, onChange, placeholder = 'Select…' }: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false)
  const toggle = (id: string) => onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id])
  const selected = options.filter((o) => value.includes(o.id))

  return (
    <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 6,
          paddingBottom: 6,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: border.subtle,
          backgroundColor: surface.card,
          cursor: 'pointer',
          minWidth: 180,
          flexWrap: 'wrap',
        }}
      >
        {selected.length === 0 ? (
          <text style={{ fontSize: 12.5, color: text.muted, fontFamily: FONT, flexGrow: 1 }}>{placeholder}</text>
        ) : (
          selected.map((o) => (
            <div key={o.id} style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2, borderRadius: 8, backgroundColor: surface.selected }}>
              <text style={{ fontSize: 11, color: text.secondary, fontFamily: FONT }}>{o.label}</text>
            </div>
          ))
        )}
        <Icon name="chevronDown" size={12} color={text.muted} />
      </div>

      {open ? (
        <anchored side="bottom" align="start" gap={4} fit="switch" onMouseDownOutside={() => setOpen(false)}>
          <div
            style={{
              backgroundColor: surface.overlay,
              borderWidth: 1,
              borderColor: border.strong,
              borderRadius: 8,
              paddingTop: 4,
              paddingBottom: 4,
              minWidth: 220,
              flexDirection: 'column',
              boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
            }}
          >
            {options.map((o) => (
              <div
                key={o.id}
                onClick={() => toggle(o.id)}
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 10, paddingRight: 10, paddingTop: 7, paddingBottom: 7, cursor: 'pointer', hover: { backgroundColor: '#FFFFFF0A' } }}
              >
                <Checkbox checked={value.includes(o.id)} onCheckedChange={() => toggle(o.id)} />
                <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT }}>{o.label}</text>
              </div>
            ))}
          </div>
        </anchored>
      ) : null}
    </div>
  )
}
