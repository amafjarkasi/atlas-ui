/**
 * @atlas/ui — DateRangePicker
 *
 * A single-month range picker: click start, click end (clicks swap if before
 * start). Uses the same month-grid approach as `DatePicker`.
 *
 * @example
 *   <DateRangePicker range={{ start: d1, end: d2 }} onChange={setRange} />
 */
import { useState } from 'react'
import { semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { IconButton } from '../atoms/IconButton'

export interface DateRange {
  start?: Date
  end?: Date
}

export interface DateRangePickerProps {
  range?: DateRange
  onChange?: (range: DateRange) => void
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const CELL = 36

export function DateRangePicker({ range, onChange }: DateRangePickerProps) {
  const [view, setView] = useState(() => {
    const base = range?.start ?? range?.end ?? new Date()
    return { y: base.getFullYear(), m: base.getMonth() }
  })

  const first = new Date(view.y, view.m, 1)
  const startWeekday = first.getDay()
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()

  const prev = () => setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }))
  const next = () => setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }))

  const start = range?.start
  const end = range?.end
  const sameDay = (a?: Date, b?: Date) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  const inRange = (d: Date) => start && end && d >= start && d <= end

  const click = (d: Date) => {
    if (!start || (start && end)) onChange?.({ start: d, end: undefined })
    else if (d < start) onChange?.({ start: d, end: undefined })
    else onChange?.({ start, end: d })
  }

  const cells: (Date | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.y, view.m, d))

  const monthName = `${first.toLocaleString('en-US', { month: 'long' })} ${view.y}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: CELL * 7 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton icon="chevronLeft" size={14} onClick={prev} />
        <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{monthName}</text>
        <IconButton icon="chevronRight" size={14} onClick={next} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: CELL * 7 }}>
        {WEEKDAYS.map((w) => (
          <div key={w} style={{ width: CELL, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <text style={{ fontSize: 10, color: text.muted, fontFamily: FONT }}>{w}</text>
          </div>
        ))}

        {cells.map((d, i) =>
          d ? (
            <div
              key={i}
              onClick={() => click(d)}
              style={{
                width: CELL,
                height: CELL,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                cursor: 'pointer',
                backgroundColor: sameDay(start, d) || sameDay(end, d) ? semantic.accent : inRange(d) ? semantic.accent + '33' : undefined,
                hover: { backgroundColor: sameDay(start, d) || sameDay(end, d) ? undefined : '#FFFFFF0A' },
              }}
            >
              <text style={{ fontSize: 12, color: sameDay(start, d) || sameDay(end, d) ? '#FFFFFF' : text.secondary, fontFamily: FONT }}>{d.getDate()}</text>
            </div>
          ) : (
            <div key={i} style={{ width: CELL, height: CELL }} />
          ),
        )}
      </div>
    </div>
  )
}
