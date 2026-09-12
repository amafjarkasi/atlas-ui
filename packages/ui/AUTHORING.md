# @atlas/ui — Component Authoring Guide

A GPUIX component library. Every component compiles to the same native
primitives (`div`, `text`, `svg`, `input`, `anchored`, `motion.div`, …) and works
on Windows (DirectX), macOS (Metal), and Linux (Vulkan) with **zero DOM**.

## Golden rules

1. **No DOM.** No `document`, `window`, `HTML*`, CSS cascade, `position: fixed`,
   `z-index`, `transform`, `box-sizing`, or CSS units like `em`/`rem`/`vw`.
2. **Only valid `StyleDesc` keys** (see below). `flex` does **not** exist — use
   `flexGrow`/`flexShrink`/`flexBasis`. There is no `transform`, no `rotate`, no
   `scale`, no `gridTemplateColumns` beyond a single number, no `textAlign`
   values outside basic strings, no keyframes.
3. **`<text>` children are strings only.** `<text>` cannot contain elements.
4. **Normalize key names**: `const k = e.key?.toLowerCase()`. GPUIX emits
   `'escape'`, `'enter'`, `'tab'`, `'backspace'`, `'arrowdown'`, `'arrowup'`,
   `'arrowleft'`, `'arrowright'`, `'home'`, `'end'`, `' '` (space), and single
   letters like `'a'`. Never compare against `'ArrowRight'`/`'Escape'`.
5. **`motion.div` cannot hold focus** — `MotionDivProps` has no `tabIndex`.
   Put `tabIndex`/`autoFocus`/`onKeyDown` on a plain `<div>` and nest the
   `motion.div` inside it when you need both animation and focus.

## Primitives

| element | notes / key props |
|---|---|
| `<div>` | layout surface; `hover`/`active` pseudo-styles; `overflowY: 'scroll'`; `background` can be a color or a `LinearGradientBackground` |
| `<text>` | `fontSize`, `fontFamily`, `fontWeight`, `lineHeight`, `color`, `whiteSpace`, `textOverflow`, `lineClamp` |
| `<img>` | `src`, `objectFit` |
| `<svg>` | `source` (raw SVG string), `color` (tints `stroke="#000"`) |
| `<input>` | `value`, `placeholder`, `onChange` (`e.value`), `autoFocus` (required for keys) |
| `<textarea>` | + `minRows`, `maxRows`, `onSubmit` |
| `<anchored>` | `side`, `align`, `gap`, `fit`, `anchor`, `onMouseDownOutside` |
| `<code>` | `code`, `language`, `showLineNumbers` (no surface of its own) |
| `<markdown>` | `source`, `onLinkClick` |
| `<virtual-list>` | `itemCount`, `estimatedItemHeight`, `overdraw` |
| `<canvas>` | **no draw API in v0.7 — do NOT use.** Build charts from `<div>`/`<svg>` |

## `StyleDesc` valid keys (the important ones)

`display, visibility, flexDirection, flexWrap, flexGrow, flexShrink, flexBasis,
alignItems, alignSelf, justifyContent, gap, rowGap, columnGap, width, height,
minWidth, minHeight, maxWidth, maxHeight, padding, paddingTop/Right/Bottom/Left,
margin, marginTop/Right/Bottom/Left, position, top, right, bottom, left,
background, backgroundColor, color, opacity, borderWidth, borderTopWidth/…,
borderColor, borderRadius, borderTopLeftRadius/…, boxShadow, fontSize,
fontFamily, fontWeight, textAlign, lineHeight, whiteSpace, textOverflow,
lineClamp, overflow, overflowX, overflowY, cursor, pointerEvents, userSelect,
hover, active`

- `width`/`height` accept `number | string` (e.g. `'100%'`, `'60%'`, `320`).
- `boxShadow` is `{ offsetX, offsetY, blurRadius, spreadRadius, color }`.
- `background` gradient: `{ type: 'linear-gradient', angle, stops: [s, s], colorSpace?: 'srgb'|'oklab' }` where each stop is `{ color, position }` (position 0..1). Exactly **two** stops.
- `cursor` is a fixed enum (see `CursorValue`): `pointer`, `text`, `col-resize`,
  `row-resize`, `ew-resize`, `ns-resize`, `not-allowed`, `grab`, `grabbing`, …
