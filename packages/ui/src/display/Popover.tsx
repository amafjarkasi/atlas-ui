/**
 * @atlas/ui — Popover
 *
 * A general floating layer on the native `<anchored>` primitive, closed by
 * clicking outside.
 *
 * @example
 *   <Popover open={open} onOpenChange={setOpen} side="bottom" trigger={<IconButton icon="filter" />}>
 *     {filterOptions}
 *   </Popover>
 */
import type { ReactNode } from 'react'
import { surface, border } from '../tokens'

export interface PopoverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: ReactNode
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  side = 'bottom',
  align = 'start',
}: PopoverProps) {
  return (
    <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
      <div onClick={() => onOpenChange(!open)}>{trigger}</div>

      {open ? (
        <anchored side={side} align={align} gap={6} fit="switch" onMouseDownOutside={() => onOpenChange(false)}>
          <div
            style={{
              backgroundColor: surface.overlay,
              borderWidth: 1,
              borderColor: border.strong,
              borderRadius: 8,
              padding: 10,
              boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
              minWidth: 160,
              flexDirection: 'column',
            }}
          >
            {children}
          </div>
        </anchored>
      ) : null}
    </div>
  )
}
