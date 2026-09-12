/**
 * @atlas/ui — AgentRunCard
 *
 * A card summarizing an agent run: title/status, progress bar, and the step
 * tracker (composes `Card` + `ProgressBar` + `AgentRunSteps`).
 *
 * @example
 *   <AgentRunCard title="Drafting reply" progress={64} steps={steps} status="running" />
 */
import { text, semantic, border } from '../tokens'
import { FONT } from '../tokens'
import { Card } from '../layout/Card'
import { ProgressBar } from '../inputs/ProgressBar'
import { AgentRunSteps, type AgentStep } from './AgentRunSteps'
import { Badge } from '../atoms/Badge'

export interface AgentRunCardProps {
  title?: string
  steps?: AgentStep[]
  progress?: number
  status?: string
  durationMs?: number
}

const STATUS_COLOR: Record<string, string> = {
  running: '#3B82F6',
  active: '#3B82F6',
  done: '#22C55E',
  completed: '#22C55E',
  idle: '#71717A',
  pending: '#71717A',
  error: '#ED4245',
}

export function AgentRunCard({ title = 'Agent run', steps, progress, status, durationMs }: AgentRunCardProps) {
  const safeSteps = steps ?? []
  const statusKey = (status ?? 'pending').toLowerCase()
  const statusColor = STATUS_COLOR[statusKey] ?? '#71717A'

  return (
    <Card padding={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text>
            {durationMs !== undefined && durationMs > 0 ? (
              <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{`${(durationMs / 1000).toFixed(1)}s`}</text>
            ) : null}
          </div>
          {status ? (
            <Badge variant="label" label={status} color={statusColor} />
          ) : null}
        </div>

        {progress !== undefined ? <ProgressBar value={progress} /> : null}
        {safeSteps.length > 0 ? <AgentRunSteps steps={safeSteps} /> : null}
      </div>
    </Card>
  )
}
