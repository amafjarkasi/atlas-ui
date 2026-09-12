/**
 * @atlas/ui — RelativeTime
 *
 * A compact relative timestamp ("now", "5m", "3h", "4w", then a short date).
 * Optional `now` for deterministic output.
 *
 * @example
 *   <RelativeTime value={new Date(Date.now() - 3600e3)} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'

export interface RelativeTimeProps {
  value: Date | string | number
  now?: Date | number
  color?: string
  fontSize?: number
}

function format(date: Date, now: Date): string {
  const diff = now.getTime() - date.getTime()
  const abs = Math.abs(diff)
  const sec = 1000
  const min = 60 * sec
  const hour = 60 * min
  const day = 24 * hour
  const future = diff < 0
  const fmt = (s: string) => (future ? `in ${s}` : s)

  if (abs < 45 * sec) return 'now'
  if (abs < min) return fmt(`${Math.round(abs / sec)}s`)
  if (abs < hour) return fmt(`${Math.round(abs / min)}m`)
  if (abs < day) return fmt(`${Math.round(abs / hour)}h`)
  if (abs < 7 * day) return fmt(`${Math.round(abs / day)}d`)
  if (abs < 30 * day) return fmt(`${Math.round(abs / (7 * day))}w`)
  if (abs < 365 * day) return fmt(`${Math.round(abs / (30 * day))}mo`)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function RelativeTime({ value, now, color = text.muted, fontSize = 11 }: RelativeTimeProps) {
  const date = value instanceof Date ? value : new Date(value)
  const ref = now instanceof Date ? now : new Date(now ?? Date.now())
  return <text style={{ fontSize, color, fontFamily: FONT, whiteSpace: 'nowrap' }}>{format(date, ref)}</text>
}
