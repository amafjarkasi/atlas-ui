import { border, surface, text as t } from '../tokens'
import { FONT } from '../tokens'
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <text style={{ fontSize: 13, fontWeight: 600, color: t.primary, fontFamily: FONT, lineHeight: 1 }}>Prompt Engineering Suite</text>
          <div style={{ backgroundColor: '#8B5CF61A', borderWidth: 1, borderColor: '#8B5CF640', borderRadius: 10, height: 20, paddingLeft: 8, paddingRight: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <text style={{ fontSize: 10.5, color: '#A78BFA', fontWeight: 600, fontFamily: FONT, lineHeight: 1 }}>STUDIO</text>
          </div>
        </div>
        {onSave ? (
          <Button size="sm" onClick={onSave}>Save Changes</Button>
        ) : null}
      </div>

      <PromptTemplateEditor template={template} onTemplateChange={onTemplateChange} values={values} onValuesChange={onValuesChange} />

      {baseline !== undefined ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <text style={{ fontSize: 11, fontWeight: 600, color: t.muted, fontFamily: FONT, marginLeft: 2 }}>BASELINE COMPARISON</text>
          <PromptDiff before={baseline} after={template} />
        </div>
      ) : null}

      {tokenLimit !== undefined ? (
        <div style={{ padding: 12, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card }}>
          <TokenMeter used={tokenUsed ?? 0} limit={tokenLimit} label="Prompt tokens" />
        </div>
      ) : null}
    </div>
  )
}
