/**
 * @atlas/ui — ResizablePanel
 *
 * A minimal, dependency-free split-pane group (à la Radix `PanelGroup`).
 * Panels are sized as fractions that sum to 1; dragging a handle rebalances the
 * two adjacent panels. The drag math mirrors the proven pattern in app.tsx:
 * the group root owns `onMouseMove`/`onMouseUp`, handles own `onMouseDown`.
 *
 * Usage:
 *   <PanelGroup defaultSizes={[0.22, 0.42, 0.36]} minSize={120}>
 *     <Panel>sidebar</Panel>
 *     <PanelResizeHandle />
 *     <Panel>list</Panel>
 *     <PanelResizeHandle />
 *     <Panel>reading pane</Panel>
 *   </PanelGroup>
 */
import {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
  type ReactNode,
} from 'react'
import { useWindowSize } from '@gpuix/react'
import { semantic } from '../tokens'

type Direction = 'horizontal' | 'vertical'

interface PanelGroupContextValue {
  sizes: number[]
  direction: Direction
  activeIndex: number | null
  startResize: (index: number, coord: number) => void
}

const PanelGroupContext = createContext<PanelGroupContextValue>({
  sizes: [],
  direction: 'horizontal',
  activeIndex: null,
  startResize: () => {},
})

export interface PanelGroupProps {
  children: ReactNode
  direction?: Direction
  /** Fraction per panel (sums to 1). Defaults to equal split. */
  defaultSizes?: number[]
  /** Controlled fractions. */
  sizes?: number[]
  onSizesChange?: (sizes: number[]) => void
  /** Pixel size along the main axis. Defaults to window width/height. */
  totalSize?: number
  /** Minimum pixel size per panel. */
  minSize?: number
}

export function PanelGroup({
  children,
  direction = 'horizontal',
  defaultSizes,
  sizes: sizesProp,
  onSizesChange,
  totalSize,
  minSize = 0,
}: PanelGroupProps) {
  const win = useWindowSize()

  const panelCount = useMemo(() => {
    let n = 0
    Children.forEach(children, (child) => {
      if (isValidElement(child) && (child.type as any)?.__isPanel) n++
    })
    return n
  }, [children])

  const [internalSizes, setInternalSizes] = useState<number[]>(() =>
    defaultSizes ?? Array(Math.max(1, panelCount)).fill(1 / Math.max(1, panelCount)),
  )

  const sizes = sizesProp ?? internalSizes
  const setSizes = useCallback(
    (next: number[]) => {
      if (!sizesProp) setInternalSizes(next)
      onSizesChange?.(next)
    },
    [sizesProp, onSizesChange],
  )

  const dragState = useRef<{ index: number; startCoord: number; startSizes: number[] } | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const totalPx = totalSize ?? (direction === 'horizontal' ? win.width : win.height)

  const startResize = useCallback(
    (index: number, coord: number) => {
      dragState.current = { index, startCoord: coord, startSizes: sizes }
      setActiveIndex(index)
    },
    [sizes],
  )

  const handleMove = useCallback(
    (coord: number) => {
      const st = dragState.current
      if (!st) return
      const deltaFrac = totalPx > 0 ? (coord - st.startCoord) / totalPx : 0
      const minFrac = totalPx > 0 ? minSize / totalPx : 0
      const next = [...st.startSizes]
      const a = st.index
      const b = st.index + 1
      if (a < 0 || b >= next.length) return

      let d = deltaFrac
      // Keep both adjacent panels at or above the minimum.
      if (d < minFrac - next[a]) d = minFrac - next[a]
      if (d > next[b] - minFrac) d = next[b] - minFrac

      next[a] += d
      next[b] -= d
      setSizes(next)
    },
    [totalPx, minSize, setSizes],
  )

  const endResize = useCallback(() => {
    dragState.current = null
    setActiveIndex(null)
  }, [])

  const ctx = useMemo(
    () => ({ sizes, direction, activeIndex, startResize }),
    [sizes, direction, activeIndex, startResize],
  )

  const rendered = useMemo(() => {
    let panelIdx = 0
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child
      const t = child.type as any
      if (t?.__isPanel) {
        const el = cloneElement(child, { __index: panelIdx, __size: sizes[panelIdx] } as any)
        panelIdx++
        return el
      }
      if (t?.__isHandle) {
        // A handle sits between the panel before it and the next one.
        const el = cloneElement(child, { __index: panelIdx - 1 } as any)
        return el
      }
      return child
    })
  }, [children, sizes])

  return (
    <PanelGroupContext.Provider value={ctx}>
      <div
        onMouseMove={(e) => handleMove(direction === 'horizontal' ? (e.x ?? 0) : (e.y ?? 0))}
        onMouseUp={endResize}
        style={{
          display: 'flex',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          width: '100%',
          height: '100%',
          flexGrow: 1,
        }}
      >
        {rendered}
      </div>
    </PanelGroupContext.Provider>
  )
}

export interface PanelProps {
  children?: ReactNode
  /** Minimum pixel size along the main axis. */
  minSize?: number
}

interface PanelInternalProps extends PanelProps {
  __index?: number
  __size?: number
}

export function Panel({ children, minSize = 0, __index = 0, __size }: PanelInternalProps) {
  const { sizes, direction } = useContext(PanelGroupContext)
  const size = __size ?? sizes[__index] ?? 0
  const min = minSize || 0

  return (
    <div
      style={{
        flexGrow: size * 1000,
        flexShrink: 0,
        flexBasis: 0,
        minWidth: direction === 'horizontal' ? min : undefined,
        minHeight: direction === 'vertical' ? min : undefined,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}
;(Panel as any).__isPanel = true

export interface PanelResizeHandleProps {
  children?: ReactNode
  /** Pixel thickness of the hit area. */
  size?: number
  /** Optional accent color while dragging. */
  color?: string
}

interface PanelResizeHandleInternalProps extends PanelResizeHandleProps {
  __index?: number
}

export function PanelResizeHandle({
  children,
  size = 5,
  color = semantic.accent,
  __index = 0,
}: PanelResizeHandleInternalProps) {
  const { direction, activeIndex, startResize } = useContext(PanelGroupContext)
  const active = activeIndex === __index

  return (
    <div
      onMouseDown={(e) => startResize(__index, direction === 'horizontal' ? (e.x ?? 0) : (e.y ?? 0))}
      style={{
        flexShrink: 0,
        width: direction === 'horizontal' ? size : '100%',
        height: direction === 'horizontal' ? '100%' : size,
        cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize',
        backgroundColor: active ? color : 'transparent',
        hover: { backgroundColor: active ? color : '#FFFFFF22' },
      }}
    >
      {children}
    </div>
  )
}
;(PanelResizeHandle as any).__isHandle = true
