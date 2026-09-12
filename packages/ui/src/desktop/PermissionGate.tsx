/** @atlas/ui — PermissionGate — locks content behind a permission prompt. */
import type { ReactNode } from 'react'
import { text as t } from '../tokens'
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

export function PermissionGate({ granted, title = 'Permission required', description, onGrant, onDeny, children }: PermissionGateProps) {
  if (granted) return <>{children}</>
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: 24 }}>
      <Icon name="shield" size={28} color={t.muted} />
      <text style={{ fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: FONT }}>{title}</text>
      {description ? <text style={{ fontSize: 12, color: t.muted, fontFamily: FONT, maxWidth: 300, textAlign: 'center' }}>{description}</text> : null}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
        {onDeny ? <Button variant="ghost" onClick={onDeny}>Deny</Button> : null}
        {onGrant ? <Button onClick={onGrant}>Allow</Button> : null}
      </div>
    </div>
  )
}
