/**
 * @atlas/ui — useDisclosure
 *
 * Open/close helpers for dialogs, drawers, and popovers.
 *
 * @example
 *   const { open, onOpen, onClose, onToggle } = useDisclosure()
 */
import { useCallback, useState } from 'react'

export function useDisclosure(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)
  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])
  const onToggle = useCallback(() => setOpen((o) => !o), [])
  return { open, setOpen, onOpen, onClose, onToggle }
}
