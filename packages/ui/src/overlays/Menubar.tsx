/**
 * @atlas/ui — Menubar
 *
 * An application menu bar (File / Edit / View …). Clicking a trigger opens its
 * dropdown; hovering another trigger while one is open switches; outside click
 * closes.
 *
 * @example
 *   <Menubar menus={[{ label: 'File', items: [{ label: 'New message', icon: 'compose', shortcut: 'Ctrl+N' }, { label: 'Quit', destructive: true }] }]} />
 */
import { useState } from 'react'
import { surface, border, text, interact } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Kbd } from '../atoms'
import type { IconName } from '../atoms'

export interface MenuItem {
  label: string
  icon?: IconName
  shortcut?: string
  onSelect?: () => void
  disabled?: boolean
  destructive?: boolean
  separator?: boolean
}

export interface Menu {
  label: string
  items: MenuItem[]
}

export interface MenubarProps {
  menus: Menu[]
}

export function Menubar({ menus }: MenubarProps) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        paddingLeft: 4,
        paddingRight: 4,
        height: 32,
        borderBottomWidth: 1,
        borderColor: border.subtle,
        position: 'relative',
      }}
    >
      {menus.map((menu, i) => {
        const open = active === i
        return (
          <div key={menu.label} style={{ position: 'relative' }}>
            <div
              onClick={() => setActive(open ? null : i)}
              onMouseEnter={() => {
                if (active !== null) setActive(i)
              }}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 6,
                cursor: 'pointer',
                backgroundColor: open ? surface.selected : undefined,
                hover: open ? undefined : { backgroundColor: interact.hover },
              }}
            >
              <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT }}>{menu.label}</text>
            </div>

            {open ? (
              <anchored side="bottom" align="start" gap={4} fit="switch" onMouseDownOutside={() => setActive(null)}>
                <div
                  style={{
                    backgroundColor: surface.overlay,
                    borderWidth: 1,
                    borderColor: border.strong,
                    borderRadius: 8,
                    paddingTop: 4,
                    paddingBottom: 4,
                    minWidth: 200,
                    flexDirection: 'column',
                    boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
                  }}
                >
                  {menu.items.map((item, j) =>
                    item.separator ? (
                      <div
                        key={j}
                        style={{
                          height: 1,
                          backgroundColor: border.subtle,
                          marginTop: 4,
                          marginBottom: 4,
                          marginLeft: 4,
                          marginRight: 4,
                        }}
                      />
                    ) : (
                      <div
                        key={j}
                        onClick={() => {
                          if (!item.disabled) {
                            item.onSelect?.()
                            setActive(null)
                          }
                        }}
                        style={{
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 6,
                          paddingBottom: 6,
                          borderRadius: 5,
                          marginLeft: 4,
                          marginRight: 4,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                          cursor: item.disabled ? 'not-allowed' : 'pointer',
                          hover: item.disabled ? undefined : { backgroundColor: surface.selected },
                        }}
                      >
                        {item.icon && <Icon name={item.icon} size={13} color={item.destructive ? '#ED4245' : text.secondary} />}
                        <text
                          style={{
                            fontSize: 12.5,
                            color: item.destructive ? '#ED4245' : item.disabled ? text.ghost : text.primary,
                            fontFamily: FONT,
                            flexGrow: 1,
                          }}
                        >
                          {item.label}
                        </text>
                        {item.shortcut && <Kbd keys={item.shortcut} />}
                      </div>
                    ),
                  )}
                </div>
              </anchored>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
