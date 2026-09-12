/**
 * @atlas/ui — HoverCard
 *
 * A floating card shown on hover. Note: to keep the implementation simple, the
 * card closes when the pointer leaves the trigger (the hoverable-content gap
 * handling of the headless Tooltip is left to the app when needed).
 *
 * @example
 *   <HoverCard trigger={<Avatar letter="N" size={28} />} side="top">
 *     <text>Nora — Online</text>
 *   </HoverCard>
 */
import { useRef, useState, type ReactNode } from 'react'
import { surface, border } from '../tokens'

export interface HoverCardProps {
  trigger: ReactNode
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  openDelayMs?: number
}

export function HoverCard({
  trigger,
  children,
  side = 'top',
  align = 'center',
  openDelayMs = 150,
}: HoverCardProps) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleOpen = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(true), openDelayMs)
  }
  const close = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(false)
  }

  return (
    <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
      <div onMouseEnter={scheduleOpen} onMouseLeave={close}>
        {trigger}
      </div>

      {open ? (
        <anchored side={side} align={align} gap={6} fit="switch">
          <div
            style={{
              backgroundColor: surface.overlay,
              borderWidth: 1,
              borderColor: border.strong,
              borderRadius: 8,
              padding: 10,
              boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
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
