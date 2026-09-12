/**
 * @atlas/ui — StatusDot
 *
 * A standalone presence/status indicator: dot + optional label.
 *
 * @example
 *   <StatusDot status="online" label="Online" />
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'

export type StatusValue = 'online' | 'away' | 'dnd' | 'busy' | 'offline'

export interface StatusDotProps {
  status: StatusValue
  label?: string
  size?: number
}

const STATUS_COLOR: Record<StatusValue, string> = {
  online: '#22C55E',
  away: '#F59E0B',
  dnd: '#ED4245',
  busy: '#3B82F6',
  offline: '#3F3F46',
}

export function StatusDot({ status, label, size = 8 }: StatusDotProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <div style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: STATUS_COLOR[status], flexShrink: 0 }} />
      {label ? <text style={{ fontSize: 12, color: textTokens.secondary, fontFamily: FONT }}>{label}</text> : null}
    </div>
  )
}
