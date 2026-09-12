/**
 * @atlas/ui — ShortcutRecorder
 *
 * Click-to-record a keyboard combo (for remappable shortcut settings). Stores
 * a normalized combo string like "ctrl+shift+k" (compatible with `useHotkeys`).
 *
 * @example
 *   <ShortcutRecorder value={combo} onChange={setCombo} />
 */
import { useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Kbd } from '../atoms/Kbd'
import { Field } from './Field'

export interface ShortcutRecorderProps {
  value?: string
  onChange?: (combo: string) => void
  label?: string
  placeholder?: string
}

const KEY_NAMES: Record<string, string> = {
  ' ': 'space',
  arrowup: 'up',
  arrowdown: 'down',
  arrowleft: 'left',
  arrowright: 'right',
}

export function ShortcutRecorder({ value = '', onChange, label, placeholder = 'Click to record…' }: ShortcutRecorderProps) {
  const [armed, setArmed] = useState(false)

  const onKeyDown = (e: { key?: string; modifiers?: { shift?: boolean; ctrl?: boolean; alt?: boolean; cmd?: boolean } }) => {
    if (!armed) return
    const k = (e.key ?? '').toLowerCase()
    const mods = e.modifiers ?? {}
    if (k === 'escape') {
      setArmed(false)
      return
    }
    if (k === 'backspace') {
      onChange?.('')
      setArmed(false)
      return
    }
    if (['shift', 'ctrl', 'alt', 'cmd', 'meta', 'control'].includes(k)) return // ignore bare modifiers

    const parts: string[] = []
    if (mods.ctrl || mods.cmd) parts.push('ctrl')
    if (mods.shift) parts.push('shift')
    if (mods.alt) parts.push('alt')
    parts.push(KEY_NAMES[k] ?? k)
    onChange?.(parts.join('+'))
    setArmed(false)
  }

  return (
    <Field label={label}>
      <div
        tabIndex={0}
        onClick={() => setArmed(true)}
        onKeyDown={onKeyDown}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: armed ? text.primary : border.subtle,
          backgroundColor: surface.card,
          cursor: 'pointer',
          minHeight: 32,
        }}
      >
        {value ? (
          <Kbd keys={value} />
        ) : (
          <text style={{ fontSize: 12.5, color: armed ? text.secondary : text.ghost, fontFamily: FONT }}>{armed ? 'Press keys…' : placeholder}</text>
        )}
      </div>
    </Field>
  )
}
