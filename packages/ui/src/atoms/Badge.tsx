/**
 * @atlas/ui — Badge atom
 *
 * Multi-variant status indicator.
 *
 * Variants:
 *   "mention"  — red pill with a numeric count (@1)
 *   "unread"   — small blue dot
 *   "count"    — neutral dark pill with a number
 *   "label"    — text pill with a custom color (e.g. "Snoozed", "Archived")
 *
 * @example
 *   <Badge variant="mention" count={3} />
 *   <Badge variant="unread" />
 *   <Badge variant="count" count={12} />
 *   <Badge variant="label" label="Snoozed" color="#8B5CF6" />
 */
import { C, FONT, semantic } from '../tokens'

export type BadgeVariant = 'mention' | 'unread' | 'count' | 'label'

export interface BadgeProps {
  variant: BadgeVariant
  count?: number
  label?: string
  /** Override pill accent color for "label" variant */
  color?: string
}

export function Badge({ variant, count = 0, label, color }: BadgeProps) {
  if (variant === 'unread') {
    return (
      <div
        style={{
          alignSelf: 'flex-start',
          width: 7,
          height: 7,
          borderRadius: 4,
          backgroundColor: semantic.unread,
          flexShrink: 0,
        }}
      />
    )
  }

  if (variant === 'mention') {
    if (count <= 0) return null
    return (
      <div
        style={{
          alignSelf: 'flex-start',
          height: 16,
          minWidth: 16,
          paddingLeft: 4,
          paddingRight: 4,
          borderRadius: 8,
          backgroundColor: semantic.mention,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#FFFFFF',
            fontFamily: FONT,
            lineHeight: 8,
          }}
        >
          {count}
        </text>
      </div>
    )
  }

  if (variant === 'count') {
    if (count <= 0) return null
    return (
      <div
        style={{
          alignSelf: 'flex-start',
          height: 16,
          minWidth: 16,
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 8,
          backgroundColor: C.selected,
          borderWidth: 1,
          borderColor: C.border,
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
            lineHeight: 8,
          }}
        >
          {count}
        </text>
      </div>
    )
  }

  if (variant === 'label') {
    const accent = color ?? semantic.accent
    return (
      <div
        style={{
          alignSelf: 'flex-start',
          paddingLeft: 6,
          paddingRight: 6,
          paddingTop: 2,
          paddingBottom: 2,
          borderRadius: 10,
          backgroundColor: accent + '22',
          borderWidth: 1,
          borderColor: accent + '55',
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
            color: accent,
            fontFamily: FONT,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </text>
      </div>
    )
  }

  return null
}
