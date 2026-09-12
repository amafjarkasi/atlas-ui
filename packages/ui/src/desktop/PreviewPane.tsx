/** @atlas/ui — PreviewPane — image/file preview scaffold. */
import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface PreviewPaneProps {
  src?: string
  name?: string
  size?: string
  mime?: string
  width?: number
  height?: number
  onOpen?: () => void
}

export function PreviewPane({ src, name, size, mime, width = 320, height = 240, onOpen }: PreviewPaneProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, borderWidth: 1, borderColor: border.subtle, borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ height, backgroundColor: surface.pill, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {src ? <img src={src} objectFit="contain" style={{ width, height }} /> : <Icon name="image" size={40} color={t.ghost} />}
      </div>
      {(name || mime || size || onOpen) ? (
        <div onClick={onOpen} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6, padding: 8, cursor: onOpen ? 'pointer' : 'default' }}>
          <text style={{ fontSize: 12, color: t.primary, fontFamily: FONT, flexGrow: 1, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name ?? mime ?? 'Preview'}</text>
          {size ? <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT }}>{size}</text> : null}
          {onOpen ? <Icon name="external" size={12} color={t.muted} /> : null}
        </div>
      ) : null}
    </div>
  )
}
