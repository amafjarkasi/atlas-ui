/** @atlas/ui — SandboxStepLog — terminal-style streaming step output. */
import { surface, text as t } from '../tokens'
import { FONT_MONO } from '../tokens'
import { VirtualList } from '../layout/VirtualList'

export type SandboxLineKind = 'prompt' | 'command' | 'stdout' | 'error' | 'done'

export interface SandboxLine {
  id: string
  text: string
  kind?: SandboxLineKind
}

export interface SandboxStepLogProps {
  lines: SandboxLine[]
  height?: number | string
}

const KIND_COLOR: Record<SandboxLineKind, string> = { prompt: '#22C55E', command: t.primary, stdout: t.secondary, error: '#ED4245', done: '#22C55E' }

export function SandboxStepLog({ lines, height = 240 }: SandboxStepLogProps) {
  const innerHeight = typeof height === 'number' ? height - 20 : height
  return (
    <div style={{ backgroundColor: surface.code, borderRadius: 8, padding: 10, height }}>
      <VirtualList<SandboxLine>
        items={lines}
        estimatedItemHeight={20}
        height={innerHeight}
        renderItem={(l) => {
          const kind = l.kind ?? 'stdout'
          return (
            <text style={{ fontSize: 11.5, color: KIND_COLOR[kind], fontFamily: FONT_MONO, lineHeight: 1.5, whiteSpace: 'normal' }}>
              {kind === 'prompt' ? '$ ' : kind === 'command' ? '> ' : ''}
              {l.text}
            </text>
          )
        }}
      />
    </div>
  )
}
