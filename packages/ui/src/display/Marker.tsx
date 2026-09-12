/**
 * @atlas/ui — Marker
 *
 * A text highlighter. It uses GPUIX's native `highlight` prop to paint a
 * translucent wash behind the matched substring (no manual range math).
 *
 * @example
 *   <Marker query="routing board">The routing board is live.</Marker>
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'

export interface MarkerProps {
  children: string
  /** Substring to highlight (case-insensitive). */
  query: string
  color?: string
  fontSize?: number
}

export function Marker({ children, query, color = '#EAB30866', fontSize = 13 }: MarkerProps) {
  return (
    <text
      style={{ fontSize, color: textTokens.primary, fontFamily: FONT, whiteSpace: 'normal', lineHeight: 1.5 }}
      highlight={query ? { query, color } : null}
    >
      {children}
    </text>
  )
}
