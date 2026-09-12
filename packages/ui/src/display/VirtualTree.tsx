/**
 * @atlas/ui — VirtualTree
 *
 * A virtualized tree: expanded descendants are flattened and rendered through
 * `VirtualList`, so large hierarchies stay cheap (composes `VirtualList`).
 *
 * @example
 *   <VirtualTree nodes={folders} selectedId={sel} onSelect={pick} />
 */
import { useState } from 'react'
import { surface, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { TreeNode } from '../layout/TreeView'
import { VirtualList } from '../layout/VirtualList'

export interface VirtualTreeProps {
  nodes: TreeNode[]
  selectedId?: string
  onSelect?: (node: TreeNode) => void
  defaultExpanded?: string[]
  estimatedItemHeight?: number
  height?: number | string
  indent?: number
}

interface FlatNode {
  node: TreeNode
  depth: number
}

export function VirtualTree({
  nodes,
  selectedId,
  onSelect,
  defaultExpanded = [],
  estimatedItemHeight = 30,
  height = '100%',
  indent = 16,
}: VirtualTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded))
  const toggle = (id: string) =>
    setExpanded((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  const flat: FlatNode[] = []
  const walk = (list: TreeNode[], depth: number) => {
    for (const n of list) {
      flat.push({ node: n, depth })
      if (n.children && expanded.has(n.id)) walk(n.children, depth + 1)
    }
  }
  walk(nodes, 0)

  return (
    <VirtualList<FlatNode>
      items={flat}
      estimatedItemHeight={estimatedItemHeight}
      height={height}
      renderItem={({ node, depth }) => {
        const hasChildren = Boolean(node.children && node.children.length > 0)
        const open = expanded.has(node.id)
        const selected = node.id === selectedId
        return (
          <div
            onClick={() => onSelect?.(node)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingLeft: depth * indent + 6,
              paddingTop: 4,
              paddingBottom: 4,
              borderRadius: 6,
              cursor: 'pointer',
              backgroundColor: selected ? surface.selected : undefined,
              hover: selected ? undefined : { backgroundColor: '#FFFFFF0A' },
            }}
          >
            {hasChildren ? (
              <div onClick={() => toggle(node.id)} style={{ width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={open ? 'chevronDown' : 'chevronRight'} size={11} color={text.muted} />
              </div>
            ) : (
              <div style={{ width: 14 }} />
            )}
            <text style={{ fontSize: 12.5, fontWeight: selected ? 600 : 500, color: selected ? text.primary : text.secondary, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {node.label}
            </text>
          </div>
        )
      }}
    />
  )
}
