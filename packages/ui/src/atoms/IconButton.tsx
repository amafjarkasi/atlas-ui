/**
 * @atlas/ui — IconButton atom
 *
 * A circular hit target wrapping an Icon with hover/active GPU states.
 * The `pad` prop controls both width and height (defaults to 26px).
 * Radius is automatically half of pad for a perfect circle.
 *
 * @example
 *   <IconButton icon="archive" onClick={archiveThread} />
 *   <IconButton icon="settings" size={15} pad={28} color="#3B82F6" />
 *   <IconButton icon="arrowLeft" dimmed />
 */
import { C, interact } from '../tokens'
import { Icon } from './Icon'
import type { IconName } from './Icon'

export interface IconButtonProps {
  icon: IconName
  onClick?: () => void
  size?: number
  color?: string
  dimmed?: boolean
  pad?: number
  testId?: string
}

export function IconButton({
  icon,
  onClick,
  size = 14,
  color = C.muted,
  dimmed = false,
  pad = 26,
  testId,
}: IconButtonProps) {
  return (
    <div
      testId={testId}
      onClick={onClick}
      style={{
        width: pad,
        height: pad,
        flexShrink: 0,
        borderRadius: Math.floor(pad / 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: dimmed ? 0.35 : 1,
        hover: dimmed ? undefined : { backgroundColor: interact.hover },
        active: dimmed ? undefined : { backgroundColor: interact.active },
      }}
    >
      <Icon name={icon} size={size} color={color} />
    </div>
  )
}
