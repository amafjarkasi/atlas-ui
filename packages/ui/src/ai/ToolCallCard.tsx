/**
 * @atlas/ui — ToolCallCard
 *
 * A collapsible card for a structured tool/MCP invocation: name, args, and
 * result, with a status-colored icon.
 *
 * @example
 *   <ToolCallCard name="web_search" args='{"q": "gpuix"}' result="3 results" status="done" />
 */
import { useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT_MONO } from '../tokens'
import { Icon } from '../atoms/Icon'

export type ToolCallStatus = 'running' | 'done' | 'error'

export interface ToolCallCardProps {
  name: string
  args?: string
  result?: string
  status?: ToolCallStatus
}

export function ToolCallCard({ name, args, result, status = 'done' }: ToolCallCardProps) {
  const [open, setOpen] = useState(false)
  const statusColor = status === 'error' ? '#ED4245' : status === 'done' ? '#22C55E' : '#3B82F6'

  return (
    <div
      style={{
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.code,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 7,
          paddingBottom: 7,
          cursor: 'pointer',
        }}
      >
        <Icon name="zap" size={13} color={statusColor} />
        <text style={{ fontSize: 12, fontWeight: 600, color: text.primary, fontFamily: FONT_MONO, flexGrow: 1 }}>
          {name}
        </text>
        <Icon name={open ? 'chevronDown' : 'chevronRight'} size={12} color={text.muted} />
      </div>

      {open ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 8,
            paddingBottom: 10,
            borderTopWidth: 1,
            borderColor: border.subtle,
          }}
        >
          {args ? (
            <text style={{ fontSize: 11.5, color: text.secondary, fontFamily: FONT_MONO, whiteSpace: 'normal', lineHeight: 1.5 }}>
              {args}
            </text>
          ) : null}
          {result ? (
            <text style={{ fontSize: 11.5, color: text.muted, fontFamily: FONT_MONO, whiteSpace: 'normal', lineHeight: 1.5 }}>
              {result}
            </text>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
