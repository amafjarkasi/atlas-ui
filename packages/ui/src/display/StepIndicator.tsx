/**
 * @atlas/ui — StepIndicator
 *
 * A horizontal onboarding/progress tracker: numbered dots connected by bars.
 * Completed steps show a check; the current step is accent-filled. The current
 * step's label renders as a caption beneath.
 *
 * @example
 *   <StepIndicator steps={[{ label: 'Account' }, { label: 'Import' }, { label: 'Done' }]} current={1} />
 */
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface Step {
  label?: string
  done?: boolean
}

export interface StepIndicatorProps {
  steps: Step[]
  current: number
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  const currentLabel = steps[current]?.label

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        {steps.map((s, i) => {
          const isDone = s.done || i < current
          const isCurrent = i === current
          const filled = isDone || isCurrent

          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: i < steps.length - 1 ? 1 : 0 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: filled ? semantic.accent : surface.selected,
                  borderWidth: 1,
                  borderColor: filled ? semantic.accent : border.strong,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {isDone ? (
                  <Icon name="check" size={12} color="#FFFFFF" />
                ) : (
                  <text style={{ fontSize: 11, fontWeight: 600, color: isCurrent ? '#FFFFFF' : text.muted, fontFamily: FONT }}>
                    {i + 1}
                  </text>
                )}
              </div>

              {i < steps.length - 1 ? (
                <div
                  style={{
                    height: 2,
                    flexGrow: 1,
                    backgroundColor: isDone ? semantic.accent : border.subtle,
                    marginLeft: 4,
                    marginRight: 4,
                    borderRadius: 1,
                  }}
                />
              ) : null}
            </div>
          )
        })}
      </div>

      {currentLabel ? (
        <text style={{ fontSize: 12, color: text.secondary, fontFamily: FONT }}>{currentLabel}</text>
      ) : null}
    </div>
  )
}
