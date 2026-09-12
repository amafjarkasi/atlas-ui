/** @atlas/ui — ToolboxRail — vertical tool rail with tooltips. */
import { border, surface, text as t } from '../tokens'
import { IconButton } from '../atoms/IconButton'
import { Tooltip } from '../display/Tooltip'
import type { IconName } from '../atoms/Icon'

export interface ToolboxTool {
  id: string
  icon: IconName
  label: string
}

export interface ToolboxRailProps {
  tools: ToolboxTool[]
  activeId?: string
  onSelect?: (id: string) => void
  vertical?: boolean
}

export function ToolboxRail({ tools, activeId, onSelect, vertical = true }: ToolboxRailProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        gap: 4,
        padding: 6,
        borderWidth: 1,
        borderColor: border.subtle,
        borderRadius: 10,
        backgroundColor: surface.card,
        alignSelf: 'flex-start',
        width: vertical ? 44 : undefined,
      }}
    >
      {tools.map((tool) => {
        const active = activeId === tool.id
        return (
          <Tooltip key={tool.id} label={tool.label} side={vertical ? 'right' : 'top'}>
            <div
              onClick={() => onSelect?.(tool.id)}
              style={{
                borderRadius: 7,
                backgroundColor: active ? '#3B82F622' : undefined,
                borderWidth: 1,
                borderColor: active ? '#3B82F6' : 'transparent',
                alignSelf: 'flex-start',
              }}
            >
              <IconButton icon={tool.icon} size={14} pad={28} color={active ? '#3B82F6' : t.muted} />
            </div>
          </Tooltip>
        )
      })}
    </div>
  )
}
