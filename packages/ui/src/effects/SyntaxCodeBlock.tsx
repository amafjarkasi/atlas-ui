/**
 * @atlas/ui — SyntaxCodeBlock
 *
 * A styled card around the native `<code>` syntax highlighter. The `<code>`
 * element paints no surface of its own, so this component supplies the card
 * (background, border, radius, padding) plus an optional language header and
 * copy affordance.
 *
 * @example
 *   <SyntaxCodeBlock code={'const x = 1'} language="ts" title="example.ts" onCopy={copy} />
 */
import { useState } from 'react'
import { surface, border, text, semantic } from '../tokens'
import { FONT_MONO } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface SyntaxCodeBlockProps {
  code: string
  language?: string
  path?: string
  showLineNumbers?: boolean
  /** Header label; defaults to language or the file basename. */
  title?: string
  fontSize?: number
  /** Called with the source when the copy button is pressed. */
  onCopy?: (code: string) => void
  maxHeight?: number | string
}

export function SyntaxCodeBlock({
  code,
  language,
  path,
  showLineNumbers = true,
  title,
  fontSize = 12.5,
  onCopy,
  maxHeight,
}: SyntaxCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy?.(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const label = title ?? language ?? (path ? path.split('/').pop() : undefined)
  const showHeader = Boolean(label) || Boolean(onCopy)

  return (
    <div
      style={{
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border.subtle,
        backgroundColor: surface.code,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {showHeader ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 12,
            paddingRight: 8,
            paddingTop: 6,
            paddingBottom: 6,
            borderBottomWidth: 1,
            borderColor: border.subtle,
          }}
        >
          {label ? (
            <text
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: text.muted,
                fontFamily: FONT_MONO,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                flexGrow: 1,
              }}
            >
              {label}
            </text>
          ) : (
            <div />
          )}
          {onCopy ? (
            <div
              onClick={handleCopy}
              style={{
                cursor: 'pointer',
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 3,
                paddingBottom: 3,
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                hover: { backgroundColor: '#FFFFFF0F' },
              }}
            >
              <Icon name={copied ? 'check' : 'copy'} size={13} color={copied ? semantic.add : text.muted} />
            </div>
          ) : null}
        </div>
      ) : null}

      <div style={{ padding: 12, maxHeight, overflowY: maxHeight ? 'scroll' : undefined }}>
        <code
          code={code}
          language={language}
          path={path}
          showLineNumbers={showLineNumbers}
          style={{ fontFamily: FONT_MONO, fontSize }}
        />
      </div>
    </div>
  )
}
