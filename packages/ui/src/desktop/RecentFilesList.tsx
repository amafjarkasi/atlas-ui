/** @atlas/ui — RecentFilesList — recent files with relative time + pin. */
import { useState } from 'react'
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { RelativeTime } from '../display/RelativeTime'
import { SearchInput as SearchInputComp } from '../inputs/SearchInput'
import { Icon } from '../atoms/Icon'

export interface RecentFile {
  id: string
  name: string
  path: string
  lastOpened: Date | string | number
}

export interface RecentFilesListProps {
  files: RecentFile[]
  onOpen?: (file: RecentFile) => void
  searchable?: boolean
}

export function RecentFilesList({ files, onOpen, searchable = true }: RecentFilesListProps) {
  const [query, setQuery] = useState('')
  const filtered = files.filter(
    (f) => f.name.toLowerCase().includes(query.toLowerCase()) || f.path.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: 440,
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.card,
      }}
    >
      {searchable ? <SearchInputComp value={query} onChange={setQuery} placeholder="Search recent files…" /> : null}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filtered.map((f, i) => (
          <div
            key={f.id}
            onClick={() => onOpen?.(f)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 6,
              paddingRight: 6,
              borderRadius: 6,
              cursor: 'pointer',
              borderBottomWidth: i < filtered.length - 1 ? 1 : 0,
              borderColor: border.subtle,
              hover: { backgroundColor: surface.selected },
            }}
          >
            <Icon name="file" size={14} color={t.muted} />
            <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <text style={{ fontSize: 12.5, color: t.primary, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {f.name}
              </text>
              <text style={{ fontSize: 10.5, color: t.ghost, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {f.path}
              </text>
            </div>
            <RelativeTime value={f.lastOpened} />
          </div>
        ))}
        {filtered.length === 0 ? (
          <text style={{ fontSize: 12, color: t.muted, fontFamily: FONT, padding: 8 }}>No recent files</text>
        ) : null}
      </div>
    </div>
  )
}
