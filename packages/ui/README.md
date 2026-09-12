<div align="center">
  <img src="./assets/banner.jpg" alt="Atlas UI Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  <h1>@atlas/ui</h1>
  <p><b>A massive, high-performance, GPU-accelerated React component library for desktop applications.</b></p>
  
  [![Built for GPUIX](https://img.shields.io/badge/Built%20for-GPUIX-6366f1?style=for-the-badge)](https://github.com/remorses/gpuix)
  [![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

---

## Overview

`@atlas/ui` is an enterprise-grade component library built exclusively for **GPUIX**. 
It completely bypasses the browser DOM, HTML, and CSS, rendering directly to the GPU via **DirectX 12 (Windows), Metal (macOS), and Vulkan (Linux)**.

With over **150+ native components**, it provides everything you need to build hyper-fast, deeply integrated desktop software, ranging from basic UI atoms to complex financial charts and autonomous AI workspaces.

## Why Atlas UI?

* ⚡ **Zero DOM Overhead**: No HTML nodes, no CSS cascades, no `ResizeObserver` performance hits.
* 🎨 **Headless by Design**: Inspired by Radix and shadcn/ui, but adapted for raw scene-graph math and floating positioning without DOM elements.
* 🧠 **AI-Native Components**: Ships with a massive suite of pre-built UI for LLMs, agent trajectories, prompt engineering, and thought-traces.
* 📈 **Canvas-Driven DataViz**: Sparklines, Candlestick charts, and Heatmaps rendering via native 2D contexts.

## Installation

The library is designed to be consumed within a Bun workspace.

```bash
bun add @atlas/ui
```

Ensure your app is configured for GPUIX with the proper JSX import sources in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@gpuix/react"
  }
}
```

## Quick Start

```tsx
import { Window } from '@gpuix/react'
import { ThemeProvider } from '@atlas/ui/core'
import { Button, Toast, Toaster, toastSuccess } from '@atlas/ui'

export function App() {
  return (
    <ThemeProvider>
      <Window title="My Atlas App">
        <Button onClick={() => toastSuccess("Action completed!")}>
          Click Me
        </Button>
        <Toaster />
      </Window>
    </ThemeProvider>
  )
}
```

## Component Ecosystem

The library is broken down into modular domains to keep your bundle lean.

### 🧱 Atoms & Layout (`/atoms`, `/layout`)
Fundamental building blocks and flex-based positioning grids.
* `Badge`, `Avatar`, `Button`, `Kbd`, `Icon`
* `Tabs`, `ResizablePanel`, `ScrollArea`, `VirtualList`, `Drawer`

### 🎛️ Inputs & Forms (`/inputs`)
Accessible, keyboard-navigable input primitives.
* `Combobox`, `DatePicker`, `FileDropzone`, `Slider`, `TagInput`, `ColorPicker`

### 🧩 Overlays & Display (`/overlays`, `/display`)
Floating panels with GPU-accelerated collision detection and WAI-ARIA inspired focus trapping.
* `ContextMenu`, `Dialog`, `Popover`, `HoverCard`, `Menubar`, `DataGrid`

### 🤖 AI Workspaces (`/ai`)
A complete toolkit for building Copilots and LLM monitoring tools.
* `AgentTrajectory`, `ChatThread`, `ThoughtCodeSplit`, `ToolCallCard`, `PromptDiff`

### 📊 Financial & DataViz (`/dataviz`, `/finance`)
High-performance charting and tracking components.
* `ActivitySparkline`, `CandlestickChart`, `Heatmap`, `AllocationDonut`, `AudioWaveform`

### 🖥️ Desktop Integrations (`/desktop`)
Native OS-level paradigms.
* `CommandMenu`, `WindowDragArea`, `ShortcutSettingsList`, `EmojiPicker`

## Architecture Notes
Because GPUIX lacks a DOM, Atlas UI implements its own headless engines for:
* **Roving Tabindex**: Fully custom `useRovingFocus` logic for arrow-key navigation.
* **Virtual Anchors**: Pointer-based positioning for `ContextMenu` without `getBoundingClientRect`.
* **Queue-based Toasts**: A module-level singleton bus for notifications (`toast()`).
* **Motion States**: Direct bindings to `@gpuix/react`'s `motion.div` for 60fps structural animations.

---
*Built for the future of desktop applications.*
