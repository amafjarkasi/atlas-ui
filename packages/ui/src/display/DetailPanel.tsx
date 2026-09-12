/**
 * @atlas/ui — DetailPanel
 *
 * A master-detail layout: a list pane on the left, a detail pane on the right.
 *
 * @example
 *   <DetailPanel items={threads} renderItem={(t) => <ThreadRow t={t} />} selected={sel} onSelect={setSel} renderDetail={(t) => <Detail t={t} />} />
 */
import type { ReactNode } from 'react'
import { border, surface } from '../tokens'
import { EmptyState } from './EmptyState'

export interface DetailPanelProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  selected: T | null
  onSelect?: (item: T) => void
  renderDetail: (item: T) => ReactNode
  listWidth?: number
  getKey?: (item: T, index: number) => string
}

export function DetailPanel<T>({
  items,
  renderItem,
  selected,
  onSelect,
  renderDetail,
  listWidth = 280,
  getKey,
}: DetailPanelProps<T>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%' }}>
      <div
        style={{
          width: listWidth,
          flexShrink: 0,
          overflowY: 'scroll',
          borderRightWidth: 1,
          borderColor: border.subtle,
          flexDirection: 'column',
        }}
      >
        {items.map((it, i) => (
          <div
            key={getKey ? getKey(it, i) : i}
            onClick={() => onSelect?.(it)}
            style={{
              cursor: 'pointer',
              backgroundColor: selected === it ? surface.selected : undefined,
              hover: selected === it ? undefined : { backgroundColor: '#FFFFFF08' },
            }}
          >
            {renderItem(it)}
          </div>
        ))}
      </div>

      <div style={{ flexGrow: 1, minWidth: 0, overflowY: 'scroll', padding: 16, flexDirection: 'column' }}>
        {selected ? (
          renderDetail(selected)
        ) : (
          <EmptyState icon="more" title="Nothing selected" description="Select an item to see details" />
        )}
      </div>
    </div>
  )
}
