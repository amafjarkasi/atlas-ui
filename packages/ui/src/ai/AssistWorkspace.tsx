/** @atlas/ui — AssistWorkspace — chat + context browser + usage in one shell. */
import { border } from '../tokens'
import { ChatThread, type ChatThreadMessage } from './ChatThread'
import { ContextBrowser, type ContextChunk } from './ContextBrowser'
import { ContextRing } from './ContextRing'
import { AgentRunCard } from './AgentRunCard'
import type { AgentStep } from './AgentRunSteps'

export interface AssistWorkspaceProps {
  messages: ChatThreadMessage[]
  onSend: (text: string) => void
  chunks?: ContextChunk[]
  query?: string
  onQueryChange?: (q: string) => void
  used?: number
  limit?: number
  runSteps?: AgentStep[]
  runProgress?: number
  streaming?: boolean
}

export function AssistWorkspace({ messages, onSend, chunks = [], query = '', onQueryChange, used = 0, limit = 200000, runSteps = [], runProgress, streaming = false }: AssistWorkspaceProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%' }}>
      <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <ChatThread title="Assistant" messages={messages} onSend={onSend} loading={streaming} />
      </div>
      <div style={{ width: 300, flexShrink: 0, borderLeftWidth: 1, borderColor: border.subtle, padding: 10, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'scroll' }}>
        <ContextRing used={used} limit={limit} />
        <AgentRunCard title="Current run" steps={runSteps} progress={runProgress} />
        <ContextBrowser chunks={chunks} query={query} height={400} />
        {onQueryChange ? <input value={query} onChange={(e) => onQueryChange(e.value ?? '')} placeholder="Filter context…" style={{ fontSize: 12 }} /> : null}
      </div>
    </div>
  )
}
