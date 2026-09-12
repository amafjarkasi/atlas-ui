/**
 * @atlas/ui — Checkbox
 *
 * A square checkbox with a GPU-tinted check mark. Supports controlled and
 * uncontrolled usage, plus keyboard activation (Enter / Space).
 *
 * @example
 *   <Checkbox checked={true} onCheckedChange={setStarred} label="Star thread" />
 *   <Checkbox defaultChecked />
 */
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import { useControllableState } from '../hooks/useControllableState'

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  size?: number
}

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
  size = 16,
}: CheckboxProps) {
  const [checked, setChecked] = useControllableState({ value: controlledChecked, defaultValue: defaultChecked, onChange: onCheckedChange })

  const toggle = () => {
    if (disabled) return
    setChecked(!checked)
  }

  const box = (
    <div
      tabIndex={0}
      onClick={toggle}
      onKeyDown={(e) => {
        const k = e.key?.toLowerCase()
        if (k === 'enter' || k === ' ') toggle()
      }}
      style={{
        width: size,
        height: size,
        borderRadius: 4,
        backgroundColor: checked ? semantic.accent : surface.card,
        borderWidth: 1,
        borderColor: checked ? semantic.accent : border.strong,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        flexShrink: 0,
      }}
    >
      {checked && <Icon name="check" size={Math.max(9, Math.floor(size * 0.62))} color="#FFFFFF" />}
    </div>
  )

  if (label === undefined) return box

  return (
    <div
      onClick={toggle}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {box}
      <text style={{ fontSize: 13, color: text.primary, fontFamily: FONT }}>{label}</text>
    </div>
  )
}
