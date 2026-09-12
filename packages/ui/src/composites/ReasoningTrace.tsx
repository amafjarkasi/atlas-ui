/**
 * @atlas/ui — ReasoningTrace
 *
 * A collapsible reasoning/thinking stream with token cost (composes `Accordion`
 * + `StreamingText` + `TokenMeter`).
 *
 * @example
 *   <ReasoningTrace reasoning={trace} active={streaming} tokenCost={420} />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Accordion } from '../layout/Accordion'
import { StreamingText } from '../effects/StreamingText'
import { TokenMeter } from '../ai/TokenMeter'

export interface ReasoningTraceProps {
  reasoning: string
  active?: boolean
  tokenCost?: number
}

export function ReasoningTrace({ reasoning, active = false, tokenCost }: ReasoningTraceProps) {
  return (
    <Accordion
      defaultOpen={['reasoning']}
      items={[
        {
          id: 'reasoning',
          title: active ? 'Thinking…' : 'Reasoning',
          content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {active ? (
                <StreamingText text={reasoning} active />
              ) : (
                <text style={{ fontSize: 12.5, color: text.secondary, fontFamily: FONT, lineHeight: 1.5 }}>{reasoning}</text>
              )}
              {tokenCost !== undefined ? <TokenMeter used={tokenCost} label="reasoning tokens" /> : null}
            </div>
          ),
        },
      ]}
    />
  )
}
