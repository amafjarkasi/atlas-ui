/**
 * @atlas/ui — Tooltip (styled)
 *
 * A self-contained tooltip built on the native `<anchored>` primitive (no
 * dependency on the headless gpuix Tooltip, so it renders identically in any
 * consumer graph). Opens on hover/focus after `delayDuration`, closes on leave,
 * Esc, or blur. Optional `open`/`defaultOpen`/`onOpenChange` for control.
 *
 * @example
 *   <Tooltip label="Archive" shortcut="E"><IconButton icon="archive" /></Tooltip>
 */
import { useEffect, useRef, type ReactNode } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Kbd } from '../atoms/Kbd'
import { useControllableState } from '../hooks/useControllableState'

export interface TooltipProps {
  label: string
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  delayDuration?: number
  shortcut?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Tooltip({ label, children, side = 'top', delayDuration = 400, shortcut, open: openProp, defaultOpen = false, onOpenChange }: TooltipProps) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange })
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (openTimer.current) clearTimeout(openTimer.current)
      if (closeTimer.current) clearTimeout(closeTimer.current)
    },
    [],
  )

  const scheduleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (openTimer.current) clearTimeout(openTimer.current)
    openTimer.current = setTimeout(() => setOpen(true), delayDuration)
  }
  const scheduleClose = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 80)
  }

  return (
    <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
      <div
        tabIndex={0}
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocus={scheduleOpen}
        onBlur={scheduleClose}
        onKeyDown={(e) => {
          if ((e.key ?? '').toLowerCase() === 'escape') setOpen(false)
        }}
      >
        {children}
      </div>

      {open ? (
        <anchored side={side} align="center" gap={6} fit="switch">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: border.strong,
              backgroundColor: surface.overlay,
              boxShadow: { offsetX: 0, offsetY: 6, blurRadius: 20, spreadRadius: 0, color: '#00000055' },
              pointerEvents: 'none',
            }}
          >
            <text style={{ fontSize: 11.5, color: text.primary, fontFamily: FONT, whiteSpace: 'nowrap' }}>{label}</text>
            {shortcut ? <Kbd keys={shortcut} /> : null}
          </div>
        </anchored>
      ) : null}
    </div>
  )
}
