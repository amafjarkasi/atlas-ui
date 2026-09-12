/**
 * @atlas/ui — Button
 *
 * The primary text-button atom (we had `IconButton` but no labeled button).
 * Five variants + three sizes, with optional leading/trailing icons and a
 * loading state.
 *
 * @example
 *   <Button variant="primary" icon="send" onClick={send}>Send</Button>
 *   <Button variant="destructive" size="sm">Delete</Button>
 *   <Button variant="ghost" loading>Saving…</Button>
 */
import type { ReactNode } from 'react'
import { semantic, surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from './Icon'
import type { IconName } from './Icon'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  icon?: IconName
  iconRight?: IconName
  testId?: string
}

const HEIGHT: Record<ButtonSize, number> = { sm: 26, md: 32, lg: 40 }
const PAD_X: Record<ButtonSize, number> = { sm: 10, md: 14, lg: 18 }
const FONT_SIZE: Record<ButtonSize, number> = { sm: 12, md: 13, lg: 14 }

const VARIANT_BG: Record<ButtonVariant, string> = {
  primary: semantic.accent,
  secondary: surface.selected,
  ghost: 'transparent',
  destructive: '#ED4245',
  outline: 'transparent',
}
const VARIANT_HOVER: Record<ButtonVariant, string> = {
  primary: '#2563EB',
  secondary: '#3A3A40',
  ghost: '#FFFFFF14',
  destructive: '#C03538',
  outline: '#FFFFFF14',
}
const VARIANT_ACTIVE: Record<ButtonVariant, string> = {
  primary: '#1D4ED8',
  secondary: '#52525B',
  ghost: '#FFFFFF24',
  destructive: '#A22B2E',
  outline: '#FFFFFF24',
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconRight,
  testId,
}: ButtonProps) {
  const height = HEIGHT[size]
  const padX = PAD_X[size]
  const fontSize = FONT_SIZE[size]
  const filled = variant === 'primary' || variant === 'destructive'
  const color = variant === 'ghost' || variant === 'outline' ? text.primary : '#FFFFFF'
  const blocked = disabled || loading

  return (
    <div
      testId={testId}
      onClick={blocked ? undefined : onClick}
      style={{
        alignSelf: 'flex-start',
        height,
        paddingLeft: padX,
        paddingRight: padX,
        borderRadius: 7,
        backgroundColor: VARIANT_BG[variant],
        borderWidth: variant === 'outline' ? 1 : 0,
        borderColor: border.strong,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        cursor: blocked ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        flexShrink: 0,
        hover: blocked ? undefined : { backgroundColor: VARIANT_HOVER[variant] },
        active: blocked ? undefined : { backgroundColor: VARIANT_ACTIVE[variant] },
      }}
    >
      {loading ? (
        <Icon name="loader" size={fontSize} color={color} />
      ) : icon ? (
        <Icon name={icon} size={fontSize} color={color} />
      ) : null}

      <text style={{ fontSize, fontWeight: 600, color, fontFamily: FONT, whiteSpace: 'nowrap' }}>{children}</text>

      {iconRight && !loading && <Icon name={iconRight} size={fontSize} color={color} />}
    </div>
  )
}

export interface ButtonGroupProps {
  children: ReactNode
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>{children}</div>
}
