/**
 * @atlas/ui — CopyButton
 *
 * A copy affordance. GPUIX has no clipboard API, so the app wires the actual
 * copy into `onCopy(value)`; this button flips to a "Copied ✓" state briefly.
 *
 * @example
 *   <CopyButton value={code} onCopy={(v) => clipboard.write(v)} />
 */
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from './Icon'
import { useCopyState } from '../hooks/useCopyState'

export interface CopyButtonProps {
  value: string
  onCopy?: (value: string) => void
  label?: string
  copiedLabel?: string
  size?: 'sm' | 'md'
}

export function CopyButton({ value, onCopy, label = 'Copy', copiedLabel = 'Copied', size = 'sm' }: CopyButtonProps) {
  const { copied, copy } = useCopyState()

  const handleCopy = () => {
    onCopy?.(value)
    copy()
  }

  return (
    <div
      onClick={handleCopy}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 6,
        backgroundColor: surface.selected,
        borderWidth: 1,
        borderColor: border.subtle,
        cursor: 'pointer',
        flexShrink: 0,
        hover: { backgroundColor: '#FFFFFF14' },
      }}
    >
      <Icon name={copied ? 'check' : 'copy'} size={size === 'sm' ? 11 : 13} color={copied ? '#22C55E' : text.muted} />
      <text style={{ fontSize: size === 'sm' ? 11 : 12, fontWeight: 600, color: copied ? '#22C55E' : text.secondary, fontFamily: FONT }}>
        {copied ? copiedLabel : label}
      </text>
    </div>
  )
}
