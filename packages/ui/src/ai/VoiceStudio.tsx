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

const CARD_PAD = { paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }

export function VoiceStudio({
  segments = [],
  activeIndex,
  waveform,
  durationMs,
  recording = false,
  onToggleRecord,
  onSeek,
}: VoiceStudioProps) {
  const safeSegments = segments ?? []
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%',
        alignSelf: 'flex-start',
        ...CARD_PAD,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.card,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Button size="sm" variant={recording ? 'destructive' : 'primary'} icon={recording ? 'pause' : 'mic'} onClick={onToggleRecord}>
          {recording ? 'Stop' : 'Record'}
        </Button>
        {recording ? <div style={{ marginLeft: 10 }}><StatusDot status="busy" label="Recording" /></div> : null}
        <div style={{ flexGrow: 1 }} />
        <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT, lineHeight: 1, whiteSpace: 'nowrap' }}>{safeSegments.length} segments</text>
      </div>
      <TranscriptSync segments={safeSegments} activeIndex={activeIndex} waveform={waveform} durationMs={durationMs} onSeek={onSeek} bordered={false} />
    </div>
  )
}
