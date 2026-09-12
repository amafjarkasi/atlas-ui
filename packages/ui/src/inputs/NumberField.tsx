/**
 * @atlas/ui — NumberField
 *
 * A numeric field with up/down steppers, min/max clamping, and keyboard
 * arrows (composes `Field` + `IconButton`).
 *
 * @example
 *   <NumberField label="Rows" value={n} onValueChange={setN} min={1} max={100} />
 */
import { useState } from 'react'
import { surface, border, text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Field } from './Field'

export interface NumberFieldProps {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  disabled?: boolean
}

export function NumberField({ value, defaultValue = 0, onValueChange, min = -Infinity, max = Infinity, step = 1, label, disabled = false }: NumberFieldProps) {
  const [text, setText] = useState(String(value ?? defaultValue))

  const clamp = (n: number) => Math.max(min, Math.min(max, n))

  const commit = (raw: string) => {
    setText(raw)
    const n = parseFloat(raw)
    if (!Number.isNaN(n)) onValueChange?.(clamp(n))
  }

  const bump = (dir: 1 | -1) => {
    const current = parseFloat(text)
    const next = clamp((Number.isNaN(current) ? 0 : current) + dir * step)
    onValueChange?.(next)
    setText(String(next))
  }

  return (
    <Field label={label}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 5, borderRadius: 8, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, opacity: disabled ? 0.5 : 1 }}>
        <input
          value={text}
          onChange={(e) => commit(e.value ?? '')}
          onKeyDown={(e) => {
            const k = e.key?.toLowerCase()
            if (!disabled) {
              if (k === 'arrowup') bump(1)
              else if (k === 'arrowdown') bump(-1)
            }
          }}
          style={{ flexGrow: 1, fontSize: 13, color: textTokens.primary, fontFamily: FONT, minWidth: 0 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div onClick={() => !disabled && bump(1)} style={{ cursor: disabled ? 'not-allowed' : 'pointer', width: 18, height: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chevronUp" size={10} color={textTokens.muted} />
          </div>
          <div onClick={() => !disabled && bump(-1)} style={{ cursor: disabled ? 'not-allowed' : 'pointer', width: 18, height: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="chevronDown" size={10} color={textTokens.muted} />
          </div>
        </div>
      </div>
    </Field>
  )
}
