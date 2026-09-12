/**
 * @atlas/ui — BeforeAfterSlider
 *
 * A draggable image-comparison divider. Drag is delta-based (same pattern as
 * `Slider`/`ResizablePanel`); the "after" image is revealed from the left.
 *
 * @example
 *   <BeforeAfterSlider beforeSrc="before.png" afterSrc="after.png" width={640} height={360} />
 */
import { useRef, useState } from 'react'
import { Icon } from '../atoms/Icon'

export interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  width: number
  height: number
  /** Initial percentage of the "after" image revealed (0..100). */
  initial?: number
  onChange?: (pct: number) => void
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  width,
  height,
  initial = 50,
  onChange,
}: BeforeAfterSliderProps) {
  const [pct, setPct] = useState(initial)
  const dragRef = useRef<{ startX: number; startPct: number } | null>(null)
  const handle = 24

  const set = (v: number) => {
    const c = Math.max(0, Math.min(100, v))
    setPct(c)
    onChange?.(c)
  }

  const dividerX = (pct / 100) * width

  return (
    <div
      onMouseDown={(e) => {
        dragRef.current = { startX: e.x ?? 0, startPct: pct }
      }}
      onMouseMove={(e) => {
        const d = dragRef.current
        if (!d) return
        const delta = (e.x ?? 0) - d.startX
        set(d.startPct + (delta / width) * 100)
      }}
      onMouseUp={() => {
        dragRef.current = null
      }}
      style={{ position: 'relative', width, height, overflow: 'hidden', cursor: 'ew-resize', borderRadius: 10 }}
    >
      {/* before (full) */}
      <img src={beforeSrc} objectFit="cover" style={{ width, height }} />

      {/* after (clipped to the left) */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, overflow: 'hidden' }}>
        <img src={afterSrc} objectFit="cover" style={{ width, height }} />
      </div>

      {/* divider line */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: dividerX - 1, width: 2, backgroundColor: '#FFFFFF', opacity: 0.9 }} />

      {/* handle */}
      <div
        style={{
          position: 'absolute',
          top: height / 2 - handle / 2,
          left: dividerX - handle / 2,
          width: handle,
          height: handle,
          borderRadius: handle / 2,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: { offsetX: 0, offsetY: 2, blurRadius: 8, spreadRadius: 0, color: '#00000055' },
        }}
      >
        <Icon name="chevronLeft" size={11} color="#111111" />
        <Icon name="chevronRight" size={11} color="#111111" />
      </div>
    </div>
  )
}
