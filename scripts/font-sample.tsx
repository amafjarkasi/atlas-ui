/**
 * font-sample — renders the percent in several font families at a large size so
 * the correct one (digits and % on the same baseline) can be picked.
 * Run:  bun scripts/font-sample.tsx  → screenshots/font-sample.png
 */
import { createTestRoot } from '@gpuix/react/testing'
import { surface, text, FONT } from '@atlas/ui/tokens'

const CANDIDATES: [string, string][] = [
  ['current (Segoe UI)', FONT],
  ['Segoe UI Variable Text', '"Segoe UI Variable Text", sans-serif'],
  ['Segoe UI Variable', '"Segoe UI Variable", sans-serif'],
  ['Arial', 'Arial, sans-serif'],
  ['Calibri', 'Calibri, sans-serif'],
  ['Verdana', 'Verdana, sans-serif'],
  ['Tahoma', 'Tahoma, sans-serif'],
  ['Georgia', 'Georgia, serif'],
  ['Cascadia Mono', 'Cascadia Mono, monospace'],
  ['Consolas', 'Consolas, monospace'],
]

const { render, renderer } = createTestRoot({ width: 900, height: 900 })
render(
  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, backgroundColor: surface.base }}>
    {CANDIDATES.map(([label, family]) => (
      <div key={label} style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <text style={{ fontSize: 12, color: text.muted, width: 220, fontFamily: FONT }}>{label}</text>
        <text style={{ fontSize: 26, color: '#22C55E', fontFamily: family, whiteSpace: 'nowrap' }}>8.2% 62% 120ms</text>
      </div>
    ))}
  </div>,
)
renderer.flush()
renderer.captureScreenshot('screenshots/font-sample.png')
console.log('font sample saved')
