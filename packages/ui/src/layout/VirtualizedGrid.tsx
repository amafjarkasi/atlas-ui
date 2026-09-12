/**
 * @atlas/ui — VirtualizedGrid
 *
 * A 2D virtualized grid built by chunking items into rows and rendering each
 * row through `VirtualList` (GPUIX's `virtual-list` is 1D only).
 *
 * @example
 *   <VirtualizedGrid items={images} columns={4} estimatedRowHeight={120} renderCell={(img) => <Thumb img={img} />} />
 */
import type { ReactNode } from 'react'
import { VirtualList } from './VirtualList'

export interface VirtualizedGridProps<T> {
  items: T[]
  renderCell: (item: T, index: number) => ReactNode
  columns?: number
  gap?: number
  estimatedRowHeight?: number
  height?: number | string
}

export function VirtualizedGrid<T>({
  items = [],
  renderCell,
  columns = 4,
  gap = 8,
  estimatedRowHeight = 120,
  height = '100%',
}: VirtualizedGridProps<T>) {
  const safeItems = items ?? []
  const rows: T[][] = []
  for (let i = 0; i < safeItems.length; i += columns) rows.push(safeItems.slice(i, i + columns))

  return (
    <VirtualList<T[]>
      items={rows}
      estimatedItemHeight={estimatedRowHeight}
      height={height}
      renderItem={(row) => (
        <div style={{ display: 'flex', flexDirection: 'row', gap, paddingBottom: gap }}>
          {row.map((item, j) => (
            <div key={j} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0 }}>
              {renderCell(item, j)}
            </div>
          ))}
        </div>
      )}
    />
  )
}
