/**
 * @atlas/ui — AgentRunCard
 *
 * A card summarizing an agent run: title/status, progress bar, and the step
 * tracker (composes `Card` + `ProgressBar` + `AgentRunSteps`).
 *
 * @example
 *   <AgentRunCard title="Drafting reply" progress={64} steps={steps} status="running" />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Card } from '../layout/Card'
import { ProgressBar } from '../inputs/ProgressBar'
import { AgentRunSteps, type AgentStep } from './AgentRunSteps'

export interface AgentRunCardProps {
  title?: string
  steps: AgentStep[]
  progress?: number
  status?: string
}

export function AgentRunCard({ title = 'Agent run', steps, progress, status }: AgentRunCardProps) {
  return (
    <Card padding={14}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text>
          {status ? <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{status}</text> : null}
        </div>

        {progress !== undefined ? <ProgressBar value={progress} /> : null}
        <AgentRunSteps steps={steps} />
      </div>
    </Card>
  )
}
