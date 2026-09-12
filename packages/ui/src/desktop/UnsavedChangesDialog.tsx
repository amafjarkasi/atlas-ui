/** @atlas/ui — UnsavedChangesDialog — Save / Discard / Cancel prompt. */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../overlays/Dialog'
import { Button } from '../atoms/Button'

export interface UnsavedChangesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: () => void
  onDiscard?: () => void
  label?: string
}

function wrapWords(input: string, maxChars: number): string[] {
  const words = input.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines
}

export function UnsavedChangesDialog({
  open,
  onOpenChange,
  onSave,
  onDiscard,
  label = 'There are unsaved changes.',
}: UnsavedChangesDialogProps) {
  const labelLines = wrapWords(label, 44)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent width={380}>
          <DialogHeader>
            <DialogTitle>Unsaved changes</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {labelLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    marginTop: i > 0 ? 8 : 0,
                    paddingTop: 2,
                    paddingBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <text style={{ fontSize: 13, color: t.secondary, fontFamily: FONT }}>{line}</text>
                </div>
              ))}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" size="md" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="md" onClick={onDiscard}>
              Discard
            </Button>
            <Button variant="primary" size="md" onClick={onSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
