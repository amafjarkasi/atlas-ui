import { createTestRoot } from '@gpuix/react/testing'
import * as AI from '@atlas/ui/ai'

const { render, renderer } = createTestRoot({ width: 1200, height: 900 })

// Sample props for every component
const sampleProps: Record<string, any> = {
  AgentFlowGraph: {
    nodes: [
      { id: '1', title: 'Start', kind: 'router', state: 'completed' },
      { id: '2', title: 'Search Docs', kind: 'tool', state: 'active' },
      { id: '3', title: 'Synthesize', kind: 'llm', state: 'idle' }
    ]
  },
  AgentMonitor: {
    agents: [
      { id: 'a1', name: 'Researcher', status: 'running', currentTask: 'Scraping papers', progress: 0.65 }
    ]
  },
  AgentRunCard: {
    agentName: 'CodeReviewer',
    status: 'running',
    task: 'Checking security vulnerabilities in PR #42'
  },
  AgentRunSteps: {
    steps: [
      { id: 's1', label: 'Reading AST', status: 'done' },
      { id: 's2', label: 'Evaluating rules', status: 'running' }
    ]
  },
  AgentTrajectory: {
    steps: [
      { id: 't1', title: 'User Input', kind: 'user', state: 'completed' },
      { id: 't2', title: 'Search Tool', kind: 'tool', state: 'completed' },
      { id: 't3', title: 'Output Draft', kind: 'llm', state: 'active' }
    ]
  },
  AssistWorkspace: {
    title: 'Code Assistant Workspace',
    prompt: 'How do I optimize GPUI rendering?',
    onPromptChange: () => {},
    onSend: () => {}
  },
  BranchExplorer: {
    branches: [
      { id: 'b1', name: 'main', status: 'active' },
      { id: 'b2', name: 'explore-ideas', status: 'idle' }
    ]
  },
  ChatBubble: {
    role: 'assistant',
    children: 'Hello from Atlas UI AI component!'
  },
  ChatSearchBar: {
    value: 'vector embeddings',
    onChange: () => {}
  },
  ChatThread: {
    title: 'Chat Session',
    messages: [
      { id: 'm1', role: 'user', name: 'User', avatarLetter: 'U', content: 'Explain GPUIX' },
      { id: 'm2', role: 'assistant', name: 'Atlas', avatarLetter: 'A', content: 'GPUIX is a GPU-native React framework.' }
    ]
  },
  ConfigDiffReview: {
    original: 'temperature: 0.7\nmax_tokens: 2048',
    modified: 'temperature: 0.2\nmax_tokens: 4096'
  },
  ContextBrowser: {
    chunks: [
      { id: 'c1', title: 'README.md', tokens: 420, snippet: 'High performance desktop UI...' }
    ]
  },
  ContextRing: {
    used: 12000,
    total: 32000
  },
  DocumentQAPanel: {
    chunks: [
      { id: 'd1', source: 'architecture.pdf', page: 4, text: 'DirectX 12 backend pipeline...' }
    ]
  },
  GeneratedCodeCard: {
    code: 'console.log("Hello from Atlas UI")',
    language: 'typescript',
    status: 'success'
  },
  HelpCopilot: {
    query: 'How to use Tabs?',
    suggestions: ['Tabs component props', 'Keyboard navigation with arrow keys']
  },
  InlineCitations: {
    citations: [
      { id: 'cite-1', label: '[1]', title: 'Zed GPUI Architecture', url: 'https://zed.dev' }
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
      { id: 'l1', phase: 'TTFT', ms: 142 },
      { id: 'l2', phase: 'E2E', ms: 890 }
    ]
  },
  LiveAgentGrid: {
    runs: [
      { id: 'r1', agent: 'Linter', status: 'idle', durationMs: 400 },
      { id: 'r2', agent: 'Compiler', status: 'running', durationMs: 1200 }
    ]
  },
  MentionInput: {
    value: '@atlas check this',
    onChange: () => {},
    mentions: [{ id: 'atlas', label: 'Atlas' }]
  },
  MessageScroller: {
    children: 'Message content'
  },
  MessageStatus: {
    status: 'delivered'
  },
  ModelJourney: {
    turns: [
      { id: 'j1', model: 'gpt-4o', latencyMs: 350, tokens: 210 },
      { id: 'j2', model: 'claude-3-5-sonnet', latencyMs: 410, tokens: 350 }
    ]
  },
  ModelLab: {
    models: ['Model A', 'Model B']
  },
  ModelPerformanceTable: {
    data: [
      { model: 'Gemini 1.5 Pro', latency: '450ms', throughput: '85 tok/s', cost: '$0.002' }
    ]
  },
  ModelPicker: {
    selectedModel: 'gpt-4o',
    models: [
      { id: 'gpt-4o', label: 'GPT-4o' },
      { id: 'claude-3.5', label: 'Claude 3.5 Sonnet' }
    ],
    onSelect: () => {}
  },
  PromptDiff: {
    original: 'You are a helpful assistant.',
    revised: 'You are a meticulous assistant specialized in Rust.'
  },
  PromptEngineeringSuite: {
    initialPrompt: 'Summarize this file.'
  },
  PromptHistoryList: {
    items: [
      { id: 'p1', timestamp: '10:42 AM', prompt: 'Refactor ResizablePanel' }
    ],
    onSelect: () => {}
  },
  PromptInput: {
    value: 'Ask anything...',
    onChange: () => {},
    onSubmit: () => {}
  },
  PromptSettings: {
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.95,
    onChange: () => {}
  },
  PromptTemplateEditor: {
    template: 'Hello {{name}}, welcome to {{project}}!'
  },
  RegenerateBar: {
    onRegenerate: () => {},
    versions: 3,
    currentVersion: 2
  },
  ResponseComparer: {
    responses: [
      { id: 'res1', model: 'Model A', content: 'Response A content' },
      { id: 'res2', model: 'Model B', content: 'Response B content' }
    ]
  },
  ReviewPanel: {
    title: 'Code Review Output',
    feedback: 'All tests pass with zero lint errors.'
  },
  RunCostCard: {
    totalCost: 0.042,
    promptTokens: 1420,
    completionTokens: 530
  },
  RunInspector: {
    runId: 'run-9921',
    executionTimeMs: 1420
  },
  SamplerControls: {
    values: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.0 },
    onChange: () => {}
  },
  SandboxStepLog: {
    lines: [
      { id: 'sbl1', kind: 'stdout', text: '$ cargo check' },
      { id: 'sbl2', kind: 'stdout', text: '    Finished dev [unoptimized + debuginfo]' }
    ]
  },
  ScoringPanel: {
    criteria: [
      { id: 'c1', label: 'Factual Accuracy', score: 9 },
      { id: 'c2', label: 'Code Quality', score: 10 }
    ]
  },
  SelectAndAsk: {
    selectedText: 'useRovingFocus',
    onAsk: () => {}
  },
  SelectionToPrompt: {
    text: 'Selected text from editor',
    onApply: () => {}
  },
  SourceList: {
    sources: [
      { id: 'src1', title: 'Zed GPUI Manual', url: 'https://zed.dev' }
    ]
  },
  StreamingDiff: {
    before: 'const x = 1',
    after: 'const x = 2'
  },
  StreamingMarkdown: {
    content: '### Streaming Response\n\nAtlas UI is fast.'
  },
  SystemPromptCard: {
    prompt: 'You are an autonomous AI coding engineer.'
  },
  TaskDoneBanner: {
    title: 'Refactoring Finished',
    summary: 'All 58 AI components verified and rendered.'
  },
  ThinkingIndicator: {
    status: 'Thinking...'
  },
  ThoughtCodeSplit: {
    thought: 'I should first read the AST and then apply fixes.',
    code: 'function fix() {\n  return true;\n}'
  },
  TokenMeter: {
    used: 4500,
    max: 8000
  },
  ToolCallCard: {
    toolName: 'read_file',
    args: '{ "path": "src/app.tsx" }',
    status: 'success'
  },
  ToolPermissionPrompt: {
    toolName: 'execute_command',
    args: 'bun test',
    onAllow: () => {},
    onDeny: () => {}
  },
  TranscriptSync: {
    segments: [
      { id: 'seg1', speaker: 'user', text: 'Run the tests' },
      { id: 'seg2', speaker: 'assistant', text: 'Running test suite now.' }
    ]
  },
  UsageBudgetCard: {
    spent: 12.45,
    budget: 50.00
  },
  VersionedPromptLibrary: {
    prompts: [
      { id: 'vp1', title: 'Code Refactor', versions: [{ version: 'v1.0', text: 'Refactor code' }] }
    ]
  },
  VoiceStudio: {
    status: 'idle',
    onRecord: () => {}
  }
}

const componentNames = Object.keys(AI).filter(k => !k.endsWith('Props') && typeof (AI as any)[k] === 'function')
console.log(`Testing all ${componentNames.length} AI components...`)

let passCount = 0
let failCount = 0
const errors: { name: string; err: any }[] = []

for (const name of componentNames) {
  const Comp = (AI as any)[name]
  const props = sampleProps[name] || {}
  try {
    render(<Comp {...props} />)
    renderer.flush()
    passCount++
    console.log(`[PASS] ${name}`)
  } catch (err: any) {
    failCount++
    console.error(`[FAIL] ${name}:`, err?.message || err)
    errors.push({ name, err })
  }
}

console.log(`\nResults: ${passCount} passed, ${failCount} failed.`)
if (failCount > 0) {
  console.error('Errors summary:')
  for (const e of errors) {
    console.error(`  - ${e.name}: ${e.err?.message || e.err}`)
  }
  process.exit(1)
} else {
  console.log('ALL AI WORKSPACE COMPONENTS RENDERED SUCCESSFULLY!')
  process.exit(0)
}
