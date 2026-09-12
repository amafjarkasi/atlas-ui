/** @atlas/ui — ShortcutSettingsList — rows of shortcut label + recorder. */
import { border, surface, text as t } from '../tokens'
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 440,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: border.subtle,
        borderRadius: 10,
        backgroundColor: surface.card,
        overflow: 'hidden',
      }}
    >
      {rows.map((r, i) => (
        <div
          key={r.id}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 14,
            paddingRight: 10,
            borderBottomWidth: i < rows.length - 1 ? 1 : 0,
            borderColor: border.subtle,
          }}
        >
          <text style={{ fontSize: 12.5, color: t.primary, fontFamily: FONT, flexGrow: 1 }}>{r.label}</text>
          <div style={{ width: 168, flexShrink: 0 }}>
            <ShortcutRecorder value={r.combo} onChange={(c) => onComboChange?.(r.id, c)} />
          </div>
        </div>
      ))}
    </div>
  )
}
