import { useEffect, useState } from 'react'
import { motion } from '@gpuix/react'
import { C, FONT, semantic } from '../tokens'
import { Icon, type IconName } from '../atoms/Icon'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: string
  message: string
  description?: string
  variant?: ToastVariant
  duration?: number
  open?: boolean
}

type Listener = (toasts: ToastItem[]) => void
let toastQueue: ToastItem[] = []
const listeners = new Set<Listener>()

function emit() {
  listeners.forEach(l => l(toastQueue))
}

export function toast(item: Omit<ToastItem, 'id'>): string {
  const id = Math.random().toString(36).slice(2)
  toastQueue = [{ ...item, id, duration: item.duration ?? 4000, variant: item.variant ?? 'default', open: true }, ...toastQueue].slice(0, 5) // keep max 5
  emit()

  if (item.duration !== Infinity) {
    setTimeout(() => dismissToast(id), item.duration || 4000)
  }

  return id
}

export function dismissToast(id: string) {
  // Step 1: Trigger close animation
  toastQueue = toastQueue.map(t => t.id === id ? { ...t, open: false } : t)
  emit()
  
  // Step 2: Actually remove from DOM after animation completes
  setTimeout(() => {
    toastQueue = toastQueue.filter(t => t.id !== id)
    emit()
  }, 300)
}

export const toastSuccess = (msg: string) => toast({ message: msg, variant: 'success' })
export const toastError = (msg: string) => toast({ message: msg, variant: 'error' })
export const toastWarning = (msg: string) => toast({ message: msg, variant: 'warning' })

export function useToastStore() {
  const [toasts, setToasts] = useState(toastQueue)
  useEffect(() => {
    const l: Listener = (t) => setToasts([...t])
    listeners.add(l)
    return () => { listeners.delete(l) }
  }, [])
  return toasts
}

const VARIANT_ICONS: Record<ToastVariant, IconName | undefined> = {
  default: undefined,
  success: 'check',
  error: 'x',
  warning: 'zap',
  info: 'sparkle'
}

const VARIANT_COLORS: Record<ToastVariant, string> = {
  default: C.muted,
  success: semantic.add,
  error: semantic.mention,
  warning: semantic.star,
  info: semantic.unread
}

export function Toaster() {
  const toasts = useToastStore()
  
  return (
    <div style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', pointerEvents: 'none' }}>
      {toasts.map(t => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, bottom: -12 }}
          animate={{ opacity: t.open ? 1 : 0, bottom: t.open ? 0 : -12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            backgroundColor: '#1E1E22', borderWidth: 1, borderColor: C.borderStrong, borderRadius: 8,
            paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
            width: 320, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10,
            pointerEvents: 'auto',
            boxShadow: { offsetX: 0, offsetY: 8, blurRadius: 24, spreadRadius: 0, color: '#00000066' }
          }}
        >
          {VARIANT_ICONS[t.variant!] && <Icon name={VARIANT_ICONS[t.variant!]!} color={VARIANT_COLORS[t.variant!]} size={16} />}
          <text style={{ fontSize: 13, color: C.text, fontFamily: FONT, flexGrow: 1 }}>{t.message}</text>
          <div onClick={() => dismissToast(t.id)} style={{ cursor: 'pointer', paddingLeft: 4, paddingRight: 4 }}>
            <Icon name="x" color={C.muted} size={14} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
