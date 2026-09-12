/**
 * @atlas/ui — useListState
 *
 * Array CRUD (add/remove/move/update) for TagInput / TransferList /
 * ReorderableList-style data.
 */
import { useCallback, useState } from 'react'

export interface UseListStateReturn<T> {
  items: T[]
  setItems: (items: T[]) => void
  push: (item: T) => void
  removeAt: (index: number) => void
  updateAt: (index: number, item: T) => void
  move: (from: number, to: number) => void
  insertAt: (index: number, item: T) => void
  clear: () => void
}

export function useListState<T>(initial: T[] = []): UseListStateReturn<T> {
  const [items, setItems] = useState<T[]>(initial)

  const push = useCallback((item: T) => setItems((prev) => [...prev, item]), [])
  const removeAt = useCallback((index: number) => setItems((prev) => prev.filter((_, i) => i !== index)), [])
  const updateAt = useCallback(
    (index: number, item: T) => setItems((prev) => prev.map((x, i) => (i === index ? item : x))),
    [],
  )
  const move = useCallback(
    (from: number, to: number) =>
      setItems((prev) => {
        const next = [...prev]
        const [moved] = next.splice(from, 1)
        if (moved !== undefined) next.splice(to, 0, moved)
        return next
      }),
    [],
  )
  const insertAt = useCallback((index: number, item: T) => setItems((prev) => [...prev.slice(0, index), item, ...prev.slice(index)]), [])
  const clear = useCallback(() => setItems([]), [])

  return { items, setItems, push, removeAt, updateAt, move, insertAt, clear }
}
