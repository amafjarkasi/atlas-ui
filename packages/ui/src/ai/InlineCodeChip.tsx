/**
 * @atlas/ui — InlineCodeChip
 *
 * An inline monospace code chip for embedding identifiers in prose.
 *
 * @example
 *   <InlineCodeChip code="northlight-4" />
 */
import { surface, border, text } from '../tokens'
import { FONT_MONO } from '../tokens'

export interface InlineCodeChipProps {
  code: string
}

export function InlineCodeChip({ code }: InlineCodeChipProps) {
  return (
    <div
      style={{
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 5,
        backgroundColor: surface.code,
        borderWidth: 1,
        borderColor: border.subtle,
        alignSelf: 'flex-start',
      }}
    >
      <text style={{ fontSize: 11.5, color: text.secondary, fontFamily: FONT_MONO }}>{code}</text>
    </div>
  )
}
