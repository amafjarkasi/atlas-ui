/**
 * @atlas/ui — IconLabel
 *
 * A leading-icon + text row — the most repeated inline pattern.
 *
 * @example
 *   <IconLabel icon="archive" label="Archive" muted />
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from './Icon'
import type { IconName } from './Icon'

export interface IconLabelProps {
  icon: IconName
  label: string
  iconColor?: string
  iconSize?: number
  fontSize?: number
  muted?: boolean
}

export function IconLabel({ icon, label, iconColor = textTokens.muted, iconSize = 14, fontSize = 12.5, muted = false }: IconLabelProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Icon name={icon} size={iconSize} color={iconColor} />
      <text style={{ fontSize, color: muted ? textTokens.muted : textTokens.primary, fontFamily: FONT }}>{label}</text>
    </div>
  )
}
