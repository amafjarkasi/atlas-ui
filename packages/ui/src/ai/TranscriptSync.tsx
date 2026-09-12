import { text as t, FONT_MONO } from '../tokens'
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      {waveform.length > 0 ? <AudioWaveform data={waveform} progress={progress} height={44} /> : null}
      <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 280, overflowY: 'scroll', gap: 2 }}>
        {segments.map((s, i) => {
          const active = i === activeIndex
          const sec = typeof s.startMs === 'number' && !isNaN(s.startMs) ? (s.startMs / 1000).toFixed(1) : '0.0'
          return (
            <div
              key={i}
              onClick={() => onSeek?.(s.startMs)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 10,
                padding: 8,
                borderRadius: 6,
                cursor: onSeek ? 'pointer' : 'default',
                backgroundColor: active ? '#3B82F618' : 'transparent',
                borderLeftWidth: active ? 2 : 0,
                borderColor: '#3B82F6',
              }}
            >
              <div style={{ width: 50, minWidth: 50, flexShrink: 0, paddingTop: 1 }}>
                <text style={{ fontSize: 11, color: active ? '#60A5FA' : t.muted, fontFamily: FONT_MONO, whiteSpace: 'nowrap' }}>{`${sec}s`}</text>
              </div>
              <text style={{ fontSize: 12.5, color: active ? t.primary : t.secondary, fontFamily: FONT, lineHeight: 1.5, flexGrow: 1 }}>{s.text}</text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
