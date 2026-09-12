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

function renderLine(l: SandboxLine) {
  const kind = l.kind ?? 'stdout'
  const prefix = kind === 'prompt' ? '$ ' : kind === 'command' ? '> ' : ''
  const fullText = prefix + l.text
  return (
    <div
      key={l.id}
      style={{
        minHeight: 22,
        paddingTop: 3,
        paddingBottom: 3,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <text style={{ fontSize: 11.5, color: KIND_COLOR[kind], fontFamily: FONT_MONO, lineHeight: 1.4, whiteSpace: 'nowrap' }}>
        {fullText}
      </text>
    </div>
  )
}

export function SandboxStepLog({ lines, height = 240 }: SandboxStepLogProps) {
  const isAuto = height === 'auto'
  const bodyPad = { paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12 }

  return (
    <div
      style={{
        backgroundColor: '#0D0D10',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#26262B',
        overflow: 'hidden',
        ...(isAuto ? {} : { height, display: 'flex', flexDirection: 'column' }),
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 12, paddingRight: 12, height: 32, backgroundColor: '#141418', borderBottomWidth: 1, borderColor: '#26262B' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: '#EF4444' }} />
          <div style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: '#F59E0B' }} />
          <div style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: '#10B981' }} />
          <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT_MONO, marginLeft: 6, lineHeight: 1 }}>sandbox-terminal</text>
        </div>
        <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT_MONO, lineHeight: 1, whiteSpace: 'nowrap' }}>{`${lines.length} lines`}</text>
      </div>
      {isAuto ? (
        <div style={bodyPad}>{lines.map(renderLine)}</div>
      ) : (
        <div style={{ flexGrow: 1, ...bodyPad, overflowY: 'scroll' }}>
          <VirtualList<SandboxLine>
            items={lines}
            estimatedItemHeight={24}
            height={typeof height === 'number' ? height - 44 : '100%'}
            renderItem={renderLine}
          />
        </div>
      )}
    </div>
  )
}
