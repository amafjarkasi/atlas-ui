/**
 * @atlas/ui — Col
 *
 * A flex column with `gap`/`align`/`justify` shorthand.
 */
import type { ReactNode } from 'react'
import type { StyleDesc } from '@gpuix/react'
import type { Align, Justify } from './Row'

export interface ColProps {
  children?: ReactNode
  gap?: number
  align?: Align
  justify?: Justify
  flexGrow?: number
  style?: StyleDesc
}

export function Col({ children, gap = 0, align = 'stretch', justify = 'flex-start', flexGrow, style }: ColProps) {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: align, justifyContent: justify, gap, flexGrow, ...style }}>{children}</div>
}
