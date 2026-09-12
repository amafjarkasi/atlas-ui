/**
 * Runtime smoke test for the reviewed components, mounted through the public
 * `@atlas/ui` entry (same import shape as a real consumer app):
 *  - styled `Tooltip` wrapper (does the gpuix floating layer + styled content paint?)
 *  - `FocusScope` (mounts, input focusable, no crash)
 *  - `PasswordField` masking, `TypeaheadInput`, `ShortcutRecorder` (no-crash)
 *
 * Run:  bun scripts/verify-tooltip.tsx
 */
import { createTestRoot } from '@gpuix/react/testing'
import { Tooltip, FocusScope, PasswordField, TypeaheadInput, ShortcutRecorder, Button } from '@atlas/ui'

const { render, renderer } = createTestRoot({ width: 900, height: 700 })
let failed = false
function check(pred: boolean, label: string) {
  if (!pred) {
    failed = true
    console.error(`FAIL: ${label}`)
  } else {
    console.log(`ok:   ${label}`)
  }
}

render(
  <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
    <Tooltip label="Archive" shortcut="E" defaultOpen>
      <Button testId="tt-default" onClick={() => {}}>
        Default-open target
      </Button>
    </Tooltip>

    <Tooltip label="Copy" shortcut="Ctrl+C">
      <Button testId="tt-hover" onClick={() => {}}>
        Hover-open target
      </Button>
    </Tooltip>

    <FocusScope active>
      <input testId="scope-input" placeholder="inside scope" style={{ width: 200 }} />
    </FocusScope>

    <PasswordField label="Password" value="secret" />
    <TypeaheadInput options={[{ id: 'a', label: 'Apple' }]} value="A" placeholder="Search" />
    <ShortcutRecorder label="Shortcut" />
  </div>,
)
renderer.flush()

const painted = renderer.getPaintedText()
const retained = renderer.getAllText()

check(painted.some((t) => t.includes('Archive')), 'tooltip content "Archive" painted (defaultOpen)')
check(retained.some((t) => t.includes('Default-open target')), 'tooltip trigger rendered')
check(retained.some((t) => t.includes('••••••')), 'password masked as 6 bullets')
check(renderer.findByTestId('scope-input') !== undefined, 'FocusScope child input mounted')
check(retained.some((t) => t.includes('Apple')), 'TypeaheadInput options rendered')
check(retained.some((t) => t.includes('Click to record')), 'ShortcutRecorder mounted')

renderer.captureScreenshot('screenshots/smoke-tooltip.png')
console.log(failed ? 'SMOKE TEST FAILED' : 'SMOKE TEST PASSED')
process.exit(failed ? 1 : 0)
