/** @atlas/ui — CrashDialog — unexpected-error screen with restart/report. */
import { surface, border, text as t } from '../tokens'
import { FONT, FONT_MONO } from '../tokens'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../overlays/Dialog'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'

export interface CrashDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  error?: string
  onRestart?: () => void
  onReport?: (details: string) => void
}

export function CrashDialog({ open, onOpenChange, error, onRestart, onReport }: CrashDialogProps) {
  const stackLines = (error ?? 'Unknown error').split('\n')
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent width={480}>
          <DialogHeader>
            <DialogTitle>Something went wrong</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 12,
                  paddingRight: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#ED424544',
                  backgroundColor: '#ED424514',
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: '#ED424526',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon name="alertCircle" size={13} color="#ED4245" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1, minWidth: 0 }}>
                  <div style={{ minHeight: 17 }}>
                    <text style={{ fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: FONT }}>The application crashed</text>
                  </div>
                  <div style={{ minHeight: 16 }}>
                    <text style={{ fontSize: 12, color: t.secondary, fontFamily: FONT }}>You can restart or send a report.</text>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  minHeight: 88,
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: border.subtle,
                  backgroundColor: surface.code,
                }}
              >
                {stackLines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      marginTop: i > 0 ? 6 : 0,
                      paddingTop: 1,
                      paddingBottom: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <text
                      style={{
                        fontSize: 11.5,
                        color: i === 0 ? t.primary : t.secondary,
                        fontFamily: FONT_MONO,
                      }}
                    >
                      {line.length > 0 ? line : ' '}
                    </text>
                  </div>
                ))}
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" size="md" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {onReport ? (
              <Button variant="secondary" size="md" onClick={() => onReport(error ?? '')}>
                Report
              </Button>
            ) : null}
            {onRestart ? (
              <Button variant="primary" size="md" onClick={onRestart}>
                Restart
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
