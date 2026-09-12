/**
 * @atlas/ui — ToastWithProgress
 *
 * A bottom toast that shows a progress bar (composes `ProgressBar`).
 *
 * @example
 *   <ToastWithProgress visible={uploading} message="Uploading…" progress={42} onDismiss={cancel} />
 */
import { motion } from '@gpuix/react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { ProgressBar } from '../inputs/ProgressBar'

export interface ToastWithProgressProps {
  visible: boolean
  message: string
  progress?: number
  onDismiss?: () => void
}

export function ToastWithProgress({ visible, message, progress = 0, onDismiss }: ToastWithProgressProps) {
  if (!visible) return null

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 20, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <motion.div
        initial={{ opacity: 0, bottom: -12 }}
        animate={{ opacity: 1, bottom: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          width: 320,
          padding: 14,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: border.strong,
          backgroundColor: surface.overlay,
          boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, paddingBottom: 10 }}>
          <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT, flexGrow: 1 }}>{message}</text>
          {onDismiss ? (
            <div onClick={onDismiss} style={{ cursor: 'pointer', width: 18, height: 18, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', hover: { backgroundColor: '#FFFFFF14' } }}>
              <Icon name="x" size={11} color={text.muted} />
            </div>
          ) : null}
        </div>
        <ProgressBar value={progress} height={4} />
      </motion.div>
    </div>
  )
}
