/**
 * @atlas/ui — Drawer
 *
 * A slide-out side panel with a dimmed backdrop. `side` controls the edge it
 * slides from; `width`/`height` are pixel sizes (required because GPUIX motion
 * animates numeric offsets).
 *
 * @example
 *   <Drawer open={open} onClose={() => setOpen(false)} side="right" width={340}>
 *     <TextareaAutosize label="New message" />
 *   </Drawer>
 */
import type { ReactNode } from 'react'
import { motion } from '@gpuix/react'
import type { StyleDesc } from '@gpuix/react'
import { surface, border } from '../tokens'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  children?: ReactNode
  side?: DrawerSide
  width?: number
  height?: number
}

export function Drawer({ open, onClose, children, side = 'right', width = 320, height = 320 }: DrawerProps) {
  if (!open) return null

  const horizontal = side === 'left' || side === 'right'

  const panelStyle: StyleDesc = {
    position: 'absolute',
    backgroundColor: surface.raised,
    borderColor: border.subtle,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: { offsetX: 0, offsetY: 0, blurRadius: 32, spreadRadius: 0, color: '#00000088' },
    ...(side === 'right'
      ? { top: 0, bottom: 0, right: 0, width, borderLeftWidth: 1 }
      : side === 'left'
        ? { top: 0, bottom: 0, left: 0, width, borderRightWidth: 1 }
        : side === 'top'
          ? { left: 0, right: 0, top: 0, height, borderBottomWidth: 1 }
          : { left: 0, right: 0, bottom: 0, height, borderTopWidth: 1 }),
  }

  const offsetProp = side === 'right' || side === 'left' ? (side === 'right' ? 'right' : 'left') : side === 'top' ? 'top' : 'bottom'
  const offscreen = -(horizontal ? width : height)

  return (
    <div
      tabIndex={0}
      autoFocus
      onKeyDown={(e) => {
        if (e.key?.toLowerCase() === 'escape') onClose()
      }}
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex' }}
    >
      <div
        onClick={onClose}
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#000000', opacity: 0.5 }}
      />

      <motion.div
        initial={{ [offsetProp]: offscreen } as any}
        animate={{ [offsetProp]: 0 } as any}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={panelStyle}
      >
        {children}
      </motion.div>
    </div>
  )
}
