/**
 * @atlas/ui — StarRating
 *
 * A whole-star rating input. Filled stars use the accent-tinted `starFilled`
 * icon; empty stars use the muted outline `star`. Arrow keys adjust the value.
 *
 * @example
 *   <StarRating value={3} onChange={setRating} />
 */
import { surface, semantic } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface StarRatingProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  max?: number
  size?: number
  disabled?: boolean
}

export function StarRating({ value = 0, defaultValue = 0, onChange, max = 5, size = 18, disabled = false }: StarRatingProps) {
  const current = value ?? defaultValue
  const set = (v: number) => onChange?.(Math.max(0, Math.min(max, v)))

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 2, opacity: disabled ? 0.5 : 1 }}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < current
        return (
          <div
            key={i}
            tabIndex={0}
            onClick={() => {
              if (!disabled) set(i + 1)
            }}
            onKeyDown={(e) => {
              const k = e.key?.toLowerCase()
              if (!disabled) {
                if (k === 'arrowright' || k === 'arrowup') set(current + 1)
                else if (k === 'arrowleft' || k === 'arrowdown') set(current - 1)
              }
            }}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer', padding: 1 }}
          >
            <Icon name={filled ? 'starFilled' : 'star'} size={size} color={filled ? semantic.star : surface.selected} />
          </div>
        )
      })}
    </div>
  )
}
