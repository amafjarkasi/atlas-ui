/**
 * @atlas/ui — Kbd atom
 *
 * Renders one or more keyboard shortcut keys as styled badge chips.
 * Splits on "+" to render chord notation (e.g. "Ctrl+K" → ["Ctrl", "K"]).
 *
 * @example
 *   <Kbd keys="Ctrl+K" />
 *   <Kbd keys="Enter" />
 *   <Kbd keys="⌘+Shift+P" />
 */
import type { ReactNode } from 'react'
import { C, FONT } from '../tokens'

export interface KbdProps {
  keys: string
}

function KbdChip({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 1,
        paddingBottom: 1,
        borderRadius: 3,
        backgroundColor: '#FFFFFF18',
        borderWidth: 1,
        borderColor: '#FFFFFF24',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <text
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: C.secondary,
          fontFamily: FONT,
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </text>
    </div>
  )
}

export function Kbd({ keys }: KbdProps) {
  // Split "Ctrl+K" → ["Ctrl", "K"], handle "⌘+Shift+P" → ["⌘", "Shift", "P"]
  const parts = keys.split('+').filter(Boolean)

  if (parts.length === 1) {
    return <KbdChip>{parts[0]}</KbdChip>
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {parts.map((part, i) => (
        <KbdChip key={i}>{part}</KbdChip>
      ))}
    </div>
  )
}
