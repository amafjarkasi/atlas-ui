/** @atlas/ui — ThemeSwitcher — preset accent swatches (uses ThemeProvider when present). */
import { useState } from 'react'
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { useTheme } from '../core/ThemeProvider'

const ACCENTS = ['#3B82F6', '#8B5CF6', '#22C55E', '#EAB308', '#ED4245', '#0EA5E9', '#F97316']

export interface ThemeSwitcherProps {
  value?: string
  onChange?: (accent: string) => void
}

export function ThemeSwitcher({ value, onChange }: ThemeSwitcherProps) {
  const theme = useTheme()
  const [local, setLocal] = useState(theme.accent)
  const accent = value ?? local
  const pick = (c: string) => {
    setLocal(c)
    onChange?.(c)
    theme.setAccent(c)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 12,
        borderRadius: 10,
        backgroundColor: surface.card,
        borderWidth: 1,
        borderColor: border.subtle,
        alignSelf: 'flex-start',
      }}
    >
      {ACCENTS.map((c) => (
        <div
          key={c}
          onClick={() => pick(c)}
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            backgroundColor: c,
            cursor: 'pointer',
            borderWidth: accent === c ? 2 : 1,
            borderColor: accent === c ? '#FFFFFF' : '#00000044',
          }}
        />
      ))}
      <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT, marginLeft: 4 }}>{accent}</text>
    </div>
  )
}
