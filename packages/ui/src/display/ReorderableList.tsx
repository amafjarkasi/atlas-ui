/**
 * @atlas/ui — ReorderableList
 *
 * A drag-to-reorder list powered by `usePointerDrag`. The pointer-down row is
 * the origin; the target index is `round(origin + Δy / rowHeight)`. The dragged
 * row dims and the target highlights; release calls `onReorder(from, to)`.
 *
 * @example
 *   <ReorderableList items={rows} renderItem={(r) => <Row r={r} />} onReorder={move} />
 */
import { useRef, useState, type ReactNode } from 'react'
import { semantic } from '../tokens'
import { usePointerDrag } from '../hooks/usePointerDrag'

export interface ReorderableListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  onReorder: (fromIndex: number, toIndex: number) => void
  getKey?: (item: T, index: number) => string
  rowHeight?: number
  gap?: number
}

export function ReorderableList<T>({ items, renderItem, onReorder, getKey, rowHeight = 44, gap = 4 }: ReorderableListProps<T>) {
  const fromRef = useRef(-1)
  const toRef = useRef(-1)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [targetIndex, setTargetIndex] = useState<number | null>(null)
  const step = rowHeight + gap

  const drag = usePointerDrag({
    onDragStart: () => {
      if (fromRef.current < 0) return
      toRef.current = fromRef.current
      setDragIndex(fromRef.current)
      setTargetIndex(fromRef.current)
    },
    onDrag: (_dx, dy) => {
      const f = fromRef.current
      if (f < 0) return
      const to = Math.max(0, Math.min(items.length - 1, Math.round(f + dy / step)))
      toRef.current = to
      setTargetIndex(to)
    },
    onDragEnd: () => {
      const f = fromRef.current
      const to = toRef.current
      if (f >= 0 && to >= 0 && to !== f) onReorder(f, to)
      fromRef.current = -1
      toRef.current = -1
      setDragIndex(null)
      setTargetIndex(null)
    },
  })

  return (
    <div {...drag.props} style={{ display: 'flex', flexDirection: 'column', gap }}>
      {items.map((item, i) => (
        <div
          key={getKey ? getKey(item, i) : i}
          onMouseDown={() => {
            fromRef.current = i
          }}
          style={{
            cursor: 'grab',
            opacity: dragIndex === i ? 0.55 : 1,
            borderWidth: targetIndex === i && dragIndex !== null ? 2 : 0,
            borderColor: semantic.accent,
            borderRadius: 8,
          }}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}
