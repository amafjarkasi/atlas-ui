/**
 * @atlas/ui — Slider
 *
 * A horizontal slider. Drag is delta-based (GPUIX exposes no element-bounds
 * API): the pointer-down records the start coordinate + value, and mouse-move
 * applies the pixel delta as a fraction of the track.
 *
 * @example
 *   <Slider min={0} max={100} step={5} value={scale} onChange={setScale} width={220} />
 */
import { useRef } from 'react'
import { motion } from '@gpuix/react'
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { useControllableState } from '../hooks/useControllableState'

export interface SliderProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  width?: number
  color?: string
  disabled?: boolean
  label?: string
}

export function Slider({
  value: controlled,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  width = 200,
  color = semantic.accent,
  disabled = false,
  label,
}: SliderProps) {
  const [value, setValue] = useControllableState<number>({ value: controlled, defaultValue: defaultValue ?? min, onChange })
  const trackH = 4
  const thumbSize = 16

  const dragRef = useRef<{ startX: number; startValue: number } | null>(null)

  const set = (v: number) => {
    const snapped = Math.round(v / step) * step
    const clamped = Math.max(min, Math.min(max, snapped))
    setValue(clamped)
  }

  const pct = ((value - min) / (max - min)) * 100
  const thumbLeft = (pct / 100) * (width - thumbSize)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width, opacity: disabled ? 0.5 : 1 }}>
      {label ? (
        <text style={{ fontSize: 12, color: text.secondary, fontFamily: FONT }}>{label}</text>
      ) : null}

      <div
        tabIndex={0}
        onMouseDown={(e) => {
          if (disabled) return
          dragRef.current = { startX: e.x ?? 0, startValue: value }
        }}
        onMouseMove={(e) => {
          const d = dragRef.current
          if (!d) return
          const delta = (e.x ?? 0) - d.startX
          set(d.startValue + (delta / (width - thumbSize)) * (max - min))
        }}
        onMouseUp={() => {
          dragRef.current = null
        }}
        onKeyDown={(e) => {
          const k = e.key?.toLowerCase()
          if (k === 'arrowleft' || k === 'arrowdown') set(value - step)
          else if (k === 'arrowright' || k === 'arrowup') set(value + step)
        }}
        style={{ width, height: thumbSize, position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: (thumbSize - trackH) / 2,
            height: trackH,
            borderRadius: trackH / 2,
            backgroundColor: surface.selected,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: (thumbSize - trackH) / 2,
            width: Math.max(0, thumbLeft + thumbSize / 2),
            height: trackH,
            borderRadius: trackH / 2,
            backgroundColor: color,
          }}
        />
        <motion.div
          animate={{ left: thumbLeft }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 0,
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: border.strong,
            boxShadow: { offsetX: 0, offsetY: 1, blurRadius: 4, spreadRadius: 0, color: '#00000066' },
          }}
        />
      </div>
    </div>
  )
}
