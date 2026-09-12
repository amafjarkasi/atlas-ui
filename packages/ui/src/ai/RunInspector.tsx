/** @atlas/ui — RunInspector — trajectory + context + sandbox log for one run. */
import { AgentTrajectory, type TrajectoryStep } from './AgentTrajectory'
import { ContextRing } from './ContextRing'
import { SandboxStepLog, type SandboxLine } from './SandboxStepLog'

export interface RunInspectorProps {
  steps: TrajectoryStep[]
  lines: SandboxLine[]
  used?: number
  limit?: number
}

export function RunInspector({ steps, lines, used = 0, limit = 200000 }: RunInspectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <ContextRing used={used} limit={limit} />
      <AgentTrajectory steps={steps} />
      <SandboxStepLog lines={lines} />
    </div>
  )
}
