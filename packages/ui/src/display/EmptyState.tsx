/**
 * @atlas/ui — EmptyState
 *
 * A zero-state placeholder: icon, title, description, and an optional action.
 *
 * @example
 *   <EmptyState icon="inbox" title="No messages" description="You're all caught up." action={<Button>Compose</Button>} />
 */
import type { ReactNode } from 'react'
import { surface, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'

export interface EmptyStateProps {
  icon?: IconName
  title?: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon = 'inbox', title = 'Nothing here', description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 32,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: surface.selected,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={22} color={text.muted} />
      </div>

      <text style={{ fontSize: 14, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text>

      {description ? (
        <text
          style={{
            fontSize: 12.5,
            color: text.muted,
            fontFamily: FONT,
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: 280,
          }}
        >
          {description}
        </text>
      ) : null}

      {action}
    </div>
  )
}
