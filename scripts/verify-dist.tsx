/**
 * verify-dist — mounts components imported from the BUILT dist output
 * (packages/ui/dist/index.js), proving the shipped artifact — not just the
 * source — typechecks-less, renders, and paints.
 * Run after: bun run build:ui
 */
import { createTestRoot } from '@gpuix/react/testing'
import { Row, Button, Badge, Tooltip, ChatBubble, ThemeProvider } from '../packages/ui/dist/index.js'

const { render, renderer } = createTestRoot({ width: 900, height: 500 })
let failed = false
function check(pred: boolean, label: string) {
  if (!pred) { failed = true; console.error(`FAIL: ${label}`) } else console.log(`ok:   ${label}`)
}

render(
  <ThemeProvider accent="#22C55E">
    <div style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row gap={10}>
        <Button onClick={() => {}}>Hello dist</Button>
        <Badge variant="mention" count={7} />
        <Tooltip label="Shipped tooltip" shortcut="D" defaultOpen>
          <Button>Trigger</Button>
        </Tooltip>
      </Row>
      <ChatBubble role="assistant" content="I came from **dist**." />
    </div>
  </ThemeProvider>,
)
renderer.flush()
const painted = renderer.getPaintedText().join('')
check(painted.includes('Hello dist'), 'dist Button painted')
check(painted.includes('Shipped tooltip'), 'dist Tooltip content painted')
check(painted.includes('came from'), 'dist ChatBubble markdown painted')
renderer.captureScreenshot('screenshots/dist.png')
console.log(failed ? 'DIST FAILED' : 'DIST PASSED')
process.exit(failed ? 1 : 0)
