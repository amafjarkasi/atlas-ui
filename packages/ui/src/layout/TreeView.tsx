/**
 * @atlas/ui — TreeView
 *
 * A collapsible hierarchical list (folder / label sidebar). Internal expansion
 * state is a Set of node ids; clicking a chevron toggles, clicking a row selects.
 *
 * @example
 *   <TreeView nodes={[{ id: 'inbox', label: 'Inbox', icon: 'inbox', children: [...] }]} onSelect={select} />
 */
import { useState } from 'react'
import { surface, text, interact } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'

export interface TreeNode {
  id: string
  label: string
  icon?: IconName
  children?: TreeNode[]
  disabled?: boolean
}

export interface TreeViewProps {
  nodes: TreeNode[]
  selectedId?: string
  onSelect?: (node: TreeNode) => void
  /** Pixel indent per depth level. */
  indent?: number
  defaultExpanded?: string[]
}

export function TreeView({ nodes, selectedId, onSelect, indent = 14, defaultExpanded = [] }: TreeViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded))

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const renderNodes = (list: TreeNode[], depth: number) =>
    list.map((node) => {
      const hasChildren = Boolean(node.children && node.children.length > 0)
      const isOpen = expanded.has(node.id)
      const selected = node.id === selectedId

      return (
        <div key={node.id}>
          <div
            tabIndex={0}
            onClick={() => {
              if (!node.disabled) onSelect?.(node)
            }}
            onKeyDown={(e) => {
              const k = e.key?.toLowerCase()
              if (k === 'enter' || k === ' ') {
                if (!node.disabled) onSelect?.(node)
              } else if (k === 'arrowright' && hasChildren && !isOpen) {
                toggle(node.id)
              } else if (k === 'arrowleft' && hasChildren && isOpen) {
                toggle(node.id)
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingLeft: 6 + depth * indent,
              paddingRight: 8,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 6,
              cursor: node.disabled ? 'not-allowed' : 'pointer',
              opacity: node.disabled ? 0.4 : 1,
              backgroundColor: selected ? surface.selected : undefined,
              hover: selected ? undefined : { backgroundColor: interact.hover },
            }}
          >
            {hasChildren ? (
              <div
                onClick={() => toggle(node.id)}
                style={{ width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon name={isOpen ? 'chevronDown' : 'chevronRight'} size={12} color={text.muted} />
              </div>
            ) : (
              <div style={{ width: 14, height: 14 }} />
            )}

            {node.icon && <Icon name={node.icon} size={14} color={selected ? text.primary : text.muted} />}

            <text
              style={{
                fontSize: 12.5,
                fontWeight: selected ? 600 : 500,
                color: selected ? text.primary : text.secondary,
                fontFamily: FONT,
                flexGrow: 1,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {node.label}
            </text>
          </div>

          {hasChildren && isOpen ? renderNodes(node.children!, depth + 1) : null}
        </div>
      )
    })

  return <div style={{ display: 'flex', flexDirection: 'column' }}>{renderNodes(nodes, 0)}</div>
}
