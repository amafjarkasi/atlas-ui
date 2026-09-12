/** @atlas/ui — CrashDialog — unexpected-error screen with restart/report. */
import { surface, border, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogBody, DialogFooter } from '../overlays/Dialog'
import { Button } from '../atoms/Button'
import { Alert } from '../display/Alert'

export interface CrashDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  error?: string
  onRestart?: () => void
  onReport?: (details: string) => void
}

export function CrashDialog({ open, onOpenChange, error, onRestart, onReport }: CrashDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent width={460}>
          <DialogTitle>Something went wrong</DialogTitle>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Alert variant="error" title="The application crashed" description="You can restart or send a report." />
              <textarea value={error ?? ''} readOnly minRows={4} maxRows={8} style={{ fontSize: 11.5, color: t.secondary, fontFamily: FONT, backgroundColor: surface.code, borderRadius: 8, borderWidth: 1, borderColor: border.subtle, padding: 8 }} />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
            {onReport ? <Button variant="secondary" onClick={() => onReport(error ?? '')}>Report</Button> : null}
            {onRestart ? <Button onClick={onRestart}>Restart</Button> : null}
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
