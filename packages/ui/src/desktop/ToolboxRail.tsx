/** @atlas/ui — ToolboxRail — vertical tool rail with tooltips. */
import { border, text as t } from '../tokens'
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
    <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', gap: 2, padding: 6, borderWidth: 1, borderColor: border.subtle, borderRadius: 10, alignSelf: 'flex-start' }}>
      {tools.map((tool) => (
        <Tooltip key={tool.id} label={tool.label} side={vertical ? 'right' : 'top'}>
          <div onClick={() => onSelect?.(tool.id)} style={{ borderRadius: 6, backgroundColor: activeId === tool.id ? '#3B82F622' : undefined, borderWidth: activeId === tool.id ? 1 : 0, borderColor: '#3B82F6' }}>
            <IconButton icon={tool.icon} size={15} pad={30} color={activeId === tool.id ? '#3B82F6' : t.muted} />
          </div>
        </Tooltip>
      ))}
    </div>
  )
}
