import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  motion,
  render,
  useGpuix,
  useTextSearch,
  useWindowSize,
} from '@gpuix/react'
import {
  Icon,
  IconButton,
  Badge,
  Avatar,
  AvatarGroup,
  Tooltip as AtlasTooltip,
  C,
  FONT,
  SIDEBAR_WIDTH,
  LIST_WIDTH,
  TITLEBAR_HEIGHT,
  TRAFFIC_LIGHT_CLEARANCE,
} from '@atlas/ui'
import type { IconName } from '@atlas/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from '@gpuix/react/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@gpuix/react/tooltip'
import type { Channel, FaceSpec, MailThread, Message } from './types'
import {
  INITIAL_CHANNELS,
  INITIAL_THREADS,
  maraFace,
  leaFace,
} from './data'

// ── Local aliases that bridge FaceSpec → @atlas/ui Avatar ───────────────
/** Thin wrapper so existing FaceSpec usage maps cleanly to Avatar */
function Face({ src, letter, logo, size }: FaceSpec & { size: number }) {
  return <Avatar src={src} letter={letter} logo={logo} size={size} />
}

/** Thin wrapper mapping FaceSpec[] → AvatarGroup with 2×2 grid layout */
function FaceStack({ faces }: { faces: FaceSpec[] }) {
  if (!faces || faces.length === 0) {
    return (
      <div style={{ width: 34, height: 34, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar letter="A" size={32} />
      </div>
    )
  }
  if (faces.length === 1) {
    return (
      <div style={{ width: 34, height: 34, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar {...faces[0]!} size={faces[0]!.logo ? 34 : 32} />
      </div>
    )
  }
  // 2×2 grid for multi-sender threads
  return (
    <div style={{ width: 34, height: 34, flexShrink: 0, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
      {faces.slice(0, 4).map((face, index) => (
        <Avatar key={index} {...face} size={15} />
      ))}
    </div>
  )
}

/** Thin wrapper mapping count → Badge variant="mention" */
function MentionBadge({ count }: { count: number }) {
  return <Badge variant="mention" count={count} />
}

// ── ActionTooltip — local because it depends on @gpuix/react/tooltip ────
function ActionTooltip({
  label,
  hotkey,
  side = 'bottom',
  children,
}: {
  label: string
  hotkey?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  children: ReactNode
}) {
  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={6}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 4,
          paddingBottom: 4,
          borderRadius: 6,
          backgroundColor: '#1E1E22',
          borderWidth: 1,
          borderColor: C.borderStrong,
          userSelect: 'none',
        }}
      >
        <text style={{ fontSize: 11.5, fontWeight: 500, color: C.text, fontFamily: FONT, whiteSpace: 'nowrap' }}>
          {label}
        </text>
        {hotkey ? (
          <div style={{ paddingLeft: 4, paddingRight: 4, paddingTop: 1, paddingBottom: 1, borderRadius: 3, backgroundColor: '#FFFFFF18', borderWidth: 1, borderColor: '#FFFFFF24' }}>
            <text style={{ fontSize: 10, fontWeight: 600, color: C.secondary, fontFamily: FONT }}>
              {hotkey}
            </text>
          </div>
        ) : null}
      </TooltipContent>
    </Tooltip>
  )
}

// ── Pill — local toolbar container ───────────────────────────────────────
function Pill({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 28, paddingLeft: 2, paddingRight: 2, flexShrink: 0, borderRadius: 14, backgroundColor: C.pill, borderWidth: 1, borderColor: C.border }}>
      {children}
    </div>
  )
}

function ChannelRow({
  channel,
  active,
  unread,
  mentionCount,
  onSelect,
}: {
  channel: Channel
  active: boolean
  unread: boolean
  mentionCount: number
  onSelect: () => void
}) {
  const color = active || unread ? C.text : C.muted
  return (
    <div
      testId={`channel-${channel.id}`}
      onClick={onSelect}
      style={{
        height: 28,
        paddingLeft: 8,
        paddingRight: 8,
        gap: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        cursor: 'pointer',
        backgroundColor: active ? C.selected : undefined,
        hover: { backgroundColor: C.overlay },
      }}
    >
      <Icon name={channel.icon as IconName} size={13} color={color} />
      <text
        style={{
          flexGrow: 1,
          minWidth: 0,
          fontSize: 13,
          fontWeight: unread ? 600 : 400,
          color,
          fontFamily: FONT,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {channel.label}
      </text>
      <MentionBadge count={mentionCount} />
    </div>
  )
}

function SidebarThreadRow({
  thread,
  selected,
  last,
  onSelect,
}: {
  thread: MailThread
  selected: boolean
  last: boolean
  onSelect: () => void
}) {
  const color = selected || thread.unread ? C.text : C.muted
  return (
    <div
      testId={`nav-thread-${thread.id}`}
      onClick={onSelect}
      style={{
        position: 'relative',
        height: 26,
        paddingLeft: 30,
        paddingRight: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        cursor: 'pointer',
        backgroundColor: selected ? C.selected : undefined,
        hover: { backgroundColor: C.overlay },
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 18,
          top: 0,
          width: 1,
          height: last ? 13 : 26,
          backgroundColor: C.tree,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 18,
          top: 12,
          width: 8,
          height: 1,
          backgroundColor: C.tree,
        }}
      />
      <text
        style={{
          flexGrow: 1,
          minWidth: 0,
          fontSize: 13,
          fontWeight: thread.unread ? 600 : 400,
          color,
          fontFamily: FONT,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {thread.senders}
      </text>
      <MentionBadge count={thread.mentionCount ?? 0} />
    </div>
  )
}

function TimelineRow({
  thread,
  selected,
  highlightQuery,
  onSelect,
  onToggleStar,
}: {
  thread: MailThread
  selected: boolean
  highlightQuery?: string
  onSelect: () => void
  onToggleStar?: () => void
}) {
  return (
    <div
      testId={`thread-${thread.id}`}
      onClick={onSelect}
      highlight={highlightQuery ? { query: highlightQuery, color: '#3B82F644' } : null}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
        paddingLeft: 9,
        paddingRight: 9,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 11,
        cursor: 'pointer',
        backgroundColor: selected ? C.selected : undefined,
        hover: { backgroundColor: C.overlay },
      }}
    >
      <div
        style={{
          width: 7,
          height: 34,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {thread.unread ? (
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: C.unread,
            }}
          />
        ) : (
          <div style={{ width: 7, height: 7 }} />
        )}
      </div>
      <FaceStack faces={thread.faces} />
      <div style={{ flexGrow: 1, minWidth: 0, overflow: 'hidden', gap: 2 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <text
            style={{
              flexGrow: 1,
              minWidth: 0,
              fontSize: 13,
              fontWeight: thread.unread ? 600 : 500,
              color: thread.unread ? C.text : C.secondary,
              fontFamily: FONT,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {thread.senders}
          </text>
          {thread.starred ? (
            <Icon name="starFilled" size={12} color="#EAB308" />
          ) : null}
          <text
            style={{
              fontSize: 12,
              color: C.muted,
              fontFamily: FONT,
              flexShrink: 0,
            }}
          >
            {thread.date}
          </text>
        </div>
        <text
          style={{
            fontSize: 12.5,
            lineHeight: 16,
            color: C.muted,
            fontFamily: FONT,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {thread.snippet}
        </text>
      </div>
    </div>
  )
}

function DayDivider({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingTop: 14,
        paddingBottom: 14,
      }}
    >
      <div style={{ flexGrow: 1, height: 1, backgroundColor: C.divider }} />
      <div
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 2,
          paddingBottom: 2,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: C.border,
        }}
      >
        <text style={{ fontSize: 12, color: C.muted, fontFamily: FONT }}>
          {label}
        </text>
      </div>
      <div style={{ flexGrow: 1, height: 1, backgroundColor: C.divider }} />
    </div>
  )
}

function DirectHeader({ thread }: { thread: MailThread }) {
  const person = thread.faces[0] ?? maraFace
  return (
    <div style={{ paddingTop: 8, paddingBottom: 16, gap: 14 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <Face {...person} size={64} />
        <div style={{ minWidth: 0, gap: 3 }}>
          <text
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: C.text,
              fontFamily: FONT,
            }}
          >
            {thread.senders}
          </text>
          <text style={{ fontSize: 13, color: C.muted, fontFamily: FONT }}>
            {thread.subject}
          </text>
        </div>
      </div>
      <text
        style={{
          fontSize: 13.5,
          lineHeight: 20,
          color: C.secondary,
          fontFamily: FONT,
        }}
      >
        {`This conversation is only between you and ${thread.senders}.`}
      </text>
    </div>
  )
}

function MessageRow({ message }: { message: Message }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        paddingTop: 12,
        paddingBottom: 12,
      }}
    >
      <Face {...message.face} size={30} />
      <div style={{ flexGrow: 1, minWidth: 0, gap: 3 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            gap: 8,
          }}
        >
          <text
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              color: C.text,
              fontFamily: FONT,
            }}
          >
            {message.from}
          </text>
          {message.time ? (
            <text
              style={{
                fontSize: 12,
                color: C.muted,
                fontFamily: FONT,
              }}
            >
              {message.time}
            </text>
          ) : null}
        </div>
        {message.to ? (
          <text
            style={{
              fontSize: 12,
              color: C.muted,
              fontFamily: FONT,
              whiteSpace: 'nowrap',
            }}
          >
            {`To ${message.to}`}
          </text>
        ) : null}
        {message.body.includes('```') || message.body.includes('#') ? (
          <markdown
            source={message.body}
            style={{
              fontSize: 13.5,
              lineHeight: 20,
              color: C.secondary,
              fontFamily: FONT,
            }}
          />
        ) : (
          <text
            style={{
              fontSize: 13.5,
              lineHeight: 20,
              color: C.secondary,
              fontFamily: FONT,
            }}
          >
            {message.body}
          </text>
        )}
        {message.image ? (
          <div
            style={{
              width: '100%',
              height: 280,
              borderRadius: 14,
              overflow: 'hidden',
              marginTop: 12,
              backgroundColor: '#111111',
              borderWidth: 1,
              borderColor: C.border,
            }}
          >
            <img
              src={message.image}
              objectFit="cover"
              style={{
                width: '100%',
                height: 280,
                borderRadius: 14,
              }}
            />
          </div>
        ) : null}
        {message.patch ? (
          <div
            style={{
              marginTop: 10,
              borderRadius: 10,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: C.borderStrong,
              backgroundColor: '#101012',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 12,
                paddingRight: 12,
                height: 30,
                backgroundColor: '#1A1A1E',
                borderBottomWidth: 1,
                borderColor: C.divider,
                gap: 8,
              }}
            >
              <Icon name="tag" size={12} color={C.muted} />
              <text
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: C.secondary,
                  fontFamily: FONT,
                }}
              >
                src/pipeline/shader.wgsl
              </text>
              <div style={{ flexGrow: 1 }} />
              <text
                style={{
                  fontSize: 10.5,
                  color: '#4ADE80',
                  fontFamily: FONT,
                  fontWeight: 600,
                }}
              >
                +6
              </text>
              <text
                style={{
                  fontSize: 10.5,
                  color: '#F87171',
                  fontFamily: FONT,
                  fontWeight: 600,
                }}
              >
                -3
              </text>
            </div>
            <diff
              patch={message.patch}
              wordDiff
              style={{
                fontSize: 12,
                lineHeight: 18,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 8,
                paddingBottom: 8,
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

function SearchField({
  value,
  onChange,
  placeholder,
  testId,
  totalMatches,
  activeMatch,
  onNextMatch,
  onPrevMatch,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  testId: string
  totalMatches?: number
  activeMatch?: number
  onNextMatch?: () => void
  onPrevMatch?: () => void
}) {
  return (
    <div
      style={{
        height: 28,
        flexGrow: 1,
        minWidth: 0,
        paddingLeft: 10,
        paddingRight: 6,
        borderRadius: 14,
        backgroundColor: C.raised,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <input
        testId={testId}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.value ?? '')}
        style={{
          flexGrow: 1,
          minWidth: 0,
          fontSize: 13,
          fontFamily: FONT,
          color: C.text,
        }}
      />
      {value && totalMatches !== undefined && totalMatches > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            flexShrink: 0,
          }}
        >
          <text
            style={{
              fontSize: 11,
              color: C.muted,
              fontFamily: FONT,
              marginRight: 2,
            }}
          >
            {`${(activeMatch ?? 0) + 1}/${totalMatches}`}
          </text>
          {onPrevMatch ? (
            <IconButton
              icon="arrowLeft"
              size={10}
              pad={18}
              onClick={onPrevMatch}
            />
          ) : null}
          {onNextMatch ? (
            <IconButton
              icon="arrowRight"
              size={10}
              pad={18}
              onClick={onNextMatch}
            />
          ) : null}
        </div>
      ) : null}
      {value ? (
        <IconButton
          icon="x"
          size={11}
          pad={18}
          onClick={() => onChange('')}
        />
      ) : null}
    </div>
  )
}

const ACCOUNTS = [
  { id: 'mara', name: 'Mara Lin', email: 'mara@northlight.io', face: maraFace },
  { id: 'lea', name: 'Lea Atlas', email: 'lea@atlas.mail', face: leaFace },
]

export function MailApp({
  initialSettingsOpen = false,
  initialPaletteOpen = false,
}: {
  initialSettingsOpen?: boolean
  initialPaletteOpen?: boolean
} = {}) {
  const { renderer } = useGpuix()

  useEffect(() => {
    renderer?.activateWindow?.()
  }, [renderer])

  const [threads, setThreads] = useState<MailThread[]>(INITIAL_THREADS)
  const [currentAccount, setCurrentAccount] = useState('mara')
  const [query, setQuery] = useState('')
  const [channelQuery, setChannelQuery] = useState('')
  const [draft, setDraft] = useState('')
  const [active, setActive] = useState('atlas-weekly')
  const [activeChannel, setActiveChannel] = useState('primary')
  const [sidebarFocus, setSidebarFocus] = useState<'channel' | 'thread'>('thread')
  const [threadPane, setThreadPane] = useState<'closed' | 'split' | 'full'>('split')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showArchived, setShowArchived] = useState(false)

  // Settings & Customization State
  const [settingsOpen, setSettingsOpen] = useState(initialSettingsOpen)
  const [paletteOpen, setPaletteOpen] = useState(initialPaletteOpen)
  const [paletteSearch, setPaletteSearch] = useState('')
  const [debugOverlay, setDebugOverlay] = useState<'hidden' | 'minimal' | 'full'>('hidden')
  const [accentColor, setAccentColor] = useState('#3B82F6')
  const [hardwareStats, setHardwareStats] = useState({
    api: 'Direct3D 12 (DirectX 12)',
    featureLevel: 'Direct3D 12.0 / 11_0+',
    colorSpace: 'oklab (Linear Native)',
    compositor: 'Zed GPUI Retained Layer Tree',
  })

  const windowSize = useWindowSize({ intervalMs: 100 })
  const winWidth = windowSize.width > 0 ? windowSize.width : 1280

  // Resizable Panes State - proportional to window size so resizing window expands/contracts panes
  const [sidebarRatio, setSidebarRatio] = useState(SIDEBAR_WIDTH / 1280)
  const [listRatio, setListRatio] = useState(LIST_WIDTH / 1280)
  const [draggingSidebar, setDraggingSidebar] = useState(false)
  const [draggingList, setDraggingList] = useState(false)

  const sidebarWidth = useMemo(() => {
    if (sidebarCollapsed) return 0
    return Math.max(180, Math.min(380, Math.round(winWidth * sidebarRatio)))
  }, [winWidth, sidebarRatio, sidebarCollapsed])

  const listWidth = useMemo(() => {
    if (threadPane === 'full') return winWidth
    return Math.max(240, Math.min(Math.round(winWidth * 0.55), Math.round(winWidth * listRatio)))
  }, [winWidth, listRatio, threadPane])

  function handleSidebarDrag(clientX: number) {
    const clamped = Math.max(160, Math.min(380, clientX))
    setSidebarRatio(clamped / Math.max(800, winWidth))
  }

  function handleListDrag(clientX: number) {
    const currentSidebar = sidebarCollapsed ? 0 : sidebarWidth
    const calculated = clientX - currentSidebar - 5
    const clamped = Math.max(220, Math.min(Math.round(winWidth * 0.55), calculated))
    setListRatio(clamped / Math.max(800, winWidth))
  }

  const textSearch = useTextSearch({
    query,
    color: '#3B82F644',
    activeColor: '#3B82F699',
    radius: 3,
  })

  function updateDebugOverlay(mode: 'hidden' | 'minimal' | 'full') {
    setDebugOverlay(mode)
    if (renderer && typeof renderer.setDebugFrameOverlay === 'function') {
      renderer.setDebugFrameOverlay(mode)
    }
  }

  const activeAccount = useMemo(() => {
    return ACCOUNTS.find((a) => a.id === currentAccount) ?? ACCOUNTS[0]!
  }, [currentAccount])

  const visibleChannels = useMemo(() => {
    const q = channelQuery.trim().toLowerCase()
    if (!q) return INITIAL_CHANNELS
    return INITIAL_CHANNELS.filter((channel) =>
      channel.label.toLowerCase().includes(q),
    )
  }, [channelQuery])

  const visibleThreads = useMemo(() => {
    const q = query.trim().toLowerCase()
    return threads
      .filter((thread) => {
        if (thread.archived && !showArchived) return false
        if (!thread.archived && showArchived) return false
        if (thread.channelId !== activeChannel) return false
        if (!q) return true
        return (
          thread.senders.toLowerCase().includes(q) ||
          thread.snippet.toLowerCase().includes(q) ||
          thread.subject.toLowerCase().includes(q) ||
          thread.messages.some((m) => m.body.toLowerCase().includes(q))
        )
      })
      .sort((a, b) => b.lastReplyAt - a.lastReplyAt)
  }, [threads, query, activeChannel, showArchived])

  const currentThread =
    threads.find((item) => item.id === active) ?? visibleThreads[0] ?? threads[0]!

  const messagesScrollerRef = useRef<any>(null)

  function scrollToTop() {
    const doScroll = () => {
      if (messagesScrollerRef.current && renderer?.scrollTo) {
        renderer.scrollTo(messagesScrollerRef.current.id, 0, 0)
      }
    }
    doScroll()
    setTimeout(doScroll, 20)
  }

  function scrollToBottom() {
    const doScroll = () => {
      if (messagesScrollerRef.current && renderer?.scrollTo) {
        renderer.scrollTo(messagesScrollerRef.current.id, 0, -999999)
      }
    }
    doScroll()
    setTimeout(doScroll, 20)
    setTimeout(doScroll, 100)
  }

  // When switching thread, scroll to top so conversation is read from the beginning
  useEffect(() => {
    scrollToTop()
  }, [currentThread.id])

  // Automatically mark currently active chat as read and clear notifications
  useEffect(() => {
    if (active) {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === active && (t.unread || (t.mentionCount && t.mentionCount > 0))
            ? { ...t, unread: false, mentionCount: 0 }
            : t,
        ),
      )
    }
  }, [active])

  function selectChannel(id: string) {
    setActiveChannel(id)
    setSidebarFocus('channel')
    setThreadPane('split')
    const first = threads.find((t) => t.channelId === id && !t.archived)
    if (first) {
      selectThread(first.id, 'split')
    }
  }

  function selectThread(id: string, pane: 'split' | 'full') {
    const next = threads.find((item) => item.id === id)
    if (!next) return
    setActive(id)
    setActiveChannel(next.channelId)
    setSidebarFocus('thread')
    setThreadPane(pane)
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, unread: false, mentionCount: 0 } : t,
      ),
    )
    scrollToTop()
  }

  function toggleStar(threadId: string = currentThread.id) {
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, starred: !t.starred } : t)),
    )
  }

  function toggleRead(threadId: string = currentThread.id) {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const nextUnread = !t.unread
          return {
            ...t,
            unread: nextUnread,
            mentionCount: nextUnread ? 1 : 0,
          }
        }
        return t
      }),
    )
  }

  function archiveThread(threadId: string = currentThread.id) {
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, archived: !t.archived } : t)),
    )
    const remaining = visibleThreads.filter((t) => t.id !== threadId)
    if (remaining.length > 0) {
      setActive(remaining[0]!.id)
    }
  }

  function deleteThread(threadId: string = currentThread.id) {
    setThreads((prev) => prev.filter((t) => t.id !== threadId))
    const remaining = visibleThreads.filter((t) => t.id !== threadId)
    if (remaining.length > 0) {
      setActive(remaining[0]!.id)
    }
  }

  function selectNextThread() {
    const idx = visibleThreads.findIndex((t) => t.id === active)
    if (idx >= 0 && idx < visibleThreads.length - 1) {
      selectThread(visibleThreads[idx + 1]!.id, threadPane === 'closed' ? 'split' : threadPane)
    }
  }

  function selectPrevThread() {
    const idx = visibleThreads.findIndex((t) => t.id === active)
    if (idx > 0) {
      selectThread(visibleThreads[idx - 1]!.id, threadPane === 'closed' ? 'split' : threadPane)
    }
  }

  function handleSend() {
    const text = draft.trim()
    if (!text) return
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      from: 'Mara Lin',
      to: currentThread.senders,
      face: maraFace,
      time: 'Just now',
      body: text,
    }
    setThreads((prev) =>
      prev.map((t) =>
        t.id === currentThread.id
          ? {
              ...t,
              snippet: text,
              lastReplyAt: Date.now(),
              unread: false,
              mentionCount: 0,
              messages: [...t.messages, newMessage],
            }
          : t,
      ),
    )
    setDraft('')
    scrollToBottom()
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div
        tabIndex={0}
        autoFocus
        onKeyDown={(event) => {
          const key = event.key?.toLowerCase()
          if (event.modifiers?.cmd || event.modifiers?.ctrl) {
            if (key === 'b') {
              setSidebarCollapsed((prev) => !prev)
              return
            }
            if (key === ',' || key === '<') {
              setSettingsOpen((prev) => !prev)
              return
            }
            if (key === 'k') {
              setPaletteOpen((prev) => !prev)
              return
            }
          }
          if (settingsOpen || paletteOpen) {
            if (key === 'escape') {
              setSettingsOpen(false)
              setPaletteOpen(false)
            }
            return
          }
          if (key === 'j' || key === 'arrowdown') {
            selectNextThread()
          } else if (key === 'k' || key === 'arrowup') {
            selectPrevThread()
          } else if (key === 's') {
            toggleStar()
          } else if (key === 'e') {
            archiveThread()
          } else if (key === 'u') {
            toggleRead()
          } else if (key === 'escape') {
            if (query) setQuery('')
            else if (threadPane === 'full') setThreadPane('split')
          }
        }}
        onMouseMove={(e: any) => {
          if (draggingSidebar || draggingList) {
            const clientX = e.x ?? e.clientX
            if (typeof clientX === 'number') {
              if (draggingSidebar) handleSidebarDrag(clientX)
              else if (draggingList) handleListDrag(clientX)
            }
          }
        }}
        onMouseUp={() => {
          if (draggingSidebar) setDraggingSidebar(false)
          if (draggingList) setDraggingList(false)
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: C.sidebar,
          fontFamily: FONT,
          color: C.text,
        }}
      >
        {/* Top Titlebar Chrome */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: TITLEBAR_HEIGHT,
            flexShrink: 0,
            borderBottomWidth: 1,
            borderColor: C.divider,
          }}
        >
          {/* Left window chrome & sidebar controls */}
          <motion.div
            initial={false}
            animate={{ width: sidebarCollapsed ? 54 : sidebarWidth }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
              paddingRight: 12,
              flexShrink: 0,
            }}
          >
            {!sidebarCollapsed ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                  width: TRAFFIC_LIGHT_CLEARANCE,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: '#ED6A5E',
                    borderWidth: 1,
                    borderColor: '#D04E44',
                    cursor: 'pointer',
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: '#F5BF4F',
                    borderWidth: 1,
                    borderColor: '#D49F33',
                    cursor: 'pointer',
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: '#62C554',
                    borderWidth: 1,
                    borderColor: '#4EA63D',
                    cursor: 'pointer',
                  }}
                />
              </div>
            ) : null}
            <Pill>
              <ActionTooltip label="Toggle Sidebar" hotkey="Ctrl+B">
                <IconButton
                  icon="sidebar"
                  size={15}
                  testId="sidebar-toggle"
                  onClick={() => setSidebarCollapsed((prev) => !prev)}
                />
              </ActionTooltip>
            </Pill>
          </motion.div>

          {/* Sidebar Resizable Splitter in Titlebar */}
          {!sidebarCollapsed ? (
            <div
              onMouseDown={() => setDraggingSidebar(true)}
              style={{
                width: 5,
                height: '100%',
                cursor: 'col-resize',
                flexShrink: 0,
                backgroundColor: draggingSidebar ? '#3B82F6' : C.divider,
                hover: { backgroundColor: '#3B82F688' },
              }}
            />
          ) : null}

          {/* Middle Navigation & Search Bar */}
          {threadPane !== 'full' ? (
            <div
              style={{
                width: threadPane === 'split' ? listWidth : undefined,
                flexGrow: threadPane === 'split' ? 0 : 1,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 8,
                paddingRight: 8,
                gap: 6,
              }}
            >
              <Pill>
                <IconButton icon="arrowLeft" dimmed size={13} pad={24} />
                <IconButton icon="arrowRight" dimmed size={13} pad={24} />
                <ActionTooltip label="History">
                  <IconButton icon="clock" size={13} pad={24} />
                </ActionTooltip>
              </Pill>
              <SearchField
                value={query}
                onChange={setQuery}
                placeholder="Search"
                testId="search"
                totalMatches={textSearch.total}
                activeMatch={textSearch.active}
                onNextMatch={textSearch.next}
                onPrevMatch={textSearch.previous}
              />
              <Pill>
                <ActionTooltip label="Filter Threads">
                  <IconButton icon="filter" size={13} pad={24} />
                </ActionTooltip>
                <ActionTooltip label="Sort">
                  <IconButton icon="sort" size={13} pad={24} />
                </ActionTooltip>
              </Pill>
            </div>
          ) : null}

          {/* Timeline Resizable Splitter in Titlebar */}
          {threadPane === 'split' ? (
            <div
              onMouseDown={() => setDraggingList(true)}
              style={{
                width: 5,
                height: '100%',
                cursor: 'col-resize',
                flexShrink: 0,
                backgroundColor: draggingList ? '#3B82F6' : C.divider,
                hover: { backgroundColor: '#3B82F688' },
              }}
            />
          ) : null}

          {/* Right Detail Bar */}
          {threadPane !== 'closed' ? (
            <div
              style={{
                flexGrow: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 16,
                paddingRight: 12,
                gap: 8,
              }}
            >
              <text
                style={{
                  flexGrow: 1,
                  minWidth: 0,
                  fontSize: 15,
                  fontWeight: 600,
                  color: C.text,
                  fontFamily: FONT,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {currentThread.subject}
              </text>
              <Pill>
                <ActionTooltip label="Snooze" hotkey="H">
                  <IconButton icon="snooze" size={14} pad={24} />
                </ActionTooltip>
              </Pill>
              <Pill>
                <ActionTooltip label="AI Quick Actions">
                  <IconButton icon="zap" size={14} pad={24} />
                </ActionTooltip>
              </Pill>
              <Pill>
                <ActionTooltip
                  label={currentThread.archived ? 'Unarchive' : 'Archive'}
                  hotkey="E"
                >
                  <IconButton
                    icon="archive"
                    size={13}
                    pad={24}
                    color={currentThread.archived ? '#3B82F6' : C.muted}
                    testId="btn-archive"
                    onClick={() => archiveThread(currentThread.id)}
                  />
                </ActionTooltip>
                <ActionTooltip
                  label={currentThread.starred ? 'Unstar' : 'Star'}
                  hotkey="S"
                >
                  <IconButton
                    icon={currentThread.starred ? 'starFilled' : 'star'}
                    size={13}
                    pad={24}
                    color={currentThread.starred ? '#EAB308' : C.muted}
                    testId="btn-star"
                    onClick={() => toggleStar(currentThread.id)}
                  />
                </ActionTooltip>
                <ActionTooltip
                  label={currentThread.unread ? 'Mark as Read' : 'Mark as Unread'}
                  hotkey="U"
                >
                  <IconButton
                    icon="mailCheck"
                    size={13}
                    pad={24}
                    color={currentThread.unread ? '#3B82F6' : C.muted}
                    testId="btn-read"
                    onClick={() => toggleRead(currentThread.id)}
                  />
                </ActionTooltip>
              </Pill>
              <Pill>
                <ActionTooltip label="Block Sender">
                  <IconButton icon="block" size={13} pad={24} />
                </ActionTooltip>
                <ActionTooltip label="Delete Thread" hotkey="#">
                  <IconButton
                    icon="trash"
                    size={13}
                    pad={24}
                    testId="btn-trash"
                    onClick={() => deleteThread(currentThread.id)}
                  />
                </ActionTooltip>
                <ActionTooltip label="More Actions">
                  <IconButton icon="more" size={13} pad={24} />
                </ActionTooltip>
              </Pill>
              <Pill>
                {threadPane === 'full' ? (
                  <ActionTooltip label="Split View">
                    <IconButton
                      icon="minimize"
                      size={13}
                      pad={24}
                      onClick={() => setThreadPane('split')}
                    />
                  </ActionTooltip>
                ) : (
                  <ActionTooltip label="Full Width View">
                    <IconButton
                      icon="maximize"
                      size={13}
                      pad={24}
                      onClick={() => setThreadPane('full')}
                      testId="thread-full"
                    />
                  </ActionTooltip>
                )}
                <ActionTooltip label="Command Palette" hotkey="Ctrl+K">
                  <IconButton
                    icon="command"
                    size={13}
                    pad={24}
                    onClick={() => setPaletteOpen(true)}
                  />
                </ActionTooltip>
                <ActionTooltip label="Settings" hotkey="Ctrl+,">
                  <IconButton
                    icon="settings"
                    size={13}
                    pad={24}
                    onClick={() => setSettingsOpen(true)}
                  />
                </ActionTooltip>
                <ActionTooltip label="Close Detail Pane">
                  <IconButton
                    icon="x"
                    size={13}
                    pad={24}
                    onClick={() => setThreadPane('closed')}
                    testId="thread-close"
                  />
                </ActionTooltip>
              </Pill>
            </div>
          ) : null}
        </div>

      {/* Main 3-Column Content Body */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          minHeight: 0,
          position: 'relative',
        }}
      >
        {/* Left Animated Sidebar */}
        <motion.div
          initial={false}
          animate={{ width: sidebarCollapsed ? 0 : sidebarWidth }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: sidebarWidth,
              flexShrink: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              userSelect: 'none',
            }}
          >
            {/* User Profile & Account Switcher */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 12,
                paddingRight: 8,
                paddingTop: 8,
                paddingBottom: 8,
                gap: 8,
                flexShrink: 0,
              }}
            >
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <Select
                  value={currentAccount}
                  onValueChange={(val) => setCurrentAccount(val)}
                >
                  <SelectTrigger
                    asChild
                    style={{
                      cursor: 'pointer',
                      borderRadius: 8,
                      paddingLeft: 4,
                      paddingRight: 6,
                      paddingTop: 4,
                      paddingBottom: 4,
                      hover: { backgroundColor: C.overlay },
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        width: '100%',
                      }}
                    >
                      <Face {...(activeAccount.face)} size={28} />
                      <div style={{ flexGrow: 1, minWidth: 0, gap: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <text
                            style={{
                              fontSize: 13.5,
                              fontWeight: 600,
                              color: C.text,
                              fontFamily: FONT,
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {activeAccount.name}
                          </text>
                          <Icon name="chevronDown" size={12} color={C.muted} />
                        </div>
                        <text
                          style={{
                            fontSize: 11,
                            color: C.muted,
                            fontFamily: FONT,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {activeAccount.email}
                        </text>
                      </div>
                    </div>
                  </SelectTrigger>
                  <SelectContent
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    style={{
                      width: 200,
                      backgroundColor: '#1E1E22',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: C.borderStrong,
                      paddingTop: 4,
                      paddingBottom: 4,
                      paddingLeft: 4,
                      paddingRight: 4,
                      gap: 2,
                    }}
                  >
                    {ACCOUNTS.map((acc) => (
                      <SelectItem
                        key={acc.id}
                        value={acc.id}
                        style={(state) => ({
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                          paddingLeft: 8,
                          paddingRight: 8,
                          paddingTop: 6,
                          paddingBottom: 6,
                          borderRadius: 6,
                          cursor: 'pointer',
                          backgroundColor: state.highlighted
                            ? C.overlayStrong
                            : state.selected
                              ? C.overlay
                              : undefined,
                        })}
                      >
                        <Face {...acc.face} size={20} />
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <text
                            style={{
                              fontSize: 12.5,
                              fontWeight: 500,
                              color: C.text,
                              fontFamily: FONT,
                            }}
                          >
                            {acc.name}
                          </text>
                        </div>
                        {acc.id === currentAccount ? (
                          <Icon name="check" size={12} color="#3B82F6" />
                        ) : null}
                      </SelectItem>
                    ))}
                    <SelectSeparator
                      style={{
                        height: 1,
                        backgroundColor: C.divider,
                        marginTop: 4,
                        marginBottom: 4,
                      }}
                    />
                    <div
                      onClick={() => setSettingsOpen(true)}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingTop: 6,
                        paddingBottom: 6,
                        borderRadius: 6,
                        cursor: 'pointer',
                        hover: { backgroundColor: C.overlay },
                      }}
                    >
                      <Icon name="settings" size={13} color={C.muted} />
                      <text
                        style={{
                          fontSize: 12.5,
                          color: C.secondary,
                          fontFamily: FONT,
                        }}
                      >
                        Account Settings
                      </text>
                    </div>
                  </SelectContent>
                </Select>
              </div>
              <ActionTooltip label="New Message" hotkey="C">
                <IconButton icon="compose" size={15} pad={28} />
              </ActionTooltip>
            </div>

            {/* Find Channel Search Input */}
            <div
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingBottom: 8,
                flexShrink: 0,
              }}
            >
              <SearchField
                value={channelQuery}
                onChange={setChannelQuery}
                placeholder="Find a channel"
                testId="find-channel"
              />
            </div>

            {/* Channel and Sub-thread Tree */}
            <div
              style={{
                flexGrow: 1,
                minHeight: 0,
                overflowY: 'scroll',
                paddingLeft: 8,
                paddingRight: 8,
                paddingBottom: 8,
              }}
            >
              {visibleChannels.map((channel) => {
                const children = threads
                  .filter((item) => item.channelId === channel.id && !item.archived)
                  .sort((a, b) => b.lastReplyAt - a.lastReplyAt)
                  .slice(0, 4)
                const unread = children.some((item) => item.unread)
                return (
                  <div key={channel.id} style={{ paddingBottom: 2 }}>
                    <ChannelRow
                      channel={channel}
                      active={
                        activeChannel === channel.id &&
                        sidebarFocus === 'channel'
                      }
                      unread={unread}
                      mentionCount={0}
                      onSelect={() => selectChannel(channel.id)}
                    />
                    {children.map((item, index) => (
                      <SidebarThreadRow
                        key={item.id}
                        thread={item}
                        last={index === children.length - 1}
                        selected={
                          item.id === active && sidebarFocus === 'thread'
                        }
                        onSelect={() => selectThread(item.id, 'full')}
                      />
                    ))}
                  </div>
                )
              })}
            </div>

            {/* Bottom Feedback / Settings Bar */}
            <div
              onClick={() => setSettingsOpen(true)}
              style={{
                height: 44,
                paddingLeft: 14,
                paddingRight: 14,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexShrink: 0,
                borderTopWidth: 1,
                borderColor: C.divider,
                cursor: 'pointer',
                hover: { backgroundColor: C.overlay },
              }}
            >
              <Icon name="settings" size={14} color={C.muted} />
              <text
                style={{
                  flexGrow: 1,
                  marginLeft: 8,
                  fontSize: 13,
                  color: C.muted,
                  fontFamily: FONT,
                }}
              >
                Settings
              </text>
              <text
                style={{
                  fontSize: 11,
                  color: C.ghost,
                  fontFamily: FONT,
                }}
              >
                Ctrl+,
              </text>
            </div>
          </div>
        </motion.div>

        {/* Sidebar Resizable Splitter */}
        {!sidebarCollapsed ? (
          <div
            onMouseDown={() => setDraggingSidebar(true)}
            style={{
              width: 5,
              cursor: 'col-resize',
              flexShrink: 0,
              backgroundColor: draggingSidebar ? '#3B82F6' : C.divider,
              hover: { backgroundColor: '#3B82F688' },
            }}
          />
        ) : null}

        {/* Middle Timeline Pane */}
        {threadPane !== 'full' ? (
          <div
            style={{
              width: threadPane === 'split' ? listWidth : undefined,
              flexGrow: threadPane === 'split' ? 0 : 1,
              flexShrink: 0,
              height: '100%',
              paddingTop: 8,
              paddingLeft: 8,
              paddingRight: 8,
              paddingBottom: 12,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <virtual-list
              estimatedItemHeight={58}
              overdraw={2}
              style={{
                flexGrow: 1,
                minHeight: 0,
                width: '100%',
              }}
            >
              {visibleThreads.map((item) => (
                <TimelineRow
                  key={item.id}
                  thread={item}
                  selected={item.id === active}
                  highlightQuery={query}
                  onSelect={() => selectThread(item.id, 'split')}
                  onToggleStar={() => toggleStar(item.id)}
                />
              ))}
            </virtual-list>
          </div>
        ) : null}

        {/* Timeline Resizable Splitter */}
        {threadPane === 'split' ? (
          <div
            onMouseDown={() => setDraggingList(true)}
            style={{
              width: 5,
              cursor: 'col-resize',
              flexShrink: 0,
              backgroundColor: draggingList ? '#3B82F6' : C.divider,
              hover: { backgroundColor: '#3B82F688' },
            }}
          />
        ) : null}

        {/* Right Detail / Reading Pane */}
        {threadPane !== 'closed' ? (
          <div
            style={{
              flexGrow: 1,
              minWidth: 0,
              height: '100%',
              backgroundColor: C.reading,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Scrollable Messages Stream */}
            <div
              ref={messagesScrollerRef}
              {...textSearch.props}
              style={{
                flexGrow: 1,
                minHeight: 0,
                overflowY: 'scroll',
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 8,
                paddingBottom: 16,
              }}
            >
              {currentThread.faces.length === 1 ? (
                <DirectHeader thread={currentThread} />
              ) : null}
              {currentThread.messages.map((message, index) => {
                const day = message.day ?? currentThread.date ?? 'Today'
                const previous =
                  index > 0
                    ? currentThread.messages[index - 1]!.day ??
                      currentThread.date ??
                      'Today'
                    : null
                return (
                  <div key={message.id}>
                    {day !== previous ? <DayDivider label={day} /> : null}
                    <MessageRow message={message} />
                  </div>
                )
              })}
            </div>

            {/* Bottom Composer Pill with Quick Replies & Attachment Chips */}
            <div
              style={{
                flexShrink: 0,
                paddingLeft: 24,
                paddingRight: 24,
                paddingBottom: 16,
                paddingTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                backgroundColor: C.reading,
              }}
            >
              {/* Quick Reply & Attachment Chips */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  paddingLeft: 4,
                }}
              >
                {[
                  'Sounds good!',
                  'Can we move to 4pm?',
                  'Review attached draft',
                  'Approved',
                ].map((chip) => (
                  <div
                    key={chip}
                    onClick={() => setDraft(chip)}
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingTop: 4,
                      paddingBottom: 4,
                      borderRadius: 12,
                      backgroundColor: C.raised,
                      borderWidth: 1,
                      borderColor: C.border,
                      cursor: 'pointer',
                      hover: {
                        backgroundColor: C.selected,
                        borderColor: C.borderStrong,
                      },
                    }}
                  >
                    <text
                      style={{
                        fontSize: 11.5,
                        color: C.secondary,
                        fontFamily: FONT,
                      }}
                    >
                      {chip}
                    </text>
                  </div>
                ))}
              </div>

              {/* Main Composer Box */}
              <div
                style={{
                  minHeight: 42,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 14,
                  paddingRight: 8,
                  paddingTop: 4,
                  paddingBottom: 4,
                  gap: 4,
                  borderRadius: 21,
                  backgroundColor: C.raised,
                  borderWidth: 1,
                  borderColor: C.borderStrong,
                }}
              >
                <textarea
                  testId="composer"
                  value={draft}
                  placeholder="Ask anything, @ for more... (Enter to send, Shift+Enter for newline)"
                  minRows={1}
                  maxRows={5}
                  onChange={(event) => setDraft(event.value ?? '')}
                  onSubmit={handleSend}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.modifiers?.shift) {
                      handleSend()
                    }
                  }}
                  style={{
                    flexGrow: 1,
                    fontSize: 13,
                    lineHeight: 18,
                    fontFamily: FONT,
                    color: C.text,
                    backgroundColor: '#00000000',
                    borderWidth: 0,
                  }}
                />
                <AtlasTooltip label="Mention senders" shortcut="@">
                  <ActionTooltip label="Mention Senders" hotkey="@">
                    <IconButton icon="at" size={14} pad={26} />
                  </ActionTooltip>
                </AtlasTooltip>
                <ActionTooltip label="Attach File">
                  <IconButton icon="paperclip" size={14} pad={26} />
                </ActionTooltip>
                <div
                  style={{
                    width: 1,
                    height: 14,
                    backgroundColor: C.border,
                    marginLeft: 4,
                    marginRight: 4,
                  }}
                />
                <ActionTooltip label={draft.trim() ? 'Send' : 'Voice Message'} hotkey="Enter">
                  <IconButton
                    icon={draft.trim() ? 'send' : 'mic'}
                    size={14}
                    pad={26}
                    color={draft.trim() ? '#3B82F6' : C.muted}
                    onClick={handleSend}
                  />
                </ActionTooltip>
              </div>
            </div>
          </div>
        ) : null}

        {/* Global Settings Dialog Modal */}
        {settingsOpen ? (
          <div
            onClick={() => setSettingsOpen(false)}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#00000099',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
          >
            <div
              style={{
                width: 560,
                maxHeight: '85%',
                backgroundColor: '#18181B',
                borderRadius: 14,
                borderWidth: 1,
                borderColor: C.borderStrong,
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 20,
                paddingBottom: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: C.divider,
                  paddingBottom: 12,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Icon name="settings" size={18} color="#3B82F6" />
                  <text style={{ fontSize: 16, fontWeight: 600, color: C.text, fontFamily: FONT }}>
                    Preferences & Engine Settings
                  </text>
                </div>
                <AtlasTooltip label="Close settings" shortcut="Esc">
                  <IconButton icon="x" size={14} pad={24} onClick={() => setSettingsOpen(false)} />
                </AtlasTooltip>
              </div>

              {/* Debug Frame Overlay Setting */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <text style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: FONT }}>
                  GPU Frame & Performance Overlay
                </text>
                <text style={{ fontSize: 12, color: C.muted, fontFamily: FONT }}>
                  GPUIX native debug heads-up display rendering frame times, p90/p99 latency, and paint cost.
                </text>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 4 }}>
                  {(['hidden', 'minimal', 'full'] as const).map((mode) => (
                    <div
                      key={mode}
                      onClick={() => updateDebugOverlay(mode)}
                      style={{
                        paddingLeft: 14,
                        paddingRight: 14,
                        paddingTop: 6,
                        paddingBottom: 6,
                        borderRadius: 8,
                        backgroundColor: debugOverlay === mode ? '#3B82F622' : C.raised,
                        borderWidth: 1,
                        borderColor: debugOverlay === mode ? '#3B82F6' : C.border,
                        cursor: 'pointer',
                      }}
                    >
                      <text
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: debugOverlay === mode ? '#60A5FA' : C.secondary,
                          fontFamily: FONT,
                        }}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </text>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accent Color Customization */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <text style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: FONT }}>
                  Theme Accent Color
                </text>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 2 }}>
                  {['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'].map((c) => (
                    <div
                      key={c}
                      onClick={() => setAccentColor(c)}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: c,
                        cursor: 'pointer',
                        borderWidth: accentColor === c ? 2 : 1,
                        borderColor: accentColor === c ? '#FFFFFF' : '#00000044',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Hardware Acceleration & Engine Card */}
              <div
                style={{
                  backgroundColor: '#121214',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: C.border,
                  paddingLeft: 14,
                  paddingRight: 14,
                  paddingTop: 10,
                  paddingBottom: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <text style={{ fontSize: 12, fontWeight: 600, color: C.text, fontFamily: FONT }}>
                  Graphics Backend & Hardware Acceleration
                </text>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <text style={{ fontSize: 11.5, color: C.muted, fontFamily: FONT }}>Graphics API:</text>
                  <text style={{ fontSize: 11.5, color: '#4ADE80', fontFamily: FONT, fontWeight: 500 }}>
                    {hardwareStats.api}
                  </text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <text style={{ fontSize: 11.5, color: C.muted, fontFamily: FONT }}>Driver Feature Level:</text>
                  <text style={{ fontSize: 11.5, color: C.secondary, fontFamily: FONT }}>
                    {hardwareStats.featureLevel}
                  </text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <text style={{ fontSize: 11.5, color: C.muted, fontFamily: FONT }}>Color Space:</text>
                  <text style={{ fontSize: 11.5, color: C.secondary, fontFamily: FONT }}>
                    {hardwareStats.colorSpace}
                  </text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <text style={{ fontSize: 11.5, color: C.muted, fontFamily: FONT }}>UI Compositor Engine:</text>
                  <text style={{ fontSize: 11.5, color: C.secondary, fontFamily: FONT }}>
                    {hardwareStats.compositor}
                  </text>
                </div>
              </div>

              {/* Keyboard Shortcuts Cheat Sheet */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <text style={{ fontSize: 12.5, fontWeight: 600, color: C.text, fontFamily: FONT }}>
                  Quick Shortcuts
                </text>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <text style={{ fontSize: 11.5, color: C.secondary, fontFamily: FONT }}>Command Palette</text>
                  <text style={{ fontSize: 11.5, color: C.muted, fontFamily: FONT }}>Ctrl+K</text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <text style={{ fontSize: 11.5, color: C.secondary, fontFamily: FONT }}>Settings Dialog</text>
                  <text style={{ fontSize: 11.5, color: C.muted, fontFamily: FONT }}>Ctrl+,</text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <text style={{ fontSize: 11.5, color: C.secondary, fontFamily: FONT }}>Toggle Left Sidebar</text>
                  <text style={{ fontSize: 11.5, color: C.muted, fontFamily: FONT }}>Ctrl+B</text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <text style={{ fontSize: 11.5, color: C.secondary, fontFamily: FONT }}>Next / Previous Thread</text>
                  <text style={{ fontSize: 11.5, color: C.muted, fontFamily: FONT }}>J / K</text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <text style={{ fontSize: 11.5, color: C.secondary, fontFamily: FONT }}>Star / Archive / Mark Read</text>
                  <text style={{ fontSize: 11.5, color: C.muted, fontFamily: FONT }}>S / E / U</text>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Global Quick-Switcher Command Palette */}
        {paletteOpen ? (
          <div
            onClick={() => setPaletteOpen(false)}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#00000099',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: 100,
              pointerEvents: 'auto',
            }}
          >
            <div
              style={{
                width: 520,
                backgroundColor: '#1E1E22',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: C.borderStrong,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 8,
                paddingBottom: 8,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Combobox open={true} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    height: 36,
                    borderRadius: 8,
                    backgroundColor: C.raised,
                    borderWidth: 1,
                    borderColor: C.border,
                  }}
                >
                  <Icon name="search" size={14} color={C.muted} />
                  <ComboboxInput
                    placeholder="Jump to channel, thread, or settings... (Esc to cancel)"
                    value={paletteSearch}
                    onChange={(e: any) => setPaletteSearch(e.value ?? '')}
                    style={{
                      flexGrow: 1,
                      fontSize: 13,
                      fontFamily: FONT,
                      color: C.text,
                    }}
                  />
                </div>
                <ComboboxContent
                  style={{
                    marginTop: 6,
                    width: 496,
                    maxHeight: 280,
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    backgroundColor: '#18181B',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: C.border,
                    paddingLeft: 4,
                    paddingRight: 4,
                    paddingTop: 4,
                    paddingBottom: 4,
                  }}
                >
                  <ComboboxList>
                    <ComboboxItem
                      value="open-settings"
                      onClick={() => {
                        setPaletteOpen(false)
                        setSettingsOpen(true)
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 8,
                        paddingBottom: 8,
                        borderRadius: 6,
                        cursor: 'pointer',
                        hover: { backgroundColor: C.overlayStrong },
                      }}
                    >
                      <Icon name="settings" size={14} color="#3B82F6" />
                      <text style={{ fontSize: 13, fontWeight: 500, color: C.text, fontFamily: FONT }}>
                        Open Settings & GPU Diagnostics
                      </text>
                    </ComboboxItem>
                    {INITIAL_CHANNELS.map((ch) => (
                      <ComboboxItem
                        key={ch.id}
                        value={`channel-${ch.id}`}
                        onClick={() => {
                          selectChannel(ch.id)
                          setPaletteOpen(false)
                        }}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 8,
                          paddingBottom: 8,
                          borderRadius: 6,
                          cursor: 'pointer',
                          hover: { backgroundColor: C.overlayStrong },
                        }}
                      >
                        <Icon name="hash" size={14} color={C.muted} />
                        <text style={{ fontSize: 13, color: C.text, fontFamily: FONT }}>
                          {ch.label}
                        </text>
                      </ComboboxItem>
                    ))}
                    {threads.map((th) => (
                      <ComboboxItem
                        key={th.id}
                        value={`thread-${th.id}`}
                        onClick={() => {
                          selectThread(th.id, 'split')
                          setPaletteOpen(false)
                        }}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 8,
                          paddingBottom: 8,
                          borderRadius: 6,
                          cursor: 'pointer',
                          hover: { backgroundColor: C.overlayStrong },
                        }}
                      >
                        <Face {...(th.faces[0] ?? maraFace)} size={18} />
                        <div style={{ flexGrow: 1, minWidth: 0, gap: 1 }}>
                          <text
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: C.text,
                              fontFamily: FONT,
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {th.subject}
                          </text>
                          <text
                            style={{
                              fontSize: 11,
                              color: C.muted,
                              fontFamily: FONT,
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {th.senders}
                          </text>
                        </div>
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                  <ComboboxEmpty>
                    <div style={{ padding: 12, textAlign: 'center' }}>
                      <text style={{ fontSize: 12, color: C.muted, fontFamily: FONT }}>
                        No matching channels or conversations found
                      </text>
                    </div>
                  </ComboboxEmpty>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>
        ) : null}
      </div>
    </div>
    </TooltipProvider>
  )
}

const isEntryPoint =
  typeof Bun !== 'undefined'
    ? (Bun as any).isStandaloneExecutable || (Bun as any).main === (import.meta as any).path
    : typeof process !== 'undefined' && process.argv[1]?.endsWith('app.tsx')

const isMac = typeof process !== 'undefined' && process.platform === 'darwin'

if (isEntryPoint) {
  render(<MailApp />, {
    title: 'Atlas Weekly',
    appName: 'Atlas',
    width: 1280,
    height: 860,
    titlebarTransparent: isMac,
    windowBackground: 'opaque',
    trafficLightX: isMac ? 16 : undefined,
    trafficLightY: isMac ? 17 : undefined,
    focus: true,
    show: true,
  })
}
