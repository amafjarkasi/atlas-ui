import { createTestRoot } from '@gpuix/react/testing'
import * as Desktop from '@atlas/ui/desktop'
import { mkdirSync, existsSync } from 'node:fs'

const outDir = 'screenshots/desktop-components'
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true })
}

const noop = () => {}

const sampleProps: Record<string, any> = {
  AboutDialog: {
    open: true,
    onOpenChange: noop,
    appName: 'Lucid Hubble',
    version: '2.4.1',
    description: 'GPU-accelerated UI toolkit for high-performance desktop apps.',
    license: 'MIT License',
  },
  AutoSavePill: { state: 'saved' },
  ConnectBar: { state: 'offline', onRetry: noop },
  CrashDialog: {
    open: true,
    onOpenChange: noop,
    error: 'TypeError: Cannot read property render of undefined\n  at GPURenderer.flush (renderer.ts:142)\n  at AnimationFrame.tick (loop.ts:87)',
    onRestart: noop,
    onReport: noop,
  },
  DownloadCard: {
    name: 'lucid-hubble-2.4.1-win64.exe',
    state: 'downloading',
    progress: 62,
    size: '148 MB',
    onCancel: noop,
  },
  EmojiPicker: { onPick: noop },
  FavoritesBar: {
    items: [
      { id: 'f1', label: 'Dashboard', icon: 'grid' },
      { id: 'f2', label: 'Components', icon: 'puzzle' },
      { id: 'f3', label: 'Settings', icon: 'settings' },
      { id: 'f4', label: 'Documentation', icon: 'file' },
      { id: 'f5', label: 'Releases', icon: 'tag' },
    ],
    onSelect: noop,
  },
  FindBar: {
    query: 'borderRadius',
    onQueryChange: noop,
    index: 2,
    total: 7,
    onNext: noop,
    onPrev: noop,
    onClose: noop,
  },
  FontPicker: {
    value: { family: 'JetBrains Mono', size: 13, weight: 400 },
    onChange: noop,
    preview: 'The quick brown fox jumps over the lazy dog',
  },
  GroupedSidebarNav: {
    groups: [
      { id: 'g1', label: 'Workspace', items: [
        { id: 'overview', label: 'Overview', icon: 'grid' },
        { id: 'components', label: 'Components', icon: 'puzzle', count: 58 },
        { id: 'tokens', label: 'Design Tokens', icon: 'sparkle' },
      ]},
      { id: 'g2', label: 'Settings', items: [
        { id: 'shortcuts', label: 'Shortcuts', icon: 'keyboard' },
        { id: 'theme', label: 'Appearance', icon: 'sun' },
        { id: 'about', label: 'About', icon: 'info' },
      ]},
    ],
    activeId: 'components',
    onSelect: noop,
  },
  LicensesDialog: {
    open: true,
    onOpenChange: noop,
    entries: [
      { name: 'react', license: 'MIT', text: 'Copyright (c) Meta Platforms, Inc.\nPermission is hereby granted, free of charge...' },
      { name: '@gpuix/react', license: 'Apache-2.0', text: 'Licensed under the Apache License, Version 2.0...' },
      { name: 'bun', license: 'MIT', text: 'Copyright (c) 2023 Oven Inc. All rights reserved.' },
    ],
  },
  PermissionGate: {
    granted: false,
    title: 'Microphone access required',
    description: 'Lucid Hubble needs microphone access to enable voice recording and real-time transcription.',
    onGrant: noop,
    onDeny: noop,
    children: null,
  },
  PreviewPane: {
    name: 'hero-banner.png',
    size: '2.4 MB',
    mime: 'image/png',
    width: 320,
    height: 200,
    onOpen: noop,
  },
  PropertyGrid: {
    items: [
      { key: 'name', label: 'Component Name', value: 'ChatBubble' },
      { key: 'category', label: 'Category', value: 'AI' },
      { key: 'version', label: 'Version', value: '2.4.1' },
      { key: 'description', label: 'Description', value: 'A GPU-rendered chat bubble with avatar support.', multiline: true },
    ],
    onValueChange: noop,
  },
  RecentFilesList: {
    files: [
      { id: 'r1', name: 'ChatBubble.tsx', path: 'packages/ui/src/ai/ChatBubble.tsx', lastOpened: Date.now() - 1000 * 60 * 3 },
      { id: 'r2', name: 'ModelJourney.tsx', path: 'packages/ui/src/ai/ModelJourney.tsx', lastOpened: Date.now() - 1000 * 60 * 14 },
      { id: 'r3', name: 'TranscriptSync.tsx', path: 'packages/ui/src/ai/TranscriptSync.tsx', lastOpened: Date.now() - 1000 * 60 * 60 * 2 },
      { id: 'r4', name: 'GroupedSidebarNav.tsx', path: 'packages/ui/src/desktop/GroupedSidebarNav.tsx', lastOpened: Date.now() - 1000 * 60 * 60 * 24 },
    ],
  },
  ReleaseNotesDialog: {
    open: true,
    onOpenChange: noop,
    version: '2.4.1',
    markdown: '### Desktop Components\n- Added GroupedSidebarNav with collapsible groups\n- New FontPicker with live preview\n- EmojiPicker with search\n\n### Bug Fixes\n- Fixed avatar alignment in ChatBubble',
  },
  ShortcutSettingsList: {
    rows: [
      { id: 's1', label: 'Save', combo: 'Cmd+S' },
      { id: 's2', label: 'Find', combo: 'Cmd+F' },
      { id: 's3', label: 'Command Palette', combo: 'Cmd+Shift+P' },
      { id: 's4', label: 'Toggle Sidebar', combo: 'Cmd+B' },
    ],
    onComboChange: noop,
  },
  ThemeSwitcher: { value: '#3B82F6', onChange: noop },
  ToolboxRail: {
    tools: [
      { id: 'select', icon: 'grid', label: 'Select' },
      { id: 'move', icon: 'arrowRight', label: 'Move' },
      { id: 'draw', icon: 'compose', label: 'Draw' },
      { id: 'text', icon: 'hash', label: 'Text' },
      { id: 'zoom', icon: 'maximize', label: 'Zoom' },
    ],
    activeId: 'select',
    onSelect: noop,
    vertical: true,
  },
  UnsavedChangesDialog: {
    open: true,
    onOpenChange: noop,
    label: 'ChatBubble.tsx has unsaved changes. Do you want to save before closing?',
    onSave: noop,
    onDiscard: noop,
  },
  VersionFooter: { appName: 'Lucid Hubble', version: 'v2.4.1', env: 'beta' },
  WordCountBar: { lines: 247, words: 1832, characters: 9410 },
  ZoomControls: { zoom: 1.25, onZoomChange: noop },
}

