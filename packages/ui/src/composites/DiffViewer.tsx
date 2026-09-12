/**
 * @atlas/ui — DiffViewer
 *
 * A side-by-side code comparison (composes `SyntaxCodeBlock`). For line-level
 * unified diffs, use GPUIX's native `<diff patch={…}>` primitive directly.
 *
 * @example
 *   <DiffViewer before={oldCode} after={newCode} language="ts" />
 */
import { text } from '../tokens'
import { FONT } from '../tokens'
import { Badge } from '../atoms/Badge'
import { SyntaxCodeBlock } from '../effects/SyntaxCodeBlock'

export interface DiffViewerProps {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  language?: string
}

export function DiffViewer({ before, after, beforeLabel = 'Before', afterLabel = 'After', language }: DiffViewerProps) {
  const beforeLines = before.split('\n').length
  const afterLines = after.split('\n').length
  const delta = afterLines - beforeLines

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Badge variant="label" label={`-${Math.max(0, -delta)}`} color="#ED4245" />
        <Badge variant="label" label={`+${Math.max(0, delta)}`} color="#22C55E" />
        <text style={{ fontSize: 11, color: text.muted, fontFamily: FONT }}>lines changed</text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'stretch' }}>
        <div style={{ flexGrow: 1, flexBasis: 0 }}>
          <SyntaxCodeBlock code={before} title={beforeLabel} language={language} />
        </div>
        <div style={{ flexGrow: 1, flexBasis: 0 }}>
          <SyntaxCodeBlock code={after} title={afterLabel} language={language} />
        </div>
      </div>
    </div>
  )
}