- `position: 'absolute'` is relative to the nearest positioned ancestor (no portal).

## Events (`EventPayload`)

`e.x`, `e.y` (window px), `e.button` (0/1/2), `e.isRightClick`, `e.key`,
`e.value` (input/diff/markdown payloads), `e.modifiers?.{shift,ctrl,alt,cmd}`,
`e.clickCount`, `e.deltaY`. Handlers: `onClick, onAuxClick, onMouseDown,
onMouseUp, onMouseEnter, onMouseLeave, onMouseMove, onMouseDownOutside,
onKeyDown, onKeyUp, onFocus, onBlur, onScroll, onChange, onSubmit`.

- `onAuxClick` fires for right-clicks — use it for context menus.
- `onMouseDownOutside` = click-outside-to-close.
- `onMouseMove` fires on the element that owns it even while dragging (bubbles),
  so a drag pattern = handle owns `onMouseDown`, container owns
  `onMouseMove`/`onMouseUp`.

## `motion.div`

`MotionStyle` only animates `width, height, opacity, top, right, bottom, left,
borderRadius` (numbers only). `transition`: `{ duration, delay?, ease? }` with
ease `linear|ease|easeIn|easeOut|easeInOut|[n,n,n,n]`. **No keyframe arrays, no
scale/rotate.** `initial` may be `false`.

## Tokens (import from `../tokens` or `../../tokens`)

`surface { base, raised, card, selected, pill, overlay, code }`,
`interact { hover, active }`, `border { subtle, default, strong }`,
`text { primary, secondary, muted, ghost, face }`,
`semantic { accent, unread, mention, star, add, remove }`,
plus flat aliases `C` (drop-in for the app's `C` map) and `FONT`, `FONT_MONO`.

## Icons

Import `Icon` from `../atoms/Icon` and `type IconName` from `../atoms`.
Available names (already in `icons.ts`): `sidebar arrowLeft arrowRight arrowDown
clock x search filter sort star starFilled mail mailCheck block trash archive
user tag megaphone message more hash puzzle at paperclip mic maximize minimize
snooze zap sparkle compose chevronDown chevronLeft chevronRight chevronUp check
settings logout framer command send arrowUp plus minus info alertTriangle
alertCircle checkCircle circle dot calendar refresh copy external eye eyeOff
edit upload download play pause sun moon bell image file folder link shield
keyboard grid list flag globe lock unlock loader inbox help heart thumbsUp video
sliders`.

**Do not add new icons** unless strictly necessary and then only with full
24×24 lucide-style `stroke="#000"` SVG. The registry is shared — coordinate.

## Patterns

- **Controlled/uncontrolled**: `value`/`defaultValue` + `onXChange` with a
  `useState` fallback (see `inputs/Switch.tsx`, `inputs/Checkbox.tsx`).
- **Hover/active**: `hover: { backgroundColor: interact.hover }`, etc.
- **Focus**: `tabIndex={0}` + `onKeyDown`; `autoFocus` for a mounted dialog/input.
- **Floating**: prefer `<anchored>` (see `overlays/ContextMenu.tsx`) over manual
  absolute math; `fit="switch"` flips at edges.
- Match the visual language: dark surfaces (`#1E1E22` overlays), 8–12px radii,
  12–13px text, `FONT` everywhere, `boxShadow` `{offsetY:8..16, blurRadius:24..48,
  color:'#00000066..88'}`.

## File & barrel conventions

- One component (or a small compound family) per `.tsx` file in its category
  dir. Categories: `atoms`, `overlays`, `layout`, `inputs`, `effects`, `display`,
  `dataviz`.
- Each category dir has an `index.ts` barrel exporting the components + their
  types. Update it when you add files.
- **Never edit the root `src/index.ts`** — the orchestrator wires the root
  barrel after all categories land.
- Use `import { C, FONT, surface, border, text, semantic, interact } from '../tokens'`
  (or `'../../tokens'` from a nested file).
- Every component gets a doc comment with a usage example.

## Verify

From the repo root run `bun run typecheck` (bun may live at
`C:\Users\jbdt\.bun\bin\bun.exe`). A clean exit means the library and app both
compile. Fix every reported error in your files before finishing.
