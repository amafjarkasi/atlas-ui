/** @atlas/ui — AboutDialog — app name/version/license. */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogBody, DialogFooter } from '../overlays/Dialog'
import { Button } from '../atoms/Button'
import { IconLabel } from '../atoms/IconLabel'

export interface AboutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appName: string
  version?: string
  description?: string
  license?: string
}

export function AboutDialog({ open, onOpenChange, appName, version, description, license }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent width={360}>
          <DialogTitle>{appName}</DialogTitle>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {version ? <text style={{ fontSize: 12, color: t.muted, fontFamily: FONT }}>Version {version}</text> : null}
              {description ? <text style={{ fontSize: 12.5, color: t.secondary, fontFamily: FONT }}>{description}</text> : null}
              {license ? <IconLabel icon="shield" label={license} /> : null}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
