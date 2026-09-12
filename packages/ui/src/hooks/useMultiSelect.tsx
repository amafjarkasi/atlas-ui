/**
 * @atlas/ui — useMultiSelect
 *
 * String-key selection helpers (used by DataTable / SelectionList /
 * TransferList / MultiSelectCombobox).
 *
 * @example
 *   const sel = useMultiSelect(['a'])
 *   sel.toggle('b')
 */
import { useCallback, useState } from 'react'

export interface MultiSelectOptions {
  initial?: string[]
}

export interface UseMultiSelectReturn {
  selected: string[]
  isSelected: (key: string) => boolean
  toggle: (key: string) => void
  toggleAll: (keys: string[]) => void
  select: (key: string) => void
  clear: () => void
  setSelected: (keys: string[]) => void
}

export function useMultiSelect({ initial = [] }: MultiSelectOptions = {}): UseMultiSelectReturn {
  const [set, setSet] = useState<Set<string>>(() => new Set(initial))

  const selected = Array.from(set)
  const isSelected = useCallback((key: string) => set.has(key), [set])
  const toggle = useCallback(
    (key: string) =>
      setSet((prev) => {
        const next = new Set(prev)
        if (next.has(key)) next.delete(key)
        else next.add(key)
        return next
      }),
    [],
  )
  const toggleAll = useCallback((keys: string[]) => {
    setSet((prev) => {
      const next = new Set(prev)
      const allSelected = keys.every((k) => next.has(k))
      if (allSelected) keys.forEach((k) => next.delete(k))
      else keys.forEach((k) => next.add(k))
      return next
    })
  }, [])
  const select = useCallback((key: string) => setSet((prev) => new Set(prev).add(key)), [])
  const clear = useCallback(() => setSet(new Set()), [])
  const setSelected = useCallback((keys: string[]) => setSet(new Set(keys)), [])

  return { selected, isSelected, toggle, toggleAll, select, clear, setSelected }
}
