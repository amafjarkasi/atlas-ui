/**
 * @atlas/ui — SettingRow
 *
 * A settings row: label + description on the left, control on the right.
 */
import type { ReactNode } from 'react'
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'

export interface SettingRowProps {
  label: string
  description?: string
  control?: ReactNode
}

export function SettingRow({ label, description, control }: SettingRowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16, paddingTop: 10, paddingBottom: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
        <text style={{ fontSize: 12.5, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>{label}</text>
        {description ? <text style={{ fontSize: 11.5, color: textTokens.muted, fontFamily: FONT }}>{description}</text> : null}
      </div>
      {control}
    </div>
  )
}
