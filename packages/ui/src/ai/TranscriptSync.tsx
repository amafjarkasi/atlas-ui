/** @atlas/ui — TranscriptSync — waveform + transcript with the active line highlighted. */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { AudioWaveform } from '../dataviz/AudioWaveform'

export interface TranscriptSegment {
  startMs: number
  text: string
}

export interface TranscriptSyncProps {
  segments: TranscriptSegment[]
  activeIndex?: number
  waveform?: number[]
  onSeek?: (startMs: number) => void
  durationMs?: number
}

export function TranscriptSync({ segments = [], activeIndex = -1, waveform = [], onSeek, durationMs }: TranscriptSyncProps) {
  const safeSegments = segments ?? []
  const maxStart = safeSegments.length > 0 ? Math.max(...safeSegments.map((s) => (typeof s?.startMs === 'number' ? s.startMs : 0)), 1) : 1
  const total = durationMs ?? maxStart
  const progress = activeIndex >= 0 && safeSegments[activeIndex] && typeof safeSegments[activeIndex].startMs === 'number' ? safeSegments[activeIndex].startMs / total : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {waveform.length > 0 ? <AudioWaveform data={waveform} progress={progress} height={44} /> : null}
      <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 280, overflowY: 'scroll' }}>
        {segments.map((s, i) => {
          const active = i === activeIndex
          const sec = typeof s.startMs === 'number' && !isNaN(s.startMs) ? (s.startMs / 1000).toFixed(1) : '0.0'
          return (
            <div
              key={i}
              onClick={() => onSeek?.(s.startMs)}
              style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 6, borderRadius: 6, cursor: onSeek ? 'pointer' : 'default', backgroundColor: active ? '#3B82F622' : undefined }}
            >
              <div style={{ width: 44, flexShrink: 0, paddingTop: 2 }}>
                <text style={{ fontSize: 10.5, color: active ? '#3B82F6' : t.muted, fontFamily: FONT }}>{sec}s</text>
              </div>
              <text style={{ fontSize: 12.5, color: active ? t.primary : t.secondary, fontFamily: FONT, lineHeight: 1.5 }}>{s.text}</text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
