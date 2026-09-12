/**
 * @atlas/ui — FormCard
 *
 * A standard settings/form layout: card with a title/description header, a
 * body of fields, and a footer with Save/Cancel (composes `Card` + `Button`).
 */
import type { ReactNode } from 'react'
import { border, text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Card } from './Card'
import { Button } from '../atoms/Button'

export interface FormCardProps {
  title?: string
  description?: string
  children?: ReactNode
  actions?: ReactNode
  submitLabel?: string
  cancelLabel?: string
  onSubmit?: () => void
  onCancel?: () => void
  width?: number | string
}

export function FormCard({ title, description, children, actions, submitLabel = 'Save', cancelLabel = 'Cancel', onSubmit, onCancel, width }: FormCardProps) {
  const footer =
    actions ??
    (onSubmit || onCancel ? (
      <>
        {onCancel ? <Button variant="ghost" onClick={onCancel}>{cancelLabel}</Button> : null}
        {onSubmit ? <Button onClick={onSubmit}>{submitLabel}</Button> : null}
      </>
    ) : null)

  return (
    <Card padding={16} width={width}>
      {title || description ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
          {title ? <text style={{ fontSize: 14, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>{title}</text> : null}
          {description ? <text style={{ fontSize: 12, color: textTokens.muted, fontFamily: FONT }}>{description}</text> : null}
        </div>
      ) : null}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>

      {footer ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'flex-end', paddingTop: 14, borderTopWidth: 1, borderColor: border.subtle, marginTop: 14 }}>
          {footer}
        </div>
      ) : null}
    </Card>
  )
}
