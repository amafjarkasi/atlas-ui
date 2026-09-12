/**
 * @atlas/ui — ColumnVisibilityMenu
 *
 * A "Columns" popover toggling which `DataTable` columns are visible (composes
 * `Popover` + `ToggleGroup`).
 *
 * @example
 *   <ColumnVisibilityMenu columns={cols} hidden={hidden} onChange={setHidden} />
 */
import { useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Popover } from './Popover'
import { ToggleGroup } from '../inputs/SegmentedControl'

export interface ColumnVisibilityColumn {
  key: string
  title: string
}

export interface ColumnVisibilityMenuProps {
  columns: ColumnVisibilityColumn[]
  hidden: string[]
  onChange?: (hidden: string[]) => void
}

export function ColumnVisibilityMenu({ columns, hidden, onChange }: ColumnVisibilityMenuProps) {
  const [open, setOpen] = useState(false)
  const visibleKeys = columns.filter((c) => !hidden.includes(c.key)).map((c) => c.key)

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      align="end"
      trigger={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: border.subtle,
            backgroundColor: surface.card,
            cursor: 'pointer',
          }}
        >
          <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT }}>Columns</text>
          <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>({visibleKeys.length}/{columns.length})</text>
        </div>
      }
    >
      <ToggleGroup
        options={columns.map((c) => ({ value: c.key, label: c.title }))}
        value={visibleKeys}
        onChange={(visible) => onChange?.(columns.map((c) => c.key).filter((k) => !visible.includes(k)))}
      />
    </Popover>
  )
}
