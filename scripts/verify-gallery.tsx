/**
 * Gallery screenshot — mounts the shared grouped gallery tree (same tree as the
 * interactive `bun run gallery` window) on the real test renderer and captures
 * a screenshot for visual review.
 * Run:  bun scripts/verify-gallery.tsx
 */
import { createTestRoot } from '@gpuix/react/testing'
import { GalleryTree } from '../src/gallery-tree'

const { render, renderer } = createTestRoot({ width: 1280, height: 1100 })
let failed = false
function check(pred: boolean, label: string) {
  if (!pred) { failed = true; console.error(`FAIL: ${label}`) } else console.log(`ok:   ${label}`)
}

render(<GalleryTree />)
renderer.flush()

const painted = renderer.getPaintedText().join('')
check(painted.includes('component gallery'), 'gallery header painted')
check(painted.includes('Drafting reply'), 'AgentRunCard painted')
check(painted.includes('Archive'), 'styled Tooltip content painted')
check(painted.includes('Revenue'), 'StatCard painted')
check(painted.includes('Notifications'), 'SettingRow painted')

renderer.captureScreenshot('screenshots/gallery.png')
console.log(failed ? 'GALLERY FAILED' : 'GALLERY PASSED')
process.exit(failed ? 1 : 0)
