/** @atlas/ui — ZoomControls — zoom − / reset / + with percent. */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { IconButton } from '../atoms/IconButton'

export interface ZoomControlsProps {
  zoom: number
  onZoomChange?: (zoom: number) => void
  step?: number
  min?: number
  max?: number
}

export function ZoomControls({ zoom, onZoomChange, step = 0.1, min = 0.5, max = 3 }: ZoomControlsProps) {
  const set = (z: number) => onZoomChange?.(Math.max(min, Math.min(max, z)))
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <IconButton icon="minus" size={12} pad={24} onClick={() => set(zoom - step)} />
      <text style={{ fontSize: 12, color: t.secondary, fontFamily: FONT, minWidth: 44, textAlign: 'center', whiteSpace: 'nowrap' }}>{Math.round(zoom * 100)}</text>
      <IconButton icon="plus" size={12} pad={24} onClick={() => set(zoom + step)} />
    </div>
  )
}
