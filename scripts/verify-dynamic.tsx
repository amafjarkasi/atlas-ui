/**
 * Dynamic-behavior smoke — streaming reveal over real time, and native
 * search-highlight paint (getPaintedHighlights).
 * Run:  bun scripts/verify-dynamic.tsx
 */
import { createTestRoot } from '@gpuix/react/testing'
import { StreamingText, Marker, SearchHighlights } from '@atlas/ui'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const { render, renderer } = createTestRoot({ width: 900, height: 600 })
let failed = false
function check(pred: boolean, label: string) {
  if (!pred) { failed = true; console.error(`FAIL: ${label}`) } else console.log(`ok:   ${label}`)
}

async function main() {
  // Phase 1: streaming reveal
  const full = 'The assistant streams this sentence token by token until done.'
  render(
    <div style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <StreamingText text={full} active speed={15} showCursor />
      <Marker query="fox">The quick brown fox jumps over the lazy dog</Marker>
      <SearchHighlights text="alpha beta gamma beta end" query="beta" />
    </div>,
  )
  renderer.flush()

  const early = renderer.getPaintedText().join('')
  check(!early.includes(full), 'full text NOT revealed immediately while streaming')

  await sleep(15 * 12 + 40) // ~12 chars revealed
  renderer.flush()
  const mid = renderer.getPaintedText().join('')
  check(mid.includes(full.slice(0, 8)), 'streaming revealed the first characters over time')

  await sleep(full.length * 15 + 150)
  renderer.flush()
  const done = renderer.getPaintedText().join('')
  check(done.includes(full), 'streaming completed the full text')

  // Phase 2: native search highlights
  const matches = renderer.getPaintedHighlights()
  check(matches.length >= 1, `native highlight match painted (${matches.length})`)
  const all = renderer.getPaintedText().join('')
  check(all.includes('fox'), 'Marker text painted')

  renderer.captureScreenshot('screenshots/dynamic.png')
  console.log(failed ? 'DYNAMIC FAILED' : 'DYNAMIC PASSED')
  process.exit(failed ? 1 : 0)
}

main()
