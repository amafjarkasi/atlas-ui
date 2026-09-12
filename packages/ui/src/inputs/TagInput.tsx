/**
 * @atlas/ui — TagInput
 *
 * Multi-value chips + an inline single-line `<input>`. Enter/comma adds a tag,
 * Backspace on an empty field removes the last tag, optional suggestions are
 * filtered by the current draft.
 *
 * @example
 *   <TagInput value={to} onChange={setTo} placeholder="Add recipient…" suggestions={contacts} />
 */
import { useState } from 'react'
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface TagInputProps {
  value: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  maxTags?: number
  suggestions?: string[]
}

export function TagInput({
  value,
  onChange,
  placeholder = 'Add…',
  disabled = false,
  maxTags,
  suggestions = [],
}: TagInputProps) {
  const [draft, setDraft] = useState('')

  const add = (raw: string) => {
    const tag = raw.trim()
    if (!tag) return
    if (value.includes(tag)) {
      setDraft('')
      return
    }
    if (maxTags !== undefined && value.length >= maxTags) return
    onChange?.([...value, tag])
    setDraft('')
  }

  const remove = (i: number) => onChange?.(value.filter((_, j) => j !== i))

  const filtered = suggestions.filter(
    (s) => !value.includes(s) && s.toLowerCase().includes(draft.toLowerCase()),
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: disabled ? 0.5 : 1 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 4,
          alignItems: 'center',
          padding: 6,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: border.subtle,
          backgroundColor: surface.card,
          minHeight: 34,
        }}
      >
        {value.map((tag, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
              paddingLeft: 9,
              paddingRight: 3,
              height: 22,
              borderRadius: 6,
              backgroundColor: semantic.accent + '22',
              borderWidth: 1,
              borderColor: semantic.accent + '44',
            }}
          >
            <text style={{ fontSize: 12, color: semantic.accent, fontFamily: FONT }}>{tag}</text>
            <div
              onClick={() => remove(i)}
              style={{
                cursor: 'pointer',
                width: 14,
                height: 14,
                borderRadius: 7,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 2,
                hover: { backgroundColor: '#FFFFFF1A' },
              }}
            >
              <Icon name="x" size={9} color={semantic.accent} />
            </div>
          </div>
        ))}

        <input
          autoFocus={!disabled}
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.value ?? '')}
          onKeyDown={(e) => {
            const k = e.key?.toLowerCase()
            if (k === 'enter' || k === ',') add(draft)
            else if (k === 'backspace' && draft === '' && value.length > 0) remove(value.length - 1)
          }}
          style={{ flexGrow: 1, minWidth: 80, fontSize: 12.5, color: text.primary, fontFamily: FONT }}
        />
      </div>

      {draft && filtered.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
          {filtered.slice(0, 6).map((s) => (
            <div
              key={s}
              onClick={() => add(s)}
              style={{
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 3,
                paddingBottom: 3,
                borderRadius: 10,
                backgroundColor: surface.selected,
                cursor: 'pointer',
                hover: { backgroundColor: '#FFFFFF1A' },
              }}
            >
              <text style={{ fontSize: 11, color: text.secondary, fontFamily: FONT }}>{s}</text>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
