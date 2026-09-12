/**
 * @atlas/ui — Breadcrumb
 *
 * A horizontal navigation trail. Earlier items are muted and clickable; the
 * last item is emphasized and not clickable.
 *
 * @example
 *   <Breadcrumb items={[{ label: 'Settings' }, { label: 'Accounts' }, { label: 'Sync' }]} />
 */
import { text, interact } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'

export interface BreadcrumbItem {
  label: string
  icon?: IconName
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: IconName
}

export function Breadcrumb({ items, separator = 'chevronRight' }: BreadcrumbProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <div
              onClick={last ? undefined : item.onClick}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 3,
                paddingBottom: 3,
                borderRadius: 5,
                cursor: last ? 'default' : 'pointer',
                hover: last ? undefined : { backgroundColor: interact.hover },
              }}
            >
              {item.icon && <Icon name={item.icon} size={13} color={text.muted} />}
              <text
                style={{
                  fontSize: 12.5,
                  fontWeight: last ? 600 : 500,
                  color: last ? text.primary : text.muted,
                  fontFamily: FONT,
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </text>
            </div>

            {!last && <Icon name={separator} size={12} color={text.ghost} />}
          </div>
        )
      })}
    </div>
  )
}
