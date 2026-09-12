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
    <div style={{ display: 'flex', flexDirection: 'column', fontFamily: FONT_MONO }}>
      {lines.map((l, i) => (
        <text key={i} style={{ fontSize: 12, color: COLOR[l.type], fontFamily: FONT_MONO, lineHeight: 1.5 }}>
          {PREFIX[l.type]} {l.text}
        </text>
      ))}
    </div>
  )
}
