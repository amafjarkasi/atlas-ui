/**
 * @atlas/ui — SummaryFooter
 *
 * An aggregate totals row that aligns under a `DataTable`/`DataGrid`.
 *
 * @example
 *   <SummaryFooter columns={cols} values={{ amount: <text>$1,240</text> }} label="Total" />
 */
import type { ReactNode } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'

export interface SummaryFooterProps {
  columns: { key: string; width?: number; align?: 'left' | 'right' }[]
  values: Record<string, ReactNode>
  label?: string
  rowHeight?: number
}

export function SummaryFooter({ columns, values, label = 'Total', rowHeight = 34 }: SummaryFooterProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: rowHeight,
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        borderTopWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.pill,
      }}
    >
      {columns.map((c, i) => (
        <div key={c.key} style={{ flexGrow: c.width ? 0 : 1, flexBasis: c.width, width: c.width, minWidth: c.width ?? 40, justifyContent: c.align === 'right' ? 'flex-end' : 'flex-start' }}>
          {i === 0 ? (
            <text style={{ fontSize: 12, fontWeight: 700, color: text.primary, fontFamily: FONT }}>{label}</text>
          ) : c.key in values ? (
            values[c.key]
          ) : null}
        </div>
      ))}
    </div>
  )
}
