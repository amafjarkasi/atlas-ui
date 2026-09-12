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
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#0D0D10', borderRadius: 8, borderWidth: 1, borderColor: '#26262B', overflow: 'hidden', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 12, paddingRight: 12, height: 32, backgroundColor: '#141418', borderBottomWidth: 1, borderColor: '#26262B' }}>
        <text style={{ fontSize: 11, color: '#8A8A90', fontFamily: FONT_MONO }}>streaming-diff</text>
        {active && revealed < changeIdx.length ? (
          <text style={{ fontSize: 10.5, color: '#60A5FA', fontFamily: FONT_MONO }}>streaming edits…</text>
        ) : (
          <text style={{ fontSize: 10.5, color: '#22C55E', fontFamily: FONT_MONO }}>synced</text>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: 6, maxHeight: 300, overflowY: 'scroll' }}>
        {all.map((l: DiffLine, i) => {
          const isVisible = l.type === 'keep' || shown.has(i)
          const bg = l.type === 'add' ? '#22C55E18' : l.type === 'del' ? '#ED424518' : 'transparent'
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                minHeight: 20,
                paddingLeft: 6,
                paddingRight: 6,
                borderRadius: 3,
                backgroundColor: bg,
                opacity: isVisible ? 1 : 0.25,
                gap: 8,
              }}
            >
              <div style={{ width: 24, flexShrink: 0 }}>
                <text style={{ fontSize: 10.5, color: '#55555D', fontFamily: FONT_MONO, textAlign: 'right' }}>{i + 1}</text>
              </div>
              <div style={{ width: 14, flexShrink: 0 }}>
                <text style={{ fontSize: 11.5, color: COLOR[l.type], fontFamily: FONT_MONO, fontWeight: 600 }}>
                  {l.type === 'add' ? '+' : l.type === 'del' ? '-' : ' '}
                </text>
              </div>
              <text style={{ fontSize: 11.5, fontFamily: FONT_MONO, lineHeight: 1.45, color: COLOR[l.type], whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {l.text}
              </text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
