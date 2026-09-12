/**
 * @atlas/ui — StickyHeader
 *
 * A pinned header above its own scrollable body. It reads the native scroll
 * offset (via `useGpuix().renderer.getScrollOffset`) so the header can elevate
 * (border + shadow) automatically once the body scrolls — no app wiring needed.
 *
 * @example
 *   <StickyHeader header={<text>Inbox</text>}>
 *     {messageRows}
 *   </StickyHeader>
 */
import { useRef, useState, type ReactNode } from 'react'
import { useGpuix } from '@gpuix/react'
import { border } from '../tokens'

export interface StickyHeaderProps {
  header: ReactNode
  children: ReactNode
  height?: number
  /** Threshold (px) of scroll before the header elevates. */
  threshold?: number
}

export function StickyHeader({ header, children, height = 44, threshold = 4 }: StickyHeaderProps) {
  const { renderer } = useGpuix()
  const bodyRef = useRef<any>(null)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    const id = bodyRef.current?.id
    if (id == null || !renderer?.getScrollOffset) return
    const offset = renderer.getScrollOffset(id)
    setScrolled((offset?.[1] ?? 0) < -threshold)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div
        style={{
          width: '100%',
          height,
          flexShrink: 0,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 14,
          paddingRight: 14,
          borderBottomWidth: 1,
          borderColor: scrolled ? border.strong : border.subtle,
          boxShadow: scrolled
            ? { offsetX: 0, offsetY: 2, blurRadius: 8, spreadRadius: 0, color: '#00000044' }
            : undefined,
        }}
      >
        {header}
      </div>

      <div
        ref={bodyRef}
        onScroll={handleScroll}
        style={{ flexGrow: 1, overflowY: 'scroll', flexDirection: 'column' }}
      >
        {children}
      </div>
    </div>
  )
}
