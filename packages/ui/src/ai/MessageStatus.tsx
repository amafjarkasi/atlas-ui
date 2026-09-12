/**
 * @atlas/ui — MessageStatus
 *
 * A message delivery status indicator (sending / sent / delivered / error with
 * retry) for chat UIs.
 *
 * @example
 *   <MessageStatus status="error" onRetry={resend} />
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export type MessageStatusValue = 'sending' | 'sent' | 'delivered' | 'error'

export interface MessageStatusProps {
  status: MessageStatusValue
  onRetry?: () => void
}

const LABEL: Record<MessageStatusValue, string> = {
  sending: 'Sending',
  sent: 'Sent',
  delivered: 'Delivered',
  error: 'Failed',
}
const COLOR: Record<MessageStatusValue, string> = {
  sending: textTokens.muted,
  sent: textTokens.muted,
  delivered: '#22C55E',
  error: '#ED4245',
}
const ICON: Record<MessageStatusValue, 'clock' | 'check' | 'checkCircle' | 'alertCircle'> = {
  sending: 'clock',
  sent: 'check',
  delivered: 'checkCircle',
  error: 'alertCircle',
}

export function MessageStatus({ status, onRetry }: MessageStatusProps) {
  const isError = status === 'error'
  return (
    <div
      onClick={isError ? onRetry : undefined}
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, cursor: isError && onRetry ? 'pointer' : 'default' }}
    >
      <Icon name={ICON[status]} size={11} color={COLOR[status]} />
      <text style={{ fontSize: 10.5, color: COLOR[status], fontFamily: FONT }}>{LABEL[status]}</text>
    </div>
  )
}
