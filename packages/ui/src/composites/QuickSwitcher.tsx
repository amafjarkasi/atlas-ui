/**
 * @atlas/ui — QuickSwitcher
 *
 * A ⌘K command palette trigger + palette (composes `CommandMenu` + `Kbd`).
 *
 * @example
 *   <QuickSwitcher open={open} onOpenChange={setOpen} items={commands} shortcut="Ctrl+K" />
 */
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Kbd } from '../atoms/Kbd'
import { CommandMenu, type CommandItem } from '../display/CommandMenu'

export interface QuickSwitcherProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CommandItem[]
  placeholder?: string
  triggerLabel?: string
  shortcut?: string
}

export function QuickSwitcher({
  open,
  onOpenChange,
  items,
  placeholder,
  triggerLabel = 'Search commands…',
  shortcut = 'Ctrl+K',
}: QuickSwitcherProps) {
  return (
    <div>
      <div
        onClick={() => onOpenChange(true)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingLeft: 10,
          paddingRight: 8,
          paddingTop: 6,
          paddingBottom: 6,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: border.subtle,
          backgroundColor: surface.card,
          cursor: 'pointer',
          minWidth: 200,
        }}
      >
        <Icon name="search" size={13} color={text.muted} />
        <text style={{ fontSize: 12.5, color: text.muted, fontFamily: FONT, flexGrow: 1 }}>{triggerLabel}</text>
        <Kbd keys={shortcut} />
      </div>

      <CommandMenu open={open} onOpenChange={onOpenChange} items={items} placeholder={placeholder} />
    </div>
  )
}
