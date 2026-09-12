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

export function PromptTemplateEditor({ template = '', onTemplateChange, values = {}, onValuesChange, label = 'Prompt template' }: PromptTemplateEditorProps) {
  const names = Array.from(new Set((template.match(/\{\{\s*(\w+)\s*\}\}/g) ?? []).map((t) => t.replace(/[{} ]/g, ''))))
  const preview = template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name: string) => values[name] ?? `{{${name}}}`)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <text style={{ fontSize: 12, fontWeight: 600, color: textTokens.secondary, fontFamily: FONT }}>{label}</text>
        <textarea value={template} minRows={4} maxRows={10} onChange={(e) => onTemplateChange?.(e.value ?? '')} style={{ fontSize: 12.5, fontFamily: FONT, color: textTokens.primary, backgroundColor: surface.code, borderRadius: 8, borderWidth: 1, borderColor: border.subtle, padding: 10 }} />
      </div>

      {names.map((n) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <text style={{ fontSize: 11.5, color: textTokens.muted, fontFamily: FONT }}>{"{{"} {n} {"}}"}</text>
          <input value={values[n] ?? ''} placeholder={`Value for ${n}`} onChange={(e) => onValuesChange?.({ ...values, [n]: e.value ?? '' })} style={{ fontSize: 12.5, fontFamily: FONT, color: textTokens.primary, backgroundColor: surface.card, borderRadius: 6, borderWidth: 1, borderColor: border.subtle, padding: 6 }} />
        </div>
      ))}

      <text style={{ fontSize: 12.5, color: textTokens.primary, fontFamily: FONT, whiteSpace: 'normal', lineHeight: 1.5 }}>{preview}</text>
    </div>
  )
}
