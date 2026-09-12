/**
 * @atlas/ui — useCopyState
 *
 * The "copied ✓" flash used by CopyButton / SyntaxCodeBlock / GeneratedCodeCard.
 *
 * @example
 *   const { copied, copy } = useCopyState()
 *   <Button onClick={copy}>{copied ? 'Copied' : 'Copy'}</Button>
 */
import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopyState(resetMs = 1500) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = useCallback(() => {
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), resetMs)
  }, [resetMs])

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  return { copied, copy }
}
