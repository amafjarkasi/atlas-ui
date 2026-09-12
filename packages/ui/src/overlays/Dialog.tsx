/**
 * @atlas/ui — Dialog overlay
 *
 * A modal dialog built from an absolutely-positioned backdrop + centered panel.
 * GPUIX has no portal, so the overlay is positioned against the nearest
 * positioned ancestor — mount `<Dialog>` near the root of your layout (the app
 * root is full-window in Atlas).
 *
 * Usage:
 *   <Dialog>
 *     <DialogTrigger>…button…</DialogTrigger>
 *     <DialogOverlay>
 *       <DialogContent>
 *         <DialogHeader>
 *           <DialogTitle>Account</DialogTitle>
 *           <DialogDescription>Manage your profile.</DialogDescription>
 *         </DialogHeader>
 *         <DialogBody>…</DialogBody>
 *         <DialogFooter><DialogClose /></DialogFooter>
 *       </DialogContent>
 *     </DialogOverlay>
 *   </Dialog>
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { motion } from '@gpuix/react'
import { surface, border, text, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = createContext<DialogContextValue>({ open: false, setOpen: () => {} })

export interface DialogProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({ children, open: openProp, defaultOpen = false, onOpenChange }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : internalOpen
  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>
}

export interface DialogTriggerProps {
  children: ReactNode
}

export function DialogTrigger({ children }: DialogTriggerProps) {
  const { setOpen } = useContext(DialogContext)
  return <div onClick={() => setOpen(true)}>{children}</div>
}

export interface DialogOverlayProps {
  children?: ReactNode
  /** Backdrop opacity, 0..1. */
  dim?: number
}

export function DialogOverlay({ children, dim = 0.5 }: DialogOverlayProps) {
  const { open, setOpen } = useContext(DialogContext)
  if (!open) return null

  return (
    <div
      tabIndex={0}
      autoFocus
      onKeyDown={(e) => {
        if (e.key?.toLowerCase() === 'escape') setOpen(false)
      }}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: '#000000',
          opacity: dim,
        }}
      />
      {children}
    </div>
  )
}

export interface DialogContentProps {
  children?: ReactNode
  width?: number | string
  onEscapeKeyDown?: () => void
}

export function DialogContent({ children, width = 440 }: DialogContentProps) {
  const { open } = useContext(DialogContext)
  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      style={{
        width,
        maxWidth: '100%',
        maxHeight: '90%',
        overflow: 'hidden',
        backgroundColor: surface.overlay,
        borderWidth: 1,
        borderColor: border.strong,
        borderRadius: 12,
        boxShadow: { offsetX: 0, offsetY: 16, blurRadius: 48, spreadRadius: 0, color: '#00000088' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </motion.div>
  )
}

export interface DialogHeaderProps {
  children?: ReactNode
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 18,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: border.subtle,
      }}
    >
      {children}
    </div>
  )
}

export interface DialogTitleProps {
  children: ReactNode
}

export function DialogTitle({ children }: DialogTitleProps) {
  return (
    <text style={{ fontSize: 15, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{children}</text>
  )
}

export interface DialogDescriptionProps {
  children: ReactNode
}

export function DialogDescription({ children }: DialogDescriptionProps) {
  return (
    <text style={{ fontSize: 12.5, color: text.muted, fontFamily: FONT, lineHeight: 1.5 }}>{children}</text>
  )
}

export interface DialogBodyProps {
  children?: ReactNode
}

export function DialogBody({ children }: DialogBodyProps) {
  return (
    <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, flexGrow: 1, overflowY: 'scroll' }}>
      {children}
    </div>
  )
}

export interface DialogFooterProps {
  children?: ReactNode
}

export function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 8,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderColor: border.subtle,
      }}
    >
      {children}
    </div>
  )
}

export interface DialogCloseProps {
  children?: ReactNode
  onClick?: () => void
}

export function DialogClose({ children, onClick }: DialogCloseProps) {
  const { setOpen } = useContext(DialogContext)
  return (
    <div
      onClick={() => {
        setOpen(false)
        onClick?.()
      }}
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children ?? (
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            hover: { backgroundColor: semantic.accent + '22' },
          }}
        >
          <Icon name="x" size={14} color={text.muted} />
        </div>
      )}
    </div>
  )
}
