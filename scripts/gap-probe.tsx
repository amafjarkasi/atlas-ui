/**
 * gap-probe v2 — each candidate rendered ALONE as a direct child of a full-width
 * column (align-items: stretch). Anything that becomes a wide bar is the offender.
 * Run:  bun scripts/gap-probe.tsx
 */
import { createTestRoot } from '@gpuix/react/testing'
import { surface, text, FONT } from '@atlas/ui/tokens'
import { Badge, Kbd, StatusDot, IconLabel, TrendBadge, ActionChips, ContextRing, Switch, SegmentedControl, Button, Spinner } from '@atlas/ui'

const CASES: [string, React.ReactNode][] = [
  ['Badge mention', <Badge variant="mention" count={3} />],
  ['Badge label', <Badge variant="label" label="Beta" color="#3B82F6" />],
  ['Kbd', <Kbd keys="Ctrl+K" />],
  ['StatusDot', <StatusDot status="online" label="Online" />],
  ['IconLabel', <IconLabel icon="archive" label="Archive" />],
  ['TrendBadge', <TrendBadge value={12} />],
  ['ActionChips', <ActionChips actions={[{ id: 'e', label: 'Explain' }]} />],
  ['ContextRing', <ContextRing used={5000} limit={20000} />],
  ['Switch', <Switch defaultChecked label="Sync" />],
  ['SegmentedControl', <SegmentedControl options={[{ label: 'Inbox', value: 'i' }, { label: 'Done', value: 'd' }]} defaultValue="i" />],
  ['Button', <Button>Primary</Button>],
  ['Spinner', <Spinner size={14} />],
]

const { render, renderer } = createTestRoot({ width: 1200, height: 1000 })
render(
  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, backgroundColor: surface.base, width: '100%' }}>
    {CASES.map(([label, node]) => (
      <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, borderBottomWidth: 1, borderColor: '#242428', paddingBottom: 10 }}>
        <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{label}</text>
        {node}
      </div>
    ))}
  </div>,
)
renderer.flush()
renderer.captureScreenshot('screenshots/focus/gap-probe.png')
console.log('gap-probe v2 saved')
process.exit(0)
