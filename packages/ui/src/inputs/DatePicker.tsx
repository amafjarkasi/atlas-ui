/**
 * @atlas/ui — DatePicker
 *
 * A month calendar grid rendered from flex-wrapped `<div>` cells (GPUIX has no
 * CSS grid). Prev/next chevrons change the month; today is outlined, the
 * selected day is accent-filled, and out-of-range days are dimmed.
 *
 * @example
 *   <DatePicker value={due} onChange={setDue} />
 */
import { useState } from 'react'
import { semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { IconButton } from '../atoms/IconButton'

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export function DatePicker({ value, onChange, minDate, maxDate }: DatePickerProps) {
  const [view, setView] = useState(() => {
    const d = value ?? new Date()
    return { y: d.getFullYear(), m: d.getMonth() }
  })

  const cell = 32
  const first = new Date(view.y, view.m, 1)
  const startWeekday = first.getDay()
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()

  const prevMonth = () => setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }))
  const nextMonth = () => setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }))

  const inRange = (d: Date) => (!minDate || d >= minDate) && (!maxDate || d <= maxDate)

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.y, view.m, d))

  const today = new Date()
  const monthName = `${first.toLocaleString('en-US', { month: 'long' })} ${view.y}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: cell * 7 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton icon="chevronLeft" size={14} onClick={prevMonth} />
        <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{monthName}</text>
        <IconButton icon="chevronRight" size={14} onClick={nextMonth} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: cell * 7 }}>
        {WEEKDAYS.map((w) => (
          <div key={w} style={{ width: cell, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <text style={{ fontSize: 10, color: text.muted, fontFamily: FONT }}>{w}</text>
          </div>
        ))}

        {cells.map((d, i) =>
          d ? (
            <div
              key={i}
              onClick={() => {
                if (inRange(d)) onChange?.(d)
              }}
              style={{
                width: cell,
                height: cell,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                cursor: inRange(d) ? 'pointer' : 'default',
                backgroundColor: value && sameDay(value, d) ? semantic.accent : undefined,
                borderWidth: !value || !sameDay(value, d) ? (sameDay(today, d) ? 1 : 0) : 0,
                borderColor: semantic.accent,
                opacity: inRange(d) ? 1 : 0.35,
                hover: inRange(d) && !(value && sameDay(value, d)) ? { backgroundColor: '#FFFFFF0F' } : undefined,
              }}
            >
              <text
                style={{
                  fontSize: 12,
                  color: value && sameDay(value, d) ? '#FFFFFF' : text.secondary,
                  fontFamily: FONT,
                }}
              >
                {d.getDate()}
              </text>
            </div>
          ) : (
            <div key={i} style={{ width: cell, height: cell }} />
          ),
        )}
      </div>
    </div>
  )
}
