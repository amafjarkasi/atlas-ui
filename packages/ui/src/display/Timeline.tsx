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
          left: 4,
          top: 6,
          bottom: 6,
          width: 2,
          backgroundColor: border.subtle,
          borderRadius: 1,
        }}
      />

      {items.map((item, i) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: i < items.length - 1 ? 16 : 0,
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: item.dotColor ?? dotColor,
                borderWidth: 2,
                borderColor: surface.base,
                flexShrink: 0,
              }}
            />
            <text style={{ fontSize: 13, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{item.title}</text>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              paddingLeft: 20,
              paddingTop: 3,
            }}
          >
            {item.time ? (
              <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>{item.time}</text>
            ) : null}
            {item.description ? (
              <text style={{ fontSize: 12, color: text.secondary, fontFamily: FONT, lineHeight: 1.4 }}>
                {item.description}
              </text>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
