/**
 * @atlas/ui — LogViewer
 *
 * A searchable, level-filterable log console (composes `VirtualList` +
 * `SearchInput`).
 *
 * @example
 *   <LogViewer lines={[{ text: 'connected', level: 'info' }, …]} height={360} />
 */
import { useState } from 'react'
import { border, text } from '../tokens'
import { FONT, FONT_MONO } from '../tokens'
import { SearchInput } from '../inputs/SearchInput'
import { VirtualList } from '../layout/VirtualList'

export type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export interface LogLine {
  id?: string
  text: string
  level?: LogLevel
}

export interface LogViewerProps {
  lines: LogLine[]
  height?: number | string
}

const LEVEL_COLOR: Record<LogLevel, string> = {
  info: '#3B82F6',
  warn: '#EAB308',
  error: '#ED4245',
  debug: text.muted,
}

export function LogViewer({ lines, height = '100%' }: LogViewerProps) {
  const [query, setQuery] = useState('')
  const [levels, setLevels] = useState<Set<LogLevel>>(new Set())

  const toggleLevel = (lv: LogLevel) =>
    setLevels((prev) => {
      const n = new Set(prev)
      if (n.has(lv)) n.delete(lv)
      else n.add(lv)
      return n
    })

  const filtered = lines.filter((l) => {
    const okLevel = levels.size === 0 || (l.level !== undefined && levels.has(l.level))
    const okQuery = l.text.toLowerCase().includes(query.toLowerCase())
    return okLevel && okQuery
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: 200 }}>
          <SearchInput value={query} onChange={setQuery} placeholder="Filter logs…" />
        </div>
        {(['info', 'warn', 'error', 'debug'] as LogLevel[]).map((lv) => (
          <div
            key={lv}
            onClick={() => toggleLevel(lv)}
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 3,
              paddingBottom: 3,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: levels.has(lv) ? LEVEL_COLOR[lv] : border.strong,
              backgroundColor: levels.has(lv) ? LEVEL_COLOR[lv] + '22' : undefined,
              cursor: 'pointer',
            }}
          >
            <text style={{ fontSize: 10.5, color: levels.has(lv) ? LEVEL_COLOR[lv] : text.secondary, fontFamily: FONT }}>
              {lv.toUpperCase()}
            </text>
          </div>
        ))}
      </div>

      <VirtualList<LogLine>
        items={filtered}
        estimatedItemHeight={22}
        height="100%"
        renderItem={(l) => (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 6, paddingTop: 3, paddingBottom: 3 }}>
            {l.level ? <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: LEVEL_COLOR[l.level], marginTop: 5, flexShrink: 0 }} /> : null}
            <text style={{ fontSize: 11.5, color: text.secondary, fontFamily: FONT_MONO, whiteSpace: 'normal', lineHeight: 1.4 }}>
              {l.text}
            </text>
          </div>
        )}
      />
    </div>
  )
}
