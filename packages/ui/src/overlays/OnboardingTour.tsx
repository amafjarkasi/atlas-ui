/**
 * @atlas/ui — OnboardingTour
 *
 * A guided tour / coach-mark card with a dimmed backdrop, step dots, and
 * prev/next. Pair it with `Spotlight` (exported here) to anchor callouts to
 * specific targets via the native `<anchored>` primitive.
 *
 * @example
 *   <OnboardingTour open={tour} steps={steps} current={i} onNext={next} onPrev={prev} onClose={close} />
 *   <Spotlight active={tour && i === 0} title="Compose" description="Write a new message" side="bottom">
 *     <IconButton icon="compose" />
 *   </Spotlight>
 */
import type { ReactNode } from 'react'
import { motion } from '@gpuix/react'
import { surface, border, text, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Button } from '../atoms/Button'

export interface TourStep {
  title: string
  description: string
}

export interface OnboardingTourProps {
  open: boolean
  steps: TourStep[]
  current: number
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
}

export function OnboardingTour({ open, steps, current, onClose, onNext, onPrev }: OnboardingTourProps) {
  if (!open) return null
  const step = steps[current]
  const isLast = current >= steps.length - 1

  return (
    <div
      tabIndex={0}
      autoFocus
      onKeyDown={(e) => {
        if (e.key?.toLowerCase() === 'escape') onClose()
      }}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 120,
      }}
    >
      <div
        onClick={onClose}
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#000000', opacity: 0.5 }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{
          width: 360,
          maxWidth: '90%',
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
        {step ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <text style={{ fontSize: 15, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{step.title}</text>
              <text style={{ fontSize: 12.5, color: text.secondary, fontFamily: FONT, lineHeight: 1.5 }}>
                {step.description}
              </text>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                {steps.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: i === current ? semantic.accent : border.strong,
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                {current > 0 ? (
                  <Button variant="ghost" onClick={onPrev}>
                    Back
                  </Button>
                ) : null}
                {isLast ? <Button onClick={onClose}>Done</Button> : <Button onClick={onNext}>Next</Button>}
              </div>
            </div>
          </>
        ) : null}
      </motion.div>
    </div>
  )
}

export interface SpotlightProps {
  active: boolean
  title: string
  description?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  children: ReactNode
}

/**
 * A coach-mark callout anchored to a specific target element. Wrap the target
 * in `<Spotlight active={…}>` and it will render the callout beside it using
 * the native `<anchored>` primitive.
 */
export function Spotlight({
  active,
  title,
  description,
  side = 'bottom',
  align = 'center',
  children,
}: SpotlightProps) {
  return (
    <div style={{ position: 'relative' }}>
      {children}
      {active ? (
        <anchored side={side} align={align} gap={8} fit="switch">
          <div
            style={{
              width: 260,
              backgroundColor: surface.overlay,
              borderWidth: 1,
              borderColor: border.strong,
              borderRadius: 10,
              padding: 14,
              flexDirection: 'column',
              gap: 4,
              boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' },
            }}
          >
            <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text>
            {description ? (
              <text style={{ fontSize: 12, color: text.secondary, fontFamily: FONT, lineHeight: 1.4 }}>{description}</text>
            ) : null}
          </div>
        </anchored>
      ) : null}
    </div>
  )
}
