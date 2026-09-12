/**
 * @atlas/ui — KeyboardShortcutsOverlay
 *
 * A modal, searchable, tabbed reference sheet of shortcuts (composes `Dialog`
 * + `Tabs` + `SearchInput` + `DescriptionList` + `Kbd`).
 *
 * @example
 *   <KeyboardShortcutsOverlay open={open} onOpenChange={setOpen} categories={cats} />
 */
import { useState } from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from '../overlays/Dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../layout/Tabs'
import { SearchInput } from '../inputs/SearchInput'
import { DescriptionList } from '../display/DescriptionList'
import { Kbd } from '../atoms/Kbd'

export interface ShortcutEntry {
  keys: string
  action: string
}

export interface ShortcutCategory {
  id: string
  label: string
  shortcuts: ShortcutEntry[]
}

export interface KeyboardShortcutsOverlayProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: ShortcutCategory[]
}

export function KeyboardShortcutsOverlay({ open, onOpenChange, categories }: KeyboardShortcutsOverlayProps) {
  const [query, setQuery] = useState('')
  const match = (s: ShortcutEntry) =>
    s.action.toLowerCase().includes(query.toLowerCase()) || s.keys.toLowerCase().includes(query.toLowerCase())

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay>
        <DialogContent width={520}>
          <DialogHeader>
            <DialogTitle>Keyboard shortcuts</DialogTitle>
          </DialogHeader>

          <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SearchInput value={query} onChange={setQuery} placeholder="Search shortcuts…" />

            <Tabs defaultValue={categories[0]?.id}>
              <TabsList>
                {categories.map((c) => (
                  <TabsTrigger key={c.id} value={c.id}>
                    {c.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((c) => (
                <TabsContent key={c.id} value={c.id}>
                  <div style={{ maxHeight: 320, overflowY: 'scroll', paddingTop: 12 }}>
                    <DescriptionList items={c.shortcuts.filter(match).map((s) => ({ label: s.action, value: <Kbd keys={s.keys} /> }))} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}
