/**
 * @atlas/ui — EditorTabStrip
 *
 * A document tab strip with dirty dots and close buttons (composes `Tabs` +
 * `Badge` + `IconButton`).
 *
 * @example
 *   <EditorTabStrip tabs={[{ id: 'a', title: 'doc.ts', dirty: true }]} activeId="a" onSelect={open} onClose={close} />
 */
import { surface, border, text, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface EditorTab {
  id: string
  title: string
  dirty?: boolean
}

export interface EditorTabStripProps {
  tabs: EditorTab[]
  activeId?: string
  onSelect?: (id: string) => void
  onClose?: (id: string) => void
}

export function EditorTabStrip({ tabs, activeId, onSelect, onClose }: EditorTabStripProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        padding: 4,
        borderBottomWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.pill,
        overflowX: 'scroll',
        flexShrink: 0,
      }}
    >
      {tabs.map((t) => {
        const active = t.id === activeId
        return (
          <div
            key={t.id}
            onClick={() => onSelect?.(t.id)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingLeft: 10,
              paddingRight: 6,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 6,
              backgroundColor: active ? surface.selected : undefined,
              cursor: 'pointer',
              flexShrink: 0,
              hover: active ? undefined : { backgroundColor: '#FFFFFF0A' },
            }}
          >
            {t.dirty ? <div style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: semantic.unread }} /> : null}
            <text style={{ fontSize: 12.5, color: active ? text.primary : text.secondary, fontFamily: FONT, whiteSpace: 'nowrap' }}>{t.title}</text>
            {onClose ? (
              <div onClick={() => onClose(t.id)} style={{ width: 16, height: 16, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', hover: { backgroundColor: '#FFFFFF1A' } }}>
                <Icon name="x" size={10} color={text.muted} />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
