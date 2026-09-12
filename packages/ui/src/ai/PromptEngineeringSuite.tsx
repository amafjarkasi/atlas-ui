/** @atlas/ui — PromptEngineeringSuite — template editor + live diff + token budget + save. */
import { PromptTemplateEditor } from './PromptTemplateEditor'
import { PromptDiff } from './PromptDiff'
import { TokenMeter } from './TokenMeter'
import { Button } from '../atoms/Button'

export interface PromptEngineeringSuiteProps {
  template: string
  onTemplateChange?: (template: string) => void
  values?: Record<string, string>
  onValuesChange?: (values: Record<string, string>) => void
  baseline?: string
  tokenUsed?: number
  tokenLimit?: number
  onSave?: () => void
}

export function PromptEngineeringSuite({ template, onTemplateChange, values, onValuesChange, baseline, tokenUsed, tokenLimit, onSave }: PromptEngineeringSuiteProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PromptTemplateEditor template={template} onTemplateChange={onTemplateChange} values={values} onValuesChange={onValuesChange} />
      {baseline !== undefined ? <PromptDiff before={baseline} after={template} /> : null}
      {tokenLimit !== undefined ? <TokenMeter used={tokenUsed ?? 0} limit={tokenLimit} /> : null}
      {onSave ? (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button onClick={onSave}>Save</Button>
        </div>
      ) : null}
    </div>
  )
}
