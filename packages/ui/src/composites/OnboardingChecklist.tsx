/**
 * @atlas/ui — OnboardingChecklist
 *
 * A checklist with progress and a completion celebration (composes `Card` +
 * `Checkbox` + `ProgressBar` + `Confetti`).
 *
 * @example
 *   <OnboardingChecklist items={[{ id: '1', label: 'Create workspace' }]} onToggle={toggle} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Card } from '../layout/Card'
import { Checkbox } from '../inputs/Checkbox'
import { ProgressBar } from '../inputs/ProgressBar'
import { Confetti } from '../dataviz/Confetti'

export interface ChecklistItem {
  id: string
  label: string
  done?: boolean
}

export interface OnboardingChecklistProps {
  items: ChecklistItem[]
  onToggle?: (id: string, done: boolean) => void
  title?: string
}

export function OnboardingChecklist({ items, onToggle, title = 'Onboarding' }: OnboardingChecklistProps) {
  const doneCount = items.filter((i) => i.done).length
  const pct = items.length > 0 ? (doneCount / items.length) * 100 : 0
  const complete = items.length > 0 && doneCount === items.length

  return (
    <Card padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
        <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text>
        <ProgressBar value={pct} />
        {items.map((it) => (
          <Checkbox key={it.id} checked={it.done} label={it.label} onCheckedChange={(c) => onToggle?.(it.id, c)} />
        ))}
        {complete ? <Confetti pieces={40} width={320} height={200} /> : null}
      </div>
    </Card>
  )
}
