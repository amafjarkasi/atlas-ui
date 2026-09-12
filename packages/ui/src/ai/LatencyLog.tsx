/** @atlas/ui — LatencyLog — per-request latencies with a live sparkline. */
import { border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { VirtualList } from '../layout/VirtualList'
import { ActivitySparkline } from '../dataviz/ActivitySparkline'

export interface LatencyEntry {
  id: string
  label: string
  ms: number
}

export interface LatencyLogProps {
  entries: LatencyEntry[]
  height?: number | string
}

export function LatencyLog({ entries, height = '100%' }: LatencyLogProps) {
  const spark = entries.map((e) => e.ms)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {entries.length > 0 ? <ActivitySparkline data={spark} width={180} height={28} /> : null}
      <VirtualList<LatencyEntry>
        items={entries}
        estimatedItemHeight={26}
        height={height}
        renderItem={(e) => (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 3, paddingBottom: 3, borderBottomWidth: 1, borderColor: border.subtle }}>
            <text style={{ fontSize: 11.5, color: t.secondary, fontFamily: FONT, flexGrow: 1 }}>{e.label}</text>
            <text style={{ fontSize: 11.5, fontWeight: 600, color: e.ms > 500 ? '#ED4245' : e.ms > 200 ? '#EAB308' : '#22C55E', fontFamily: FONT }}>{e.ms}ms</text>
          </div>
        )}
      />
    </div>
  )
}
