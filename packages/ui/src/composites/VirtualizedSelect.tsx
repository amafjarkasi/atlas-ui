/**
 * @atlas/ui — VirtualizedSelect
 *
 * A dropdown that virtualizes a huge option list (composes `VirtualList`).
 *
 * @example
 *   <VirtualizedSelect options={thousands} value={id} onChange={setId} />
 */
import { useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { VirtualList } from '../layout/VirtualList'

export interface VirtualizedSelectOption {
  id: string
  label: string
}

export interface VirtualizedSelectProps {
  options: VirtualizedSelectOption[]
  value?: string
  onChange?: (id: string) => void
  placeholder?: string
  height?: number
}

export function VirtualizedSelect({ options, value, onChange, placeholder = 'Select…', height = 240 }: VirtualizedSelectProps) {
  const [open, setOpen] = useState(false)
  const current = options.find((o) => o.id === value)

  return (
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
          minWidth: 180,
          justifyContent: 'space-between',
        }}
      >
        <text style={{ fontSize: 12.5, color: current ? text.primary : text.muted, fontFamily: FONT }}>{current?.label ?? placeholder}</text>
        <Icon name="chevronDown" size={12} color={text.muted} />
      </div>

      {open ? (
        <anchored side="bottom" align="start" gap={4} fit="switch" onMouseDownOutside={() => setOpen(false)}>
          <div
            style={{
              width: 220,
              height,
              backgroundColor: surface.overlay,
              borderWidth: 1,
              borderColor: border.strong,
              borderRadius: 8,
              padding: 4,
              boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
            }}
          >
            <VirtualList<VirtualizedSelectOption>
              items={options}
              estimatedItemHeight={28}
              height={height - 8}
              renderItem={(o) => {
                const selected = o.id === value
                return (
                  <div
                    onClick={() => {
                      onChange?.(o.id)
                      setOpen(false)
                    }}
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingTop: 6,
                      paddingBottom: 6,
                      borderRadius: 6,
                      cursor: 'pointer',
                      backgroundColor: selected ? surface.selected : undefined,
                      hover: selected ? undefined : { backgroundColor: '#FFFFFF0A' },
                    }}
                  >
                    <text style={{ fontSize: 12.5, fontWeight: selected ? 600 : 500, color: text.primary, fontFamily: FONT }}>{o.label}</text>
                  </div>
                )
              }}
            />
          </div>
        </anchored>
      ) : null}
    </div>
  )
}
