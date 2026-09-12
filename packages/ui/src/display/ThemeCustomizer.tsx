/**
 * @atlas/ui — ThemeCustomizer
 *
 * An accent-color customizer wired to `useTheme` (falls back to controlled
 * props outside a provider).
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { ColorPicker } from '../inputs/ColorPicker'
import { Button } from '../atoms/Button'
import { useTheme } from '../core/ThemeProvider'

export interface ThemeCustomizerProps {
  value?: string
  onChange?: (accent: string) => void
  onReset?: () => void
}

export function ThemeCustomizer({ value, onChange, onReset }: ThemeCustomizerProps) {
  const theme = useTheme()
  const accent = value ?? theme.accent
  const setAccent = (c: string) => {
    onChange?.(c)
    theme.setAccent(c)
  }
  const reset = () => {
    onReset?.()
    theme.setAccent('#3B82F6')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <text style={{ fontSize: 12.5, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>Accent color</text>
      <ColorPicker value={accent} onChange={setAccent} />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: accent }} />
        <text style={{ fontSize: 12, color: accent, fontFamily: FONT, flexGrow: 1 }}>{accent}</text>
        <Button size="sm" variant="ghost" onClick={reset}>Reset</Button>
      </div>
    </div>
  )
}
