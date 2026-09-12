/**
 * @atlas/ui — CitationTooltip
 *
 * A numbered citation chip that previews its source on hover (composes
 * `HoverCard` + `InlineCodeChip`).
 *
 * @example
 *   <CitationTooltip index={1} title="GPUIX docs" url="https://…" snippet="…" />
 */
import { surface, text } from '../tokens'
import { FONT } from '../tokens'
import { HoverCard } from '../display/HoverCard'
import { InlineCodeChip } from '../ai/InlineCodeChip'

export interface CitationTooltipProps {
  index: number
  title: string
  url?: string
  snippet?: string
}

export function CitationTooltip({ index, title, url, snippet }: CitationTooltipProps) {
  return (
    <HoverCard
      side="top"
      trigger={
        <div
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 1,
            paddingBottom: 1,
            borderRadius: 4,
            backgroundColor: surface.selected,
          }}
        >
          <text style={{ fontSize: 10.5, fontWeight: 600, color: text.secondary, fontFamily: FONT }}>[{index}]</text>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 260 }}>
        <text style={{ fontSize: 12.5, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{title}</text>
        {url ? <InlineCodeChip code={url} /> : null}
        {snippet ? <text style={{ fontSize: 11.5, color: text.secondary, fontFamily: FONT, lineHeight: 1.4 }}>{snippet}</text> : null}
      </div>
    </HoverCard>
  )
}
