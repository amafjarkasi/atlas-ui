/**
 * @atlas/ui — Accordion
 *
 * Collapsible sections. `multiple` allows several open at once. Content is
 * rendered conditionally (GPUIX motion animates numeric heights only, so a
 * content-height animation isn't available — the chevron conveys state).
 *
 * @example
 *   <Accordion items={[{ id: 'general', title: 'General', content: <Field label="…">…</Field> }, …]} />
 */
import { useState, type ReactNode } from 'react'
import { surface, border, text, interact } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface AccordionItem {
  id: string
  title: string
  content: ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean
  defaultOpen?: string[]
}

export function Accordion({ items, multiple = false, defaultOpen = [] }: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen))

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!multiple) next.clear()
        next.add(id)
      }
      return next
    })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, overflow: 'hidden' }}>
      {items.map((item, i) => {
        const isOpen = open.has(item.id)
        return (
          <div key={item.id} style={{ borderTopWidth: i > 0 ? 1 : 0, borderColor: border.subtle }}>
            <div
              tabIndex={0}
              onClick={() => {
                if (!item.disabled) toggle(item.id)
              }}
              onKeyDown={(e) => {
                const k = e.key?.toLowerCase()
                if (k === 'enter' || k === ' ') {
                  if (!item.disabled) toggle(item.id)
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingLeft: 14,
                paddingRight: 14,
                paddingTop: 11,
                paddingBottom: 11,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.4 : 1,
                hover: item.disabled ? undefined : { backgroundColor: interact.hover },
              }}
            >
              <Icon name={isOpen ? 'chevronDown' : 'chevronRight'} size={13} color={text.muted} />
              <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT, flexGrow: 1 }}>
                {item.title}
              </text>
            </div>

            {isOpen ? (
              <div style={{ paddingLeft: 14, paddingRight: 14, paddingBottom: 14 }}>{item.content}</div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
