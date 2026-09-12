/**
 * @atlas/ui — FileDropzone
 *
 * A file-drop target. GPUIX v0.7 exposes no OS file-drop or open-dialog events,
 * so this renders the visual target and a clickable "browse" affordance; the
 * host wires real file selection into `onBrowse` / `onFiles`.
 *
 * @example
 *   <FileDropzone files={attachments} onBrowse={openPicker} label="Attach files" />
 */
import { surface, border, semantic, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface FileDropzoneProps {
  files?: string[]
  onFiles?: (paths: string[]) => void
  onBrowse?: () => void
  disabled?: boolean
  label?: string
}

export function FileDropzone({
  files = [],
  onFiles,
  onBrowse,
  disabled = false,
  label = 'Drop files here or browse',
}: FileDropzoneProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: border.strong,
        backgroundColor: surface.card,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Icon name="upload" size={22} color={text.muted} />
      <text style={{ fontSize: 12.5, color: text.muted, fontFamily: FONT, textAlign: 'center' }}>{label}</text>

      <div
        onClick={onBrowse}
        style={{
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 6,
          paddingBottom: 6,
          borderRadius: 6,
          backgroundColor: semantic.accent,
          cursor: onBrowse ? 'pointer' : 'default',
          hover: onBrowse ? { opacity: 0.85 } : undefined,
        }}
      >
        <text style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', fontFamily: FONT }}>Browse</text>
      </div>

      {files.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', maxWidth: '100%' }}>
          {files.map((f, i) => (
            <text
              key={i}
              style={{ fontSize: 11, color: text.secondary, fontFamily: FONT, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            >
              {f}
            </text>
          ))}
        </div>
      ) : null}
    </div>
  )
}
