/**
 * @atlas/ui — useControllableState
 *
 * Controlled/uncontrolled state helper (value ?: T, defaultValue, onChange).
 * Replaces the hand-rolled pattern used across Switch, Tabs, Slider, etc.
 *
 * @example
 *   const [value, setValue] = useControllableState({ defaultValue: false, value: props.checked, onChange: props.onCheckedChange })
 */
import { useCallback, useState } from 'react'

export interface ControllableStateOptions<T> {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

export function useControllableState<T>({ value, defaultValue, onChange }: ControllableStateOptions<T>): [T, (next: T) => void] {
  const [internal, setInternal] = useState<T>(defaultValue)
  const isControlled = value !== undefined

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  return [isControlled ? (value as T) : internal, setValue]
}
