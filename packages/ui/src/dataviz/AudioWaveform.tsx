/**
 * @atlas/ui — AudioWaveform
 *
 * A div-based amplitude visualization. Bars before `progress` render in the
 * accent color; the remainder is muted, showing playback position.
 *
 * @example
 *   <AudioWaveform data={amplitudes} progress={0.4} />
 */
export interface AudioWaveformProps {
  data: number[]
  width?: number | string
  height?: number
  color?: string
  barGap?: number
  /** 0..1 fraction already played. */
  progress?: number
}

export function AudioWaveform({
  data,
  width = '100%',
  height = 40,
  color = '#3B82F6',
  barGap = 2,
  progress = 1,
}: AudioWaveformProps) {
  const n = data.length
  const fullWidth = width === '100%'
  const barW = !fullWidth && typeof width === 'number' && n > 0 ? Math.max(1, (width - barGap * (n - 1)) / n) : 0
  const played = Math.round(n * Math.max(0, Math.min(1, progress)))

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: barGap, width, height }}>
      {data.map((amp, i) => {
        const h = Math.max(2, Math.max(0, Math.min(1, amp)) * height)
        const isPlayed = i < played
        return (
          <div
            key={i}
            style={{
              ...(fullWidth ? { flexGrow: 1, flexBasis: 0 } : { width: barW, flexShrink: 0 }),
              height: h,
              borderRadius: 1,
              backgroundColor: isPlayed ? color : '#3A3A40',
            }}
          />
        )
      })}
    </div>
  )
}
