/**
 * @atlas/ui — UserMenu
 *
 * An avatar dropdown with account header, plan badge, and shortcut-annotated
 * actions (composes `Avatar` + `anchored` + `Kbd` + `Divider`).
 *
 * @example
 *   <UserMenu name="Nora" email="n@example.com" avatarLetter="N" planLabel="Studio" items={actions} />
 */
import { useState } from 'react'
import { surface, border, text, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Avatar } from '../atoms/Avatar'
import { Kbd } from '../atoms/Kbd'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'

export interface UserMenuItem {
  label: string
  icon?: IconName
  shortcut?: string
  onSelect?: () => void
  destructive?: boolean
}

export interface UserMenuProps {
  name?: string
  email?: string
  avatarSrc?: string
  avatarLetter?: string
  planLabel?: string
  items: UserMenuItem[]
}

export function UserMenu({ name, email, avatarSrc, avatarLetter = 'U', planLabel, items }: UserMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setOpen((o) => !o)} style={{ cursor: 'pointer' }}>
        <Avatar src={avatarSrc} letter={avatarLetter} size={28} />
      </div>

      {open ? (
        <anchored side="bottom" align="end" gap={4} fit="switch" onMouseDownOutside={() => setOpen(false)}>
          <div
            style={{
              width: 220,
              backgroundColor: surface.overlay,
              borderWidth: 1,
              borderColor: border.strong,
              borderRadius: 10,
              paddingTop: 8,
              paddingBottom: 8,
              flexDirection: 'column',
              boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
            }}
          >
            {name || email ? (
              <div
                style={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 6,
                  paddingBottom: 8,
                  flexDirection: 'column',
                  gap: 1,
                  borderBottomWidth: 1,
                  borderColor: border.subtle,
                  marginBottom: 4,
                }}
              >
                {name ? <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{name}</text> : null}
                {email ? <text style={{ fontSize: 11.5, color: text.muted, fontFamily: FONT }}>{email}</text> : null}
                {planLabel ? (
                  <div style={{ marginTop: 4, paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2, borderRadius: 8, backgroundColor: semantic.accent + '22', alignSelf: 'flex-start' }}>
                    <text style={{ fontSize: 10, fontWeight: 600, color: semantic.accent, fontFamily: FONT }}>{planLabel}</text>
                  </div>
                ) : null}
              </div>
            ) : null}

            {items.map((it, i) => (
              <div
                key={i}
                onClick={() => {
                  it.onSelect?.()
                  setOpen(false)
                }}
                style={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 7,
                  paddingBottom: 7,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  hover: { backgroundColor: '#FFFFFF0A' },
                }}
              >
                {it.icon && <Icon name={it.icon} size={13} color={it.destructive ? '#ED4245' : text.secondary} />}
                <text style={{ fontSize: 12.5, color: it.destructive ? '#ED4245' : text.primary, fontFamily: FONT, flexGrow: 1 }}>
                  {it.label}
                </text>
                {it.shortcut ? <Kbd keys={it.shortcut} /> : null}
              </div>
            ))}
          </div>
        </anchored>
      ) : null}
    </div>
  )
}
