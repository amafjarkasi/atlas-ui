/**
 * @atlas/ui — TreeTable
 *
 * A table with expandable parent rows (chevron in the first column). Reuses the
 * `DataTableColumn` shape.
 *
 * @example
 *   <TreeTable columns={cols} nodes={[{ id: 'a', row: { name: 'Parent' }, children: [{ id: 'b', row: { name: 'Child' } }] }]} />
 */
import { useState, type ReactNode } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { DataTableColumn } from './DataTable'

export interface TreeTableNode {
  id: string
  row: Record<string, ReactNode>
  children?: TreeTableNode[]
}

export interface TreeTableProps {
  columns: DataTableColumn[]
  nodes: TreeTableNode[]
  rowHeight?: number
}

export function TreeTable({ columns, nodes, rowHeight = 32 }: TreeTableProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  const rows: ReactNode[] = []
  const walk = (node: TreeTableNode, depth: number) => {
    const hasChildren = Boolean(node.children && node.children.length > 0)
    const open = expanded.has(node.id)

    rows.push(
      <div
        key={node.id}
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: rowHeight,
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          borderBottomWidth: 1,
          borderColor: border.subtle,
          hover: { backgroundColor: '#FFFFFF08' },
        }}
      >
        {columns.map((c, ci) => {
          const cell = node.row[c.key]
          const isText = typeof cell === 'string' || typeof cell === 'number'
          return (
            <div
              key={c.key}
              style={{
                flexGrow: c.width ? 0 : 1,
                flexBasis: c.width,
                width: c.width,
                minWidth: c.width ?? 40,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {ci === 0 ? (
                <div style={{ paddingLeft: depth * 14, flexDirection: 'row', alignItems: 'center', gap: 4, flexGrow: 1 }}>
                  {hasChildren ? (
                    <div
                      onClick={() => toggle(node.id)}
                      style={{ width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <Icon name={open ? 'chevronDown' : 'chevronRight'} size={11} color={text.muted} />
                    </div>
                  ) : (
                    <div style={{ width: 14 }} />
                  )}
                  {isText ? (
                    <text style={{ fontSize: 12.5, color: text.secondary, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {cell}
                    </text>
                  ) : (
                    cell
                  )}
                </div>
              ) : isText ? (
                <text style={{ fontSize: 12.5, color: text.secondary, fontFamily: FONT, textAlign: c.align ?? 'left', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {cell}
                </text>
              ) : (
                cell
              )}
            </div>
          )
        })}
      </div>,
    )

    if (hasChildren && open) {
      for (const child of node.children!) walk(child, depth + 1)
    }
  }
  nodes.forEach((n) => walk(n, 0))

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border.subtle,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 32,
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          borderBottomWidth: 1,
          borderColor: border.subtle,
          backgroundColor: surface.pill,
        }}
      >
        {columns.map((c) => (
          <div key={c.key} style={{ flexGrow: c.width ? 0 : 1, flexBasis: c.width, width: c.width, minWidth: c.width ?? 40 }}>
            <text style={{ fontSize: 11, fontWeight: 600, color: text.muted, fontFamily: FONT, textAlign: c.align ?? 'left', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {c.title}
            </text>
          </div>
        ))}
      </div>

      {rows}
    </div>
  )
}
