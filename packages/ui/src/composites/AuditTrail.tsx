/**
 * @atlas/ui — AuditTrail
 *
 * A timestamped event trail with expandable JSON payloads and level badges
 * (composes `JsonTree` + `Badge` + `SearchInput` + `RelativeTime`).
 *
 * @example
 *   <AuditTrail events={[{ id: '1', title: 'Settings updated', level: 'warn', payload: { theme: 'dark' } }]} />
 */
import { useState } from 'react'
import { surface, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { SearchInput } from '../inputs/SearchInput'
import { JsonTree } from '../display/JsonTree'
import { RelativeTime } from '../display/RelativeTime'

export type AuditLevel = 'info' | 'warn' | 'error'

export interface AuditEvent {
  id: string
  title: string
  time?: Date | string | number
  level?: AuditLevel
  payload?: unknown
}

export interface AuditTrailProps {
  events: AuditEvent[]
  searchable?: boolean
}

const LEVEL_COLOR: Record<AuditLevel, string> = { info: '#3B82F6', warn: '#EAB308', error: '#ED4245' }

export function AuditTrail({ events, searchable = true }: AuditTrailProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Set<string>>(new Set())

  const filtered = searchable ? events.filter((e) => e.title.toLowerCase().includes(query.toLowerCase())) : events

  const toggle = (id: string) =>
    setOpen((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {searchable ? <SearchInput value={query} onChange={setQuery} placeholder="Search events…" /> : null}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filtered.map((e) => (
          <div key={e.id} style={{ display: 'flex', flexDirection: 'column', borderBottomWidth: 1, borderColor: surface.selected }}>
            <div
              onClick={() => toggle(e.id)}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 7, paddingBottom: 7, cursor: 'pointer' }}
            >
              <Icon name={open.has(e.id) ? 'chevronDown' : 'chevronRight'} size={12} color={text.muted} />
              {e.level ? <div style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: LEVEL_COLOR[e.level], flexShrink: 0 }} /> : null}
              <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT, flexGrow: 1 }}>{e.title}</text>
              {e.time !== undefined ? <RelativeTime value={e.time} /> : null}
            </div>

            {open.has(e.id) && e.payload !== undefined ? (
              <div style={{ paddingLeft: 24, paddingBottom: 8 }}>
                <JsonTree data={e.payload} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
