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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 5,
        backgroundColor: surface.code,
        borderWidth: 1,
        borderColor: border.subtle,
        alignSelf: 'flex-start',
        whiteSpace: 'nowrap',
      }}
    >
      <text style={{ fontSize: 11.5, color: text.secondary, fontFamily: FONT_MONO, whiteSpace: 'nowrap' }}>{code}</text>
    </div>
  )
}
