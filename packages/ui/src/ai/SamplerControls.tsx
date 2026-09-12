/**
 * @atlas/ui — SamplerControls
 *
 * Sampler parameters (temperature / top-p) with preset chips (composes
 * `Slider` + `ActionChips`).
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Slider } from '../inputs/Slider'
import { ActionChips } from '../display/ActionChips'

export interface SamplerValues {
  temperature: number
  topP: number
}

export interface SamplerControlsProps {
  values: SamplerValues
  onChange: (values: SamplerValues) => void
}

const PRESETS: { label: string; values: SamplerValues }[] = [
  { label: 'Precise', values: { temperature: 0.2, topP: 0.9 } },
  { label: 'Balanced', values: { temperature: 0.7, topP: 0.95 } },
  { label: 'Creative', values: { temperature: 1.2, topP: 1 } },
]

export function SamplerControls({ values, onChange }: SamplerControlsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ActionChips
        actions={PRESETS.map((p) => ({ id: p.label, label: p.label }))}
        onAction={(c) => {
          const preset = PRESETS.find((p) => p.label === c.id)
          if (preset) onChange(preset.values)
        }}
      />
      <Slider label="Temperature" min={0} max={2} step={0.1} value={values.temperature} onChange={(v) => onChange({ ...values, temperature: v })} />
      <Slider label="Top P" min={0} max={1} step={0.05} value={values.topP} onChange={(v) => onChange({ ...values, topP: v })} />
      <text style={{ fontSize: 10.5, color: textTokens.ghost, fontFamily: FONT }}>Higher temperature = more random output.</text>
    </div>
  )
}
