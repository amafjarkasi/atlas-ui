/**
 * @atlas/ui — useHotkeys
 *
 * Declarative keyboard shortcuts. Spread `props` onto a focusable root element
 * (`tabIndex={0}` + `autoFocus`). Combo syntax: "ctrl+k", "cmd+k", "shift+enter",
 * "alt+n"; plain keys: "escape", "arrowdown", "enter". `ctrl`/`cmd` are treated
 * interchangeably (so "cmd+k" also matches Ctrl+K on Windows/Linux).
 *
 * @example
 *   const hotkeys = useHotkeys({ 'ctrl+k': openPalette, 'escape': close })
 *   <div tabIndex={0} autoFocus {...hotkeys.props}>…</div>
 */
import type { EventPayload } from '@gpuix/react'

export type HotkeyHandler = (event?: EventPayload) => void

export interface UseHotkeysReturn {
  props: { onKeyDown: (event: EventPayload) => void }
}

function normalizeCombo(combo: string): { key: string; shift: boolean; ctrlOrCmd: boolean; alt: boolean } {
  const parts = combo.toLowerCase().split('+').map((p) => p.trim()).filter(Boolean)
  const key = parts[parts.length - 1] ?? ''
  const shift = parts.includes('shift')
  const ctrlOrCmd = parts.some((p) => ['ctrl', 'cmd', 'meta', 'control', 'command'].includes(p))
  const alt = parts.some((p) => ['alt', 'option'].includes(p))
  return { key, shift, ctrlOrCmd, alt }
}

export function useHotkeys(handlers: Record<string, HotkeyHandler>): UseHotkeysReturn {
  const combos = Object.entries(handlers).map(([combo, handler]) => ({ ...normalizeCombo(combo), handler }))

  const onKeyDown = (event: EventPayload) => {
    const key = (event.key ?? '').toLowerCase()
    const mod = event.modifiers ?? { shift: false, ctrl: false, alt: false, cmd: false }
    const ctrlOrCmd = Boolean(mod.ctrl || mod.cmd)

    for (const c of combos) {
      if (c.key === key && mod.shift === c.shift && ctrlOrCmd === c.ctrlOrCmd && mod.alt === c.alt) {
        c.handler(event)
        return
      }
    }
  }

  return { props: { onKeyDown } }
}

/** Split a combo into display chips, e.g. "Ctrl+K" → ["Ctrl", "K"]. */
export function splitHotkey(combo: string): string[] {
  return combo.split('+').map((p) => p.trim()).filter(Boolean)
}
