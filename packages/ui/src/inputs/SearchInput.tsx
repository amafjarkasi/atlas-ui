/**
 * @atlas/ui — SearchInput
 *
 * A pre-wired search field: leading icon, inline `<input>`, a clear button when
 * non-empty, and an optional loading spinner.
 *
 * @example
 *   <SearchInput value={q} onChange={setQ} onClear={() => setQ('')} loading={searching} />
 */
import { useState } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'

export interface SearchInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  onClear?: () => void
  loading?: boolean
  disabled?: boolean
  leadingIcon?: IconName
}

export function SearchInput({
  value: controlled,
  defaultValue,
  onChange,
  placeholder = 'Search…',
  onClear,
  loading = false,
  disabled = false,
  leadingIcon = 'search',
}: SearchInputProps) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const value = controlled !== undefined ? controlled : internal
  const set = (v: string) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingLeft: 10,
        paddingRight: 6,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.card,
        width: '100%',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {loading ? <Icon name="loader" size={13} color={text.muted} /> : <Icon name={leadingIcon} size={13} color={text.muted} />}

      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => set(e.value ?? '')}
        style={{ flexGrow: 1, fontSize: 12.5, color: text.primary, fontFamily: FONT }}
      />

      {value ? (
        <div
          onClick={() => {
            set('')
            onClear?.()
          }}
          style={{
            cursor: 'pointer',
            width: 18,
            height: 18,
            borderRadius: 9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            hover: { backgroundColor: '#FFFFFF1A' },
          }}
        >
          <Icon name="x" size={11} color={text.muted} />
        </div>
      ) : null}
    </div>
  )
}
