import { motion } from '@gpuix/react'
import { C, FONT } from '../tokens'
import { useControllableState } from '../hooks/useControllableState'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
}

export function Switch({ checked: controlledChecked, defaultChecked = false, onCheckedChange, disabled, label }: SwitchProps) {
  const [checked, setChecked] = useControllableState({ value: controlledChecked, defaultValue: defaultChecked, onChange: onCheckedChange })

  const toggle = () => {
    if (disabled) return
    setChecked(!checked)
  }

  const trackW = 36
  const trackH = 20
  const thumbSize = 16
  const thumbOffset = 2

  const switchNode = (
    <div
      onClick={toggle}
      style={{
        width: trackW, height: trackH, borderRadius: trackH / 2,
        backgroundColor: checked ? C.unread : C.selected,
        borderWidth: 1, borderColor: checked ? C.unread : C.border,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        position: 'relative'
      }}
    >
      <motion.div
        animate={{ left: checked ? trackW - thumbSize - thumbOffset : thumbOffset }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        style={{
          width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2,
          backgroundColor: '#FFFFFF', position: 'absolute', top: thumbOffset - 1
        }}
      />
    </div>
  )

  if (!label) return switchNode

  return (
    <div onClick={toggle} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      {switchNode}
      <text style={{ fontSize: 13, color: C.text, fontFamily: FONT }}>{label}</text>
    </div>
  )
}
