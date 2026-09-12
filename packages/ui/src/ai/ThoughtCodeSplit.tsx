/** @atlas/ui — ThoughtCodeSplit — reasoning scroll-locked to generated code. */
import { text as t } from '../tokens'
import { FONT } from '../tokens'
import { SyncedScrollPane } from '../layout/SyncedScrollPane'
import { SyntaxCodeBlock } from '../effects/SyntaxCodeBlock'
import { StreamingText } from '../effects/StreamingText'

export interface ThoughtCodeSplitProps {
  thoughts: string
  code: string
  language?: string
  active?: boolean
  height?: number | string
}

export function ThoughtCodeSplit({ thoughts, code, language, active = false, height = 320 }: ThoughtCodeSplitProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <SyncedScrollPane
        height={height}
        left={
          <div style={{ padding: 10 }}>
            <text style={{ fontSize: 11, fontWeight: 600, color: t.muted, fontFamily: FONT }}>REASONING</text>
            {active ? <StreamingText text={thoughts} active fontSize={12.5} /> : <text style={{ fontSize: 12.5, color: t.secondary, fontFamily: FONT, lineHeight: 1.5 }}>{thoughts}</text>}
          </div>
        }
        right={<SyntaxCodeBlock code={code} language={language} title="OUTPUT" maxHeight={height} />}
      />
    </div>
  )
}
