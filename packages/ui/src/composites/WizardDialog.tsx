/**
 * @atlas/ui — WizardDialog
 *
 * A multi-step modal with a step indicator and back/next/finish controls
 * (composes `Dialog` + `StepIndicator` + `Button`).
 *
 * @example
 *   <WizardDialog open={open} onOpenChange={setOpen} steps={steps} current={i} onNext={next} onPrev={prev} onFinish={done} />
 */
import type { ReactNode } from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../overlays/Dialog'
import { StepIndicator } from '../display/StepIndicator'
import { Button } from '../atoms/Button'

export interface WizardStep {
  title: string
  content: ReactNode
}

export interface WizardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  steps: WizardStep[]
  current: number
  onNext?: () => void
  onPrev?: () => void
  onFinish?: () => void
}

export function WizardDialog({ open, onOpenChange, steps, current, onNext, onPrev, onFinish }: WizardDialogProps) {
  const isLast = current >= steps.length - 1
  const step = steps[current]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent width={480}>
          <DialogHeader>
            <DialogTitle>{step?.title}</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <StepIndicator steps={steps.map((s) => ({ label: s.title }))} current={current} />
            <div style={{ paddingTop: 12 }}>{step?.content}</div>
          </DialogBody>

          <DialogFooter>
            {current > 0 ? (
              <Button variant="ghost" onClick={onPrev}>
                Back
              </Button>
            ) : null}
            {isLast ? <Button onClick={onFinish}>Finish</Button> : <Button onClick={onNext}>Next</Button>}
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
