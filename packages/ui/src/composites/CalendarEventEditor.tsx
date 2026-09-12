/**
 * @atlas/ui — CalendarEventEditor
 *
 * Click a calendar day to create an event via a dialog with a time picker
 * (composes `Calendar` + `Dialog` + `TimePicker`).
 *
 * @example
 *   <CalendarEventEditor events={events} onSaveEvent={create} />
 */
import { useState } from 'react'
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Calendar, type CalendarEvent } from '../display/Calendar'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../overlays/Dialog'
import { TimePicker, type TimeValue } from '../inputs/TimePicker'
import { Field } from '../inputs/Field'
import { Button } from '../atoms/Button'

export interface CalendarEventEditorProps {
  events?: CalendarEvent[]
  onSaveEvent?: (date: Date) => void
}

export function CalendarEventEditor({ events = [], onSaveEvent }: CalendarEventEditorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 0 })

  return (
    <div>
      <Calendar events={events} value={selectedDate ?? undefined} onChange={setSelectedDate} />

      <Dialog open={selectedDate !== null} onOpenChange={(o) => !o && setSelectedDate(null)}>
        <DialogOverlay>
          <DialogContent width={360}>
            <DialogHeader>
              <DialogTitle>New event</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Field label="Date">
                  <text style={{ fontSize: 13, color: text.primary, fontFamily: FONT }}>
                    {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                  </text>
                </Field>
                <Field label="Time">
                  <TimePicker value={time} onChange={setTime} />
                </Field>
              </div>
            </DialogBody>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setSelectedDate(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedDate) {
                    const d = new Date(selectedDate)
                    d.setHours(time.hours, time.minutes, 0, 0)
                    onSaveEvent?.(d)
                  }
                  setSelectedDate(null)
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </div>
  )
}
