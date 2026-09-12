/**
 * @atlas/ui — Calendar
 *
 * A month calendar with event indicators (up to two per day). Rendered from
 * flex-wrapped cells (no CSS grid). Prev/next chevrons change the month.
 *
 * @example
 *   <Calendar events={[{ id: '1', title: 'Ship', date: new Date(2024, 7, 30) }]} value={selected} onChange={setSelected} />
 */
import { useState } from 'react'
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { IconButton } from '../atoms/IconButton'

export interface CalendarEvent {
  id: string
  title: string
  date: Date
  color?: string
}

export interface CalendarProps {
  events?: CalendarEvent[]
  value?: Date
  onChange?: (date: Date) => void
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const CELL_W = 44
const CELL_H = 48

export function Calendar({ events = [], value, onChange }: CalendarProps) {
  const [view, setView] = useState(() => {
    const d = value ?? new Date()
    return { y: d.getFullYear(), m: d.getMonth() }
  })

  const first = new Date(view.y, view.m, 1)
  const startWeekday = first.getDay()
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()

  const prevMonth = () => setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }))
  const nextMonth = () => setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }))

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  const eventsFor = (d: Date) => events.filter((e) => sameDay(e.date, d)).slice(0, 2)

  const cells: (Date | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.y, view.m, d))
  while (cells.length % 7 !== 0) cells.push(null)

  const today = new Date()
  const monthName = `${first.toLocaleString('en-US', { month: 'long' })} ${view.y}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: CELL_W * 7 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton icon="chevronLeft" size={14} onClick={prevMonth} />
        <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{monthName}</text>
        <IconButton icon="chevronRight" size={14} onClick={nextMonth} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: CELL_W * 7,
          borderWidth: 1,
          borderColor: border.subtle,
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            style={{
              width: CELL_W,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: surface.pill,
              borderBottomWidth: 1,
              borderColor: border.subtle,
            }}
          >
            <text style={{ fontSize: 10, color: text.muted, fontFamily: FONT }}>{w}</text>
          </div>
        ))}

        {cells.map((d, i) =>
          d ? (
            <div
              key={i}
              onClick={() => onChange?.(d)}
              style={{
                width: CELL_W,
                height: CELL_H,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 3,
                borderRightWidth: i % 7 < 6 ? 1 : 0,
                borderBottomWidth: 1,
                borderColor: border.subtle,
                backgroundColor: value && sameDay(value, d) ? semantic.accent + '22' : undefined,
                cursor: 'pointer',
                hover: { backgroundColor: '#FFFFFF08' },
              }}
            >
              <text
                style={{
                  fontSize: 11,
                  fontWeight: sameDay(today, d) ? 700 : 400,
                  color: value && sameDay(value, d) ? semantic.accent : text.secondary,
                  fontFamily: FONT,
                }}
              >
                {d.getDate()}
              </text>

              {eventsFor(d).map((e) => (
                <div key={e.id} style={{ paddingLeft: 3, paddingRight: 3, borderRadius: 2, backgroundColor: (e.color ?? semantic.accent) + '33' }}>
                  <text
                    style={{
                      fontSize: 8.5,
                      color: e.color ?? semantic.accent,
                      fontFamily: FONT,
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {e.title}
                  </text>
                </div>
              ))}
            </div>
          ) : (
            <div
              key={i}
              style={{
                width: CELL_W,
                height: CELL_H,
                backgroundColor: surface.raised,
                borderRightWidth: i % 7 < 6 ? 1 : 0,
                borderBottomWidth: 1,
                borderColor: border.subtle,
              }}
            />
          ),
        )}
      </div>
    </div>
  )
}
