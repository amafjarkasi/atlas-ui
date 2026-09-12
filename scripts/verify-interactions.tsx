/**
 * Interaction pipeline smoke — click, drag, keyboard, and dialog escape,
 * each on its own clean mount (an open overlay would intercept earlier probes).
 * Run:  bun scripts/verify-interactions.tsx
 */
import { useState } from 'react'
import { createTestRoot } from '@gpuix/react/testing'
import { Dialog, DialogOverlay, DialogContent } from '@atlas/ui'
import { usePointerDrag } from '@atlas/ui'

const { render, renderer } = createTestRoot({ width: 900, height: 700 })
let failed = false
function check(pred: boolean, label: string) {
  if (!pred) { failed = true; console.error(`FAIL: ${label}`) } else console.log(`ok:   ${label}`)
}
const text = () => renderer.getPaintedText().join('')
const center = (id: number) => {
  const b = renderer.getElementBounds(id)!
  return [b[0] + b[2] / 2, b[1] + b[3] / 2] as const
}

function ClickProbe() {
  const [c, setC] = useState(0)
  return (
    <div testId="probe-click" onClick={() => setC((n) => n + 1)} style={{ padding: 20 }}>
      <text>clicks:{c}</text>
    </div>
  )
}
function DragProbe() {
  const [dx, setDx] = useState(0)
  const drag = usePointerDrag({ onDrag: (x) => setDx(x) })
  return (
    <div testId="probe-drag" {...drag.props} style={{ padding: 20 }}>
      <text>dx:{dx}</text>
    </div>
  )
}
function KeyboardProbe() {
  const [n, setN] = useState(0)
  return (
    <div
      testId="probe-kbd"
      tabIndex={0}
      autoFocus
      onKeyDown={(e) => {
        const k = (e.key ?? '').toLowerCase()
        if (k === 'arrowright' || k === 'right') setN((x) => x + 1)
      }}
      style={{ padding: 20 }}
    >
      <text>steps:{n}</text>
    </div>
  )
}

// Phase 1: input probes (no overlay on screen)
render(
  <div style={{ display: 'flex', flexDirection: 'column', gap: 30, paddingTop: 20, paddingLeft: 20 }}>
    <ClickProbe />
    <DragProbe />
    <KeyboardProbe />
  </div>,
)
renderer.flush()

// Keyboard FIRST (nothing has stolen focus yet)
renderer.simulateKeystrokes('arrowright')
renderer.flush()
renderer.simulateKeystrokes('right')
renderer.flush()
check(text().includes('steps:1') || text().includes('steps:2'), 'arrow key handled on autofocused probe')

const clickEl = renderer.findByTestId('probe-click')!
const cc = center(clickEl.id)
renderer.nativeSimulateMouseDown(cc[0], cc[1])
renderer.nativeSimulateMouseUp(cc[0], cc[1])
renderer.flush()
check(text().includes('clicks:1'), 'click handler fired')

const dragEl = renderer.findByTestId('probe-drag')!
const dc = center(dragEl.id)
renderer.nativeSimulateMouseMove(dc[0], dc[1]) // hover first
renderer.flush()
renderer.nativeSimulateMouseDown(dc[0], dc[1])
renderer.nativeSimulateMouseMove(dc[0] + 30, dc[1], 0)
renderer.nativeSimulateMouseUp(dc[0] + 30, dc[1], 0)
renderer.flush()
check(text().includes('dx:30'), 'pointer drag delta applied')

// Phase 2: dialog open → paint → escape closes
function DialogProbe() {
  const [open, setOpen] = useState(true)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay>
        <DialogContent width={300}>
          <text>OPEN-CONTENT</text>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
render(<DialogProbe />)
renderer.flush()
check(text().includes('OPEN-CONTENT'), 'dialog content painted')
renderer.simulateKeystrokes('escape')
renderer.flush()
check(!text().includes('OPEN-CONTENT'), 'escape closed the dialog')

renderer.captureScreenshot('screenshots/interactions.png')
console.log(failed ? 'INTERACTIONS FAILED' : 'INTERACTIONS PASSED')
process.exit(failed ? 1 : 0)
