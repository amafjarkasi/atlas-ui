/**
 * @atlas/ui — ComboboxField
 *
 * A labeled type-ahead combobox (composes `Field` + `TypeaheadInput`).
 */
import { Field } from './Field'
import { TypeaheadInput, type TypeaheadOption } from './TypeaheadInput'

export interface ComboboxFieldProps {
  label?: string
  options: TypeaheadOption[]
  value?: string
  onChange?: (value: string) => void
  onPick?: (option: TypeaheadOption) => void
  placeholder?: string
}

export function ComboboxField({ label, options, value, onChange, onPick, placeholder }: ComboboxFieldProps) {
  return (
    <Field label={label}>
      <TypeaheadInput options={options} value={value ?? ''} onChange={onChange} onPick={onPick} placeholder={placeholder} />
    </Field>
  )
}
