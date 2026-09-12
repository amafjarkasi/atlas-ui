/**
 * badge-zoom — renders the count badge large (tiny root window) so digit
 * centering is easy to judge. Run: bun scripts/badge-zoom.tsx
 */
import { createTestRoot } from '@gpuix/react/testing'
import { surface } from '@atlas/ui/tokens'
import { Badge } from '@atlas/ui'

const { render, renderer } = createTestRoot({ width: 120, height: 120 })
render(
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 120, height: 120, backgroundColor: surface.base }}>
    <Badge variant="mention" count={3} />
  </div>,
)
renderer.flush()
renderer.captureScreenshot('screenshots/focus/badge-zoom.png')
console.log('badge-zoom saved')
