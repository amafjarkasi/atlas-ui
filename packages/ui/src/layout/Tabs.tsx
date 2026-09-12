/**
 * @atlas/ui — Tabs
 *
 * Accessible tabs with keyboard navigation. Arrow keys move the active tab;
 * Enter/Space activate the focused tab. TabsList derives the ordered set of
 * trigger values from its children, so triggers need no extra registration.
 *
 * Usage:
 *   <Tabs defaultValue="inbox">
 *     <TabsList>
 *       <TabsTrigger value="inbox">Inbox</TabsTrigger>
 *       <TabsTrigger value="drafts">Drafts</TabsTrigger>
 *       <TabsTrigger value="sent">Sent</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="inbox">…</TabsContent>
 *     <TabsContent value="drafts">…</TabsContent>
 *     <TabsContent value="sent">…</TabsContent>
 *   </Tabs>
 */
import { createContext, useContext, useState, useMemo, Children, isValidElement, type ReactNode } from 'react'
import { surface, border, text } from '../tokens'
import { FONT } from '../tokens'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue>({ value: '', setValue: () => {} })

const TabsListContext = createContext<string[]>([])

export interface TabsProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

export function Tabs({ value: valueProp, defaultValue, onValueChange, children }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const value = valueProp !== undefined ? valueProp : internal
  const setValue = (next: string) => {
    if (valueProp === undefined) setInternal(next)
    onValueChange?.(next)
  }

  return <TabsContext.Provider value={{ value, setValue }}>{children}</TabsContext.Provider>
}

export interface TabsListProps {
  children: ReactNode
}

export function TabsList({ children }: TabsListProps) {
  const values = useMemo(() => {
    const out: string[] = []
    Children.forEach(children, (child) => {
      if (isValidElement(child) && (child.type as any)?.__isTabsTrigger) {
        const v = (child.props as any)?.value
        if (typeof v === 'string') out.push(v)
      }
    })
    return out
  }, [children])

  return (
    <TabsListContext.Provider value={values}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          padding: 2,
          borderRadius: 9,
          backgroundColor: surface.pill,
          borderWidth: 1,
          borderColor: border.subtle,
          alignSelf: 'flex-start',
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </TabsListContext.Provider>
  )
}

export interface TabsTriggerProps {
  value: string
  children: ReactNode
  disabled?: boolean
}

export function TabsTrigger({ value, children, disabled = false }: TabsTriggerProps) {
  const { value: active, setValue } = useContext(TabsContext)
  const values = useContext(TabsListContext)
  const selected = active === value

  const move = (dir: 1 | -1) => {
    const idx = values.indexOf(value)
    if (idx === -1) return
    const next = values[(idx + dir + values.length) % values.length]
    if (next) setValue(next)
  }

  return (
    <div
      tabIndex={0}
      onClick={() => {
        if (!disabled) setValue(value)
      }}
      onKeyDown={(e) => {
        const k = e.key?.toLowerCase()
        if (k === 'enter' || k === ' ') {
          if (!disabled) setValue(value)
        } else if (k === 'arrowleft' || k === 'arrowup') {
          move(-1)
        } else if (k === 'arrowright' || k === 'arrowdown') {
          move(1)
        }
      }}
      style={{
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 7,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        backgroundColor: selected ? surface.selected : undefined,
        hover: disabled || selected ? undefined : { backgroundColor: '#FFFFFF0A' },
        flexShrink: 0,
      }}
    >
      <text
        style={{
          fontSize: 12.5,
          fontWeight: selected ? 600 : 500,
          color: selected ? text.primary : text.muted,
          fontFamily: FONT,
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </text>
    </div>
  )
}
;(TabsTrigger as any).__isTabsTrigger = true

export interface TabsContentProps {
  value: string
  children: ReactNode
}

export function TabsContent({ value, children }: TabsContentProps) {
  const { value: active } = useContext(TabsContext)
  if (active !== value) return null
  return <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>{children}</div>
}
