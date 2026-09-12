/**
 * @atlas/ui — ActionChips
 *
 * A row of suggested next-step chips (extracts the pattern from `PromptInput`).
 *
 * @example
 *   <ActionChips actions={[{ id: 'sum', label: 'Summarize', icon: 'sparkle' }]} onAction={run} />
 */
import { surface, border, text, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'

export interface ActionChip {
  id: string
  label: string
  icon?: IconName
}

export interface ActionChipsProps {
  actions: ActionChip[]
  onAction?: (chip: ActionChip) => void
  disabled?: boolean
}

export function ActionChips({ actions, onAction, disabled = false }: ActionChipsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 6, flexWrap: 'wrap', opacity: disabled ? 0.5 : 1 }}>
      {actions.map((c) => (
        <div
          key={c.id}
          onClick={() => !disabled && onAction?.(c)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 4,
            paddingBottom: 4,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: border.strong,
            backgroundColor: surface.card,
            cursor: disabled ? 'not-allowed' : 'pointer',
            hover: { borderColor: semantic.accent },
          }}
        >
          {c.icon ? <Icon name={c.icon} size={11} color={text.muted} /> : null}
          <text style={{ fontSize: 11, color: text.secondary, fontFamily: FONT, whiteSpace: 'nowrap' }}>{c.label}</text>
        </div>
      ))}
    </div>
  )
}
