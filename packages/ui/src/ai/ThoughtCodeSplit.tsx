import { border, surface, text as t, FONT } from '../tokens'
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, width: '100%' }}>
      <SyncedScrollPane
        height={height}
        left={
          <div style={{ padding: 12, backgroundColor: '#101012', borderRadius: 8, borderWidth: 1, borderColor: '#26262B', height: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <text style={{ fontSize: 11, fontWeight: 600, color: t.muted, fontFamily: FONT }}>REASONING</text>
              {active ? (
                <div style={{ backgroundColor: '#3B82F61A', borderRadius: 4, paddingLeft: 6, paddingRight: 6, paddingTop: 1, paddingBottom: 1 }}>
                  <text style={{ fontSize: 10, color: '#60A5FA', fontFamily: FONT }}>THINKING…</text>
                </div>
              ) : null}
            </div>
            {active ? <StreamingText text={thoughts} active fontSize={12.5} /> : <text style={{ fontSize: 12.5, color: t.secondary, fontFamily: FONT, lineHeight: 1.5 }}>{thoughts}</text>}
          </div>
        }
        right={<SyntaxCodeBlock code={code} language={language} title="OUTPUT" maxHeight={height} />}
      />
    </div>
  )
}
