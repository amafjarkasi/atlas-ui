/**
 * @atlas/ui — BulkActionsBar
 *
 * A selection toolbar that appears when items are selected: count badge +
 * actions + clear.
 *
 * @example
 *   <BulkActionsBar selectedCount={n} onClear={clear} actions={<><Button variant="destructive">Delete</Button></>} />
 */
import type { ReactNode } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'
import { Divider } from './Divider'

export interface BulkActionsBarProps {
  selectedCount: number
  actions?: ReactNode
  onClear?: () => void
}

export function BulkActionsBar({ selectedCount, actions, onClear }: BulkActionsBarProps) {
  if (selectedCount === 0) return null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.selected,
      }}
    >
      <Badge variant="count" count={selectedCount} />
      <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT }}>selected</text>
      <Divider orientation="vertical" />
      {actions}
      <div style={{ flexGrow: 1 }} />
      {onClear ? (
        <Button size="sm" variant="ghost" onClick={onClear}>
          Clear
        </Button>
      ) : null}
    </div>
  )
}
