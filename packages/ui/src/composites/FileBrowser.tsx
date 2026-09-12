/**
 * @atlas/ui — FileBrowser
 *
 * A two-pane file explorer: tree navigation + breadcrumb + file list (composes
 * `TreeView` + `Breadcrumb` + `VirtualList`).
 *
 * @example
 *   <FileBrowser folders={folders} files={files} path={path} onSelectFolder={open} onSelectFile={select} />
 */
import { border, text } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'
import type { IconName } from '../atoms'
import { TreeView, type TreeNode } from '../layout/TreeView'
import { Breadcrumb, type BreadcrumbItem } from '../layout/Breadcrumb'
import { VirtualList } from '../layout/VirtualList'

export interface FileEntry {
  id: string
  name: string
  icon?: IconName
}

export interface FileBrowserProps {
  folders?: TreeNode[]
  files?: FileEntry[]
  path?: BreadcrumbItem[]
  selectedFolderId?: string
  onSelectFolder?: (node: TreeNode) => void
  onSelectFile?: (file: FileEntry) => void
  height?: number | string
}

export function FileBrowser({ folders = [], files = [], path = [], selectedFolderId, onSelectFolder, onSelectFile, height = '100%' }: FileBrowserProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height, width: '100%' }}>
      <div style={{ width: 200, flexShrink: 0, borderRightWidth: 1, borderColor: border.subtle, padding: 8, overflowY: 'scroll' }}>
        <TreeView nodes={folders} selectedId={selectedFolderId} onSelect={onSelectFolder} />
      </div>

      <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', padding: 8 }}>
        {path.length > 0 ? <Breadcrumb items={path} /> : null}
        <VirtualList<FileEntry>
          items={files}
          estimatedItemHeight={28}
          height="100%"
          renderItem={(f) => (
            <div onClick={() => onSelectFile?.(f)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 5, paddingBottom: 5, borderRadius: 6, cursor: 'pointer', hover: { backgroundColor: '#FFFFFF08' } }}>
              <Icon name={f.icon ?? 'file'} size={14} color={text.muted} />
              <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT }}>{f.name}</text>
            </div>
          )}
        />
      </div>
    </div>
  )
}
