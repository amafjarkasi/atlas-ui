/** @atlas/ui — ZoomControls — zoom − / reset / + with percent. */
import { border, surface, text as t } from '../tokens'
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        padding: 4,
        borderRadius: 8,
        backgroundColor: surface.card,
        borderWidth: 1,
        borderColor: border.subtle,
        alignSelf: 'flex-start',
      }}
    >
      <IconButton icon="minus" size={12} pad={24} onClick={() => set(zoom - step)} />
      <div onClick={() => set(1)} style={{ width: 52, flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <text style={{ fontSize: 12, color: t.secondary, fontFamily: FONT, whiteSpace: 'nowrap' }}>
          {`${Math.round(zoom * 100)}%`}
        </text>
      </div>
      <IconButton icon="plus" size={12} pad={24} onClick={() => set(zoom + step)} />
    </div>
  )
}
