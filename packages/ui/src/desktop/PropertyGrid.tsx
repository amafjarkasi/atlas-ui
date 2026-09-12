/** @atlas/ui — PropertyGrid — editable key/value inspector (DescriptionList + InlineEditableField). */
import { InlineEditableField } from '../composites/InlineEditableField'

export interface PropertyGridItem {
  key: string
  label: string
  value: string
  multiline?: boolean
}

export interface PropertyGridProps {
  items: PropertyGridItem[]
  onValueChange?: (key: string, value: string) => void
}

export function PropertyGrid({ items, onValueChange }: PropertyGridProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((it) => (
        <InlineEditableField key={it.key} label={it.label} value={it.value} multiline={it.multiline} onSave={(v) => onValueChange?.(it.key, v)} />
      ))}
    </div>
  )
}
