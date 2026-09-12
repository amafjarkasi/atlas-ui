import { border, surface, text as t, FONT } from '../tokens'
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
        <ChatThread title="Assistant Workspace" messages={messages} onSend={onSend} loading={streaming} />
      </div>
      <div style={{ width: 280, flexShrink: 0, borderLeftWidth: 1, borderColor: border.subtle, padding: 12, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'scroll', backgroundColor: surface.card }}>
        <div style={{ height: 32, flexShrink: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: border.subtle, paddingBottom: 6 }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: FONT, lineHeight: 1 }}>Session Context</text>
          <div style={{ backgroundColor: '#3B82F618', borderRadius: 4, paddingLeft: 6, paddingRight: 6, height: 20, display: 'flex', alignItems: 'center' }}>
            <text style={{ fontSize: 10.5, color: '#60A5FA', fontFamily: FONT, lineHeight: 1 }}>{`${chunks.length} chunks`}</text>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ContextRing used={used} limit={limit} size={80} compact />
        </div>
        <AgentRunCard title="Active Run" steps={runSteps} progress={runProgress} padding={12} />
        <ContextBrowser chunks={chunks} query={query} height={280} />
      </div>
    </div>
  )
}
