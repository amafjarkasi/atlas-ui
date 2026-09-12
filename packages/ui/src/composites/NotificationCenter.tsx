/**
 * @atlas/ui — NotificationCenter
 *
 * A bell dropdown listing notifications with unread badges (composes `Popover`
 * + `Badge` + `RelativeTime`).
 *
 * @example
 *   <NotificationCenter notifications={items} onOpenItem={open} onMarkAllRead={clear} />
 */
import { useState } from 'react'
import { semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { IconButton } from '../atoms/IconButton'
import { Badge } from '../atoms/Badge'
import { Popover } from '../display/Popover'
import { RelativeTime } from '../display/RelativeTime'
import { EmptyState } from '../display/EmptyState'

export interface NotificationItem {
  id: string
  title: string
  body?: string
  time?: Date | string | number
  unread?: boolean
}

export interface NotificationCenterProps {
  notifications: NotificationItem[]
  onOpenItem?: (item: NotificationItem) => void
  onMarkAllRead?: () => void
}

export function NotificationCenter({ notifications, onOpenItem, onMarkAllRead }: NotificationCenterProps) {
  const [open, setOpen] = useState(false)
  const unread = notifications.filter((n) => n.unread).length

  const trigger = (
    <div style={{ position: 'relative' }}>
      <IconButton icon="bell" onClick={() => setOpen((o) => !o)} />
      {unread > 0 ? (
        <div style={{ position: 'absolute', top: -4, right: -4 }}>
          <Badge variant="mention" count={unread} />
        </div>
      ) : null}
    </div>
  )

  return (
    <Popover open={open} onOpenChange={setOpen} side="bottom" align="end" trigger={trigger}>
      <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <text style={{ fontSize: 12.5, fontWeight: 600, color: text.primary, fontFamily: FONT }}>Notifications</text>
          {unread > 0 && onMarkAllRead ? (
            <div onClick={onMarkAllRead} style={{ cursor: 'pointer', padding: 3 }}>
              <text style={{ fontSize: 11, color: semantic.accent, fontFamily: FONT }}>Mark all read</text>
            </div>
          ) : null}
        </div>

        {notifications.length === 0 ? (
          <EmptyState icon="bell" title="No notifications" />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 320, overflowY: 'scroll' }}>
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => onOpenItem?.(n)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  padding: 8,
                  borderRadius: 6,
                  cursor: 'pointer',
                  backgroundColor: n.unread ? semantic.accent + '11' : undefined,
                  hover: { backgroundColor: '#FFFFFF0A' },
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: n.unread ? semantic.accent : 'transparent',
                    marginTop: 5,
                    flexShrink: 0,
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                  <text style={{ fontSize: 12.5, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{n.title}</text>
                  {n.body ? (
                    <text style={{ fontSize: 11.5, color: text.secondary, fontFamily: FONT }}>{n.body}</text>
                  ) : null}
                  {n.time !== undefined ? <RelativeTime value={n.time} /> : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Popover>
  )
}
