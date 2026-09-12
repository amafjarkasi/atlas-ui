/**
 * @atlas/ui — StreamingText
 *
 * A token-by-token reveal for AI/streaming output, with an optional blinking
 * caret. When `active` is false the full text renders immediately.
 *
 * @example
 *   <StreamingText text={assistantReply} active={streaming} speed={16} />
 */
import { useEffect, useState } from 'react'
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'

export interface StreamingTextProps {
  text: string
  active?: boolean
  /** Milliseconds per character revealed. */
  speed?: number
  fontSize?: number
  color?: string
  fontWeight?: number | string
  showCursor?: boolean
}

export function StreamingText({
  text = '',
  active = true,
  speed = 20,
  fontSize = 13,
  color = textTokens.primary,
  fontWeight = 400,
  showCursor = true,
}: StreamingTextProps) {
  const safeText = text ?? ''
  const [shown, setShown] = useState(active ? 0 : safeText.length)

  useEffect(() => {
    if (!active) {
      setShown(safeText.length)
      return
    }
    setShown(0)
    const id = setInterval(() => {
      setShown((s) => {
        if (s >= safeText.length) {
          clearInterval(id)
          return s
        }
        return s + 1
      })
    }, speed)
    return () => clearInterval(id)
  }, [safeText, active, speed])

  const caret = showCursor && active && shown < safeText.length

  return (
    <text style={{ fontSize, color, fontWeight, fontFamily: FONT, whiteSpace: 'normal', lineHeight: 1.5 }}>
      {safeText.slice(0, shown)}
      {caret ? '▍' : ''}
    </text>
  )
}
