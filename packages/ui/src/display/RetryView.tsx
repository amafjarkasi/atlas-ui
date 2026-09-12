/**
 * @atlas/ui — RetryView
 *
 * An error/empty state with a retry action (composes `EmptyState` + `Button`).
 *
 * @example
 *   <RetryView description="We couldn't load results." onRetry={refetch} />
 */
import { EmptyState } from './EmptyState'
import { Button } from '../atoms/Button'

export interface RetryViewProps {
  title?: string
  description?: string
  retryLabel?: string
  onRetry?: () => void
}

export function RetryView({ title = 'Something went wrong', description, retryLabel = 'Retry', onRetry }: RetryViewProps) {
  return (
    <EmptyState icon="alertTriangle" title={title} description={description} action={onRetry ? <Button onClick={onRetry}>{retryLabel}</Button> : undefined} />
  )
}
