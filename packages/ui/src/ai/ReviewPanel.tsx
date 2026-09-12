import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
import { Button } from '../atoms/Button'
import { GeneratedCodeCard } from './GeneratedCodeCard'
import { ConfigDiffReview } from './ConfigDiffReview'

export interface ReviewPanelProps {
  title?: string
  feedback?: string
  code?: string
  language?: string
  configBefore?: string | unknown
  configAfter?: string | unknown
  onApply?: () => void
  onReject?: () => void
}

export function ReviewPanel({ title, feedback, code, language, configBefore, configAfter, onApply, onReject }: ReviewPanelProps) {
  const hasDiffs = code !== undefined || (configBefore !== undefined && configAfter !== undefined)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      {(title || feedback || !hasDiffs) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <text style={{ fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: FONT, lineHeight: 1 }}>{title ?? 'Code Review'}</text>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3B82F61A', borderWidth: 1, borderColor: '#3B82F640', borderRadius: 10, paddingLeft: 8, paddingRight: 8, height: 20 }}>
                <text style={{ fontSize: 10.5, color: '#60A5FA', fontWeight: 600, fontFamily: FONT, lineHeight: 1 }}>REVIEW READY</text>
              </div>
            </div>
            {onApply || onReject ? (
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                {onReject ? <Button size="sm" variant="ghost" onClick={onReject}>Reject</Button> : null}
                {onApply ? <Button size="sm" onClick={onApply}>Accept Changes</Button> : null}
              </div>
            ) : null}
          </div>
          {feedback ? (
            <text style={{ fontSize: 12.5, color: t.secondary, fontFamily: FONT, lineHeight: 1.5 }}>
              {feedback}
            </text>
          ) : null}
        </div>
      )}
      {code !== undefined ? <GeneratedCodeCard code={code} language={language} onApply={onApply} onCopy={onApply} /> : null}
      {configBefore !== undefined && configAfter !== undefined ? (
        <ConfigDiffReview before={configBefore} after={configAfter} onAccept={onApply} onReject={onReject} />
      ) : null}
    </div>
  )
}
