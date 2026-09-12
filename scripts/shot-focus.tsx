/**
 * shot-focus — renders each reviewed component LARGE and isolated so visual
 * issues are easy to see (screenshots/focus/*.png).
 * Run:  bun scripts/shot-focus.tsx
 */
import type { ReactNode } from 'react'
import { createTestRoot } from '@gpuix/react/testing'
import { surface } from '@atlas/ui/tokens'
import { Badge, Checkbox, TagInput, Alert, ProgressBar, StatCard, TrendBadge, RadioGroup, Slider, SparklineStat, ZoomControls } from '@atlas/ui'

const { render, renderer } = createTestRoot({ width: 760, height: 320 })

function shot(key: string, label: string, node: ReactNode) {
  render(
    <div style={{ width: '100%', height: '100%', backgroundColor: surface.base, padding: 60, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <text style={{ fontSize: 13, color: '#8A8A90' }}>{label}</text>
      {node}
    </div>,
  )
  renderer.flush()
  renderer.captureScreenshot(`screenshots/focus/${key}.png`)
  console.log(`shot ${key}.png`)
}

// Full-width containers so inner alignment is visible
const W = (n: ReactNode) => <div style={{ width: 560 }}>{n}</div>

shot('badge', 'Badge mention count', <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}><Badge variant="mention" count={3} /><div /></div>)
shot('checkbox', 'Checkbox (checked × 3 sizes)', <div style={{ display: 'flex', gap: 30 }}><Checkbox defaultChecked /><Checkbox defaultChecked size={20} /><Checkbox defaultChecked size={24} /></div>)
shot('tags', 'TagInput chips', W(<TagInput value={['react', 'gpu', 'component library']} />))
shot('alerts', 'Alert icons & text', <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 560 }}><Alert variant="info" title="Info" description="A neutral note with enough text to wrap." /><Alert variant="success" title="Saved" /><Alert variant="warning" title="Heads up" description="2GB left" /></div>)
shot('progress', 'ProgressBar %', W(<ProgressBar value={62} showValue height={10} />))
shot('stat', 'StatCard delta', <div style={{ width: 240 }}><StatCard label="Revenue" value="$12,400" delta={8.2} /><div style={{ height: 16 }} /><StatCard label="Spend" value="$3.1k" delta={-18} /></div>)
shot('trend', 'TrendBadges', <div style={{ display: 'flex', gap: 12 }}><TrendBadge value={12} /><TrendBadge value={-18} inverse /><TrendBadge value={-4} /></div>)
shot('sparkline', 'SparklineStat delta', <div style={{ width: 260 }}><SparklineStat label="Weekly volume" value={128} delta={12} data={[4, 9, 7, 14, 11, 18]} /></div>)
shot('zoom', 'ZoomControls %', <div style={{ width: 200 }}><ZoomControls zoom={1.2} /></div>)
shot('controls', 'Slider + segmented', <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 460 }}><Slider defaultValue={40} /><SegC /></div>)

function SegC() {
  return <div style={{ width: 260 }}><RadioGroup options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} defaultValue="a" /></div>
}
