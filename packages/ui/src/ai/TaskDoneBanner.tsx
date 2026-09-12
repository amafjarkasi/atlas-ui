/**
 * @atlas-ui — TaskDoneBanner
 *
 * A task-complete checkpoint with optional confetti and an action (composes
 * `Alert` + `Confetti`).
 */
import { Alert } from '../display/Alert'
import { Button } from '../atoms/Button'
import { Confetti } from '../dataviz/Confetti'

export interface TaskDoneBannerProps {
  visible?: boolean
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  celebrate?: boolean
}

export function TaskDoneBanner({ visible = true, title = 'Done', description, actionLabel, onAction, celebrate = false }: TaskDoneBannerProps) {
  if (!visible) return null
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {celebrate ? <Confetti pieces={30} width={400} height={160} /> : null}
      <Alert variant="success" title={title} description={description} />
      {actionLabel && onAction ? (
        <div style={{ paddingTop: 8, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button size="sm" onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  )
}
