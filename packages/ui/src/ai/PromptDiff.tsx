/**
 * @atlas/ui — PromptDiff
 *
 * A line-level unified diff between two prompt versions (LCS-based).
 *
 * @example
 *   <PromptDiff before={oldPrompt} after={newPrompt} />
 */
import { FONT_MONO } from '../tokens'
import { diffLines } from './diff'

export interface PromptDiffProps {
  before: string
  after: string
}

const COLOR = { add: '#22C55E', del: '#ED4245', keep: '#8A8A90' }
const PREFIX = { add: '+', del: '-', keep: ' ' }

export function PromptDiff({ before, after }: PromptDiffProps) {
  const lines = diffLines(before, after)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#27272A', backgroundColor: '#101012', gap: 3, fontFamily: FONT_MONO }}>
      {lines.map((l, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2, borderRadius: 4, backgroundColor: l.type === 'add' ? '#22C55E12' : l.type === 'del' ? '#ED424512' : 'transparent' }}>
          <text style={{ fontSize: 12, color: COLOR[l.type], fontFamily: FONT_MONO, whiteSpace: 'nowrap' }}>
            {`${PREFIX[l.type]} ${l.text}`}
          </text>
        </div>
      ))}
    </div>
  )
}
