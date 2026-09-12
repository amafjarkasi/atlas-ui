/** @atlas/ui — GroupedSidebarNav — collapsible nav groups with badges + active state. */
import { useState } from 'react'
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Badge } from '../atoms/Badge'
import type { IconName } from '../atoms/Icon'

export interface NavItem {
  id: string
  label: string
  icon?: IconName
  count?: number
}

export interface NavGroup {
  id: string
  label?: string
  items: NavItem[]
}

export interface GroupedSidebarNavProps {
  groups: NavGroup[]
  activeId?: string
  onSelect?: (id: string) => void
  collapsible?: boolean
}

export function GroupedSidebarNav({ groups, activeId, onSelect, collapsible = true }: GroupedSidebarNavProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 240,
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 10,
        backgroundColor: surface.base,
        borderWidth: 1,
        borderColor: border.subtle,
      }}
    >
      {groups.map((g) => {
        const isCollapsed = collapsible && collapsed.has(g.id)
        return (
          <div key={g.id} style={{ display: 'flex', flexDirection: 'column' }}>
            {g.label ? (
              <div
                onClick={() =>
                  collapsible &&
                  setCollapsed((p) => {
                    const n = new Set(p)
                    if (n.has(g.id)) n.delete(g.id)
                    else n.add(g.id)
                    return n
                  })
                }
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  paddingTop: 8,
                  paddingBottom: 4,
                  paddingLeft: 8,
                  paddingRight: 8,
                  cursor: collapsible ? 'pointer' : 'default',
                }}
              >
                <Icon name={isCollapsed ? 'chevronRight' : 'chevronDown'} size={11} color={t.ghost} />
                <text style={{ fontSize: 10.5, fontWeight: 700, color: t.ghost, fontFamily: FONT }}>{g.label.toUpperCase()}</text>
              </div>
            ) : null}
            {!isCollapsed
              ? g.items.map((item) => {
                  const active = item.id === activeId
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelect?.(item.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        paddingTop: 6,
                        paddingBottom: 6,
                        paddingLeft: 8,
                        paddingRight: 8,
                        borderRadius: 6,
                        cursor: 'pointer',
                        backgroundColor: active ? surface.selected : undefined,
                        hover: active ? undefined : { backgroundColor: '#FFFFFF0A' },
                      }}
                    >
                      {item.icon ? <Icon name={item.icon} size={14} color={active ? t.primary : t.muted} /> : null}
                      <text
                        style={{
                          fontSize: 12.5,
                          fontWeight: active ? 600 : 500,
                          color: active ? t.primary : t.secondary,
                          fontFamily: FONT,
                          flexGrow: 1,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.label}
                      </text>
                      {item.count !== undefined ? <Badge variant="count" count={item.count} /> : null}
                    </div>
                  )
                })
              : null}
          </div>
        )
      })}
    </div>
  )
}
