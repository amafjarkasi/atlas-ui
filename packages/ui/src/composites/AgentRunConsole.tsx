/**
 * @atlas/ui — AgentRunConsole
 *
 * One consolidated agent-run view: progress + steps + tool calls + token meter
 * (composes `AgentRunCard` + `ToolCallCard` + `TokenMeter`).
 *
 * @example
 *   <AgentRunConsole title="Drafting" steps={steps} toolCalls={calls} progress={64} tokenUsed={1200} tokenLimit={8000} />
 */
import { AgentRunCard } from '../ai/AgentRunCard'
import { ToolCallCard, type ToolCallStatus } from '../ai/ToolCallCard'
import { TokenMeter } from '../ai/TokenMeter'
import type { AgentStep } from '../ai/AgentRunSteps'

export interface AgentRunConsoleProps {
  title?: string
  steps?: AgentStep[]
  toolCalls?: { name: string; args?: string; result?: string; status?: ToolCallStatus }[]
  progress?: number
  tokenUsed?: number
  tokenLimit?: number
}

export function AgentRunConsole({ title, steps = [], toolCalls = [], progress, tokenUsed, tokenLimit }: AgentRunConsoleProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <AgentRunCard title={title} steps={steps} progress={progress} />

      {toolCalls.map((tc, i) => (
        <ToolCallCard key={i} name={tc.name} args={tc.args} result={tc.result} status={tc.status} />
      ))}

      {tokenLimit !== undefined ? <TokenMeter used={tokenUsed ?? 0} limit={tokenLimit} /> : null}
    </div>
  )
}
