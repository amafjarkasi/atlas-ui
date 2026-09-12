/**
 * @atlas/ui — LayoutInspectorHUD
 *
 * A dev-time HUD overlay showing live window size and insets (GPUIX has no DOM
 * devtools, so this surfaces the native metrics directly via `useWindowSize`
 * and `useWindowInsets`).
 *
 * @example
 *   <LayoutInspectorHUD visible={debug} />
 */
import { useWindowSize, useWindowInsets } from '@gpuix/react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'

export interface LayoutInspectorHUDProps {
  visible?: boolean
}

export function LayoutInspectorHUD({ visible = true }: LayoutInspectorHUDProps) {
  const win = useWindowSize()
  const insets = useWindowInsets()
  if (!visible) return null

  const rows: [string, string][] = [
    ['window', `${win.width}×${win.height}`],
    ['safeArea', `t${insets.safeArea.top} r${insets.safeArea.right} b${insets.safeArea.bottom} l${insets.safeArea.left}`],
    ['ime', `t${insets.ime.top} b${insets.ime.bottom}`],
    ['keyboardTop', `${insets.keyboardTop}`],
    ['keyboardVisible', `${insets.keyboardVisible}`],
  ]

  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        left: 12,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border.strong,
        backgroundColor: surface.overlay,
        flexDirection: 'column',
        gap: 3,
        boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
      }}
    >
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <text style={{ fontSize: 10.5, color: text.muted, fontFamily: FONT, minWidth: 88 }}>{k}</text>
          <text style={{ fontSize: 10.5, color: text.primary, fontFamily: FONT }}>{v}</text>
        </div>
      ))}
    </div>
  )
}
