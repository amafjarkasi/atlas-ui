/**
 * @atlas/ui — PromptDiff
 *
 * A line-level unified diff between two prompt versions (LCS-based).
 *
 * @example
 *   <PromptDiff before={oldPrompt} after={newPrompt} />
 */
import { surface, border, FONT_MONO } from '../tokens'
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
    <div style={{ display: 'flex', flexDirection: 'column', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.code, gap: 4, fontFamily: FONT_MONO }}>
      {lines.map((l, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minHeight: 22, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, borderRadius: 4, gap: 8, backgroundColor: l.type === 'add' ? '#22C55E12' : l.type === 'del' ? '#ED424512' : 'transparent' }}>
          <div style={{ width: 14, flexShrink: 0 }}>
            <text style={{ fontSize: 11.5, color: COLOR[l.type], fontFamily: FONT_MONO, fontWeight: 700, lineHeight: 1 }}>{PREFIX[l.type]}</text>
          </div>
          <text style={{ fontSize: 11.5, color: COLOR[l.type], fontFamily: FONT_MONO, lineHeight: 1.4 }}>{l.text}</text>
        </div>
      ))}
    </div>
  )
}
