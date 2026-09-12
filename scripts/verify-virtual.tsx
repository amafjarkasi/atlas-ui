/**
 * Virtual-list scale smoke — proves 10k rows stay bounded AND that
 * onVisibleRange fires near the end (the basis for InfiniteScroll).
 * Run:  bun scripts/verify-virtual.tsx
 */
import { useState } from 'react'
import { createTestRoot } from '@gpuix/react/testing'
import { VirtualList } from '@atlas/ui'

const { render, renderer } = createTestRoot({ width: 800, height: 700 })
let failed = false
function check(pred: boolean, label: string) {
  if (!pred) { failed = true; console.error(`FAIL: ${label}`) } else console.log(`ok:   ${label}`)
}

const COUNT = 10000
const items = Array.from({ length: COUNT }, (_, i) => `Item ${i}`)

function RangeProbe() {
  const [seenEnd, setSeenEnd] = useState(false)
  const [n, setN] = useState(0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <VirtualList
        items={items}
        estimatedItemHeight={24}
        height={560}
        onVisibleRange={(r) => {
          setN(r.endIndex ?? 0)
          if ((r.endIndex ?? 0) >= COUNT - 1) setSeenEnd(true)
        }}
        renderItem={(it) => (
          <text style={{ fontSize: 12 }}>{it}</text>
        )}
      />
      <text testId="range-end">{seenEnd ? 'REACHED-END' : `end:${n}`}</text>
    </div>
  )
}

render(<RangeProbe />)
renderer.flush()

const painted = renderer.getPaintedText()
const paintedRows = painted.filter((t) => t.startsWith('Item ')).length
check(painted.some((t) => t.includes('Item 0')), 'first row painted')
check(!painted.some((t) => t.includes('Item 9999')), 'last row NOT painted before scroll (virtualized)')
check(paintedRows > 5 && paintedRows < 400, `paint window bounded (~${paintedRows} rows for ${COUNT} total)`)
console.log(`info: retained text nodes = ${renderer.getAllText().length} (React tree holds all rows; GPUI clips at paint)`)

const vlists = renderer.findByType('virtual-list')
const vlist = vlists[0]
check(vlist !== undefined, 'native virtual-list present')
if (vlist) {
  renderer.scrollToItem(vlist.id, COUNT - 1)
  renderer.flush()
  renderer.advanceTime(50)
  renderer.flush()
  const after = renderer.getPaintedText().join('\n')
  check(after.includes('REACHED-END'), 'onVisibleRange reached the end after scrollToItem')
  check(after.includes('Item 9999') || after.includes('Item 9998'), 'bottom rows painted after scroll')
}

renderer.captureScreenshot('screenshots/virtual.png')
console.log(failed ? 'VIRTUAL FAILED' : 'VIRTUAL PASSED')
process.exit(failed ? 1 : 0)
