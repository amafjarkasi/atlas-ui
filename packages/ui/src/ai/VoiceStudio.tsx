/** @atlas/ui — VoiceStudio — record + waveform + synced transcript. */
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { TranscriptSync, type TranscriptSegment } from './TranscriptSync'
import { Button } from '../atoms/Button'
import { StatusDot } from '../display/StatusDot'

export interface VoiceStudioProps {
  segments: TranscriptSegment[]
  activeIndex?: number
  waveform?: number[]
  durationMs?: number
  recording?: boolean
  onToggleRecord?: () => void
  onSeek?: (startMs: number) => void
}

export function VoiceStudio({ segments, activeIndex, waveform, durationMs, recording = false, onToggleRecord, onSeek }: VoiceStudioProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Button size="sm" variant={recording ? 'destructive' : 'primary'} icon={recording ? 'pause' : 'mic'} onClick={onToggleRecord}>
          {recording ? 'Stop' : 'Record'}
        </Button>
        {recording ? <StatusDot status="busy" label="Recording" /> : null}
        <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT, flexGrow: 1, textAlign: 'right' }}>{segments.length} segments</text>
      </div>
      <TranscriptSync segments={segments} activeIndex={activeIndex} waveform={waveform} durationMs={durationMs} onSeek={onSeek} />
    </div>
  )
}
