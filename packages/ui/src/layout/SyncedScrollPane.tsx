/**
 * @atlas/ui — SyncedScrollPane
 *
 * Two scroll regions locked to the same position (diff, translation, log-vs-
 * trace). Scrolling one drives the other via `renderer.scrollTo`.
 *
 * @example
 *   <SyncedScrollPane left={leftPane} right={rightPane} />
 */
import { useRef, type ReactNode } from 'react'
import { useGpuix } from '@gpuix/react'
import { border } from '../tokens'

export interface SyncedScrollPaneProps {
  left: ReactNode
  right: ReactNode
  height?: number | string
}

export function SyncedScrollPane({ left, right, height = '100%' }: SyncedScrollPaneProps) {
  const { renderer } = useGpuix()
  const leftRef = useRef<any>(null)
  const rightRef = useRef<any>(null)

  const sync = (from: any, to: any) => {
    if (!renderer?.getScrollOffset || !renderer.scrollTo) return
    const off = renderer.getScrollOffset(from.current?.id)
    if (off) renderer.scrollTo(to.current?.id, off[0], off[1])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height, width: '100%' }}>
      <div
        ref={leftRef}
        onScroll={() => sync(leftRef, rightRef)}
        style={{ flexGrow: 1, flexBasis: 0, overflowY: 'scroll', flexDirection: 'column', borderRightWidth: 1, borderColor: border.subtle }}
      >
        {left}
      </div>
      <div
        ref={rightRef}
        onScroll={() => sync(rightRef, leftRef)}
        style={{ flexGrow: 1, flexBasis: 0, overflowY: 'scroll', flexDirection: 'column' }}
      >
        {right}
      </div>
    </div>
  )
}
