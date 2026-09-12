/**
 * @atlas/ui — AlertDialog
 *
 * A modal confirmation (distinct from the inline `Alert`). Defaults to a
 * destructive "are you sure" flow; Escape and backdrop click cancel.
 *
 * @example
 *   <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen} title="Delete thread?"
 *     description="This permanently deletes the thread." confirmLabel="Delete" onConfirm={deleteThread} />
 */
import { motion } from '@gpuix/react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'

export interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  destructive?: boolean
}

export function AlertDialog({
  open,
  onOpenChange,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  destructive = true,
}: AlertDialogProps) {
  if (!open) return null
  const close = () => onOpenChange(false)

  return (
    <div
      tabIndex={0}
      autoFocus
      onKeyDown={(e) => {
        if (e.key?.toLowerCase() === 'escape') close()
      }}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <div
        onClick={close}
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#000000', opacity: 0.5 }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{
          width: 380,
          maxWidth: '100%',
          backgroundColor: surface.overlay,
          borderWidth: 1,
          borderColor: border.strong,
          borderRadius: 12,
          boxShadow: { offsetX: 0, offsetY: 16, blurRadius: 48, spreadRadius: 0, color: '#00000088' },
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
          {destructive ? (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#ED42451A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon name="alertTriangle" size={16} color="#ED4245" />
            </div>
          ) : null}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <text style={{ fontSize: 14, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text>
            {description ? (
              <text style={{ fontSize: 12.5, color: text.secondary, fontFamily: FONT, lineHeight: 1.5 }}>{description}</text>
            ) : null}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="ghost" onClick={close}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? 'destructive' : 'primary'}
            onClick={() => {
              onConfirm?.()
              close()
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
