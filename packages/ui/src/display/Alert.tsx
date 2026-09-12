/**
 * @atlas/ui — Alert
 *
 * An inline banner with a left accent, icon, title/description, and optional
 * dismiss.
 *
 * @example
 *   <Alert variant="warning" title="Storage almost full" description="You have 2GB left." onDismiss={dismiss} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps {
  variant: AlertVariant
  title?: string
  description?: string
  onDismiss?: () => void
  icon?: IconName
}

const VARIANT_MAP: Record<AlertVariant, { color: string; icon: IconName }> = {
  info: { color: '#3B82F6', icon: 'info' },
  success: { color: '#22C55E', icon: 'checkCircle' },
  warning: { color: '#EAB308', icon: 'alertTriangle' },
  error: { color: '#ED4245', icon: 'alertCircle' },
}

export function Alert({ variant, title, description, onDismiss, icon }: AlertProps) {
  const v = VARIANT_MAP[variant]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: v.color + '44',
        backgroundColor: v.color + '14',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: v.color + '26',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name={icon ?? v.icon} size={13} color={v.color} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexGrow: 1 }}>
        {title ? (
          <div style={{ flexShrink: 0 }}>
            <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT, lineHeight: 18 }}>
              {title}
            </text>
          </div>
        ) : null}
        {description ? (
          <div style={{ flexShrink: 0 }}>
            <text style={{ fontSize: 12, color: text.secondary, fontFamily: FONT, lineHeight: 17 }}>
              {description}
            </text>
          </div>
        ) : null}
      </div>

      {onDismiss ? (
        <div
          onClick={onDismiss}
          style={{
            cursor: 'pointer',
            width: 18,
            height: 18,
            borderRadius: 9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            hover: { backgroundColor: '#FFFFFF14' },
          }}
        >
          <Icon name="x" size={12} color={text.muted} />
        </div>
      ) : null}
    </div>
  )
}
