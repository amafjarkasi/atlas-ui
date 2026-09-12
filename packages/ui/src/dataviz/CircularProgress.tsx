/**
 * @atlas/ui — CircularProgress
 *
 * An SVG ring progress indicator (colors baked inline). Optional `children`
 * render centered inside the ring.
 *
 * @example
 *   <CircularProgress value={62} size={56}>
 *     <text>62%</text>
 *   </CircularProgress>
 */
import type { ReactNode } from 'react'

export interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  children?: ReactNode
}

export function CircularProgress({
  value,
  size = 48,
  strokeWidth = 5,
  color = '#3B82F6',
  trackColor = '#3A3A40',
  children,
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const dash = (clamped / 100) * circumference

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">` +
    `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="${trackColor}" stroke-width="${strokeWidth}"/>` +
    `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-dasharray="${dash} ${circumference}" stroke-linecap="round" transform="rotate(-90 ${center} ${center})"/>` +
    `</svg>`

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg source={svg} style={{ width: size, height: size }} />
      {children ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}
