/**
 * @atlas/ui — TextareaAutosize
 *
 * A styled multiline `<textarea>`. GPUIX auto-grows the field within
 * `minRows`/`maxRows`, so no manual measuring is needed.
 *
 * @example
 *   <TextareaAutosize label="Body" minRows={2} maxRows={8} value={draft} onChange={setDraft} onSubmit={send} />
 */
import { useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'

export interface TextareaAutosizeProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  minRows?: number
  maxRows?: number
  disabled?: boolean
  label?: string
  onSubmit?: () => void
}

export function TextareaAutosize({
  value: controlled,
  defaultValue,
  onChange,
  placeholder,
  minRows = 1,
  maxRows = 8,
  disabled = false,
  label,
  onSubmit,
}: TextareaAutosizeProps) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const value = controlled !== undefined ? controlled : internal

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: disabled ? 0.5 : 1 }}>
      {label ? (
        <text style={{ fontSize: 12, color: text.secondary, fontFamily: FONT }}>{label}</text>
      ) : null}

      <textarea
        value={value}
        placeholder={placeholder}
        minRows={minRows}
        maxRows={maxRows}
        onChange={(e) => {
          const v = e.value ?? ''
          if (controlled === undefined) setInternal(v)
          onChange?.(v)
        }}
        onSubmit={onSubmit}
        style={{
          fontSize: 13,
          color: text.primary,
          fontFamily: FONT,
          backgroundColor: surface.card,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: border.subtle,
          padding: 10,
          minHeight: 34,
        }}
      />
    </div>
  )
}
