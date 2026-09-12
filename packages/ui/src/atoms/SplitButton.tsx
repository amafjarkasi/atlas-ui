/**
 * @atlas/ui — SplitButton
 *
 * A button with a primary action plus a chevron that opens a dropdown menu.
 *
 * @example
 *   <SplitButton onClick={send} icon="send" items={[{ label: 'Schedule…', icon: 'clock', onSelect: schedule }]}>Send</SplitButton>
 */
import { useState, type ReactNode } from 'react'
import { semantic, surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'
import type { ButtonVariant, ButtonSize } from './Button'

export interface SplitButtonItem {
  label: string
  icon?: IconName
  onSelect?: () => void
  disabled?: boolean
  destructive?: boolean
}

export interface SplitButtonProps {
  children: ReactNode
  onClick?: () => void
  items: SplitButtonItem[]
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  icon?: IconName
}

const HEIGHT: Record<ButtonSize, number> = { sm: 26, md: 32, lg: 40 }
const PAD_X: Record<ButtonSize, number> = { sm: 10, md: 14, lg: 18 }
const FONT_SIZE: Record<ButtonSize, number> = { sm: 12, md: 13, lg: 14 }
const BG: Record<ButtonVariant, string> = {
  primary: semantic.accent,
  secondary: surface.selected,
  ghost: 'transparent',
  destructive: '#ED4245',
  outline: 'transparent',
}
const HOVER: Record<ButtonVariant, string> = {
  primary: '#2563EB',
  secondary: '#3A3A40',
  ghost: '#FFFFFF14',
  destructive: '#C03538',
  outline: '#FFFFFF14',
}

export function SplitButton({
  children,
  onClick,
  items,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
}: SplitButtonProps) {
  const [open, setOpen] = useState(false)
  const h = HEIGHT[size]
  const color = variant === 'ghost' || variant === 'outline' ? text.primary : '#FFFFFF'

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', position: 'relative', alignSelf: 'flex-start' }}>
      <div
        onClick={disabled ? undefined : onClick}
        style={{
          paddingLeft: PAD_X[size],
          paddingRight: PAD_X[size],
          height: h,
          borderTopLeftRadius: 7,
          borderBottomLeftRadius: 7,
          backgroundColor: BG[variant],
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: border.strong,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          hover: disabled ? undefined : { backgroundColor: HOVER[variant] },
        }}
      >
        {icon && <Icon name={icon} size={FONT_SIZE[size]} color={color} />}
        <text style={{ fontSize: FONT_SIZE[size], fontWeight: 600, color, fontFamily: FONT, whiteSpace: 'nowrap' }}>
          {children}
        </text>
      </div>

      <div
        onClick={disabled ? undefined : () => setOpen((o) => !o)}
        style={{
          width: 22,
          height: h,
          borderTopRightRadius: 7,
          borderBottomRightRadius: 7,
          backgroundColor: BG[variant],
          borderLeftWidth: 1,
          borderColor: '#FFFFFF22',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          hover: disabled ? undefined : { backgroundColor: HOVER[variant] },
        }}
      >
        <Icon name="chevronDown" size={11} color={color} />
      </div>

      {open ? (
        <anchored side="bottom" align="end" gap={4} fit="switch" onMouseDownOutside={() => setOpen(false)}>
          <div
            style={{
              backgroundColor: surface.overlay,
              borderWidth: 1,
              borderColor: border.strong,
              borderRadius: 8,
              paddingTop: 4,
              paddingBottom: 4,
              minWidth: 180,
              flexDirection: 'column',
              boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
            }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  if (!item.disabled) {
                    item.onSelect?.()
                    setOpen(false)
                  }
                }}
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 6,
                  paddingBottom: 6,
                  borderRadius: 5,
                  marginLeft: 4,
                  marginRight: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  hover: item.disabled ? undefined : { backgroundColor: surface.selected },
                }}
              >
                {item.icon && <Icon name={item.icon} size={13} color={item.destructive ? '#ED4245' : text.secondary} />}
                <text
                  style={{
                    fontSize: 12.5,
                    color: item.destructive ? '#ED4245' : item.disabled ? text.ghost : text.primary,
                    fontFamily: FONT,
                    flexGrow: 1,
                  }}
                >
                  {item.label}
                </text>
              </div>
            ))}
          </div>
        </anchored>
      ) : null}
    </div>
  )
}
