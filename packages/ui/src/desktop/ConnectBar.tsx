/** @atlas/ui — ConnectBar — offline/reconnecting banner with retry. */
import { Alert } from '../display/Alert'
import { Button } from '../atoms/Button'

export interface ConnectBarProps {
  state: 'offline' | 'reconnecting' | 'error'
  onRetry?: () => void
}

export function ConnectBar({ state, onRetry }: ConnectBarProps) {
  const variant = state === 'error' ? 'error' : 'warning'
  const text = state === 'offline' ? 'You are offline' : state === 'reconnecting' ? 'Reconnecting…' : 'Connection lost'
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <div style={{ flexGrow: 1 }}>
        <Alert variant={variant} title={text} />
      </div>
      {state !== 'reconnecting' && onRetry ? <Button size="sm" onClick={onRetry}>Retry</Button> : null}
    </div>
  )
}
