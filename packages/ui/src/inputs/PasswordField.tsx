/**
 * @atlas/ui — PasswordField
 *
 * A password field with a reveal toggle. GPUIX `<input>` has no native
 * password masking, so while hidden a row of bullets is shown with a
 * transparent input overlay capturing typing (reveal swaps to a plain input).
 *
 * @example
 *   <PasswordField label="Password" value={pw} onChange={setPw} />
 */
import { useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Field } from './Field'

export interface PasswordFieldProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
}

export function PasswordField({ value = '', onChange, placeholder = '••••••••', label, disabled = false }: PasswordFieldProps) {
  const [revealed, setRevealed] = useState(false)

  const inputStyle = { flexGrow: 1, fontSize: 13, color: text.primary, fontFamily: FONT }

  return (
    <Field label={label}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingLeft: 10,
          paddingRight: 8,
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: border.subtle,
          backgroundColor: surface.card,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {revealed ? (
          <input value={value} placeholder={placeholder} onChange={(e) => onChange?.(e.value ?? '')} style={inputStyle} />
        ) : (
          <div style={{ position: 'relative', flexGrow: 1, height: 24 }}>
            <text style={{ fontSize: 13, color: value ? text.primary : text.ghost, fontFamily: FONT }}>
              {value ? '•'.repeat(value.length) : placeholder}
            </text>
            <input
              autoFocus={!disabled}
              value={value}
              onChange={(e) => onChange?.(e.value ?? '')}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, fontSize: 13 }}
            />
          </div>
        )}

        <div
          onClick={() => !disabled && setRevealed((r) => !r)}
          style={{ width: 22, height: 22, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: disabled ? 'not-allowed' : 'pointer', hover: { backgroundColor: '#FFFFFF0A' } }}
        >
          <Icon name={revealed ? 'eyeOff' : 'eye'} size={13} color={text.muted} />
        </div>
      </div>
    </Field>
  )
}
