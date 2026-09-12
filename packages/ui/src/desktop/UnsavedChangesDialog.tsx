/** @atlas/ui — UnsavedChangesDialog — Save / Discard / Cancel prompt. */
import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogBody, DialogFooter } from '../overlays/Dialog'
import { Button } from '../atoms/Button'

export interface UnsavedChangesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: () => void
  onDiscard?: () => void
  label?: string
}

export function UnsavedChangesDialog({ open, onOpenChange, onSave, onDiscard, label = 'There are unsaved changes.' }: UnsavedChangesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent width={380}>
          <DialogTitle>Discard changes?</DialogTitle>
          <DialogBody>{label}</DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button variant="destructive" onClick={onDiscard}>Discard</Button>
            <Button onClick={onSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
