/**
 * @atlas/ui — Card
 *
 * The foundational surface atom with Header / Body / Footer sub-parts.
 *
 * @example
 *   <Card>
 *     <CardHeader><CardTitle>Account</CardTitle><CardDescription>Manage your profile</CardDescription></CardHeader>
 *     <CardBody>…</CardBody>
 *     <CardFooter><Button variant="primary">Save</Button></CardFooter>
 *   </Card>
 */
import type { ReactNode } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'

export interface CardProps {
  children?: ReactNode
  padding?: number
  width?: number | string
  interactive?: boolean
  onClick?: () => void
}

export function Card({ children, padding = 16, width, interactive = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        alignSelf: 'flex-start',
        backgroundColor: surface.card,
        borderWidth: 1,
        borderColor: border.subtle,
        borderRadius: 10,
        padding,
        width,
        display: 'flex',
        flexDirection: 'column',
        cursor: interactive ? 'pointer' : 'default',
        hover: interactive ? { borderColor: border.strong } : undefined,
      }}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps {
  children?: ReactNode
}

export function CardHeader({ children }: CardHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: border.subtle,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  )
}

export interface CardTitleProps {
  children: ReactNode
}

export function CardTitle({ children }: CardTitleProps) {
  return <text style={{ fontSize: 14, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{children}</text>
}

export interface CardDescriptionProps {
  children: ReactNode
}

export function CardDescription({ children }: CardDescriptionProps) {
  return <text style={{ fontSize: 12, color: text.muted, fontFamily: FONT }}>{children}</text>
}

export interface CardBodyProps {
  children?: ReactNode
}

export function CardBody({ children }: CardBodyProps) {
  return <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>{children}</div>
}

export interface CardFooterProps {
  children?: ReactNode
}

export function CardFooter({ children }: CardFooterProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderColor: border.subtle,
        marginTop: 12,
      }}
    >
      {children}
    </div>
  )
}
