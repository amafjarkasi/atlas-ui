/**
 * @atlas/ui — AgentTrajectory
 *
 * A step-timing (Gantt-style) view of an agent run: each step's wall-clock as
 * a proportional bar.
 */
import { surface, border, text as textTokens } from '../tokens'
import { FONT } from '../tokens'

export type TrajectoryState = 'pending' | 'active' | 'done' | 'error'

export interface TrajectoryStep {
  id: string
  label: string
  ms?: number
  state: TrajectoryState
}

export interface AgentTrajectoryProps {
  steps: TrajectoryStep[]
  totalMs?: number
}

const STATE_COLOR: Record<TrajectoryState, string> = { pending: '#3F3F46', active: '#3B82F6', done: '#22C55E', error: '#ED4245' }

export function AgentTrajectory({ steps = [], totalMs }: AgentTrajectoryProps) {
  const safeSteps = steps ?? []
  const maxMs = totalMs ?? Math.max(...safeSteps.map((s) => s.ms ?? 0), 1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 2, paddingBottom: 2 }}>
      {safeSteps.map((s) => (
        <div key={s.id} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <text style={{ fontSize: 12, color: textTokens.secondary, fontFamily: FONT }}>{s.label}</text>
            {s.ms !== undefined ? (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <text style={{ fontSize: 11, color: textTokens.muted, fontFamily: FONT }}>{`${s.ms}ms`}</text>
              </div>
            ) : null}
          </div>
          <div style={{ height: 8, borderRadius: 4, backgroundColor: surface.selected, overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(2, ((s.ms ?? 0) / maxMs) * 100)}%`, height: '100%', borderRadius: 4, backgroundColor: STATE_COLOR[s.state] }} />
          </div>
        </div>
      ))}
    </div>
  )
}
