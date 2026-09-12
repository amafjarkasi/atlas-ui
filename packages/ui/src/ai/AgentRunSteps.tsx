/**
 * @atlas/ui — AgentRunSteps
 *
 * A vertical status tracker for agent phases (thinking → tool call → result),
 * with a connecting rail and per-step status icons.
 *
 * @example
 *   <AgentRunSteps steps={[{ id: '1', label: 'Thinking', status: 'done' }, { id: '2', label: 'Calling search', status: 'running' }]} />
 */
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Spinner } from '../effects/Spinner'

export type AgentStepStatus = 'pending' | 'running' | 'done' | 'error'

export interface AgentStep {
  id: string
  label: string
  detail?: string
  status: AgentStepStatus
}

export interface AgentRunStepsProps {
  steps: AgentStep[]
}

const ICON: Record<AgentStepStatus, 'circle' | 'checkCircle' | 'alertCircle' | 'circle'> = {
  pending: 'circle',
  running: 'circle',
  done: 'checkCircle',
  error: 'alertCircle',
}
const COLOR: Record<AgentStepStatus, string> = {
  pending: text.muted,
  running: semantic.accent,
  done: '#22C55E',
  error: '#ED4245',
}

export function AgentRunSteps({ steps }: AgentRunStepsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {steps.map((s, i) => {
        const isRunning = s.status === 'running'
        const isDone = s.status === 'done'
        const isError = s.status === 'error'

        return (
          <div
            key={s.id}
            style={{ display: 'flex', flexDirection: 'row', gap: 10, paddingBottom: i < steps.length - 1 ? 12 : 0, position: 'relative' }}
          >
            {i < steps.length - 1 ? (
              <div
                style={{
                  position: 'absolute',
                  left: 8,
                  top: 20,
                  bottom: 0,
                  width: 2,
                  backgroundColor: isDone ? '#22C55E' : border.subtle,
                }}
              />
            ) : null}

            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDone ? '#22C55E1A' : isError ? '#ED42451A' : isRunning ? '#3B82F61A' : surface.selected,
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {isRunning ? (
                <Spinner size={12} color={semantic.accent} />
              ) : (
                <Icon name={ICON[s.status]} size={11} color={COLOR[s.status]} />
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <text
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: isDone || isError || isRunning ? text.primary : text.secondary,
                  fontFamily: FONT,
                }}
              >
                {s.label}
              </text>
              {s.detail ? (
                <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT, lineHeight: 1.4 }}>{s.detail}</text>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
