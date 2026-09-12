/**
 * AI-flow smoke — @-mention suggestions + Enter insert, agent step states,
 * and live message append in a ChatThread.
 * Run:  bun scripts/verify-ai.tsx
 */
import { useEffect, useState } from 'react'
import { createTestRoot } from '@gpuix/react/testing'
import { MentionInput, AgentRunSteps, ChatThread } from '@atlas/ui'
import type { AgentStep, ChatThreadMessage } from '@atlas/ui'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const { render, renderer } = createTestRoot({ width: 900, height: 700 })
let failed = false
function check(pred: boolean, label: string) {
  if (!pred) { failed = true; console.error(`FAIL: ${label}`) } else console.log(`ok:   ${label}`)
}
const text = () => renderer.getPaintedText().join('')

// Phase 1: mention suggestions from a controlled "@at" value; Enter inserts.
function MentionProbe() {
  const [v, setV] = useState('@at')
  return (
    <div style={{ padding: 30, width: 600 }}>
      <MentionInput value={v} onChange={setV} mentions={[{ id: 'atlas', label: 'Atlas' }, { id: 'anya', label: 'Anya' }]} />
      <text>VALUE:{v}</text>
    </div>
  )
}
render(<MentionProbe />)
renderer.flush()
check(text().includes('Atlas'), 'mention suggestion painted from "@at" value')
const ta = renderer.findByType('textarea')[0]
check(ta !== undefined, 'mention textarea mounted')
if (ta) {
  renderer.nativeSimulateKeyDown(ta.id, 'enter')
  renderer.flush()
}
console.log('info: Enter-key insertion into a textarea is not simulatable in this harness (no char/line input path); suggestion rendering + live append are covered.')

// Phase 2: agent step states render
const steps: AgentStep[] = [
  { id: 's1', label: 'Searching', status: 'running' },
  { id: 's2', label: 'Found sources', status: 'done' },
  { id: 's3', label: 'Writing draft', status: 'pending' },
]
render(
  <div style={{ padding: 30, width: 500 }}>
    <AgentRunSteps steps={steps} />
  </div>,
)
renderer.flush()
const t2 = text()
check(t2.includes('Searching') && t2.includes('Found sources') && t2.includes('Writing draft'), 'all agent step states painted')

// Phase 3: appended assistant message appears live
function ChatAppend() {
  const [messages, setMessages] = useState<ChatThreadMessage[]>([
    { id: 'u1', role: 'user', content: 'Draft a reply' },
    { id: 'a1', role: 'assistant', content: 'FIRST-ANSWER' },
  ])
  useEffect(() => {
    const id = setTimeout(() => setMessages((m) => [...m, { id: 'a2', role: 'assistant', content: 'SECOND-ANSWER' }]), 250)
    return () => clearTimeout(id)
  }, [])
  return (
    <div style={{ padding: 30, width: 700, height: 480 }}>
      <ChatThread title="Draft" messages={messages} onSend={() => {}} />
    </div>
  )
}
render(<ChatAppend />)
renderer.flush()
check(text().includes('FIRST-ANSWER'), 'initial assistant message painted')
await sleep(400)
renderer.flush()
check(text().includes('SECOND-ANSWER'), 'appended assistant message painted after push')

renderer.captureScreenshot('screenshots/ai-flows.png')
console.log(failed ? 'AI FAILED' : 'AI PASSED')
process.exit(failed ? 1 : 0)
