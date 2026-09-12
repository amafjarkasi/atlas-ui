/**
 * @atlas/ui — useWindowQuery & useIsCompact
 *
 * Width-threshold queries over `useWindowSize` (GPUIX polls window size).
 *
 * @example
 *   const compact = useIsCompact(760)
 *   const q = useWindowQuery({ min: 600, max: 1000 })
 */
import { useWindowSize } from '@gpuix/react'

export interface WindowQuery {
  min?: number
  max?: number
}

export function useWindowQuery({ min, max }: WindowQuery): boolean {
  const win = useWindowSize()
  return (min === undefined || win.width >= min) && (max === undefined || win.width <= max)
}

export function useIsCompact(threshold = 720): boolean {
  return useWindowQuery({ max: threshold - 1 })
}
