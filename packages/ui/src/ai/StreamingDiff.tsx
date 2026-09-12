/**
 * @atlas/ui — StreamingDiff
 *
 * A diff whose changed hunks reveal progressively while the model "edits" the
 * file (added lines stream in on a timer).
 */
import { useEffect, useState } from 'react'
import { FONT_MONO } from '../tokens'
import { diffLines, type DiffLine } from './diff'

export interface StreamingDiffProps {
  before: string
  after: string
  active?: boolean
  speedMs?: number
}

const COLOR = { add: '#22C55E', del: '#ED4245', keep: '#8A8A90' }

export function StreamingDiff({ before, after, active = true, speedMs = 120 }: StreamingDiffProps) {
  const all = diffLines(before, after)
  const changeIdx = all.map((l, i) => (l.type === 'keep' ? -1 : i)).filter((i) => i >= 0)
  const [revealed, setRevealed] = useState(active ? 0 : changeIdx.length)

  useEffect(() => {
    if (!active) {
      setRevealed(changeIdx.length)
      return
    }
    setRevealed(0)
    const id = setInterval(() => {
      setRevealed((r) => {
        if (r >= changeIdx.length) {
          clearInterval(id)
          return r
        }
        return r + 1
      })
    }, speedMs)
    return () => clearInterval(id)
  }, [active, before, after, speedMs])

  const shown = new Set(changeIdx.slice(0, revealed))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', fontFamily: FONT_MONO }}>
      {all.map((l: DiffLine, i) => (
        <text key={i} style={{ fontSize: 12, fontFamily: FONT_MONO, lineHeight: 1.5, color: COLOR[l.type], opacity: l.type !== 'keep' && !shown.has(i) ? 0.25 : 1 }}>
          {l.type === 'add' ? '+ ' : l.type === 'del' ? '- ' : '  '}
          {l.text}
        </text>
      ))}
    </div>
  )
}
