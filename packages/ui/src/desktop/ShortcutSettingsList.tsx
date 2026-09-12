/** @atlas/ui — ShortcutSettingsList — rows of shortcut label + recorder. */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { ShortcutRecorder } from '../inputs/ShortcutRecorder'

export interface ShortcutSettingRow {
  id: string
  label: string
  combo: string
}

export interface ShortcutSettingsListProps {
  rows: ShortcutSettingRow[]
  onComboChange?: (id: string, combo: string) => void
}

export function ShortcutSettingsList({ rows, onComboChange }: ShortcutSettingsListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {rows.map((r) => (
        <div key={r.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 6, paddingBottom: 6 }}>
          <text style={{ fontSize: 12.5, color: t.primary, fontFamily: FONT, flexGrow: 1 }}>{r.label}</text>
          <div style={{ width: 180 }}>
            <ShortcutRecorder value={r.combo} onChange={(c) => onComboChange?.(r.id, c)} />
          </div>
        </div>
      ))}
    </div>
  )
}
