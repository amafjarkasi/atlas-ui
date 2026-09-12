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
  const innerHeight = typeof height === 'number' ? height - 42 : height
  return (
    <div style={{ backgroundColor: '#0D0D10', borderRadius: 8, borderWidth: 1, borderColor: '#26262B', overflow: 'hidden', height, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, height: 32, backgroundColor: '#141418', borderBottomWidth: 1, borderColor: '#26262B' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: '#EF4444' }} />
          <div style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: '#F59E0B' }} />
          <div style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: '#10B981' }} />
          <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT_MONO, marginLeft: 6 }}>sandbox-terminal</text>
        </div>
        <text style={{ fontSize: 10.5, color: t.muted, fontFamily: FONT_MONO }}>{lines.length} lines</text>
      </div>
      <div style={{ flexGrow: 1, padding: 8 }}>
        <VirtualList<SandboxLine>
          items={lines}
          estimatedItemHeight={22}
          height={innerHeight}
          renderItem={(l) => {
            const kind = l.kind ?? 'stdout'
            const prefix = kind === 'prompt' ? '$ ' : kind === 'command' ? '> ' : ''
            const fullText = prefix + l.text
            return (
              <div
                key={l.id}
                style={{
                  minHeight: 20,
                  paddingLeft: 4,
                  paddingRight: 4,
                  paddingTop: 2,
                  paddingBottom: 2,
                }}
              >
                <text style={{ fontSize: 11.5, color: KIND_COLOR[kind], fontFamily: FONT_MONO, lineHeight: 1.45, whiteSpace: 'nowrap' }}>
                  {fullText}
                </text>
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}
