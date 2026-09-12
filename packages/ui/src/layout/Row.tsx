/**
 * @atlas/ui — Row
 *
 * A flex row with `gap`/`align`/`justify` shorthand (removes repeated manual
 * flex styling).
 */
import type { ReactNode } from 'react'
import type { StyleDesc } from '@gpuix/react'

export type Align = 'flex-start' | 'center' | 'flex-end' | 'stretch'
export type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'

export interface RowProps {
  children?: ReactNode
  gap?: number
  align?: Align
  justify?: Justify
  flexWrap?: boolean
  style?: StyleDesc
}

export function Row({ children, gap = 0, align = 'center', justify = 'flex-start', flexWrap = false, style }: RowProps) {
  return <div style={{ display: 'flex', flexDirection: 'row', alignItems: align, justifyContent: justify, gap, flexWrap: flexWrap ? 'wrap' : undefined, ...style }}>{children}</div>
}
