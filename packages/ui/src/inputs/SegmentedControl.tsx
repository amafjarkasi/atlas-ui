/**
 * @atlas/ui — SegmentedControl & ToggleGroup
 *
 * SegmentedControl: single-select segmented pill (like a radio group in a bar).
 * ToggleGroup: multi-select pill chips (like a filter toggler).
 *
 * @example
 *   <SegmentedControl options={[{ label: 'Inbox', value: 'inbox' }, { label: 'Archived', value: 'archived' }]} value={view} onChange={setView} />
 *   <ToggleGroup options={[{ label: 'Unread', value: 'unread' }, { label: 'Starred', value: 'starred' }]} value={filters} onChange={setFilters} />
 */
import { useState } from 'react'
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'

export interface SegmentOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SegmentedControlProps {
  options: SegmentOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

export function SegmentedControl({
  options,
  value: controlled,
  defaultValue,
  onChange,
  disabled = false,
}: SegmentedControlProps) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const value = controlled !== undefined ? controlled : internal
  const set = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 2,
        borderRadius: 8,
        backgroundColor: surface.pill,
        borderWidth: 1,
        borderColor: border.subtle,
        alignSelf: 'flex-start',
        opacity: disabled ? 0.5 : 1,
        flexShrink: 0,
      }}
    >
      {options.map((opt, i) => {
        const selected = opt.value === value
        return (
          <div
            key={opt.value}
            tabIndex={0}
            onClick={() => {
              if (!disabled && !opt.disabled) set(opt.value)
            }}
            onKeyDown={(e) => {
              const k = e.key?.toLowerCase()
              if (k === 'arrowright' || k === 'arrowdown') {
                const n = options[(i + 1) % options.length]
                if (n && !n.disabled) set(n.value)
              } else if (k === 'arrowleft' || k === 'arrowup') {
                const n = options[(i - 1 + options.length) % options.length]
                if (n && !n.disabled) set(n.value)
              } else if (k === 'enter' || k === ' ') {
                if (!disabled && !opt.disabled) set(opt.value)
              }
            }}
            style={{
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 6,
              backgroundColor: selected ? surface.selected : undefined,
              cursor: disabled || opt.disabled ? 'not-allowed' : 'pointer',
              hover: selected ? undefined : { backgroundColor: '#FFFFFF0A' },
              opacity: opt.disabled ? 0.4 : 1,
              flexShrink: 0,
            }}
          >
            <text
              style={{
                fontSize: 12.5,
                fontWeight: selected ? 600 : 500,
                color: selected ? text.primary : text.muted,
                fontFamily: FONT,
                whiteSpace: 'nowrap',
              }}
            >
              {opt.label}
            </text>
          </div>
        )
      })}
    </div>
  )
}

export interface ToggleGroupProps {
  options: SegmentOption[]
  value: string[]
  onChange?: (value: string[]) => void
  disabled?: boolean
}

export function ToggleGroup({ options, value, onChange, disabled = false }: ToggleGroupProps) {
  const toggle = (v: string) => {
    const has = value.includes(v)
    onChange?.(has ? value.filter((x) => x !== v) : [...value, v])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 6, flexWrap: 'wrap', opacity: disabled ? 0.5 : 1 }}>
      {options.map((opt) => {
        const selected = value.includes(opt.value)
        return (
          <div
            key={opt.value}
            onClick={() => {
              if (!disabled && !opt.disabled) toggle(opt.value)
            }}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: selected ? semantic.accent : border.strong,
              backgroundColor: selected ? semantic.accent + '22' : surface.card,
              cursor: disabled || opt.disabled ? 'not-allowed' : 'pointer',
              opacity: opt.disabled ? 0.4 : 1,
              flexShrink: 0,
            }}
          >
            <text
              style={{
                fontSize: 12,
                fontWeight: selected ? 600 : 500,
                color: selected ? semantic.accent : text.secondary,
                fontFamily: FONT,
                whiteSpace: 'nowrap',
              }}
            >
              {opt.label}
            </text>
          </div>
        )
      })}
    </div>
  )
}
