/**
 * @atlas/ui — ContextMenu overlay
 *
 * Headless right-click context menu built on the `<anchored>` GPUIX primitive.
 * Usage:
 *   <ContextMenu>
 *     <ContextMenuTrigger>…your content…</ContextMenuTrigger>
 *     <ContextMenuContent>
 *       <ContextMenuItem onSelect={() => {}}>Copy</ContextMenuItem>
 *       <ContextMenuSeparator />
 *       <ContextMenuItem destructive onSelect={() => {}}>Delete</ContextMenuItem>
 *     </ContextMenuContent>
 *   </ContextMenu>
 */
import { createContext, useContext, useState, useCallback } from 'react'
import { C, FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'

// ── Context ───────────────────────────────────────────────────────────────────

interface ContextMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const ContextMenuContext = createContext<ContextMenuContextValue>({
  open: false,
  setOpen: () => {},
})

// ── Root ─────────────────────────────────────────────────────────────────────

export interface ContextMenuProps {
  children: React.ReactNode
}

export function ContextMenu({ children }: ContextMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <ContextMenuContext.Provider value={{ open, setOpen }}>
      <div style={{ position: 'relative' }}>
        {children}
      </div>
    </ContextMenuContext.Provider>
  )
}

// ── Trigger ───────────────────────────────────────────────────────────────────

export interface ContextMenuTriggerProps {
  children: React.ReactNode
  /** @deprecated asChild not supported in GPUIX — wrap children in a div */
  asChild?: boolean
}

export function ContextMenuTrigger({ children }: ContextMenuTriggerProps) {
  const { setOpen } = useContext(ContextMenuContext)

  const handleAuxClick = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  return (
    <div style={{ display: 'contents' } as any} onAuxClick={handleAuxClick}>
      {children}
    </div>
  )
}

// ── Content ───────────────────────────────────────────────────────────────────

export interface ContextMenuContentProps {
  children: React.ReactNode
}

export function ContextMenuContent({ children }: ContextMenuContentProps) {
  const { open, setOpen } = useContext(ContextMenuContext)

  if (!open) return null

  return (
    <anchored
      side="bottom"
      align="start"
      gap={4}
      fit="switch"
      onMouseDownOutside={() => setOpen(false)}
    >
      <div
        tabIndex={0}
        style={{
          backgroundColor: '#1E1E22',
          borderWidth: 1,
          borderColor: C.borderStrong,
          borderRadius: 8,
          paddingTop: 4,
          paddingBottom: 4,
          minWidth: 180,
          boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
          flexDirection: 'column',
        }}
        onKeyDown={(e: any) => {
          if (e.key === 'Escape') setOpen(false)
        }}
      >
        {children}
      </div>
    </anchored>
  )
}

// ── Item ──────────────────────────────────────────────────────────────────────

export interface ContextMenuItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  icon?: IconName
  destructive?: boolean
}

export function ContextMenuItem({
  children,
  onSelect,
  disabled = false,
  icon,
  destructive = false,
}: ContextMenuItemProps) {
  const { setOpen } = useContext(ContextMenuContext)

  const textColor = destructive ? '#ED4245' : disabled ? C.ghost : C.text

  const handleClick = useCallback(() => {
    if (disabled) return
    onSelect?.()
    setOpen(false)
  }, [disabled, onSelect, setOpen])

  return (
    <div
      style={{
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        marginLeft: 4,
        marginRight: 4,
        hover: disabled ? {} : { backgroundColor: C.selected },
      }}
      onClick={handleClick}
    >
      {icon && <Icon name={icon} size={14} color={textColor} />}
      <text
        style={{
          fontFamily: FONT,
          fontSize: 13,
          color: textColor,
          flexGrow: 1,
        }}
      >
        {children}
      </text>
    </div>
  )
}

// ── Separator ─────────────────────────────────────────────────────────────────

export function ContextMenuSeparator() {
  return (
    <div
      style={{
        height: 1,
        backgroundColor: C.border,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 4,
        marginRight: 4,
      }}
    />
  )
}

// ── Label ─────────────────────────────────────────────────────────────────────

export interface ContextMenuLabelProps {
  children: React.ReactNode
}

export function ContextMenuLabel({ children }: ContextMenuLabelProps) {
  return (
    <div
      style={{
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        marginLeft: 4,
        marginRight: 4,
      }}
    >
      <text
        style={{
          fontFamily: FONT,
          fontSize: 11,
          color: C.muted,
          fontWeight: 600,
        }}
      >
        {children}
      </text>
    </div>
  )
}
