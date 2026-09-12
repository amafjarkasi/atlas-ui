/**
 * @atlas/ui — TransferList
 *
 * A dual-list picker: move items between two panes (composes `SearchableList`
 * + `Button`).
 *
 * @example
 *   <TransferList available={all} selected={chosen} getKey={(x) => x.id} getLabel={(x) => x.name} onChange={(a, s) => setState({ a, s })} renderItem={(x) => <text>{x.name}</text>} />
 */
import type { ReactNode } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Button } from '../atoms/Button'
import { SearchableList } from '../display/SearchableList'

export interface TransferListProps<T> {
  available: T[]
  selected: T[]
  getKey: (item: T) => string
  getLabel: (item: T) => string
  renderItem: (item: T) => ReactNode
  onChange: (available: T[], selected: T[]) => void
  availableTitle?: string
  selectedTitle?: string
}

export function TransferList<T>({
  available,
  selected,
  getKey,
  getLabel,
  renderItem,
  onChange,
  availableTitle = 'Available',
  selectedTitle = 'Selected',
}: TransferListProps<T>) {
  const moveOne = (item: T, dir: 'right' | 'left') => {
    if (dir === 'right') onChange(available.filter((i) => getKey(i) !== getKey(item)), [...selected, item])
    else onChange([...available, item], selected.filter((i) => getKey(i) !== getKey(item)))
  }
  const moveAll = (dir: 'right' | 'left') => {
    if (dir === 'right') onChange([], [...selected, ...available])
    else onChange([...available, ...selected], [])
  }

  const pane = (title: string, list: T[], dir: 'right' | 'left') => (
    <div style={{ flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column', gap: 8, padding: 10, borderWidth: 1, borderColor: border.subtle, borderRadius: 10, backgroundColor: surface.card }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <text style={{ fontSize: 12.5, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text>
        <Button size="sm" variant="ghost" onClick={() => moveAll(dir)}>
          {dir === 'right' ? 'Add all →' : '← Remove all'}
        </Button>
      </div>
      <SearchableList<T>
        items={list}
        getLabel={getLabel}
        height="100%"
        renderItem={(item) => (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6, padding: 6 }}>
            <div style={{ flexGrow: 1 }}>{renderItem(item)}</div>
            <Button size="sm" variant="ghost" onClick={() => moveOne(item, dir)}>
              {dir === 'right' ? '→' : '←'}
            </Button>
          </div>
        )}
      />
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, height: '100%', width: '100%' }}>
      {pane(availableTitle, available, 'right')}
      {pane(selectedTitle, selected, 'left')}
    </div>
  )
}
