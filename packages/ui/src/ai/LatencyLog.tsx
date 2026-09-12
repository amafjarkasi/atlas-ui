import { surface, border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { VirtualList } from '../layout/VirtualList'
import { ActivitySparkline } from '../dataviz/ActivitySparkline'

export interface LatencyEntry {
  id: string
  label?: string
  phase?: string
  ms: number
}

export interface LatencyLogProps {
  entries: LatencyEntry[]
  height?: number | string
}

export function LatencyLog({ entries, height = '100%' }: LatencyLogProps) {
  const spark = entries.map((e) => e.ms)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, height }}>
      {entries.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 6, borderBottomWidth: 1, borderColor: border.subtle }}>
          <text style={{ fontSize: 11, fontWeight: 600, color: t.muted, fontFamily: FONT }}>Response latency trend</text>
          <ActivitySparkline data={spark} width={240} height={36} />
        </div>
      ) : null}
      <VirtualList<LatencyEntry>
        items={entries}
        estimatedItemHeight={28}
        height={height}
        renderItem={(e) => (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingTop: 4, paddingBottom: 4, borderBottomWidth: 1, borderColor: border.subtle }}>
            <text style={{ fontSize: 11.5, color: t.secondary, fontFamily: FONT }}>{e.label || e.phase || 'Step'}</text>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexShrink: 0, whiteSpace: 'nowrap' }}>
              <text style={{ fontSize: 11.5, fontWeight: 600, color: e.ms > 500 ? '#ED4245' : e.ms > 200 ? '#EAB308' : '#22C55E', fontFamily: FONT, whiteSpace: 'nowrap' }}>
                {`${e.ms}ms`}
              </text>
            </div>
          </div>
        )}
      />
    </div>
  )
}
