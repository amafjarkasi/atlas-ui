/** @atlas/ui — FontPicker — family/size/weight with live preview. */
import { useState } from 'react'
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { SelectField } from '../inputs/SelectField'
import { NumberField } from '../inputs/NumberField'
import { SegmentedControl } from '../inputs/SegmentedControl'

export interface FontChoice {
  family: string
  size: number
  weight: number
}

export interface FontPickerProps {
  value?: FontChoice
  onChange?: (v: FontChoice) => void
  families?: { value: string; label: string }[]
  preview?: string
}

export function FontPicker({ value = { family: 'Segoe UI', size: 14, weight: 400 }, onChange, families = [
  { value: 'Segoe UI', label: 'Segoe UI' },
  { value: 'JetBrains Mono', label: 'JetBrains Mono' },
  { value: 'Georgia', label: 'Georgia' },
], preview = 'The quick brown fox' }: FontPickerProps) {
  const [local, setLocal] = useState<FontChoice>(value)
  const v = value ?? local
  const set = (patch: Partial<FontChoice>) => {
    const next = { ...v, ...patch }
    setLocal(next)
    onChange?.(next)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 12, borderWidth: 1, borderColor: border.subtle, borderRadius: 10, backgroundColor: surface.card }}>
      <SelectField label="Family" options={families} value={v.family} onChange={(family) => set({ family })} />
      <NumberField label="Size" value={v.size} min={8} max={96} onValueChange={(size) => set({ size })} />
      <SegmentedControl options={[{ label: 'Regular', value: '400' }, { label: 'Medium', value: '600' }, { label: 'Bold', value: '700' }]} value={String(v.weight)} onChange={(w) => set({ weight: Number(w) })} />
      <text style={{ fontSize: v.size, fontWeight: v.weight, color: t.primary, fontFamily: v.family }}>{preview}</text>
    </div>
  )
}
