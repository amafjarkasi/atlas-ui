/**
 * @atlas/ui — CommandMenu
 *
 * A ⌘K command palette: a search input filters the item list; ArrowDown/Up
 * move the active item, Enter runs it, Escape closes.
 *
 * @example
 *   <CommandMenu open={open} onOpenChange={setOpen} items={commands} />
 */
import { useEffect, useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Kbd } from '../atoms'
import type { IconName } from '../atoms'

export interface CommandItem {
  id: string
  label: string
  icon?: IconName
  shortcut?: string
  group?: string
  onSelect?: () => void
}

export interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CommandItem[]
  placeholder?: string
}

export function CommandMenu({ open, onOpenChange, items, placeholder = 'Type a command…' }: CommandMenuProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
    }
  }, [open])

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
  const activeId = filtered[active]?.id

  const run = (item: CommandItem) => {
    item.onSelect?.()
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div
      tabIndex={0}
      autoFocus
      onKeyDown={(e) => {
        if (e.key?.toLowerCase() === 'escape') onOpenChange(false)
      }}
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 96 }}
    >
      <div onClick={() => onOpenChange(false)} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#000000', opacity: 0.5 }} />

      <div
        style={{
          width: 440,
          maxWidth: '90%',
          maxHeight: '60%',
          backgroundColor: surface.overlay,
          borderWidth: 1,
          borderColor: border.strong,
          borderRadius: 12,
          boxShadow: { offsetX: 0, offsetY: 16, blurRadius: 48, spreadRadius: 0, color: '#00000088' },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderColor: border.subtle,
          }}
        >
          <Icon name="search" size={14} color={text.muted} />
          <input
            autoFocus
            value={query}
            placeholder={placeholder}
            onChange={(e) => {
              setQuery(e.value ?? '')
              setActive(0)
            }}
            onKeyDown={(e) => {
              const k = e.key?.toLowerCase()
              if (k === 'arrowdown') setActive((a) => Math.min(filtered.length - 1, a + 1))
              else if (k === 'arrowup') setActive((a) => Math.max(0, a - 1))
              else if (k === 'enter' && filtered[active]) run(filtered[active])
              else if (k === 'escape') onOpenChange(false)
            }}
            style={{ flexGrow: 1, fontSize: 13, color: text.primary, fontFamily: FONT }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', padding: 6, overflowY: 'scroll' }}>
          {filtered.length === 0 ? (
            <text style={{ fontSize: 12, color: text.muted, fontFamily: FONT, padding: 12 }}>No results</text>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => run(item)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 7,
                  paddingBottom: 7,
                  borderRadius: 6,
                  cursor: 'pointer',
                  backgroundColor: item.id === activeId ? surface.selected : undefined,
                }}
              >
                {item.icon && <Icon name={item.icon} size={14} color={text.secondary} />}
                <text style={{ fontSize: 13, color: text.primary, fontFamily: FONT, flexGrow: 1 }}>{item.label}</text>
                {item.shortcut && <Kbd keys={item.shortcut} />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
