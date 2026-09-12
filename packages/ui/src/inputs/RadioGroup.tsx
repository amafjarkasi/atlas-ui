/**
 * @atlas/ui — RadioGroup
 *
 * A keyboard-navigable radio button list (arrow keys move, Enter/Space confirm).
 *
 * @example
 *   <RadioGroup options={[{ value: 'inbox', label: 'Inbox' }, { value: 'all', label: 'All mail' }]} value={view} onChange={setView} />
 */
import { useState } from 'react'
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  horizontal?: boolean
}

export function RadioGroup({
  options,
  value: controlled,
  defaultValue,
  onChange,
  disabled = false,
  horizontal = false,
}: RadioGroupProps) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const value = controlled !== undefined ? controlled : internal
  const set = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
  }

  return (
    <div style={{ display: 'flex', flexDirection: horizontal ? 'row' : 'column', gap: horizontal ? 16 : 2 }}>
      {options.map((opt, i) => {
        const selected = opt.value === value
        const blocked = disabled || opt.disabled
        return (
          <div
            key={opt.value}
            tabIndex={0}
            onClick={() => {
              if (!blocked) set(opt.value)
            }}
            onKeyDown={(e) => {
              const k = e.key?.toLowerCase()
              if (k === 'arrowdown' || k === 'arrowright') {
                const n = options[(i + 1) % options.length]
                if (n && !n.disabled) set(n.value)
              } else if (k === 'arrowup' || k === 'arrowleft') {
                const n = options[(i - 1 + options.length) % options.length]
                if (n && !n.disabled) set(n.value)
              } else if (k === 'enter' || k === ' ') {
                if (!blocked) set(opt.value)
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 8,
              paddingTop: 5,
              paddingBottom: 5,
              cursor: blocked ? 'not-allowed' : 'pointer',
              opacity: blocked ? 0.4 : 1,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: selected ? semantic.accent : border.strong,
                backgroundColor: selected ? semantic.accent : surface.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {selected && <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFFFFF' }} />}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <text style={{ fontSize: 13, color: text.primary, fontFamily: FONT }}>{opt.label}</text>
              {opt.description ? (
                <text style={{ fontSize: 11.5, color: text.muted, fontFamily: FONT }}>{opt.description}</text>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
