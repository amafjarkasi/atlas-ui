/**
 * @atlas/ui — DataGrid
 *
 * A simple flex-based table (GPUIX has no native table primitive). For huge
 * datasets, wrap this in `<virtual-list>` at the app level.
 *
 * @example
 *   <DataGrid
 *     columns={[{ key: 'from', title: 'From' }, { key: 'subject', title: 'Subject' }, { key: 'count', title: 'Count', width: 60, align: 'right' }]}
 *     rows={rows}
 *     onRowClick={openThread}
 *   />
 */
import type { ReactNode } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'

export interface DataGridColumn {
  key: string
  title: string
  width?: number
  align?: 'left' | 'right'
}

export interface DataGridProps {
  columns: DataGridColumn[]
  rows: Record<string, ReactNode>[]
  rowHeight?: number
  onRowClick?: (row: Record<string, ReactNode>) => void
  activeRowIndex?: number
}

export function DataGrid({ columns, rows, rowHeight = 32, onRowClick, activeRowIndex }: DataGridProps) {
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
          <div
            key={c.key}
            style={{
              flexGrow: c.width ? 0 : 1,
              flexBasis: c.width,
              width: c.width,
              minWidth: c.width ?? 40,
            }}
          >
            <text
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: text.muted,
                fontFamily: FONT,
                textAlign: c.align ?? 'left',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {c.title}
            </text>
          </div>
        ))}
      </div>

      {rows.map((row, i) => (
        <div
          key={i}
          onClick={() => onRowClick?.(row)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: rowHeight,
            alignItems: 'center',
            paddingLeft: 12,
            paddingRight: 12,
            borderBottomWidth: i < rows.length - 1 ? 1 : 0,
            borderColor: border.subtle,
            backgroundColor: activeRowIndex === i ? surface.selected : undefined,
            cursor: onRowClick ? 'pointer' : 'default',
            hover: onRowClick && activeRowIndex !== i ? { backgroundColor: '#FFFFFF08' } : undefined,
          }}
        >
          {columns.map((c) => {
            const cell = row[c.key]
            const isText = typeof cell === 'string' || typeof cell === 'number'
            return (
              <div
                key={c.key}
                style={{
                  flexGrow: c.width ? 0 : 1,
                  flexBasis: c.width,
                  width: c.width,
                  minWidth: c.width ?? 40,
                  justifyContent: c.align === 'right' ? 'flex-end' : 'flex-start',
                }}
              >
                {isText ? (
                  <text
                    style={{
                      fontSize: 12.5,
                      color: text.secondary,
                      fontFamily: FONT,
                      textAlign: c.align ?? 'left',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {cell}
                  </text>
                ) : (
                  cell
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
