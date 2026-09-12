/**
 * @atlas/ui — DebugInspector
 *
 * A tabbed inspector pane: JSON state + component tree (composes `Tabs` +
 * `JsonTree` + `TreeView` + `SearchInput`).
 *
 * @example
 *   <DebugInspector state={appState} treeNodes={componentTree} />
 */
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../layout/Tabs'
import { JsonTree } from '../display/JsonTree'
import { TreeView, type TreeNode } from '../layout/TreeView'
import { SearchInput } from '../inputs/SearchInput'

export interface DebugInspectorProps {
  state?: unknown
  treeNodes?: TreeNode[]
  searchable?: boolean
}

export function DebugInspector({ state, treeNodes, searchable = true }: DebugInspectorProps) {
  const [query, setQuery] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%', width: '100%' }}>
      {searchable ? <SearchInput value={query} onChange={setQuery} placeholder="Search…" /> : null}

      <Tabs defaultValue={treeNodes ? 'tree' : 'state'}>
        <TabsList>
          <TabsTrigger value="state">State</TabsTrigger>
          {treeNodes ? <TabsTrigger value="tree">Tree</TabsTrigger> : null}
        </TabsList>

        <TabsContent value="state">
          <div style={{ maxHeight: 400, overflowY: 'scroll', paddingTop: 10 }}>{state !== undefined ? <JsonTree data={state} /> : null}</div>
        </TabsContent>

        {treeNodes ? (
          <TabsContent value="tree">
            <div style={{ maxHeight: 400, overflowY: 'scroll', paddingTop: 10 }}>
              <TreeView nodes={treeNodes} />
            </div>
          </TabsContent>
        ) : null}
      </Tabs>
    </div>
  )
}
