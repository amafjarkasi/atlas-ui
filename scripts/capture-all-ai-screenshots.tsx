import { createTestRoot } from '@gpuix/react/testing'
import * as AI from '@atlas/ui/ai'
import { mkdirSync, existsSync } from 'node:fs'

const outDir = 'screenshots/ai-components'
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true })
}

const sampleProps: Record<string, any> = {
  AgentFlowGraph: {
    nodes: [
      { id: '1', title: 'Input Parser', kind: 'router', state: 'completed' },
      { id: '2', title: 'RAG Retriever', kind: 'tool', state: 'completed' },
      { id: '3', title: 'Synthesize & Code', kind: 'llm', state: 'active' },
      { id: '4', title: 'Verify & Test', kind: 'tool', state: 'idle' }
    ]
  },
  AgentMonitor: {
    agents: [
      {
        id: 'a1',
        title: 'AST Parser',
        status: 'done',
        progress: 100,
        durationMs: 340,
        steps: [
          { id: 's1', label: 'Parse AST tree', status: 'done' },
          { id: 's2', label: 'Index symbols', status: 'done' }
        ]
      },
      {
        id: 'a2',
        title: 'Refactor Agent',
        status: 'running',
        progress: 68,
        durationMs: 1420,
        steps: [
          { id: 's1', label: 'Compute diffs', status: 'done' },
          { id: 's2', label: 'Apply transformations', status: 'running' }
        ]
      },
      {
        id: 'a3',
        title: 'Unit Tester',
        status: 'idle',
        progress: 0,
        durationMs: 0,
        steps: [
          { id: 's1', label: 'Run test suite', status: 'pending' }
        ]
      }
    ],
    inputTokens: 14200,
    outputTokens: 3890,
    cost: 0.054
  },
  AgentRunCard: {
    title: 'Code Refactor Agent',
    status: 'running',
    progress: 72,
    steps: [
      { id: 's1', label: 'Index symbols', status: 'done' },
      { id: 's2', label: 'Transform AST', status: 'running' },
      { id: 's3', label: 'Verify build', status: 'pending' }
    ]
  },
  AgentRunSteps: {
    steps: [
      { id: 's1', label: '1. Ingest Prompt', status: 'done' },
      { id: 's2', label: '2. Query Vector DB', status: 'done' },
      { id: 's3', label: '3. Generate Patch', status: 'running' },
      { id: 's4', label: '4. Run Diagnostics', status: 'pending' }
    ]
  },
  AgentTrajectory: {
    totalMs: 3500,
    steps: [
      { id: 't1', label: '1. User Request', state: 'done', ms: 150 },
      { id: 't2', label: '2. Search Documentation', state: 'done', ms: 890 },
      { id: 't3', label: '3. Synthesize Fix', state: 'active', ms: 1450 },
      { id: 't4', label: '4. Apply Changes', state: 'pending', ms: 0 }
    ]
  },
  AssistWorkspace: {
    messages: [
      { id: 'm1', role: 'user', content: 'Can we optimize the GPU memory pipeline?' },
      { id: 'm2', role: 'assistant', content: 'Yes, using retained scene-graphs and batching allocations.' }
    ],
    onSend: () => {},
    chunks: [
      { id: 'c1', title: 'gpu_pipeline.rs', tokens: 520, snippet: 'DirectX 12 command queue allocator...' },
      { id: 'c2', title: 'reconciler.ts', tokens: 340, snippet: 'Lightweight fiber pass...' }
    ],
    used: 48500,
    limit: 128000
  },
  BranchExplorer: {
    branches: [
      {
        id: 'b1',
        label: 'Approach 1: Virtual Anchors',
        status: 'accepted',
        children: [
          { id: 'b1-1', label: 'Relative Viewport Math', status: 'accepted' },
          { id: 'b1-2', label: 'Window Absolute Bounds', status: 'untried' }
        ]
      },
      {
        id: 'b2',
        label: 'Approach 2: DOM emulation',
        status: 'rejected'
      }
    ]
  },
  ChatBubble: {
    role: 'assistant',
    name: 'Atlas Assistant',
    content: '### Performance Verified\n\n- Zero DOM layout reflows\n- 120 FPS frame target maintained\n- All textures resident in VRAM'
  },
  ChatSearchBar: {
    value: 'vector index',
    onChange: () => {}
  },
  ChatThread: {
    title: 'Copilot Chat Session',
    messages: [
      { id: 'm1', role: 'user', content: 'How does Atlas UI handle context menus?' },
      { id: 'm2', role: 'assistant', content: 'Atlas UI uses virtual anchors and pointer events without calling `getBoundingClientRect`.' }
    ],
    onSend: () => {}
  },
  ConfigDiffReview: {
    original: 'temperature: 0.7\ntop_p: 0.95\nmax_tokens: 2048\nstream: false',
    modified: 'temperature: 0.2\ntop_p: 0.85\nmax_tokens: 4096\nstream: true'
  },
  ContextBrowser: {
    chunks: [
      { id: 'c1', title: 'TaffyLayout.rs', tokens: 1240, snippet: 'Rust layout calculations for flexbox items' },
      { id: 'c2', title: 'DirectXDevice.cpp', tokens: 3400, snippet: 'Direct3D 12 root signature configuration' }
    ]
  },
  ContextRing: {
    used: 76500,
    limit: 128000,
    label: 'Context'
  },
  DocumentQAPanel: {
    chunks: [
      { id: 'd1', title: 'Architecture.md', content: 'Details on Zed GPUI retained rendering pipeline.' },
      { id: 'd2', title: 'Benchmarks.md', content: 'Comparative 120 FPS latency figures vs webviews.' }
    ],
    question: 'How fast is layout?',
    onQuestionChange: () => {},
    onAsk: () => {}
  },
  GeneratedCodeCard: {
    code: 'export function useGPUAccelerator() {\n  return useMemo(() => new NativeBuffer(), [])\n}',
    language: 'typescript',
    status: 'success'
  },
  HelpCopilot: {
    chunks: [
      { id: 'h1', title: 'Tabs Guide', content: 'Keyboard roving focus navigation with arrows.' }
    ],
    question: 'How do tabs handle focus?',
    answers: [
      { id: 'ans1', content: 'Tabs use `useRovingFocus` with arrow keys and `tabIndex={0}` on the active tab.' }
    ]
  },
  InlineCitations: {
    text: 'Atlas UI renders through DirectX 12 on Windows [1] and Metal on macOS [2].',
    sources: [
      { title: 'DirectX 12 Backend', url: 'https://learn.microsoft.com', snippet: 'Low-level hardware graphics pipeline' },
      { title: 'Apple Metal', url: 'https://developer.apple.com', snippet: 'Hardware-accelerated 3D graphics on macOS' }
    ]
  },
  InlineCodeChip: {
    code: 'useRovingFocus()'
  },
  InterruptibleComposer: {
    isGenerating: true,
    onStop: () => {},
    onSend: () => {}
  },
  LatencyLog: {
    entries: [
      { id: 'l1', phase: 'Time to First Token', ms: 112 },
      { id: 'l2', phase: 'Context Ingestion', ms: 45 },
      { id: 'l3', phase: 'Full Response Generation', ms: 680 }
    ]
  },
  LiveAgentGrid: {
    agents: [
      {
        id: 'g1',
        title: 'AST Parser',
        status: 'done',
        progress: 100,
        durationMs: 240,
        steps: [
          { id: 's1', label: 'Index symbols', status: 'done' }
        ]
      },
      {
        id: 'g2',
        title: 'Refactor Agent',
        status: 'running',
        progress: 74,
        durationMs: 890,
        steps: [
          { id: 's1', label: 'Transform AST', status: 'running' }
        ]
      },
      {
        id: 'g3',
        title: 'Code Optimizer',
        status: 'idle',
        progress: 0,
        durationMs: 0,
        steps: [
          { id: 's1', label: 'Pass 1', status: 'pending' }
        ]
      },
      {
        id: 'g4',
        title: 'Linter',
        status: 'done',
        progress: 100,
        durationMs: 120,
        steps: [
          { id: 's1', label: 'Zero errors', status: 'done' }
        ]
      }
    ]
  },
  MentionInput: {
    value: 'Please review with @Atlas and @Anya',
    onChange: () => {},
    mentions: [
      { id: 'atlas', label: 'Atlas' },
      { id: 'anya', label: 'Anya' }
    ]
  },
  MessageScroller: {
    children: 'Message stream container'
  },
  MessageStatus: {
    status: 'delivered'
  },
  ModelJourney: {
    turns: [
      { id: 'j1', model: 'gpt-4o', latencyMs: 240, tokens: 180 },
      { id: 'j2', model: 'claude-3-5-sonnet', latencyMs: 310, tokens: 420 },
      { id: 'j3', model: 'gemini-1-5-pro', latencyMs: 190, tokens: 290 }
    ]
  },
  ModelLab: {
    models: [
      { id: 'm1', name: 'Claude 3.5 Sonnet', metrics: { latency: 85, accuracy: 96, cost: 72 } },
      { id: 'm2', name: 'GPT-4o', metrics: { latency: 92, accuracy: 94, cost: 65 } }
    ],
    metricLabels: { latency: 'Speed', accuracy: 'Quality', cost: 'Efficiency' },
    comparer: {
      left: { id: 'l', label: 'Claude 3.5', content: 'Strictly typed functional implementation.' },
      right: { id: 'r', label: 'GPT-4o', content: 'Declarative hook-based architecture.' }
    }
  },
  ModelPerformanceTable: {
    models: [
      { id: 'b1', name: 'Claude 3.5 Sonnet', metrics: { latency: 85, quality: 95 } },
      { id: 'b2', name: 'GPT-4o', metrics: { latency: 92, quality: 93 } },
      { id: 'b3', name: 'DeepSeek-V3', metrics: { latency: 78, quality: 91 } }
    ],
    metricLabels: { latency: 'Latency (tok/s)', quality: 'Eval Score' }
  },
  ModelPicker: {
    models: [
      { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', description: 'Optimal for code reasoning' },
      { id: 'gpt-4o', label: 'GPT-4o', description: 'Fast multimodal generation' },
      { id: 'gemini-1-5-pro', label: 'Gemini 1.5 Pro', description: '2M token context window' }
    ],
    value: 'claude-3-5-sonnet',
    onChange: () => {}
  },
  PromptDiff: {
    before: 'System: Answer succinctly in plain text.\nUser: Explain GPUIX.',
    after: 'System: Answer succinctly in markdown with technical precision.\nUser: Explain GPUIX architecture and benefits.'
  },
  PromptEngineeringSuite: {
    template: 'Act as an expert {{role}} engineer. Refactor the code in {{target}} to be 100% type-safe.',
    baseline: 'Refactor the code in {{target}}.',
    values: { role: 'Rust & GPU', target: 'packages/ui/src/ai' },
    tokenUsed: 240,
    tokenLimit: 4096
  },
  PromptHistoryList: {
    items: [
      { id: 'h1', title: 'GPU Memory Allocator Review', date: new Date(Date.now() - 3600000), preview: 'Discussed virtual anchors...' },
      { id: 'h2', title: 'Taffy Flexbox Integration', date: new Date(Date.now() - 86400000), preview: 'Sub-millisecond compute metrics...' },
      { id: 'h3', title: 'React 19 Reconciler Hooks', date: new Date(Date.now() - 172800000), preview: 'Fiber pass optimization...' }
    ]
  },
  PromptInput: {
    value: 'Describe the headless focus trap behavior...',
    onChange: () => {},
    onSubmit: () => {}
  },
  PromptSettings: {
    temperature: 0.3,
    maxTokens: 4096,
    topP: 0.9,
    onChange: () => {}
  },
  PromptTemplateEditor: {
    template: 'Optimize {{component}} for 120 FPS on {{platform}} using {{backend}}.',
    values: { component: 'DataTable', platform: 'Windows', backend: 'DirectX 12' }
  },
  RegenerateBar: {
    currentVersion: 2,
    versions: 4,
    onRegenerate: () => {}
  },
  ResponseComparer: {
    left: {
      id: 'r1',
      label: 'Variant A (Native Canvas)',
      content: 'Uses raw 2D path rendering directly onto DirectX 12 hardware textures.'
    },
    right: {
      id: 'r2',
      label: 'Variant B (Retained Quad Tree)',
      content: 'Uses retained quads with GPU instanced draw calls for high element density.'
    }
  },
  ReviewPanel: {
    title: 'Code Review: packages/ui/src/ai',
    feedback: 'All 58 AI Workspace components render with zero errors, proper text colors, and responsive borders.',
    code: 'export function useGPUIXLayout() {\n  return useMemo(() => computeLayoutTree(), []);\n}',
    language: 'typescript',
    configBefore: { maxTokens: 2048, model: 'claude-3-5-sonnet', temperature: 0.7 },
    configAfter: { maxTokens: 4096, model: 'claude-3-7-sonnet', temperature: 0.2 }
  },
  RunCostCard: {
    inputTokens: 38400,
    outputTokens: 8920,
    cost: 0.084
  },
  RunInspector: {
    steps: [
      { id: 's1', label: '1. Ingest Prompt', state: 'done', ms: 140 },
      { id: 's2', label: '2. Execute Tool Calls', state: 'done', ms: 920 },
      { id: 's3', label: '3. Stream Markdown', state: 'active', ms: 1650 }
    ],
    lines: [
      { id: 'l1', kind: 'prompt', text: 'bun run test' },
      { id: 'l2', kind: 'stdout', text: '58 AI components verified' },
      { id: 'l3', kind: 'done', text: 'All suites passed' }
    ],
    used: 47320,
    limit: 128000
  },
  SamplerControls: {
    values: { temperature: 0.25, topP: 0.85, frequencyPenalty: 0.1 },
    onChange: () => {}
  },
  SandboxStepLog: {
    lines: [
      { id: 'l1', kind: 'prompt', text: 'cargo test --lib' },
      { id: 'l2', kind: 'stdout', text: '   Compiling gpuix-retained v0.4.0' },
      { id: 'l3', kind: 'stdout', text: '   Running unittests src/lib.rs' },
      { id: 'l4', kind: 'done', text: 'test result: ok. 42 passed; 0 failed' }
    ]
  },
  ScoringPanel: {
    overall: 98,
    criteria: [
      { id: 'c1', label: 'GPU Frame Latency', score: 99, max: 100, note: '< 8.3ms per frame' },
      { id: 'c2', label: 'Memory Alignment', score: 96, max: 100, note: 'Zero DOM leaks' },
      { id: 'c3', label: 'Visual Contrast & Typography', score: 98, max: 100, note: 'Strict dark theme' }
    ]
  },
  SelectAndAsk: {
    selectedText: 'DirectX 12 hardware texture allocations',
    messages: [
      { id: 'm1', role: 'user', content: 'Explain this selection' },
      { id: 'm2', role: 'assistant', content: 'DirectX 12 manages memory heaps explicitly without driver intervention.' }
    ],
    onSend: () => {}
  },
  SelectionToPrompt: {
    text: 'const reconciler = createGPUReconciler({ target: "directx12" })',
    actions: ['Explain', 'Refactor', 'Add Tests', 'Typecheck']
  },
  SourceList: {
    sources: [
      { id: 's1', title: 'Zed GPUI Architecture Documentation', url: 'https://zed.dev' },
      { id: 's2', title: 'Direct3D 12 Programming Guide', url: 'https://learn.microsoft.com' }
    ]
  },
  StreamingDiff: {
    before: 'function render() {\n  return <DOMNode />\n}',
    after: 'function render() {\n  return <GPUTextureNode />\n}',
    active: false
  },
  StreamingMarkdown: {
    source: '### Hardware-Accelerated Output\n\nAtlas UI streams output with zero DOM reflow or stutter.',
    active: false
  },
  SystemPromptCard: {
    prompt: 'You are Atlas Copilot, an expert AI assistant specialized in native GPU application architecture and Rust systems programming.'
  },
  TaskDoneBanner: {
    title: 'Visual Audit Complete',
    summary: 'Captured screenshots for all 58 AI Workspace components.'
  },
  ThinkingIndicator: {
    status: 'Synthesizing response via DirectX pipeline...'
  },
  ThoughtCodeSplit: {
    thought: 'The component must render inside a fixed container with proper background and padding.',
    code: 'export const Card = ({ children }) => <div style={{ backgroundColor: "#18181b", padding: 12 }}>{children}</div>'
  },
  TokenMeter: {
    used: 18450,
    limit: 32000,
    label: 'Context Window'
  },
  ToolCallCard: {
    toolName: 'gpu_allocate_texture',
    args: JSON.stringify({ width: 1920, height: 1080, format: 'R8G8B8A8_UNORM' }, null, 2),
    status: 'success'
  },
  ToolPermissionPrompt: {
    toolName: 'execute_command',
    args: 'cargo build --release',
    onAllow: () => {},
    onDeny: () => {}
  },
  TranscriptSync: {
    segments: [
      { id: 's1', speaker: 'Engineer', startMs: 0, text: 'Verify the visual presentation of every AI card.' },
      { id: 's2', speaker: 'Atlas AI', startMs: 2400, text: 'All 58 components rendered and captured.' }
    ],
    durationMs: 5000,
    activeIndex: 1,
    waveform: [0.1, 0.4, 0.7, 0.9, 0.6, 0.8, 0.5, 0.3, 0.6, 0.8, 0.9, 0.4, 0.2]
  },
  UsageBudgetCard: {
    title: 'Monthly LLM Budget',
    used: 34.50,
    limit: 100.00,
    label: 'USD'
  },
  VersionedPromptLibrary: {
    prompts: [
      {
        id: 'p1',
        title: 'Component Review Prompt',
        versions: [
          { id: 'v1', label: 'v1.0', content: 'Review this component for bugs.' },
          { id: 'v2', label: 'v2.0', content: 'Review this component for GPU rendering performance, contrast, and layout bugs.' }
        ]
      }
    ]
  },
  VoiceStudio: {
    segments: [
      { id: 'v1', speaker: 'Architect', startMs: 0, text: 'Benchmarking the voice studio component.' },
      { id: 'v2', speaker: 'Engineer', startMs: 1800, text: 'Waveform and synchronized audio timeline responsive.' }
    ],
    durationMs: 4200,
    activeIndex: 0,
    waveform: [0.2, 0.5, 0.8, 0.6, 0.9, 0.4, 0.7, 0.3, 0.5, 0.8, 0.2]
  }
}

const componentNames = Object.keys(AI).filter(k => !k.endsWith('Props') && typeof (AI as any)[k] === 'function')
console.log(`Rendering and capturing screenshots for all ${componentNames.length} AI components...`)

let passCount = 0
let failCount = 0

for (const name of componentNames) {
  const Comp = (AI as any)[name]
  const props = sampleProps[name] || {}
  const { render: testRender, renderer: testRenderer } = createTestRoot({ width: 900, height: 600 })
  
  try {
    testRender(
      <div style={{ backgroundColor: '#0e0f12', padding: 24, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ paddingBottom: 12, borderBottomWidth: 1, borderColor: '#27272a', marginBottom: 16 }}>
          <text style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>AI Component: {name}</text>
        </div>
        <div style={{ flexGrow: 1, minHeight: 0 }}>
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
    console.error(`[ERROR] ${name}:`, err?.message || err)
  }
}

console.log(`\nCompleted screenshot capture: ${passCount} captured, ${failCount} failed.`)
process.exit(failCount > 0 ? 1 : 0)
