/** @atlas/ui — PropertyGrid — editable key/value inspector (DescriptionList + InlineEditableField). */
import { useState } from 'react'
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { InlineEditableField } from '../composites/InlineEditableField'

export interface PropertyGridItem {
  key: string
  label: string
  value: string
  multiline?: boolean
}

export interface PropertyGridProps {
  items: PropertyGridItem[]
  onValueChange?: (key: string, value: string) => void
}

function wrapWords(input: string, maxChars: number): string[] {
  const words = input.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines
}

export function PropertyGrid({ items, onValueChange }: PropertyGridProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 440,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: border.subtle,
        borderRadius: 10,
        backgroundColor: surface.card,
        overflow: 'hidden',
      }}
    >
      {items.map((it, i) => {
        const editing = editingKey === it.key
        const lines = it.multiline ? wrapWords(it.value, 36) : [it.value || '—']
        return (
          <div
            key={it.key}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
              minHeight: 40,
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 14,
              paddingRight: 12,
              borderBottomWidth: i < items.length - 1 ? 1 : 0,
              borderColor: border.subtle,
            }}
          >
            <text
              style={{
                width: 128,
                flexShrink: 0,
                fontSize: 11.5,
                color: t.muted,
                fontFamily: FONT,
                lineHeight: 1.35,
              }}
            >
              {it.label}
            </text>
            {editing ? (
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <InlineEditableField
                  value={it.value}
                  multiline={it.multiline}
                  startEditing
                  onSave={(v) => {
                    onValueChange?.(it.key, v)
                    setEditingKey(null)
                  }}
                />
              </div>
            ) : (
              <div
                onClick={() => setEditingKey(it.key)}
                style={{
                  flexGrow: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  borderRadius: 6,
                  hover: { backgroundColor: '#FFFFFF0A' },
                }}
              >
                <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {lines.map((line, li) => (
                    <text key={`${it.key}-${li}`} style={{ fontSize: 13, color: t.primary, fontFamily: FONT, lineHeight: 1.35 }}>
                      {line}
                    </text>
                  ))}
                </div>
                <div style={{ height: 18, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Icon name="edit" size={12} color={t.muted} />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
