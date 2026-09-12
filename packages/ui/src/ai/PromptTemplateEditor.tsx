/**
 * @atlas/ui — PromptTemplateEditor
 *
 * Edits a `{{variable}}` prompt template with per-variable values and a live
 * filled preview.
 */
import { useState } from 'react'
import { surface, border, text as textTokens } from '../tokens'
import { FONT } from '../tokens'

export interface PromptTemplateEditorProps {
  template?: string
  onTemplateChange?: (template: string) => void
  values?: Record<string, string>
  onValuesChange?: (values: Record<string, string>) => void
  label?: string
}

export function PromptTemplateEditor({ template = '', onTemplateChange, values = {}, onValuesChange, label = 'Prompt Template' }: PromptTemplateEditorProps) {
  const names = Array.from(new Set((template.match(/\{\{\s*(\w+)\s*\}\}/g) ?? []).map((t) => t.replace(/[{} ]/g, ''))))
  const preview = template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name: string) => values[name] ?? `{{${name}}}`)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: border.subtle, backgroundColor: surface.card, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4, paddingBottom: 6 }}>
        <text style={{ fontSize: 13, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>{label}</text>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}>
          {names.map((n) => (
            <div key={n} style={{ backgroundColor: '#3B82F618', borderWidth: 1, borderColor: '#3B82F633', borderRadius: 4, paddingLeft: 6, paddingRight: 6, paddingTop: 4, paddingBottom: 4 }}>
              <text style={{ fontSize: 10.5, color: '#60A5FA', fontFamily: FONT, lineHeight: 1 }}>{`{{${n}}}`}</text>
            </div>
          ))}
        </div>
      </div>

      <textarea
        value={template}
        minRows={4}
        maxRows={8}
        onChange={(e) => onTemplateChange?.(e.value ?? '')}
        style={{ fontSize: 12.5, fontFamily: FONT, color: textTokens.primary, backgroundColor: '#101012', borderRadius: 8, borderWidth: 1, borderColor: border.subtle, padding: 10, lineHeight: 1.5 }}
      />

      {names.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 12, borderTopWidth: 1, borderColor: border.subtle }}>
          <text style={{ fontSize: 11, fontWeight: 600, color: textTokens.muted, fontFamily: FONT }}>TEMPLATE VARIABLES</text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {names.map((n) => (
              <div key={n} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 32 }}>
                <div style={{ width: 100, flexShrink: 0, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <text style={{ fontSize: 11.5, color: textTokens.secondary, fontFamily: FONT, lineHeight: 1 }}>{n}</text>
                </div>
                <input
                  value={values[n] ?? ''}
                  placeholder={`Value for ${n}`}
                  onChange={(e) => onValuesChange?.({ ...values, [n]: e.value ?? '' })}
                  style={{ flexGrow: 1, height: 32, borderRadius: 6, borderWidth: 1, borderColor: border.subtle, backgroundColor: '#101012', paddingLeft: 8, paddingRight: 8, fontSize: 12, fontFamily: FONT, color: textTokens.primary }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 12, borderTopWidth: 1, borderColor: border.subtle }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <text style={{ fontSize: 11, fontWeight: 600, color: textTokens.muted, fontFamily: FONT }}>INTERPOLATED PREVIEW</text>
          <div style={{ backgroundColor: '#22C55E14', borderWidth: 1, borderColor: '#22C55E33', borderRadius: 4, paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3 }}>
            <text style={{ fontSize: 10, color: '#22C55E', fontFamily: FONT, lineHeight: 1 }}>LIVE</text>
          </div>
        </div>
        <div style={{ backgroundColor: '#101012', borderRadius: 6, padding: 12, borderWidth: 1, borderColor: border.subtle }}>
          <text style={{ fontSize: 12.5, color: textTokens.primary, fontFamily: FONT, whiteSpace: 'normal', lineHeight: 1.5 }}>{preview}</text>
        </div>
      </div>
    </div>
  )
}
