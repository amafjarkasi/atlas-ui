/** @atlas/ui — RecentFilesList — recent files with relative time + pin. */
import { useState } from 'react'
import { surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { SearchableList } from '../display/SearchableList'
import { RelativeTime } from '../display/RelativeTime'

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
  const filtered = files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()) || f.path.toLowerCase().includes(query.toLowerCase()))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      {searchable ? <SearchInputComp value={query} onChange={setQuery} /> : null}
      <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', flexGrow: 1 }}>
        {filtered.map((f) => (
          <div key={f.id} onClick={() => onOpen?.(f)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, padding: 8, borderRadius: 6, cursor: 'pointer', hover: { backgroundColor: surface.selected } }}>
            <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <text style={{ fontSize: 12.5, color: t.primary, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{f.name}</text>
              <text style={{ fontSize: 10.5, color: t.ghost, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{f.path}</text>
            </div>
            <RelativeTime value={f.lastOpened} />
          </div>
        ))}
      </div>
    </div>
  )
}

import { SearchInput as SearchInputComp } from '../inputs/SearchInput'
