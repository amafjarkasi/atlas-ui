/**
 * @atlas/ui — PromptHistoryList
 *
 * A sidebar of past conversations (searchable, with relative timestamps and
 * optional delete).
 *
 * @example
 *   <PromptHistoryList items={conversations} activeId={id} onSelect={open} onDelete={remove} />
 */
import { useState } from 'react'
import { surface, text } from '../tokens'
import { FONT } from '../tokens'
import { SearchInput } from '../inputs/SearchInput'
import { EmptyState } from '../display/EmptyState'
import { RelativeTime } from '../display/RelativeTime'
import { Icon } from '../atoms/Icon'

export interface PromptHistoryItem {
  id: string
  title: string
  date?: Date | string | number
  preview?: string
}

export interface PromptHistoryListProps {
  items: PromptHistoryItem[]
  activeId?: string
  onSelect?: (id: string) => void
  onDelete?: (id: string) => void
  searchable?: boolean
}

export function PromptHistoryList({ items, activeId, onSelect, onDelete, searchable = true }: PromptHistoryListProps) {
  const [query, setQuery] = useState('')
  const filtered = searchable ? items.filter((i) => i.title.toLowerCase().includes(query.toLowerCase())) : items

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%', width: '100%' }}>
      {searchable ? <SearchInput value={query} onChange={setQuery} placeholder="Search…" /> : null}

      {filtered.length === 0 ? (
        <EmptyState icon="message" title="No conversations" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', flexGrow: 1 }}>
          {filtered.map((it) => {
            const active = it.id === activeId
            return (
              <div
                key={it.id}
                onClick={() => onSelect?.(it.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingLeft: 10,
                  paddingRight: 8,
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 8,
                  cursor: 'pointer',
                  backgroundColor: active ? surface.selected : undefined,
                  hover: active ? undefined : { backgroundColor: '#FFFFFF08' },
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, minWidth: 0 }}>
                  <text style={{ fontSize: 12.5, fontWeight: 600, color: text.primary, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {it.title}
                  </text>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                    {it.date !== undefined ? <RelativeTime value={it.date} /> : null}
                    {it.preview ? (
                      <text style={{ fontSize: 11, color: text.ghost, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis', flexGrow: 1 }}>
                        {it.preview}
                      </text>
                    ) : null}
                  </div>
                </div>

                {onDelete ? (
                  <div
                    onClick={() => onDelete(it.id)}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      hover: { backgroundColor: '#FFFFFF14' },
                    }}
                  >
                    <Icon name="x" size={11} color={text.muted} />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