const FILL_PARENT = new Set([
  'AboutDialog',
  'CrashDialog',
  'LicensesDialog',
  'ReleaseNotesDialog',
  'UnsavedChangesDialog',
  'ConnectBar',
  'FavoritesBar',
])

const componentNames = Object.keys(Desktop).filter(
  (k) => !k.endsWith('Props') && typeof (Desktop as any)[k] === 'function'
)
console.log(`Rendering and capturing screenshots for all ${componentNames.length} Desktop components...`)

let passCount = 0
let failCount = 0

for (const name of componentNames) {
  const Comp = (Desktop as any)[name]
  const props = sampleProps[name] || {}
  const fill = FILL_PARENT.has(name)
  const { render: testRender, renderer: testRenderer } = createTestRoot({ width: 900, height: 600 })
  try {
    testRender(
      <div style={{ backgroundColor: '#0e0f12', padding: 24, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ paddingBottom: 12, borderBottomWidth: 1, borderColor: '#27272a', marginBottom: 16, flexShrink: 0 }}>
          <text style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>Desktop Component: {name}</text>
        </div>
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: fill ? 'stretch' : 'flex-start',
          }}
        >
          <Comp {...props} />
        </div>
      </div>
    )
    testRenderer.flush()
    const shotPath = `${outDir}/${name}.png`
    testRenderer.captureScreenshot(shotPath)
    passCount++
    console.log(`[CAPTURED] ${name} -> ${shotPath}`)
  } catch (err: any) {
    failCount++
    console.error(`[FAILED]   ${name}: ${err?.message || err}`)
  }
}

console.log(`\nCompleted screenshot capture: ${passCount} captured, ${failCount} failed.`)
process.exit(failCount > 0 ? 1 : 0)
