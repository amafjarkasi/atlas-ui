/**
 * measure-badge — numerically verifies the digit is centered in the pill.
 * Run:  bun scripts/measure-badge.tsx
 */
import { createTestRoot } from '@gpuix/react/testing'
import { Badge } from '@atlas/ui'

const { render, renderer } = createTestRoot({ width: 400, height: 200 })
render(
  <div style={{ padding: 40, display: 'flex', flexDirection: 'row' }}>
    <Badge variant="mention" count={3} />
  </div>,
)
renderer.flush()

const byId = new Map<number, { type: string; text?: string | null; children: number[] }>()
for (const type of ['div', 'text'] as const) {
  for (const el of renderer.findByType(type) as { id: number; text?: string | null; children: number[] }[]) {
    byId.set(el.id, { type, text: el.text, children: el.children ?? [] })
  }
}
const bounds = (id: number) => renderer.getElementBounds(id)!

console.log('texts:', JSON.stringify([...byId.entries()].filter(([, v]) => v.type === 'text').map(([id, v]) => ({ id, t: v.text }))))

// digit = text node with content "3"
let digit = -1
for (const [id, v] of byId) if (v.type === 'text' && v.text === '3') digit = id
if (digit < 0) {
  console.log('no exact "3" text found')
  process.exit(0)
}
function parentOf(id: number) {
  let cur = id
  for (let i = 0; i < 8; i++) {
    let p = -1
    for (const [pid, v] of byId) if (v.children.includes(cur)) { p = pid; break }
    if (p < 0) return -1
    if (byId.get(p)!.type === 'div') return p
    cur = p
  }
  return -1
}

const d = bounds(digit)
const pill = parentOf(digit)
const p = bounds(pill)
const dcy = d[1] + d[3] / 2
const pcy = p[1] + p[3] / 2
const dcx = d[0] + d[2] / 2
const pcx = p[0] + p[2] / 2
console.log(`digit ${JSON.stringify(d)}  pill ${JSON.stringify(p)}`)
console.log(`ΔcenterY = ${(dcy - pcy).toFixed(2)}px   ΔcenterX = ${(dcx - pcx).toFixed(2)}px`)
