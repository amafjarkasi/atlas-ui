/** @atlas/ui — AgentFlowGraph — animated agent step flow (think/tool/result nodes). */
import { surface, border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { ThinkingIndicator } from './ThinkingIndicator'

export type AgentNodeKind = 'think' | 'tool' | 'result'
export type AgentNodeState = 'pending' | 'active' | 'done' | 'error'

export interface AgentFlowNode {
  id: string
  label: string
  kind: AgentNodeKind
  state: AgentNodeState
}

export interface AgentFlowGraphProps {
  nodes: AgentFlowNode[]
}

const KIND_ICON: Record<AgentNodeKind, 'sparkle' | 'zap' | 'checkCircle'> = { think: 'sparkle', tool: 'zap', result: 'checkCircle' }
const STATE_COLOR: Record<AgentNodeState, string> = { pending: '#3F3F46', active: '#3B82F6', done: '#22C55E', error: '#ED4245' }

export function AgentFlowGraph({ nodes }: AgentFlowGraphProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {nodes.map((n, i) => {
        const active = n.state === 'active'
        return (
          <div key={n.id} style={{ position: 'relative', display: 'flex', flexDirection: 'row', gap: 10, paddingBottom: i < nodes.length - 1 ? 14 : 0 }}>
            {i < nodes.length - 1 ? <div style={{ position: 'absolute', left: 10, top: 24, bottom: 0, width: 2, backgroundColor: border.subtle }} /> : null}
            <div style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: STATE_COLOR[n.state], backgroundColor: surface.card, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              {active ? <ThinkingIndicator active /> : <Icon name={KIND_ICON[n.kind]} size={11} color={STATE_COLOR[n.state]} />}
            </div>
            <text style={{ fontSize: 12.5, fontWeight: active ? 600 : 500, color: n.state === 'pending' ? t.muted : t.primary, fontFamily: FONT, alignSelf: 'center' }}>{n.label}</text>
          </div>
        )
      })}
    </div>
  )
}
