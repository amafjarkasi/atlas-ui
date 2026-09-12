/**
 * @atlas/ui — GradientText
 *
 * GPUIX `<text>` nodes paint a single solid `color`, so a true per-glyph
 * gradient is not expressible. This component reproduces the look of gradient
 * text: the glyphs take the first stop's color while a real
 * `LinearGradientBackground` renders as an underline accent beneath them.
 *
 * @example
 *   <GradientText stops={[{ color: '#3B82F6', position: 0 }, { color: '#8B5CF6', position: 1 }]}>
 *     Atlas Weekly
 *   </GradientText>
 */
import type { LinearGradientBackground } from '@gpuix/react'
import { semantic } from '../tokens'
import { FONT } from '../tokens'

export interface GradientStop {
  color: string
  /** Position along the gradient from 0 to 1. */
  position: number
}

export interface GradientTextProps {
  children: string
  /** Exactly two stops (GPUIX gradients are two-stop). */
  stops?: [GradientStop, GradientStop]
  /** Gradient angle in degrees (CSS convention, 0 = up). */
  angle?: number
  fontSize?: number
  fontWeight?: number | string
  underline?: boolean
  underlineHeight?: number
}

const DEFAULT_STOPS: [GradientStop, GradientStop] = [
  { color: semantic.accent, position: 0 },
  { color: '#8B5CF6', position: 1 },
]

export function GradientText({
  children,
  stops = DEFAULT_STOPS,
  angle = 90,
  fontSize = 14,
  fontWeight = 600,
  underline = true,
  underlineHeight = 2,
}: GradientTextProps) {
  const textColor = stops[0]?.color ?? semantic.accent

  const background: LinearGradientBackground = {
    type: 'linear-gradient',
    angle,
    stops,
    colorSpace: 'srgb',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' }}>
      <text style={{ fontSize, fontWeight, color: textColor, fontFamily: FONT, whiteSpace: 'nowrap' }}>
        {children}
      </text>
      {underline && (
        <div
          style={{
            width: '100%',
            height: underlineHeight,
            borderRadius: underlineHeight / 2,
            background,
          }}
        />
      )}
    </div>
  )
}
