/**
 * @atlas/ui — Design Tokens
 *
 * The canonical dark-surface palette for all Atlas apps built on GPUIX.
 * Import `tokens` for the raw palette, or `createTokens(accent)` to produce
 * a token set with a custom accent color baked in.
 *
 * All colors are 8-digit hex strings (#RRGGBBAA) or 6-digit (#RRGGBB).
 * Alpha variants use the same hue at reduced opacity for GPU compositing.
 */

// ── Surface layers ──────────────────────────────────────────────────────
export const surface = {
  /** Deepest background — sidebars, narrow columns */
  base: '#141416',
  /** Slightly lifted — list columns, reading panes */
  raised: '#161618',
  /** Explicit lifted card / input background */
  card: '#1A1A1D',
  /** Active/selected row background */
  selected: '#2A2A2F',
  /** Toolbar pill background */
  pill: '#1A1A1D',
  /** Dialog / popover surface */
  overlay: '#1E1E22',
  /** Code block background */
  code: '#101012',
} as const

// ── Interactive overlays (hover/active) ─────────────────────────────────
export const interact = {
  /** Hover wash — transparent white */
  hover: '#FFFFFF0F',
  /** Active/pressed wash — slightly stronger */
  active: '#FFFFFF18',
} as const

// ── Border / Divider ────────────────────────────────────────────────────
export const border = {
  subtle: '#242428',
  default: '#242428',
  strong: '#3A3A40',
} as const

// ── Text hierarchy ──────────────────────────────────────────────────────
export const text = {
  primary: '#ECECEE',
  secondary: '#C6C6CA',
  muted: '#8A8A90',
  ghost: '#55555E',
  /** Avatar fallback letter / face background */
  face: '#3A3A40',
} as const

// ── Semantic / accent colors ─────────────────────────────────────────────
export const semantic = {
  /** Default accent (blue) */
  accent: '#3B82F6',
  /** Unread indicator dot */
  unread: '#3B82F6',
  /** @mention badge */
  mention: '#ED4245',
  /** Star / bookmark */
  star: '#EAB308',
  /** Positive / add diff */
  add: '#4ADE80',
  /** Negative / remove diff */
  remove: '#F87171',
} as const

// ── Convenience flat alias ───────────────────────────────────────────────
/** Drop-in replacement for the `C` constant in app.tsx */
export const C = {
  sidebar: surface.base,
  list: surface.base,
  reading: surface.raised,
  raised: surface.card,
  selected: surface.selected,
  pill: surface.pill,
  overlay: interact.hover,
  overlayStrong: interact.active,
  border: border.default,
  borderStrong: border.strong,
  divider: border.default,
  text: text.primary,
  secondary: text.secondary,
  muted: text.muted,
  ghost: text.ghost,
  face: text.face,
  unread: semantic.unread,
  mention: semantic.mention,
  tree: border.strong,
} as const

export type ColorTokens = typeof C

// ── Typography ───────────────────────────────────────────────────────────
export const FONT = 'Segoe UI, Helvetica, -apple-system, sans-serif'
export const FONT_MONO = 'JetBrains Mono, Cascadia Code, Fira Code, monospace'

// ── Layout constants ─────────────────────────────────────────────────────
export const SIDEBAR_WIDTH = 218
export const LIST_WIDTH = 328
export const TITLEBAR_HEIGHT = 48
export const TRAFFIC_LIGHT_CLEARANCE = 78
