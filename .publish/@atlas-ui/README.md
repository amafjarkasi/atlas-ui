# @atlas/ui

A **general-purpose component library for GPUIX** — native GPU UI for DirectX /
Metal / Vulkan via `@gpuix/react`. There is **no DOM and no CSS**: everything
renders through the GPU text/layout pipeline, which is why the components ship
as React components with a constrained style model.

> Library components are domain-agnostic. AI / finance / data-viz categories are
> reusable *domains*, not tied to any specific product.

## Requirements

- `react` ^19
- `@gpuix/react` ^0.7 (peer dependency — install it yourself; it provides the
  renderer host and the JSX runtime)
- A GPUIX host renderer (desktop native, or the test renderer for CI)

```sh
npm i @atlas/ui @gpuix/react react
```

## Usage

```tsx
import { render } from '@gpuix/react'
import { Button, Badge, Tooltip, ThemeProvider, Row, IconLabel } from '@atlas/ui'

render(
  <ThemeProvider accent="#3B82F6">
    <Row gap={12}>
      <Button onClick={() => console.log('hi')}>Primary</Button>
      <Badge variant="mention" count={3} />
      <Tooltip label="Archive" shortcut="E">
        <IconLabel icon="archive" label="Archive" />
      </Tooltip>
    </Row>
  </ThemeProvider>,
)
```

Category subpaths keep imports tidy: `@atlas/ui/ai`, `@atlas/ui/desktop`,
`@atlas/ui/composites`, `@atlas/ui/hooks`, … (full map in `COMPONENTS.md`,
shipped in the package).

## Concepts

- **Tokens** (`@atlas/ui/tokens`): `surface/interact/border/text/semantic`,
  flat `C`, `FONT`, layout constants. Use them instead of hard-coded values.
- **Theme** (`ThemeProvider`, `useTheme`, `alpha`): runtime accent theming.
- **Hooks** (`@atlas/ui/hooks`): hotkeys, drag, selection, lists, async,
  pagination, copy-state, hover, idle, breakpoints, … — each dogfooded by a
  component.
- **Icons** (`@atlas/ui/icons`): ~60 named stroke icons, tintable via color.

## Module format & targets

The published artifact is **ESM** (bundler-resolved, extensionless relative
imports) compiled from TypeScript with declarations (`.d.ts` + maps) and
JSDoc preserved. Target it with a bundler or Bun; for strict Node ESM you would
need an extension-rewriting pass. `sideEffects: false` for tree-shaking.

## Styling model (important)

Styles use GPUIX `StyleDesc`, not CSS:

- No `flex` — use `flexGrow`; no `transform`/`grid`/`keyframes`; no sticky.
- `motion` animates only width/height/opacity/top/right/bottom/left/borderRadius.
- Widths/heights: number px or string percent; `bottom` is px only.
- Per-side colors unsupported (global `borderColor` + per-side widths).
- `<text>` children must be strings. Letterspacing is not supported.
- Icons: single-color stroke SVGs tint via `color`; multi-color must bake hex.

## Authoring / testing docs

- `AUTHORING.md` — full constraint + contribution guide
- `COMPONENTS.md` — complete component map by category
- `TESTING.md` (repo root) — `bun run test`: 7 runtime suites on the real
  GPU renderer (tooltips, interactions, virtualization, streaming, AI flows)

## License

MIT
