/** @atlas/ui — AgentFlowGraph — animated agent step flow (think/tool/result nodes). */
import { surface, border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Spinner } from '../effects/Spinner'

export type AgentNodeKind = 'think' | 'tool' | 'result'
export type AgentNodeState = 'pending' | 'active' | 'done' | 'error'

export interface AgentFlowNode {
  id: string
  label?: string
  title?: string
  kind?: AgentNodeKind | string
  state?: AgentNodeState | string
  status?: string
}

export interface AgentFlowGraphProps {
  nodes: AgentFlowNode[]
}

const KIND_ICON: Record<string, 'sparkle' | 'zap' | 'checkCircle'> = { think: 'sparkle', llm: 'sparkle', tool: 'zap', router: 'zap', result: 'checkCircle' }
const STATE_COLOR: Record<string, string> = { pending: '#3F3F46', idle: '#3F3F46', active: '#3B82F6', running: '#3B82F6', done: '#22C55E', completed: '#22C55E', error: '#ED4245' }

export function AgentFlowGraph({ nodes }: AgentFlowGraphProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {nodes.map((n, i) => {
        const stateKey = (n.state ?? n.status ?? 'pending').toLowerCase()
        const kindKey = (n.kind ?? 'think').toLowerCase()
        const active = stateKey === 'active' || stateKey === 'running'
        const color = STATE_COLOR[stateKey] ?? '#3F3F46'
        const iconName = KIND_ICON[kindKey] ?? 'sparkle'
        const labelText = n.label ?? n.title ?? `Node ${n.id}`

        return (
          <div key={n.id} style={{ position: 'relative', display: 'flex', flexDirection: 'row', gap: 10, paddingBottom: i < nodes.length - 1 ? 14 : 0 }}>
            {i < nodes.length - 1 ? <div style={{ position: 'absolute', left: 10, top: 24, bottom: 0, width: 2, backgroundColor: border.subtle }} /> : null}
            <div style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: color, backgroundColor: surface.card, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              {active ? <Spinner size={10} color={color} dots={2} /> : <Icon name={iconName} size={11} color={color} />}
            </div>
            <text style={{ fontSize: 12.5, fontWeight: active ? 600 : 500, color: stateKey === 'pending' || stateKey === 'idle' ? t.muted : t.primary, fontFamily: FONT, alignSelf: 'center' }}>{labelText}</text>
          </div>
        )
      })}
    </div>
  )
}
