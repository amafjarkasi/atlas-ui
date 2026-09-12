/** @atlas/ui — PermissionGate — locks content behind a permission prompt. */
import type { ReactNode } from 'react'
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'

export interface PermissionGateProps {
  granted: boolean
  title?: string
  description?: string
  onGrant?: () => void
  onDeny?: () => void
  children: ReactNode
}

function wrapWords(input: string, maxChars: number): string[] {
  const words = input.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines
}

export function PermissionGate({ granted, title = 'Permission required', description, onGrant, onDeny, children }: PermissionGateProps) {
  if (granted) return <>{children}</>
  const descriptionLines = description ? wrapWords(description, 42) : []
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        padding: 28,
        width: 400,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: border.subtle,
        borderRadius: 12,
        backgroundColor: surface.card,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: surface.selected,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="shield" size={22} color={t.muted} />
      </div>
      <text style={{ fontSize: 14, fontWeight: 600, color: t.primary, fontFamily: FONT }}>{title}</text>
      {descriptionLines.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          {descriptionLines.map((line) => (
            <text key={line} style={{ fontSize: 12.5, color: t.muted, fontFamily: FONT }}>
              {line}
            </text>
          ))}
        </div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 4 }}>
        {onDeny ? (
          <Button variant="outline" size="md" onClick={onDeny}>
            Deny
          </Button>
        ) : null}
        {onGrant ? (
          <Button variant="primary" size="md" onClick={onGrant}>
            Allow
          </Button>
        ) : null}
      </div>
    </div>
  )
}
