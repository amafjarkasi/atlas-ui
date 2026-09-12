/**
 * @atlas/ui — PinInput
 *
 * A segmented OTP input. A single transparent `<input>` (auto-focused) captures
 * typing; the visible segmented boxes reflect the digit string. Input is
 * stripped to digits and clipped to `length`.
 *
 * @example
 *   <PinInput length={6} value={otp} onChange={setOtp} />
 */
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'

export interface PinInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

export function PinInput({ length = 6, value = '', onChange, disabled = false }: PinInputProps) {
  const digits = value.replace(/\D/g, '').slice(0, length)
  const boxW = 36
  const gap = 8

  return (
    <div
      style={{
        position: 'relative',
        width: length * boxW + (length - 1) * gap,
        height: 44,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap, width: '100%', height: '100%' }}>
        {Array.from({ length }, (_, i) => {
          const active = i === digits.length
          const filled = i < digits.length
          return (
            <div
              key={i}
              style={{
                width: boxW,
                height: 44,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: filled || active ? semantic.accent : border.strong,
                backgroundColor: surface.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <text style={{ fontSize: 18, fontWeight: 600, color: text.primary, fontFamily: FONT }}>
                {digits[i] ?? ''}
              </text>
            </div>
          )
        })}
      </div>

      <input
        autoFocus={!disabled}
        value={digits}
        onChange={(e) => onChange?.(e.value ?? '')}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, fontSize: 18 }}
      />
    </div>
  )
}
