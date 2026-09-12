/** @atlas/ui — ReviewPanel — accept/reject flow for generated code + config changes. */
import { GeneratedCodeCard } from './GeneratedCodeCard'
import { ConfigDiffReview } from './ConfigDiffReview'

export interface ReviewPanelProps {
  code?: string
  language?: string
  configBefore?: string | unknown
  configAfter?: string | unknown
  onApply?: () => void
  onReject?: () => void
}

export function ReviewPanel({ code, language, configBefore, configAfter, onApply, onReject }: ReviewPanelProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {code !== undefined ? <GeneratedCodeCard code={code} language={language} onApply={onApply} onCopy={onApply} /> : null}
      {configBefore !== undefined && configAfter !== undefined ? (
        <ConfigDiffReview before={configBefore} after={configAfter} onAccept={onApply} onReject={onReject} />
      ) : null}
    </div>
  )
}
