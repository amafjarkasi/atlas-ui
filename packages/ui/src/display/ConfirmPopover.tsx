/**
 * @atlas/ui — ConfirmPopover
 *
 * An anchored confirm (Yes/No) attached to a trigger — lighter than
 * `AlertDialog` for inline confirmations (composes `Popover` + `Button`).
 *
 * @example
 *   <ConfirmPopover trigger={<Button variant="ghost">Delete</Button>} message="Delete this?" onConfirm={del} />
 */
import { useState, type ReactNode } from 'react'
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Popover } from './Popover'
import { Button } from '../atoms/Button'

export interface ConfirmPopoverProps {
  trigger: ReactNode
  message: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm?: () => void
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function ConfirmPopover({ trigger, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', destructive = true, onConfirm, side = 'top' }: ConfirmPopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} side={side} trigger={trigger}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 220 }}>
        <text style={{ fontSize: 12.5, color: textTokens.primary, fontFamily: FONT, lineHeight: 1.4 }}>{message}</text>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 6, justifyContent: 'flex-end' }}>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
            {cancelLabel}
          </Button>
          <Button
            size="sm"
            variant={destructive ? 'destructive' : 'primary'}
            onClick={() => {
              onConfirm?.()
              setOpen(false)
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Popover>
  )
}
