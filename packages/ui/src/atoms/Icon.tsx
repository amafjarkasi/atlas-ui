/**
 * @atlas/ui — Icon atom
 *
 * Renders a named SVG icon from the bundled icon registry.
 * Color is applied as the SVG `color` prop which GPUIX uses to tint the stroke.
 */
import { C, FONT } from '../tokens'
import { SVG_ICONS } from '../icons'
import type { IconName } from '../icons'

export type { IconName }

export interface IconProps {
  name: IconName
  size?: number
  color?: string
}

export function Icon({ name, size = 14, color = C.muted }: IconProps) {
  const source = SVG_ICONS[name]
  if (!source) return null
  return (
    <svg
      source={source}
      style={{ width: size, height: size, flexShrink: 0, color }}
    />
  )
}
