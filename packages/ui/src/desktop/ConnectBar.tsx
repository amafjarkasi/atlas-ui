/** @atlas/ui — ConnectBar — offline/reconnecting banner with retry. */
import { FONT } from '../tokens'
import { text as t } from '../tokens'
import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'

export interface ConnectBarProps {
  state: 'offline' | 'reconnecting' | 'error'
  onRetry?: () => void
}

const COPY: Record<ConnectBarProps['state'], { label: string; color: string; icon: 'alertTriangle' | 'alertCircle' | 'refresh' }> = {
  offline: { label: 'You are offline', color: '#EAB308', icon: 'alertTriangle' },
  reconnecting: { label: 'Reconnecting…', color: '#EAB308', icon: 'refresh' },
  error: { label: 'Connection lost', color: '#ED4245', icon: 'alertCircle' },
}

export function ConnectBar({ state, onRetry }: ConnectBarProps) {
  const cfg = COPY[state]
  const showRetry = state !== 'reconnecting' && !!onRetry
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', gap: 8, width: '100%', height: 32 }}>
      <div
        style={{
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: cfg.color + '44',
          backgroundColor: cfg.color + '14',
        }}
      >
        <Icon name={cfg.icon} size={14} color={cfg.color} />
        <text style={{ fontSize: 12.5, fontWeight: 600, color: t.primary, fontFamily: FONT }}>{cfg.label}</text>
      </div>
      {showRetry ? (
        <Button size="md" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  )
}
