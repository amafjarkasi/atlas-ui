/** @atlas/ui — LiveAgentGrid — virtualized grid of concurrent agent runs. */
import { VirtualizedGrid } from '../layout/VirtualizedGrid'
import { AgentRunCard } from './AgentRunCard'
import type { AgentStep } from './AgentRunSteps'

export interface AgentRunSummary {
  id: string
  title: string
  steps?: AgentStep[]
  progress?: number
  status?: string
  durationMs?: number
}

export interface LiveAgentGridProps {
  agents: AgentRunSummary[]
  columns?: number
  height?: number | string
}

export function LiveAgentGrid({ agents, columns = 2, height = '100%' }: LiveAgentGridProps) {
  return (
    <VirtualizedGrid<AgentRunSummary>
      items={agents}
      columns={columns}
      estimatedRowHeight={180}
      height={height}
      renderCell={(a) => (
        <AgentRunCard
          title={a.title ?? (a as any).name ?? `Agent ${a.id}`}
          steps={a.steps ?? []}
          progress={a.progress}
          status={a.status}
          durationMs={a.durationMs ?? (a as any).durationMs}
        />
      )}
    />
  )
}
