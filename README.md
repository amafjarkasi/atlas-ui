# Atlas Weekly — High-Performance GPU-Accelerated Desktop Email Client

[![Engine](https://img.shields.io/badge/Engine-GPUIX%20%2F%20Zed%20GPUI-6366f1.svg)](https://gpuix.dev/)
[![Graphics](https://img.shields.io/badge/Graphics-DirectX%2012%20%2F%20Metal%20%2F%20Vulkan-10b981.svg)](https://gpuix.dev/)
[![Runtime](https://img.shields.io/badge/Runtime-React%2019%20%2B%20Bun-f59e0b.svg)](https://bun.sh/)

**Atlas Weekly** is a native, hardware-accelerated desktop email and collaboration client crafted with [GPUIX](https://gpuix.dev/) (`@gpuix/react`) and [Zed's GPUI](https://zed.dev/) graphics engine. 

Instead of embedding Chromium or WebKit (as in Electron or Tauri), Atlas Weekly communicates through a lightweight React 19 reconciler connected directly to a native Rust retained tree and renders immediately onto the GPU via Direct3D 12 (Windows), Metal (macOS), or Vulkan (Linux).

---

## 🚀 Key Highlights & Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   React 19 Fiber Tree                    │
│   (State, Hooks, Subscriptions, Headless Layer Context)  │
└────────────────────────────┬─────────────────────────────┘
                             │ Batched mutations
┌────────────────────────────▼─────────────────────────────┐
│                 Rust Retained Element Tree               │
│        (GPUIX Native Core: Layout, Hit-Testing)          │
└────────────────────────────┬─────────────────────────────┘
                             │ Retained render graph
┌────────────────────────────▼─────────────────────────────┐
│                   Zed GPUI Engine                        │
│ (Text Rasterization, Taffy Flexbox, Anchored Overlays)   │
└────────────────────────────┬─────────────────────────────┘
                             │ Direct draw calls
┌────────────────────────────▼─────────────────────────────┐
│       Direct3D 12 / Metal / Vulkan GPU Pipeline          │
└──────────────────────────────────────────────────────────┘
```

### Why GPUIX?
- **Zero Web Overhead**: No V8 DOM overhead, zero Chromium process bloat, and minimal memory footprint.
- **60–120+ FPS Animations**: Smooth layout transitions executed directly on GPU surfaces via native `<motion.div>`.
- **Instantaneous Startup**: Cold boots in under 150ms.
- **Instant Hot Reloading**: Edit React components with `bun --hot` and observe instant live updates without window teardown or context loss.

---

## 🌟 Feature Breakdown

### 1. Multi-Account Switcher (`@gpuix/react/select`)
- Accessible in the top of the sidebar.
- Switch seamlessly between accounts (e.g. **Mara Lin** `mara@northlight.io` and **Lea Atlas** `lea@atlas.mail`).
- Built using GPUIX headless `<Select>`, `<SelectTrigger>`, `<SelectContent>`, `<SelectItem>`, and `<SelectSeparator>`, anchored to native window layers with click-outside dismissal and keyboard navigation (`Up`/`Down`, `Enter`).

### 2. Native Virtualized Timeline (`<virtual-list>`)
- High-volume timeline virtualization that paints only elements currently inside or near the viewport (`estimatedItemHeight={58}`, `overdraw={2}`).
- Scales to thousands of incoming emails with zero frame drops during fast scrolling.

### 3. Native Tooltips with Shortcut Badges (`@gpuix/react/tooltip`)
- Hovering over action pills reveals smooth native tooltips (`<TooltipProvider>`, `<Tooltip>`, `<TooltipTrigger>`, `<TooltipContent>`).
- Features dedicated hotkey badges (e.g., `Archive [E]`, `Star [S]`, `Mark as Read [U]`, `Toggle Sidebar [Ctrl+B]`, `Delete [#]`, `Composer Send [Enter]`).

### 4. Interactive Floating Composer & Quick Replies
- Floating bottom composer equipped with quick-response tag pills:
  - `"Sounds good!"`
  - `"Can we move to 4pm?"`
  - `"Review attached draft"`
  - `"Approved"`
- Auto-expanding multiline `<textarea>` (`minRows={1}`, `maxRows={5}`) supporting `Enter` to submit and `Shift+Enter` for multiline breaks.
- Attachment preview chips and quick mention actions.

### 5. Settings & GPU Engine Diagnostics Dialog (`Ctrl+,`)
- Accessible via the **Settings & Perf** bar in the sidebar footer, the top-right titlebar gear button, the Multi-Account Select dropdown, or pressing <kbd>Ctrl</kbd>+<kbd>,</kbd>.
- **GPU Frame & Performance Overlay Modes**: Toggle native GPUI frame overlay modes (`hidden`, `minimal`, `full`) to inspect real-time frame rates, p90/p99 frametimes, and GPU draw costs.
- **Theme Accent Color Switcher**: Choose from 5 vibrant native accent colors (Blue `#3B82F6`, Purple `#8B5CF6`, Emerald `#10B981`, Amber `#F59E0B`, Pink `#EC4899`) that dynamically tint selection borders and interactive focus states.
- **Hardware Acceleration Card**: Inspect live Direct3D 12 adapter details, feature level support (`Direct3D 12.0 / 11_0+`), color space (`oklab`), and compositor engine status.
- **Shortcut Reference Table**: Embedded quick reference for all navigation and productivity keybindings.

### 6. Quick Command Palette (`Ctrl+K` / `@gpuix/react/combobox`)
- Trigger with <kbd>Ctrl</kbd>+<kbd>K</kbd> or by clicking the titlebar search bar.
- Powered by `@gpuix/react/combobox` with keyboard navigation, fuzzy filtering, and smooth selection.
- Instantly jump between channels (`#primary`, `#promotions`, `#social`, `#updates`), open specific conversations, or open the Settings modal directly.

### 7. Native Syntax-Highlighted Git Diff Viewer (`<diff>`)
- High-performance, GPU-rendered side-by-side or unified code diff powered by GPUI's native Syntect syntax engine.
- Supports `wordDiff={true}` for inline word-level insertions and deletions (e.g. WGSL pipeline compute shaders and configuration changes).

### 8. Text Search Stepper (`useTextSearch`)
- Integrated with GPUIX's `useTextSearch` hook.
- Synchronizes search input with matches across email body content, showing match count indicators (`1/N`) and `<IconButton>` previous/next stepper buttons (`↑` / `↓`).

### 9. Resizable Multi-Column Panels
- Draggable column dividers (`col-resize`) between the left channels sidebar, thread list, and reading pane, allowing custom layout sizing with minimum and maximum width limits.

---

## ⌨️ Keyboard Shortcuts & Power-User Controls

| Shortcut | Action | Scope |
|---|---|---|
| <kbd>Ctrl</kbd> + <kbd>K</kbd> | Open Command Palette (Jump to channel/thread) | Global |
| <kbd>Ctrl</kbd> + <kbd>,</kbd> | Open Preferences & Engine Settings Dialog | Global |
| <kbd>J</kbd> or <kbd>↓</kbd> | Navigate to next thread | Global |
| <kbd>K</kbd> or <kbd>↑</kbd> | Navigate to previous thread | Global |
| <kbd>S</kbd> | Toggle star on active thread | Global |
| <kbd>E</kbd> | Archive / Unarchive active thread | Global |
| <kbd>U</kbd> | Toggle read / unread status | Global |
| <kbd>Ctrl</kbd> + <kbd>B</kbd> | Toggle left sidebar collapse/expand | Global |
| <kbd>Escape</kbd> | Close dialog / Clear search / Exit full view | Global |
| <kbd>Enter</kbd> | Submit draft in composer | Composer |
| <kbd>Shift</kbd> + <kbd>Enter</kbd> | Newline in composer | Composer |

---

## 📁 Project Structure

```
lucid-hubble/
├── assets/                  # High-resolution avatar assets & banner artwork
│   ├── atlas.jpg
│   ├── banner.jpg
│   ├── jules.jpg
│   ├── kenji.jpg
│   ├── lea.jpg
│   ├── mara.jpg
│   ├── mira.jpg
│   └── nora.jpg
├── scripts/
│   └── verify-render.tsx    # Headless DirectX GPU verification & snapshot harness
├── src/
│   ├── app.tsx              # Primary application, layout, state, and UI components
│   ├── data.ts              # Mock inbox threads, channels, accounts, and messages
│   ├── icons.ts             # Embedded vector SVG icons (optimized for GPUI)
│   └── types.ts             # TypeScript interfaces for MailThread, Channels, Messages
├── screenshots/
│   └── atlas-weekly.png     # DirectX render capture artifact
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites
- **[Bun](https://bun.sh/)** (`v1.4+`) installed.
- **Operating System**:
  - **Windows**: Windows 10 / 11 with DirectX 12.
  - **macOS**: macOS 12+ with Metal.
  - **Linux**: Modern distribution with Vulkan drivers.

### Installation

```bash
# Clone the repository
git clone <repo-url> lucid-hubble
cd lucid-hubble

# Install dependencies
bun install
```

### Running Locally

```bash
# Start in hot-reload mode (interactive DirectX window)
bun run dev

# Or launch standalone
bun run start
```

### Automated Verification & Testing

```bash
# Typecheck TypeScript definitions
bun run typecheck

# Run headless DirectX GPU render test and generate a snapshot
bun run verify
```

The verification harness executes `@gpuix/react/testing`'s `createTestRoot()`, mounts the entire React application tree, drives the native GPU pipeline, and writes an output render to `screenshots/atlas-weekly.png`.

---

## 🔧 Windows Troubleshooting & Environment Tips

- **PowerShell / Terminal Execution**: Ensure Bun's binary path is available in your `$env:PATH`:
  ```powershell
  $env:PATH += ";$env:USERPROFILE\.bun\bin"
  ```
- **DirectX 12 Debug Layer**: When testing on headless environments or GPU sandboxes, ensure graphics drivers support Direct3D Feature Level 11_0 or higher.
- **Modifier Keys**: On Windows, GPUI maps Ctrl to `event.modifiers.ctrl` and Alt to `event.modifiers.alt`.

---

## 📄 License
MIT License. Built with [GPUIX](https://gpuix.dev/).

