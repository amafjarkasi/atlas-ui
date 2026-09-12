/**
 * @atlas/ui — JsonTree
 *
 * A recursive, collapsible JSON viewer with syntax coloring. Objects/arrays
 * expand up to `defaultExpandedDepth`.
 *
 * @example
 *   <JsonTree data={{ model: 'northlight-4', quality: 0.81, tags: ['stable'] }} />
 */
import { useState } from 'react'
import { text as textTokens } from '../tokens'
import { FONT_MONO } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface JsonTreeProps {
  data: unknown
  label?: string
  defaultExpandedDepth?: number
}

const COLORS = {
  key: '#7DD3FC',
  string: '#86EFAC',
  number: '#FBBF24',
  boolean: '#C4B5FD',
  null: textTokens.muted,
  punctuation: textTokens.muted,
}

function valueColor(v: unknown): string {
  if (typeof v === 'string') return COLORS.string
  if (typeof v === 'number') return COLORS.number
  if (typeof v === 'boolean') return COLORS.boolean
  return COLORS.null
}

function JsonNode({
  data,
  name,
  depth,
  defaultExpandedDepth,
}: {
  data: unknown
  name?: string
  depth: number
  defaultExpandedDepth: number
}) {
  const isObject = data !== null && typeof data === 'object'
  const [open, setOpen] = useState(depth < defaultExpandedDepth)

  const keyLabel = name !== undefined ? (
    <text style={{ fontSize: 12, color: COLORS.key, fontFamily: FONT_MONO }}>{`"${name}": `}</text>
  ) : null

  if (!isObject) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {keyLabel}
        <text style={{ fontSize: 12, color: valueColor(data), fontFamily: FONT_MONO }}>{JSON.stringify(data)}</text>
      </div>
    )
  }

  const isArray = Array.isArray(data)
  const openBracket = isArray ? '[' : '{'
  const closeBracket = isArray ? ']' : '}'
  const entries = Object.entries(data as Record<string, unknown>)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div onClick={() => setOpen((o) => !o)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
        {entries.length > 0 ? (
          <Icon name={open ? 'chevronDown' : 'chevronRight'} size={11} color={textTokens.muted} />
        ) : (
          <div style={{ width: 11 }} />
        )}
        {keyLabel}
        <text style={{ fontSize: 12, color: COLORS.punctuation, fontFamily: FONT_MONO }}>{openBracket}</text>
        {!open ? (
          <text style={{ fontSize: 12, color: COLORS.punctuation, fontFamily: FONT_MONO }}>
            {entries.length > 0 ? ` ${entries.length} … ${closeBracket}` : closeBracket}
          </text>
        ) : null}
      </div>

      {open ? (
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 14 }}>
          {entries.map(([k, v]) => (
            <JsonNode key={k} name={k} data={v} depth={depth + 1} defaultExpandedDepth={defaultExpandedDepth} />
          ))}
          <text style={{ fontSize: 12, color: COLORS.punctuation, fontFamily: FONT_MONO }}>{closeBracket}</text>
        </div>
      ) : null}
    </div>
  )
}

export function JsonTree({ data, label, defaultExpandedDepth = 1 }: JsonTreeProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {label ? (
        <text style={{ fontSize: 11, color: textTokens.muted, fontFamily: FONT_MONO }}>{label}</text>
      ) : null}
      <JsonNode data={data} depth={0} defaultExpandedDepth={defaultExpandedDepth} />
    </div>
  )
}
