/**
 * @atlas/ui — TimePicker
 *
 * Two vertical stepper columns (hours, minutes) with wrap-around up/down
 * chevrons and an AM/PM label when not 24-hour.
 *
 * @example
 *   <TimePicker value={time} onChange={setTime} />
 */
import { border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface TimeValue {
  hours: number
  minutes: number
}

export interface TimePickerProps {
  value?: TimeValue
  onChange?: (time: TimeValue) => void
  use24h?: boolean
  disabled?: boolean
}

function Column({
  value,
  onUp,
  onDown,
  disabled,
}: {
  value: string
  onUp: () => void
  onDown: () => void
  disabled: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <div
        onClick={onUp}
        style={{
          width: 40,
          height: 18,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          hover: { backgroundColor: '#FFFFFF0F' },
        }}
      >
        <Icon name="chevronUp" size={12} color={text.muted} />
      </div>
      <div
        style={{
          width: 40,
          height: 32,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: border.subtle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <text style={{ fontSize: 15, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{value}</text>
      </div>
      <div
        onClick={onDown}
        style={{
          width: 40,
          height: 18,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          hover: { backgroundColor: '#FFFFFF0F' },
        }}
      >
        <Icon name="chevronDown" size={12} color={text.muted} />
      </div>
    </div>
  )
}

export function TimePicker({ value, onChange, use24h = false, disabled = false }: TimePickerProps) {
  const t = value ?? { hours: 9, minutes: 0 }
  const range = use24h ? 24 : 12
  const setHours = (h: number) => onChange?.({ hours: ((h % range) + range) % range, minutes: t.minutes })
  const setMinutes = (m: number) => onChange?.({ hours: t.hours, minutes: ((m % 60) + 60) % 60 })
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, opacity: disabled ? 0.5 : 1 }}>
      <Column value={pad(t.hours)} onUp={() => setHours(t.hours + 1)} onDown={() => setHours(t.hours - 1)} disabled={disabled} />
      <text style={{ fontSize: 16, fontWeight: 600, color: text.primary, fontFamily: FONT }}>:</text>
      <Column value={pad(t.minutes)} onUp={() => setMinutes(t.minutes + 1)} onDown={() => setMinutes(t.minutes - 1)} disabled={disabled} />
      {!use24h ? (
        <text style={{ fontSize: 12, color: text.muted, fontFamily: FONT, minWidth: 24 }}>{t.hours < 12 ? 'AM' : 'PM'}</text>
      ) : null}
    </div>
  )
}
