/**
 * @atlas/ui — ContextRow
 *
 * A row with a right-click context menu (composes `ContextMenu`).
 */
import type { ReactNode } from 'react'
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '../overlays/ContextMenu'

export interface ContextAction {
  label: string
  icon?: import('../atoms/Icon').IconName
  destructive?: boolean
  disabled?: boolean
  separatorBefore?: boolean
  onSelect?: () => void
}

export interface ContextRowProps {
  children: ReactNode
  actions: ContextAction[]
}

export function ContextRow({ children, actions }: ContextRowProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {actions.map((a, i) =>
          a.separatorBefore ? (
            <div key={i}>
              <ContextMenuSeparator />
              <ContextMenuItem key={`${i}-item`} disabled={a.disabled} destructive={a.destructive} icon={a.icon} onSelect={a.onSelect}>
                {a.label}
              </ContextMenuItem>
            </div>
          ) : (
            <ContextMenuItem key={i} disabled={a.disabled} destructive={a.destructive} icon={a.icon} onSelect={a.onSelect}>
              {a.label}
            </ContextMenuItem>
          ),
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}
