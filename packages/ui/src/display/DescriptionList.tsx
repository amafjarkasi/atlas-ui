/**
 * @atlas/ui — DescriptionList
 *
 * A key/value metadata list (label left, value right, subtle dividers).
 *
 * @example
 *   <DescriptionList items={[{ label: 'Email', value: 'mara@northlight.io' }, { label: 'Plan', value: 'Studio' }]} />
 */
import type { ReactNode } from 'react'
import { border, text } from '../tokens'
import { FONT } from '../tokens'

export interface DescriptionItem {
  label: string
  value: ReactNode
}

export interface DescriptionListProps {
  items: DescriptionItem[]
}

export function DescriptionList({ items }: DescriptionListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 16,
            paddingTop: 8,
            paddingBottom: 8,
            borderBottomWidth: i < items.length - 1 ? 1 : 0,
            borderColor: border.subtle,
          }}
        >
          <text style={{ fontSize: 12.5, color: text.muted, fontFamily: FONT, flexShrink: 0 }}>{it.label}</text>
          {typeof it.value === 'string' || typeof it.value === 'number' ? (
            <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT, textAlign: 'right' }}>{it.value}</text>
          ) : (
            it.value
          )}
        </div>
      ))}
    </div>
  )
}
