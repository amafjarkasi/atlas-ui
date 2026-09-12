/** @atlas/ui — ReleaseNotesDialog — changelog in markdown. */
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../overlays/Dialog'
import { Button } from '../atoms/Button'
import { ScrollArea } from '../layout/ScrollArea'

export interface ReleaseNotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  markdown: string
  version?: string
}

export function ReleaseNotesDialog({ open, onOpenChange, markdown, version }: ReleaseNotesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent width={520}>
          <DialogHeader>
            <DialogTitle>{version ? `What's new in ${version}` : "What's new"}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <ScrollArea height={360}>
              <markdown source={markdown} />
            </ScrollArea>
          </DialogBody>
          <DialogFooter>
            <Button size="md" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
