/** @atlas/ui — LicensesDialog — package/license list with expandable text. */
import { surface, border, text as t } from '../tokens'
import { FONT_MONO, FONT } from '../tokens'
import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogBody, DialogFooter } from '../overlays/Dialog'
import { Button } from '../atoms/Button'
import { Accordion } from '../layout/Accordion'

export interface LicenseEntry {
  name: string
  license: string
  text?: string
}

export interface LicensesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entries: LicenseEntry[]
}

export function LicensesDialog({ open, onOpenChange, entries }: LicensesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent width={520}>
          <DialogTitle>Licenses</DialogTitle>
          <DialogBody>
            <Accordion
              items={entries.map((e) => ({
                id: e.name,
                title: `${e.name} — ${e.license}`,
                content: (
                  <div style={{ maxHeight: 200, overflowY: 'scroll', padding: 8, backgroundColor: surface.code, borderRadius: 6 }}>
                    <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT_MONO, whiteSpace: 'normal', lineHeight: 1.5 }}>{e.text ?? 'No license text.'}</text>
                  </div>
                ),
              }))}
            />
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
