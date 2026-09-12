/**
 * @atlas/ui — BranchExplorer
 *
 * A tree of explored alternatives with accept/reject status badges.
 */
import { surface, border, text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Badge } from '../atoms/Badge'

export type BranchStatus = 'accepted' | 'rejected' | 'current' | 'untried'

export interface BranchNode {
  id: string
  label: string
  status: BranchStatus
  children?: BranchNode[]
}

export interface BranchExplorerProps {
  branches: BranchNode[]
  onPick?: (node: BranchNode) => void
}

const STATUS: Record<BranchStatus, { label: string; color: string }> = {
  accepted: { label: 'Accepted', color: '#22C55E' },
  rejected: { label: 'Rejected', color: '#ED4245' },
  current: { label: 'Trying', color: '#3B82F6' },
  untried: { label: 'Untried', color: '#8A8A90' },
}

export function BranchExplorer({ branches, onPick }: BranchExplorerProps) {
  const render = (list: BranchNode[], depth: number) =>
    list.map((n) => (
      <div key={n.id} style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          onClick={() => n.status === 'untried' && onPick?.(n)}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 5, paddingBottom: 5, paddingLeft: depth * 14, cursor: n.status === 'untried' ? 'pointer' : 'default' }}
        >
          {n.children && n.children.length > 0 ? (
            <Icon name="chevronRight" size={11} color={textTokens.muted} />
          ) : (
            <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: textTokens.muted, flexShrink: 0, marginLeft: 2, marginRight: 2 }} />
          )}
          <text style={{ fontSize: 12.5, color: textTokens.primary, fontFamily: FONT, flexGrow: 1 }}>{n.label ?? (n as any).name ?? n.id}</text>
          {(() => {
            const st = STATUS[n.status] ?? STATUS.untried
            return <Badge variant="label" label={st.label} color={st.color} />
          })()}
        </div>
        {n.children && n.children.length > 0 ? render(n.children, depth + 1) : null}
      </div>
    ))

  return <div style={{ display: 'flex', flexDirection: 'column' }}>{render(branches, 0)}</div>
}
