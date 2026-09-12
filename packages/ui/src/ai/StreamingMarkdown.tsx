/**
 * @atlas/ui — StreamingMarkdown
 *
 * Renders markdown that is still streaming. While `active`, it reveals the raw
 * source token-by-token (markdown isn't well-formed mid-token); once complete
 * it swaps to the native `<markdown>` renderer.
 *
 * @example
 *   <StreamingMarkdown source={reply} active={streaming} />
 */
import { StreamingText } from '../effects/StreamingText'

export interface StreamingMarkdownProps {
  source: string
  active?: boolean
  fontSize?: number
}

export function StreamingMarkdown({ source, active = true, fontSize = 13 }: StreamingMarkdownProps) {
  if (active) {
    return <StreamingText text={source} active fontSize={fontSize} />
  }
  return <markdown source={source} />
}
