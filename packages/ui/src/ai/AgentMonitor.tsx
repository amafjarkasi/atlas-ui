/** @atlas/ui — AgentMonitor — live agent grid + cost + completion banner. */
import { LiveAgentGrid, type AgentRunSummary } from './LiveAgentGrid'
import { RunCostCard } from './RunCostCard'
import { TaskDoneBanner } from './TaskDoneBanner'

export interface AgentMonitorProps {
  agents: AgentRunSummary[]
  inputTokens?: number
  outputTokens?: number
  cost?: number
  done?: boolean
}

export function AgentMonitor({ agents, inputTokens, outputTokens, cost, done = false }: AgentMonitorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {done ? <TaskDoneBanner title="All agents finished" celebrate /> : null}
      <LiveAgentGrid agents={agents} columns={2} height={360} />
      <RunCostCard inputTokens={inputTokens} outputTokens={outputTokens} cost={cost} />
    </div>
  )
}
