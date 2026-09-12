/**
 * GalleryTree — one tree of library components grouped by category.
 * Mounted by:
 *   - src/gallery.tsx  (interactive GPUIX window: bun run gallery)
 *   - scripts/verify-gallery.tsx (headless screenshot: bun scripts/verify-gallery.tsx)
 */
import type { ReactNode } from 'react'
import { surface, border, text as t } from '@atlas/ui/tokens'
import {
  Row, Col, Spacer, Card, Button, Badge, IconLabel, Kbd,
  Switch, Checkbox, Slider, ProgressBar, SegmentedControl, RadioGroup, StarRating, SearchInput, TagInput,
  Accordion, Breadcrumb, Divider,
  Alert, StatusDot, EmptyState, HintBar, Tooltip, StatCard, SparklineStat, TrendBadge,
  LineChart, DonutChart, BarChart, Gauge, ChatBubble, ThinkingIndicator, TokenMeter, ContextRing, AgentRunCard,
  SettingRow, UploadProgress, ZoomControls, WordCountBar, VersionFooter, FindBar, ActionChips,
} from '@atlas/ui'
import { FONT } from '@atlas/ui/tokens'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <text style={{ fontSize: 11, fontWeight: 700, color: t.ghost, fontFamily: FONT }}>{title}</text>
      <Card padding={14}>{children}</Card>
    </div>
  )
}

export function GalleryTree() {
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 18, backgroundColor: surface.base, width: '100%', minHeight: 1600 }}>
      <text style={{ fontSize: 20, fontWeight: 700, color: t.primary, fontFamily: FONT }}>@atlas/ui — component gallery</text>

      <Section title="Actions & labels">
        <Row gap={10} flexWrap>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button size="sm">Small</Button>
          <Badge variant="mention" count={3} />
          <Badge variant="label" label="Beta" color="#3B82F6" />
          <IconLabel icon="archive" label="Archive" />
          <Kbd keys="Ctrl+K" />
        </Row>
      </Section>

      <Section title="Inputs & controls">
        <Row gap={18} flexWrap>
          <Switch defaultChecked label="Sync" />
          <Checkbox defaultChecked label="Star" />
          <Checkbox label="Unchecked" />
          <div style={{ width: 180 }}><SegmentedControl options={[{ label: 'Inbox', value: 'i' }, { label: 'Done', value: 'd' }]} defaultValue="i" /></div>
          <RadioGroup options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} defaultValue="a" />
          <StarRating value={3} />
        </Row>
        <Col gap={14} style={{ paddingTop: 12 }}>
          <div style={{ width: 260 }}><Slider defaultValue={40} label="Scale" /></div>
          <div style={{ width: 260 }}><Slider defaultValue={70} color="#22C55E" /></div>
          <div style={{ width: 320 }}><SearchInput value="" placeholder="Search threads…" /></div>
          <div style={{ width: 320 }}><TagInput value={['react', 'gpu']} placeholder="Add tag" /></div>
        </Col>
      </Section>

      <Section title="Feedback & status">
        <Row gap={12} flexWrap>
          <Alert variant="info" title="Info" description="A neutral note." />
          <Alert variant="success" title="Saved" />
          <Alert variant="warning" title="Heads up" />
          <Alert variant="error" title="Failed" />
          <StatusDot status="online" label="Online" />
          <StatusDot status="busy" label="Busy" />
          <div style={{ width: 200 }}><ProgressBar value={62} showValue height={8} /></div>
          <Tooltip label="Archive" shortcut="E" defaultOpen><Button size="sm">Hover me</Button></Tooltip>
        </Row>
        <Row gap={10} style={{ paddingTop: 12 }} align="flex-start">
          <EmptyState icon="inbox" title="All caught up" description="No unread items." />
          <HintBar hints={[{ keys: 'Ctrl+K', label: 'Open' }, { keys: 'Esc', label: 'Close' }]} />
        </Row>
      </Section>

      <Section title="Data & charts">
        <Row gap={16} align="flex-start">
          <StatCard label="Revenue" value="$12,400" delta={8.2} />
          <SparklineStat label="Requests" value="2.1k" data={[3, 7, 5, 9, 6, 12]} />
          <TrendBadge value={-18} inverse />
          <TrendBadge value={12} />
        </Row>
        <Row gap={14} align="flex-start" style={{ paddingTop: 12 }}>
          <LineChart data={[4, 12, 7, 18, 9, 21]} width={240} height={100} fillArea />
          <BarChart data={[{ label: 'A', value: 30 }, { label: 'B', value: 55 }, { label: 'C', value: 20 }]} width={220} height={100} />
          <DonutChart segments={[{ value: 60, color: '#3B82F6' }, { value: 25, color: '#8B5CF6' }, { value: 15, color: '#22C55E' }]} size={96} thickness={14} />
          <Gauge value={72} size={96} />
        </Row>
      </Section>

      <Section title="Navigation & structure">
        <Row gap={12} align="flex-start">
          <Accordion items={[{ id: 'a', title: 'Why GPU?', content: 'Native rendering, no DOM.' }, { id: 'b', title: 'Hotkeys', content: 'Press Ctrl+K.' }]} />
          <Breadcrumb items={[{ label: 'Workspace' }, { label: 'Threads' }, { label: 'Draft' }]} />
          <Divider orientation="vertical" />
        </Row>
      </Section>

      <Section title="AI & agent surfaces">
        <Row gap={12} align="flex-start">
          <ChatBubble role="assistant" content="Here is a **short** answer with details." />
          <Col gap={8}><ThinkingIndicator label="Thinking" /><TokenMeter used={1200} limit={8000} /></Col>
          <ContextRing used={18200} limit={20000} size={64} />
        </Row>
        <Row gap={10} style={{ paddingTop: 8 }}>
          <AgentRunCard title="Drafting reply" steps={[{ id: '1', label: 'Searching', status: 'done' }, { id: '2', label: 'Drafting', status: 'running' }]} progress={64} status="running" />
        </Row>
      </Section>

      <Section title="Desktop & chrome">
        <Col gap={10}>
          <SettingRow label="Notifications" description="Send digests" control={<Switch defaultChecked />} />
          <UploadProgress name="report.pdf" progress={72} size="2.4 MB" />
          <Row gap={12}>
            <ZoomControls zoom={1.2} />
            <WordCountBar lines={12} words={310} characters={1980} />
            <VersionFooter appName="Atlas" version="0.1.0" env="beta" />
          </Row>
          <div style={{ width: 420 }}><FindBar query="hello" index={1} total={4} /></div>
          <div style={{ width: 320 }}><ActionChips actions={[{ id: 'e', label: 'Explain' }, { id: 's', label: 'Summarize' }]} /></div>
        </Col>
      </Section>
      <Spacer size={40} />
    </div>
  )
}
