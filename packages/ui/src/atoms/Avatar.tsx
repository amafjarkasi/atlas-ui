/**
 * @atlas/ui — Avatar atom
 *
 * Renders a user avatar in three modes (priority order):
 *   1. Photo   — when `src` is provided, renders a cropped circular image
 *   2. Logo    — when `logo` is true, renders a rounded-square with an icon
 *   3. Monogram — renders the first letter from `letter` on a muted background
 *
 * The `presence` prop adds an absolutely-positioned status ring:
 *   "online"  → solid green ring
 *   "away"    → amber ring
 *   "dnd"     → red ring
 *   "offline" → grey ring (subtle)
 *   "typing"  → animated pulsing green ring (motion.div)
 *
 * @example
 *   <Avatar src="/assets/mara.jpg" size={32} />
 *   <Avatar letter="N" size={28} />
 *   <Avatar logo size={34} />
 *   <Avatar src="/assets/lea.jpg" size={32} presence="online" />
 *   <Avatar src="/assets/jules.jpg" size={32} presence="typing" />
 */
import { useEffect, useState } from 'react'
import { motion } from '@gpuix/react'
import { C, FONT, text as textTokens } from '../tokens'
import { Icon } from './Icon'

export type AvatarPresence = 'online' | 'away' | 'dnd' | 'offline' | 'typing'

export interface AvatarProps {
  src?: string
  letter?: string
  logo?: boolean
  color?: string
  size: number
  presence?: AvatarPresence
}

const PRESENCE_COLOR: Record<AvatarPresence, string> = {
  online: '#22C55E',
  away: '#F59E0B',
  dnd: '#ED4245',
  offline: '#3F3F46',
  typing: '#22C55E',
}

function PresenceRing({ presence, size }: { presence: AvatarPresence; size: number }) {
  const ringSize = Math.max(8, Math.round(size * 0.28))
  const offset = Math.round(size * 0.06)
  const color = PRESENCE_COLOR[presence]

  // Pulsing animation for "typing" — toggles between dim and bright every 600ms
  const [pulse, setPulse] = useState(true)
  useEffect(() => {
    if (presence !== 'typing') return
    const id = setInterval(() => setPulse((p) => !p), 600)
    return () => clearInterval(id)
  }, [presence])

  if (presence === 'typing') {
    return (
      <motion.div
        animate={{ opacity: pulse ? 1 : 0.3 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: -offset,
          right: -offset,
          width: ringSize,
          height: ringSize,
          borderRadius: ringSize / 2,
          backgroundColor: color,
          borderWidth: 2,
          borderColor: C.sidebar,
        }}
      />
    )
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: -offset,
        right: -offset,
        width: ringSize,
        height: ringSize,
        borderRadius: ringSize / 2,
        backgroundColor: color,
        borderWidth: 2,
        borderColor: C.sidebar,
        opacity: presence === 'offline' ? 0.4 : 1,
      }}
    />
  )
}

export function Avatar({ src, letter, logo, size, presence }: AvatarProps) {
  const borderRadius = logo
    ? Math.max(4, Math.floor(size * 0.22))
    : Math.floor(size / 2)

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius,
        backgroundColor: logo ? '#111111' : textTokens.face,
        overflow: presence ? undefined : 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Inner clip — separate from outer to allow overflow for presence ring */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: logo ? '#111111' : textTokens.face,
        }}
      >
        {src ? (
          <img
            src={src}
            objectFit="cover"
            style={{ width: size, height: size, borderRadius }}
          />
        ) : logo ? (
          <Icon name="framer" size={Math.floor(size * 0.55)} color="#FFFFFF" />
        ) : (
          <text
            style={{
              fontSize: Math.max(9, Math.floor(size * 0.42)),
              fontWeight: 600,
              color: textTokens.primary,
              fontFamily: FONT,
            }}
          >
            {letter ?? 'A'}
          </text>
        )}
      </div>

      {presence && <PresenceRing presence={presence} size={size} />}
    </div>
  )
}

// ── AvatarGroup ────────────────────────────────────────────────────────
export interface AvatarGroupProps {
  avatars: AvatarProps[]
  /** Maximum avatars to show before "+N" overflow badge */
  max?: number
  size?: number
  /** Horizontal overlap between adjacent avatars in px */
  overlap?: number
}

export function AvatarGroup({ avatars, max = 4, size = 20, overlap = 6 }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - visible.length

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        height: size,
        width: visible.length * (size - overlap) + overlap + (overflow > 0 ? size - overlap : 0),
      }}
    >
      {visible.map((avatar, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: i * (size - overlap),
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: C.sidebar,
          }}
        >
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          style={{
            position: 'absolute',
            left: visible.length * (size - overlap),
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: C.selected,
            borderWidth: 2,
            borderColor: C.sidebar,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <text
            style={{
              fontSize: Math.max(8, Math.floor(size * 0.36)),
              fontWeight: 700,
              color: textTokens.secondary,
              fontFamily: FONT,
            }}
          >
            +{overflow}
          </text>
        </div>
      )}
    </div>
  )
}
