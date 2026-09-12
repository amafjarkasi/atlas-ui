/**
 * @atlas/ui — Timeline
 *
 * A vertical timeline with a connecting rail, dots, and content blocks. Useful
 * for thread history or activity feeds.
 *
 * @example
 *   <Timeline items={[{ id: '1', title: 'Message sent', time: '9:41 AM', description: 'Delivered to Nora' }]} />
 */
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'

export interface TimelineItem {
  id: string
  title: string
  time?: string
  description?: string
  dotColor?: string
}

export interface TimelineProps {
  items: TimelineItem[]
  dotColor?: string
}

export function Timeline({ items, dotColor = semantic.accent }: TimelineProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          left: 6,
          top: 8,
          bottom: 8,
          width: 2,
          backgroundColor: border.subtle,
          borderRadius: 1,
        }}
      />

      {items.map((item) => (
        <div
          key={item.id}
          style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 24, paddingBottom: 16, position: 'relative' }}
        >
          <div
            style={{
              position: 'absolute',
              left: 2,
              top: 3,
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: item.dotColor ?? dotColor,
              borderWidth: 2,
              borderColor: surface.base,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{item.title}</text>
            {item.time ? (
              <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{item.time}</text>
            ) : null}
          </div>
          {item.description ? (
            <text style={{ fontSize: 12, color: text.secondary, fontFamily: FONT, lineHeight: 1.4 }}>
              {item.description}
            </text>
          ) : null}
        </div>
      ))}
    </div>
  )
}
