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
          <Icon name={n.children ? 'chevronRight' : 'dot'} size={11} color={textTokens.muted} />
          <text style={{ fontSize: 12.5, color: textTokens.primary, fontFamily: FONT, flexGrow: 1 }}>{n.label}</text>
          <Badge variant="label" label={STATUS[n.status].label} color={STATUS[n.status].color} />
        </div>
        {n.children ? render(n.children, depth + 1) : null}
      </div>
    ))

  return <div style={{ display: 'flex', flexDirection: 'column' }}>{render(branches, 0)}</div>
}
