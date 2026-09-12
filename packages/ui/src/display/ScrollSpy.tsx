/**
 * @atlas/ui — ScrollSpy
 *
 * A section / table-of-contents nav that highlights the active heading. The app
 * derives `activeId` from its scroll handler (GPUIX exposes scroll offset via
 * `useGpuix().renderer.getScrollOffset`).
 *
 * @example
 *   <ScrollSpy sections={[{ id: 'overview', label: 'Overview' }, …]} activeId={active} onSelect={scrollTo} />
 */
import { surface, text, semantic } from '../tokens'
import { FONT } from '../tokens'

export interface ScrollSpySection {
  id: string
  label: string
}

export interface ScrollSpyProps {
  sections: ScrollSpySection[]
  activeId?: string
  onSelect?: (id: string) => void
}

export function ScrollSpy({ sections, activeId, onSelect }: ScrollSpyProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, paddingLeft: 6 }}>
      {sections.map((s) => {
        const active = s.id === activeId
        return (
          <div
            key={s.id}
            onClick={() => onSelect?.(s.id)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingLeft: 6,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 5,
              cursor: 'pointer',
              backgroundColor: active ? surface.selected : undefined,
              hover: active ? undefined : { backgroundColor: '#FFFFFF0A' },
            }}
          >
            <div style={{ width: 2, height: 12, borderRadius: 1, backgroundColor: active ? semantic.accent : 'transparent' }} />
            <text style={{ fontSize: 12.5, fontWeight: active ? 600 : 500, color: active ? text.primary : text.muted, fontFamily: FONT }}>
              {s.label}
            </text>
          </div>
        )
      })}
    </div>
  )
}
