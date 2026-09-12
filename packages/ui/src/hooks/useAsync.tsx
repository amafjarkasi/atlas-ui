/**
 * @atlas/ui — useAsync
 *
 * Loading/data/error state machine around an async function (fetches, model
 * calls), with a re-run guard against post-unmount state updates.
 */
import { useCallback, useEffect, useState } from 'react'
import { useIsMounted } from './useIsMounted'

export interface AsyncState<T> {
  data?: T
  error?: unknown
  loading: boolean
}

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): AsyncState<T> & { run: () => void } {
  const mounted = useIsMounted()
  const [state, setState] = useState<AsyncState<T>>({ loading: true })

  const run = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: undefined }))
    fn()
      .then((data) => {
        if (mounted()) setState({ data, loading: false })
      })
      .catch((error) => {
        if (mounted()) setState({ error, loading: false })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, mounted, ...deps])

  useEffect(() => {
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { ...state, run }
}
