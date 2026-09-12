/**
 * @atlas/ui — ColorPicker
 *
 * A swatch grid + hex input. A canvas hue/saturation wheel is not possible in
 * GPUIX v0.7 (the `<canvas>` primitive exposes no draw API), so the picker is a
 * curated palette plus a manual hex field.
 *
 * @example
 *   <ColorPicker value={tagColor} onChange={setTagColor} />
 */
import { useState } from 'react'
import { border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
  presets?: string[]
  disabled?: boolean
}

const DEFAULT_PRESETS = [
  '#3B82F6',
  '#8B5CF6',
  '#22C55E',
  '#EAB308',
  '#ED4245',
  '#0EA5E9',
  '#F97316',
  '#EC4899',
  '#14B8A6',
  '#A855F7',
  '#64748B',
  '#3A3A40',
]

export function ColorPicker({ value, onChange, presets = DEFAULT_PRESETS, disabled = false }: ColorPickerProps) {
  const [hex, setHex] = useState(value ?? '')

  const select = (c: string) => {
    setHex(c)
    onChange?.(c)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, opacity: disabled ? 0.5 : 1 }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {presets.map((c) => {
          const selected = value === c
          return (
            <div
              key={c}
              onClick={() => select(c)}
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                backgroundColor: c,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? '#FFFFFF' : border.strong,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selected && <Icon name="check" size={12} color="#FFFFFF" />}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 5,
            backgroundColor: value ?? '#000000',
            borderWidth: 1,
            borderColor: border.strong,
          }}
        />
        <input
          value={hex}
          placeholder="#RRGGBB"
          onChange={(e) => {
            const v = e.value ?? ''
            setHex(v)
            if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange?.(v)
          }}
          style={{ flexGrow: 1, fontSize: 12, color: text.primary, fontFamily: FONT }}
        />
      </div>
    </div>
  )
}
