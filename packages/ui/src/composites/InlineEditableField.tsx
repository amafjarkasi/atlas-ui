/**
 * @atlas/ui — InlineEditableField
 *
 * A read-only field that becomes an editor on click; save on Enter, cancel on
 * Esc (composes `Field` + `Button` + input/textarea).
 *
 * @example
 *   <InlineEditableField label="Name" value={name} onSave={setName} />
 */
import { useState } from 'react'
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'
import { Field } from '../inputs/Field'

export interface InlineEditableFieldProps {
  label?: string
  value: string
  onSave: (value: string) => void
  multiline?: boolean
}

export function InlineEditableField({ label, value, onSave, multiline = false }: InlineEditableFieldProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const save = () => {
    onSave(draft)
    setEditing(false)
  }
  const cancel = () => {
    setDraft(value)
    setEditing(false)
  }

  if (!editing) {
    return (
      <Field label={label}>
        <div
          onClick={() => {
            setDraft(value)
            setEditing(true)
          }}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6, padding: 6, borderRadius: 6, cursor: 'pointer', hover: { backgroundColor: '#FFFFFF0A' } }}
        >
          <text style={{ fontSize: 13, color: text.primary, fontFamily: FONT, flexGrow: 1 }}>{value || '—'}</text>
          <Icon name="edit" size={12} color={text.muted} />
        </div>
      </Field>
    )
  }

  return (
    <Field label={label}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
        {multiline ? (
          <textarea
            autoFocus
            value={draft}
            minRows={2}
            maxRows={6}
            onChange={(e) => setDraft(e.value ?? '')}
            onKeyDown={(e) => {
              const k = e.key?.toLowerCase()
              if (k === 'escape') cancel()
              else if (k === 'enter' && !e.modifiers?.shift) save()
            }}
            style={{ flexGrow: 1, fontSize: 13, color: text.primary, fontFamily: FONT }}
          />
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.value ?? '')}
            onKeyDown={(e) => {
              const k = e.key?.toLowerCase()
              if (k === 'escape') cancel()
              else if (k === 'enter') save()
            }}
            style={{ flexGrow: 1, fontSize: 13, color: text.primary, fontFamily: FONT }}
          />
        )}

        <div style={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
          <Button size="sm" onClick={save}>
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Field>
  )
}
