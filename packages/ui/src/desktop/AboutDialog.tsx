/** @atlas/ui — AboutDialog — app name/version/license. */
import { border, surface, text as t, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../overlays/Dialog'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'

export interface AboutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appName: string
  version?: string
  description?: string
  license?: string
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

export function AboutDialog({ open, onOpenChange, appName, version, description, license }: AboutDialogProps) {
  const descriptionLines = description ? wrapWords(description, 40) : []
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent width={400}>
          <DialogHeader>
            <DialogTitle>About</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: '#3B82F622',
                  borderWidth: 1,
                  borderColor: '#3B82F655',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="sparkle" size={26} color={semantic.accent} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <text style={{ fontSize: 18, fontWeight: 700, color: t.primary, fontFamily: FONT }}>{appName}</text>
                {version ? (
                  <div
                    style={{
                      paddingTop: 3,
                      paddingBottom: 3,
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderRadius: 999,
                      backgroundColor: surface.selected,
                      borderWidth: 1,
                      borderColor: border.subtle,
                    }}
                  >
                    <text style={{ fontSize: 11.5, color: t.muted, fontFamily: FONT }}>{`Version ${version}`}</text>
                  </div>
                ) : null}
              </div>
              {descriptionLines.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, paddingTop: 2 }}>
                  {descriptionLines.map((line) => (
                    <text key={line} style={{ fontSize: 13, color: t.secondary, fontFamily: FONT, lineHeight: 1.35 }}>
                      {line}
                    </text>
                  ))}
                </div>
              ) : null}
              {license ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    paddingTop: 6,
                    paddingBottom: 6,
                    paddingLeft: 12,
                    paddingRight: 12,
                    borderRadius: 8,
                    backgroundColor: surface.base,
                    borderWidth: 1,
                    borderColor: border.subtle,
                  }}
                >
                  <Icon name="shield" size={13} color={t.muted} />
                  <text style={{ fontSize: 12, color: t.secondary, fontFamily: FONT }}>{license}</text>
                </div>
              ) : null}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
