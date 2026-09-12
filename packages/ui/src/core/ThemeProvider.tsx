/**
 * @atlas/ui — ThemeProvider & useTheme
 *
 * A lightweight theme context for accent + semantic colors, plus an `alpha`
 * helper for compositing translucent hex variants (drop-in for the manual
 * `color + '22'` pattern used throughout the library).
 *
 * @example
 *   <ThemeProvider accent="#8B5CF6">
 *     <Button variant="primary">Go</Button>
 *   </ThemeProvider>
 *   const { accent } = useTheme()
 */
import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import { semantic } from '../tokens'

export interface Theme {
  accent: string
  success: string
  warning: string
  danger: string
}

export interface ThemeContextValue extends Theme {
  setAccent: (accent: string) => void
}

const DEFAULT_THEME: Theme = {
  accent: semantic.accent,
  success: '#22C55E',
  warning: '#EAB308',
  danger: '#ED4245',
}

const ThemeContext = createContext<ThemeContextValue>({ ...DEFAULT_THEME, setAccent: () => {} })

export interface ThemeProviderProps {
  children: ReactNode
  accent?: string
  success?: string
  warning?: string
  danger?: string
}

export function ThemeProvider({ children, accent, success, warning, danger }: ThemeProviderProps) {
  const [accentState, setAccentState] = useState(accent ?? DEFAULT_THEME.accent)

  const value = useMemo<ThemeContextValue>(
    () => ({
      accent: accentState,
      success: success ?? DEFAULT_THEME.success,
      warning: warning ?? DEFAULT_THEME.warning,
      danger: danger ?? DEFAULT_THEME.danger,
      setAccent: setAccentState,
    }),
    [accentState, success, warning, danger],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}

/** Append an 8-bit alpha (0..1) to a #RRGGBB color, e.g. `alpha('#3B82F6', 0.15)`. */
export function alpha(hex: string, a: number): string {
  const base = hex.startsWith('#') ? hex : `#${hex}`
  const v = Math.round(Math.max(0, Math.min(1, a)) * 255)
  return base + v.toString(16).padStart(2, '0')
}
