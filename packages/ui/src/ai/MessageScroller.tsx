/**
 * @atlas/ui — MessageScroller
 *
 * A virtualized chat message list. Wraps the native `<virtual-list>` and turns
 * on `followTail` so it auto-scrolls to the newest message.
 *
 * @example
 *   <MessageScroller height={480}>
 *     {messages.map((m) => <ChatBubble key={m.id} role={m.role} content={m.content} />)}
 *   </MessageScroller>
 */
import { Children, type ReactNode } from 'react'

export interface MessageScrollerProps {
  children: ReactNode
  estimatedItemHeight?: number
  overdraw?: number
  followTail?: boolean
  height?: number | string
}

export function MessageScroller({
  children,
  estimatedItemHeight = 72,
  overdraw = 2,
  followTail = true,
  height = '100%',
}: MessageScrollerProps) {
  const childArray = Children.toArray(children)
  return (
    <virtual-list
      estimatedItemHeight={estimatedItemHeight}
      overdraw={overdraw}
      followTail={followTail}
      style={{ height, flexGrow: 1 }}
    >
      {childArray.map((child, i) => (
        <div key={i} style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6 }}>
          {child}
        </div>
      ))}
    </virtual-list>
  )
}
