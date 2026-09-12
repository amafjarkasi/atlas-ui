/**
 * @atlas/ui — ModelPicker
 *
 * A dropdown to pick an AI model (custom anchored list; reuses the Popover
 * floating pattern rather than styling the headless Select).
 *
 * @example
 *   <ModelPicker models={[{ id: 'northlight-4', label: 'Northlight 4', description: 'Latest' }]} value={model} onChange={setModel} />
 */
import { useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface ModelOption {
  id: string
  label: string
  description?: string
}

export interface ModelPickerProps {
  models: ModelOption[]
  value?: string
  onChange?: (id: string) => void
  label?: string
  disabled?: boolean
}

export function ModelPicker({ models, value, onChange, label = 'Model', disabled = false }: ModelPickerProps) {
  const [open, setOpen] = useState(false)
  const current = models.find((m) => m.id === value)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, opacity: disabled ? 0.5 : 1 }}>
      {label ? (
        <text style={{ fontSize: 12, fontWeight: 600, color: text.secondary, fontFamily: FONT }}>{label}</text>
      ) : null}

      <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
        <div
          onClick={() => setOpen((o) => !o)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: border.subtle,
            backgroundColor: surface.card,
            cursor: 'pointer',
            minWidth: 170,
            justifyContent: 'space-between',
          }}
        >
          <text style={{ fontSize: 12.5, color: current ? text.primary : text.muted, fontFamily: FONT }}>
            {current?.label ?? 'Select model'}
          </text>
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
              {models.map((m) => {
                const selected = m.id === value
                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      onChange?.(m.id)
                      setOpen(false)
                    }}
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingTop: 7,
                      paddingBottom: 7,
                      borderRadius: 5,
                      marginLeft: 4,
                      marginRight: 4,
                      flexDirection: 'column',
                      gap: 1,
                      cursor: 'pointer',
                      backgroundColor: selected ? surface.selected : undefined,
                      hover: selected ? undefined : { backgroundColor: '#FFFFFF0A' },
                    }}
                  >
                    <text style={{ fontSize: 12.5, fontWeight: selected ? 600 : 500, color: text.primary, fontFamily: FONT }}>
                      {m.label}
                    </text>
                    {m.description ? (
                      <text style={{ fontSize: 10.5, color: text.muted, fontFamily: FONT }}>{m.description}</text>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </anchored>
        ) : null}
      </div>
    </div>
  )
}
