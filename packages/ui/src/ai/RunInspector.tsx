import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { AgentTrajectory, type TrajectoryStep } from './AgentTrajectory'
import { ContextRing } from './ContextRing'
import { SandboxStepLog, type SandboxLine } from './SandboxStepLog'

export interface RunInspectorProps {
  steps: TrajectoryStep[]
  lines: SandboxLine[]
  used?: number
  limit?: number
}

const CARD_PAD = { paddingTop: 16, paddingBottom: 16, paddingLeft: 16, paddingRight: 16 }

export function RunInspector({ steps, lines, used = 0, limit = 200000 }: RunInspectorProps) {
  const pct = Math.round((used / Math.max(limit, 1)) * 100)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...CARD_PAD, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: FONT, lineHeight: 1 }}>Run Inspector</text>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#22C55E1A', borderWidth: 1, borderColor: '#22C55E40', borderRadius: 10, paddingLeft: 8, paddingRight: 8, height: 20 }}>
            <text style={{ fontSize: 10.5, color: '#22C55E', fontWeight: 600, fontFamily: FONT, lineHeight: 1 }}>ACTIVE</text>
          </div>
        </div>
        <text style={{ fontSize: 11.5, color: t.muted, fontFamily: FONT, whiteSpace: 'nowrap', lineHeight: 1 }}>
          {`${steps.length} steps · ${pct}% context`}
        </text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 240, flexShrink: 0, ...CARD_PAD, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
          <ContextRing used={used} limit={limit} size={76} />
        </div>
        <div style={{ flexGrow: 1, ...CARD_PAD, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
          <AgentTrajectory steps={steps} />
        </div>
      </div>

      <SandboxStepLog lines={lines} height="auto" />
    </div>
  )
}
