/**
 * @atlas/ui — Field & InputGroup
 *
 * `Field` wraps any input with a label, helper text, and error state.
 * `InputGroup` wraps an input with optional prefix/suffix affixes.
 *
 * @example
 *   <Field label="Email" required error={!valid && 'Invalid email'}>
 *     <SearchInput value={email} onChange={setEmail} />
 *   </Field>
 *   <InputGroup prefix={<Icon name="at" />} suffix=".io"><input … /></InputGroup>
 */
import type { ReactNode } from 'react'
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'

export interface FieldProps {
  label?: string
  helper?: string
  error?: string
  children: ReactNode
  required?: boolean
  disabled?: boolean
}

export function Field({ label, helper, error, children, required = false, disabled = false }: FieldProps) {
  const hint = error ?? helper
  const hintColor = error ? semantic.mention : text.muted

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, opacity: disabled ? 0.5 : 1 }}>
      {label ? (
        <text style={{ fontSize: 12, fontWeight: 600, color: text.secondary, fontFamily: FONT }}>
          {label}
          {required ? ' *' : ''}
        </text>
      ) : null}

      {children}

      {hint ? <text style={{ fontSize: 11, color: hintColor, fontFamily: FONT }}>{hint}</text> : null}
    </div>
  )
}

export interface InputGroupProps {
  children: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
}

export function InputGroup({ children, prefix, suffix }: InputGroupProps) {
  return (
    <div
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
      }}
    >
      {prefix}
      <div style={{ flexGrow: 1 }}>{children}</div>
      {suffix}
    </div>
  )
}
