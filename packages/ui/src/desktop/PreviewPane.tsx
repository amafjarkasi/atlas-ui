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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: border.subtle,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: surface.card,
      }}
    >
      <div
        style={{
          height,
          backgroundColor: surface.pill,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {src ? <img src={src} objectFit="contain" style={{ width, height }} /> : <Icon name="image" size={40} color={t.ghost} />}
      </div>
      {name || mime || size || onOpen ? (
        <div
          onClick={onOpen}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            height: 40,
            paddingLeft: 12,
            paddingRight: 12,
            cursor: onOpen ? 'pointer' : 'default',
          }}
        >
          <div style={{ flexGrow: 1, minWidth: 0, height: 16, display: 'flex', alignItems: 'center' }}>
            <text
              style={{
                fontSize: 12.5,
                color: t.primary,
                fontFamily: FONT,
                lineHeight: 1,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {name ?? mime ?? 'Preview'}
            </text>
          </div>
          {size ? (
            <div style={{ height: 16, display: 'flex', alignItems: 'center' }}>
              <text style={{ fontSize: 11, color: t.muted, fontFamily: FONT, lineHeight: 1 }}>{size}</text>
            </div>
          ) : null}
          {onOpen ? (
            <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="external" size={13} color={t.muted} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
