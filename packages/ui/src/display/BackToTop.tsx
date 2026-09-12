/**
 * @atlas/ui — BackToTop
 *
 * A floating "scroll to top" button. The app wires `visible` from its scroll
 * handler and provides `onClick` (scroll via `renderer.scrollTo`).
 *
 * @example
 *   {scrolled && <BackToTop onClick={() => scrollToTop()} />}
 */
import { IconButton } from '../atoms/IconButton'

export interface BackToTopProps {
  visible?: boolean
  onClick?: () => void
  pad?: number
}

export function BackToTop({ visible = true, onClick, pad = 30 }: BackToTopProps) {
  if (!visible) return null
  return (
    <div style={{ position: 'absolute', right: 16, bottom: 16 }}>
      <IconButton icon="arrowUp" pad={pad} onClick={onClick} />
    </div>
  )
}
