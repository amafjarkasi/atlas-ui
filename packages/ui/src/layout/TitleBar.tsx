/**
 * @atlas/ui — TitleBar
 *
 * A composable window title bar with an optional traffic-light clearance and
 * a drag region (composes `WindowDragArea`).
 *
 * @example
 *   <TitleBar title="Atlas" trafficLightClearance={78} right={<IconButton icon="settings" />} />
 */
import type { ReactNode } from 'react'
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { WindowDragArea } from './WindowDragArea'

export interface TitleBarProps {
  title?: string
  children?: ReactNode
  right?: ReactNode
  height?: number
  trafficLightClearance?: number
}

export function TitleBar({ title, children, right, height = 48, trafficLightClearance = 0 }: TitleBarProps) {
  return (
    <WindowDragArea height={height}>
      {trafficLightClearance > 0 ? <div style={{ width: trafficLightClearance, flexShrink: 0 }} /> : null}
      {title ? (
        <text style={{ fontSize: 13, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>{title}</text>
      ) : null}
      <div style={{ flexGrow: 1 }} />
      {children}
      {right}
    </WindowDragArea>
  )
}
