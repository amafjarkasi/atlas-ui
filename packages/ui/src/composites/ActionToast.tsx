/**
 * @atlas/ui — ActionToast
 *
 * A bottom-centered toast with an inline action button and dismiss (composes
 * `Button` + `Icon`). Self-contained (does not use the module toast queue).
 *
 * @example
 *   <ActionToast visible={showUndo} message="3 items archived" actionLabel="Undo" onAction={undo} onDismiss={hide} />
 */
import { motion } from '@gpuix/react'
import { surface, border, text, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'

export type ActionToastVariant = 'default' | 'success' | 'error' | 'warning'

export interface ActionToastProps {
  visible: boolean
  message: string
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  variant?: ActionToastVariant
}

const VARIANT_COLOR: Record<ActionToastVariant, string> = {
  default: semantic.accent,
  success: '#22C55E',
  error: '#ED4245',
  warning: '#EAB308',
}

export function ActionToast({
  visible,
  message,
  actionLabel = 'Undo',
  onAction,
  onDismiss,
  variant = 'default',
}: ActionToastProps) {
  if (!visible) return null
  const color = VARIANT_COLOR[variant]

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        initial={{ opacity: 0, bottom: -12 }}
        animate={{ opacity: 1, bottom: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingLeft: 14,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: border.strong,
          backgroundColor: surface.overlay,
          boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color, flexShrink: 0 }} />
        <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT }}>{message}</text>
        {onAction ? (
          <Button size="sm" variant="ghost" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
        {onDismiss ? (
          <div
            onClick={onDismiss}
            style={{ cursor: 'pointer', width: 18, height: 18, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', hover: { backgroundColor: '#FFFFFF14' } }}
          >
            <Icon name="x" size={11} color={text.muted} />
          </div>
        ) : null}
      </motion.div>
    </div>
  )
}
