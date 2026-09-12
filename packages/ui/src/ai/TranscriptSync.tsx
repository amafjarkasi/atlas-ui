import { border, surface, text as t, FONT_MONO } from '../tokens'
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
  bordered?: boolean
}

export function TranscriptSync({ segments = [], activeIndex = -1, waveform = [], onSeek, durationMs, bordered = true }: TranscriptSyncProps) {
  const safeSegments = segments ?? []
  const maxStart = safeSegments.length > 0 ? Math.max(...safeSegments.map((s) => (typeof s?.startMs === 'number' ? s.startMs : 0)), 1) : 1
  const total = durationMs ?? maxStart
  const progress = activeIndex >= 0 && safeSegments[activeIndex] && typeof safeSegments[activeIndex].startMs === 'number' ? safeSegments[activeIndex].startMs / total : 0

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%',
        ...(bordered
          ? {
              padding: 16,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: border.subtle,
              backgroundColor: surface.card,
            }
          : {}),
      }}
    >
      {waveform.length > 0 ? <AudioWaveform data={waveform} progress={progress} height={36} /> : null}
      <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 160, overflowY: 'scroll', gap: 4 }}>
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
                alignItems: 'center',
                gap: 12,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 6,
                cursor: onSeek ? 'pointer' : 'default',
                backgroundColor: active ? '#3B82F618' : 'transparent',
                borderLeftWidth: active ? 2 : 0,
                borderColor: '#3B82F6',
              }}
            >
              <div style={{ width: 44, minWidth: 44, flexShrink: 0 }}>
                <text style={{ fontSize: 11, color: active ? '#60A5FA' : t.muted, fontFamily: FONT_MONO, whiteSpace: 'nowrap', lineHeight: 1 }}>{`${sec}s`}</text>
              </div>
              <text style={{ fontSize: 12.5, color: active ? t.primary : t.secondary, fontFamily: FONT, lineHeight: 1.3, flexGrow: 1 }}>{s.text}</text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
