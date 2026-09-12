<div align="center">
  <a href="#atlas-ui">
    <img src="./assets/logo.svg" alt="Atlas UI - GPU-Accelerated Component Architecture" width="100%" />
  </a>

  <br/><br/>

  [![GPUIX Exclusive](https://img.shields.io/badge/Runtime-GPUIX%20Exclusive-0284c7?style=for-the-badge&logo=rust&logoColor=white)](https://github.com/remorses/gpuix)
  [![Zero DOM](https://img.shields.io/badge/DOM-Zero%20HTML%20%2F%20CSS-6366f1?style=for-the-badge)](https://github.com/remorses/gpuix)
  [![React 19 Reconciler](https://img.shields.io/badge/React-19.x%20Reconciler-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![Components](https://img.shields.io/badge/Components-200%2B%20Primitives-a855f7?style=for-the-badge)](https://github.com/amafjarkasi/atlas-ui#complete-component-index)
  [![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict%20Types-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

---

> [!CAUTION]
> **GPUIX RUNTIME EXCLUSIVE**: `@atlas/ui` is **NOT** a web library. It does not work in web browsers, Next.js, Vite (web target), Electron, or standard React DOM environments. It requires the native **[GPUIX](https://github.com/remorses/gpuix)** desktop runtime (`@gpuix/react`) backed by Zed's GPUI engine and communicates directly with your GPU via DirectX 12, Metal, or Vulkan.

---

## What is Atlas UI?

**Atlas UI** is a native, hardware-accelerated desktop UI design system and headless component ecosystem engineered from first principles exclusively for **GPUIX** (`@gpuix/react`).

Traditional desktop web wrappers like Electron or Tauri bundle Chromium or WebKit webviews. While convenient, they drag along decades of legacy browser DOM specifications, reflow recalculations, layout thrashing, heavyweight memory overhead, and frame drops on intense data streams.

**Atlas UI takes a completely different path:**
* **No DOM, No HTML, No CSS**: Your JSX does not produce `<div>` or `<button>` DOM nodes. Instead, our components render directly into native GPU display lists and retained scene-graphs computed by Zed's high-performance GPUI engine.
* **Bare-Metal Hardware Pipelines**: All typography, surfaces, rounded borders, shadows, and vector paths render through **DirectX 12 (Windows)**, **Metal (macOS)**, and **Vulkan (Linux)** with zero browser intermediate layers.
* **120+ FPS Structural Animation**: Animations are powered directly by `@gpuix/react` native `motion.div` GPU interpolators rather than CSS transitions or JavaScript requestAnimationFrame loops.
* **Zero Layout Thrashing**: Uses the Taffy Rust flexbox engine for sub-millisecond, memory-aligned layout computations.

### What's in the box

| Domain | Count | Gallery |
| :--- | ---: | :--- |
| AI workspaces (`@atlas/ui/ai`) | **58** | [Screenshot gallery](#ai-workspaces-gallery) |
| Desktop chrome (`@atlas/ui/desktop`) | **23** | [Screenshot gallery](#desktop-integrations-gallery) |
| Total primitives (atoms → finance) | **200+** | [Full index](#complete-component-index) |

Every AI and desktop component has a committed GPU-rendered baseline in [`screenshots/`](../../screenshots/).

---

## Why Atlas UI?

| Capability | Standard React UI (shadcn / Radix / MUI) | Atlas UI for GPUIX |
| :--- | :--- | :--- |
| **Runtime Target** | Browser DOM (`react-dom`, WebKit, Chromium) | **GPUIX Native GPU Engine (`@gpuix/react`)** |
| **Rendering Backend** | Skia / Blink / WebKit Compositor via HTML/CSS | **DirectX 12 (Win), Metal (macOS), Vulkan (Linux)** |
| **Layout Engine** | Browser CSS Box Model & Cascading Reflow | **Rust Taffy Flexbox (Sub-millisecond compute)** |
| **DOM Tree Overhead** | Hundreds of HTML DOM nodes per view | **Zero DOM nodes (Pure retained GPU scene graph)** |
| **Input & Floating Anchors** | Browser events & DOM `getBoundingClientRect()` | **Native OS window coordinates & custom roving focus** |
| **DataViz & Charts** | Canvas 2D Web API / SVG / WebGL | **Native GPUI `<canvas>` hardware context** |
| **AI / Copilot UI** | Requires 3rd-party composite packages | **58+ Built-in Agentic AI & Copilot primitives** |
| **Desktop chrome** | Browser dialogs / Electron chrome | **23 native dialogs, status bars, rails, and inspectors** |

---

## Component Architecture & Domains

Atlas UI is split into modular domains designed to provide complete architectural coverage for native desktop apps:

```mermaid
flowchart TB
    subgraph AppLayer [Developer Application]
        direction LR
        App[Your Native Desktop App]
    end

    subgraph AtlasUI ["@atlas/ui Ecosystem (200+ Primitives)"]
        direction TB
        subgraph CoreModules [Core & Layout]
            Atoms["atoms/ (Button, Badge, Avatar, Kbd, Icon)"]
            Layout["layout/ (ResizablePanel, Tabs, Drawer, ScrollArea)"]
            Inputs["inputs/ (DatePicker, TagInput, Slider, ColorPicker)"]
            Overlays["overlays/ (ContextMenu, Dialog, Menubar, Toast)"]
        end

        subgraph AdvancedModules [Specialized Workspaces]
            AI["ai/ (AgentFlowGraph, ChatThread, PromptStudio, ToolCard)"]
            DataViz["dataviz/ (Sparklines, Heatmap, AudioWaveform, Charts)"]
            Desktop["desktop/ (AboutDialog, GroupedSidebarNav, ToolboxRail)"]
            Finance["finance/ (CandlestickChart, PnlBadge, OrderBook)"]
        end

        subgraph HeadlessEngines [Headless Behaviors]
            Hooks["hooks/ (useHotkeys, useRovingFocus, usePointerDrag)"]
        end
    end

    subgraph GPUIRuntime [Native Engine Pipeline - GPUIX ONLY]
        direction TB
        Reconciler["@gpuix/react Reconciler (React 19)"]
        Taffy["Taffy Flexbox Layout (Rust)"]
        ZedGPUI["Zed GPUI Core Engine"]
    end

    subgraph Hardware [Physical GPU Hardware]
        direction LR
        DX12[DirectX 12 - Windows]
        Metal[Metal - macOS]
        Vulkan[Vulkan - Linux]
    end

    App --> AtlasUI
    AtlasUI --> Reconciler
    Reconciler --> Taffy
    Taffy --> ZedGPUI
    ZedGPUI --> DX12
    ZedGPUI --> Metal
    ZedGPUI --> Vulkan

    classDef brand fill:#0b0f19,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef runtime fill:#0f172a,stroke:#818cf8,stroke-width:2px,color:#fff;
    classDef hardware fill:#020617,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef warning fill:#3b0764,stroke:#c084fc,stroke-width:2px,color:#fff;

    class App brand;
    class AtlasUI,CoreModules,AdvancedModules,HeadlessEngines warning;
    class GPUIRuntime,Reconciler,Taffy,ZedGPUI runtime;
    class Hardware,DX12,Metal,Vulkan hardware;
```

---

## Installation & Setup

> [!IMPORTANT]
> Because Atlas UI relies on native GPUIX primitives, ensure your project runs on [Bun](https://bun.sh/) and contains `@gpuix/react`.

```bash
# Add Atlas UI to your Bun workspace or project
bun add @atlas/ui
```

### 1. Configure TypeScript (`tsconfig.json`)

You must set `jsxImportSource` to `@gpuix/react` so JSX elements compile to GPUIX native tags:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "jsxImportSource": "@gpuix/react",
    "strict": true
  }
}
```

### 2. Basic Quickstart Example

```tsx
import { Window } from '@gpuix/react'
import { ThemeProvider } from '@atlas/ui/core'
import { 
  Button, 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  Toaster, 
  toastSuccess 
} from '@atlas/ui'

export function App() {
  return (
    <ThemeProvider>
      <Window title="Atlas Desktop Workspace" options={{ width: 1080, height: 720 }}>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai">AI Copilot</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Button 
              variant="primary" 
              onClick={() => toastSuccess("Action triggered on native GPU!")}
            >
              Dispatch GPU Action
            </Button>
          </TabsContent>
          
          <TabsContent value="ai">
            {/* Native AI Workspace primitives */}
          </TabsContent>
        </Tabs>
        
        {/* Global module-level Toast viewport */}
        <Toaster />
      </Window>
    </ThemeProvider>
  )
}
```

### 3. Explore the galleries

Browse GPU-rendered screenshots for every specialized primitive:

- **[AI Workspaces Gallery](#ai-workspaces-gallery)** — 58 copilot, agent, and prompt components
- **[Desktop Integrations Gallery](#desktop-integrations-gallery)** — 23 native dialogs, rails, and inspectors

---

## Headless Architecture in a DOM-less Environment

Because standard DOM APIs (`window.addEventListener`, `document.querySelector`, `getBoundingClientRect`, CSS `@keyframes`, HTML `tabIndex`) do not exist in GPUIX, Atlas UI embeds dedicated headless behavioral engines:

1. **Roving Tabindex Engine (`useRovingFocus`)**: Tracks keyboard focus hierarchy across virtual items without browser tab sequence.
2. **Virtual Anchored Overlays**: Floating menus (`ContextMenu`, `Dialog`, `Popover`) calculate relative bounds against native viewport space coordinates without DOM element bounding boxes.
3. **Observer Event Bus Toaster (`toast()`)**: A module-level singleton state manager allowing toasts to be dispatched cleanly from outside the React tree with full exit animation orchestration.
4. **Hardware Canvas Renderers**: Pure 2D vector path calculation matrices powering charts and visual telemetry directly on GPU surfaces.

---

## Complete Component Index

Below is the exhaustive list of all 200+ native GPUIX components, hooks, and layouts included in `@atlas/ui`.

<details open>
<summary><b>🤖 AI Workspaces (58)</b></summary>
<p>Agentic copilot primitives from <code>@atlas/ui/ai</code>. See the <a href="#ai-workspaces-gallery">visual gallery</a> (<code>screenshots/ai-components/</code>).</p>
<p>
<code>AgentFlowGraph</code>, <code>AgentMonitor</code>, <code>AgentRunCard</code>, <code>AgentRunSteps</code>, <code>AgentTrajectory</code>, <code>AssistWorkspace</code>, <code>BranchExplorer</code>, <code>ChatBubble</code>, <code>ChatSearchBar</code>, <code>ChatThread</code>, <code>ConfigDiffReview</code>, <code>ContextBrowser</code>, <code>ContextRing</code>, <code>DocumentQAPanel</code>, <code>GeneratedCodeCard</code>, <code>HelpCopilot</code>, <code>InlineCitations</code>, <code>InlineCodeChip</code>, <code>InterruptibleComposer</code>, <code>LatencyLog</code>, <code>LiveAgentGrid</code>, <code>MentionInput</code>, <code>MessageScroller</code>, <code>MessageStatus</code>, <code>ModelJourney</code>, <code>ModelLab</code>, <code>ModelPerformanceTable</code>, <code>ModelPicker</code>, <code>PromptDiff</code>, <code>PromptEngineeringSuite</code>, <code>PromptHistoryList</code>, <code>PromptInput</code>, <code>PromptSettings</code>, <code>PromptTemplateEditor</code>, <code>RegenerateBar</code>, <code>ResponseComparer</code>, <code>ReviewPanel</code>, <code>RunCostCard</code>, <code>RunInspector</code>, <code>SamplerControls</code>, <code>SandboxStepLog</code>, <code>ScoringPanel</code>, <code>SelectAndAsk</code>, <code>SelectionToPrompt</code>, <code>SourceList</code>, <code>StreamingDiff</code>, <code>StreamingMarkdown</code>, <code>SystemPromptCard</code>, <code>TaskDoneBanner</code>, <code>ThinkingIndicator</code>, <code>ThoughtCodeSplit</code>, <code>TokenMeter</code>, <code>ToolCallCard</code>, <code>ToolPermissionPrompt</code>, <code>TranscriptSync</code>, <code>UsageBudgetCard</code>, <code>VersionedPromptLibrary</code>, <code>VoiceStudio</code>
</p>
</details>

<details>
<summary><b>📋 Display & Data (48)</b></summary>
<p>
<code>ActionChips</code>, <code>Alert</code>, <code>BackToTop</code>, <code>BeforeAfterSlider</code>, <code>BulkActionsBar</code>, <code>Calendar</code>, <code>ColumnVisibilityMenu</code>, <code>CommandMenu</code>, <code>ConfirmPopover</code>, <code>ContextRow</code>, <code>DataGrid</code>, <code>DataTable</code>, <code>DescriptionList</code>, <code>DetailPanel</code>, <code>Divider</code>, <code>EmptyState</code>, <code>FilterBar</code>, <code>GhostDragPreview</code>, <code>GroupedVirtualList</code>, <code>HintBar</code>, <code>HoverCard</code>, <code>JsonTree</code>, <code>KanbanBoard</code>, <code>Marker</code>, <code>PaginatedTable</code>, <code>Pagination</code>, <code>Popover</code>, <code>RelativeTime</code>, <code>ReorderableList</code>, <code>RetryView</code>, <code>ScrollSpy</code>, <code>SearchableList</code>, <code>SearchEmpty</code>, <code>SearchHighlights</code>, <code>SettingRow</code>, <code>SparklineStat</code>, <code>StatCard</code>, <code>StatusDot</code>, <code>StepIndicator</code>, <code>SummaryFooter</code>, <code>TableChrome</code>, <code>ThemeCustomizer</code>, <code>Timeline</code>, <code>Tooltip</code>, <code>TreeTable</code>, <code>TrendBadge</code>, <code>UploadProgress</code>, <code>VirtualTree</code>
</p>
</details>

<details>
<summary><b>🧩 Composites & Modules (36)</b></summary>
<p>
<code>ActionToast</code>, <code>ActivityFeed</code>, <code>AdminTable</code>, <code>AgentRunConsole</code>, <code>AnimatedStat</code>, <code>AssetDetailPanel</code>, <code>AuditTrail</code>, <code>CalendarEventEditor</code>, <code>ChatWindow</code>, <code>CitationTooltip</code>, <code>CitedAnswer</code>, <code>DataExplorer</code>, <code>DebugInspector</code>, <code>DiffViewer</code>, <code>EditorTabStrip</code>, <code>FileBrowser</code>, <code>FilterableTable</code>, <code>InlineEditableField</code>, <code>KeyboardShortcutsOverlay</code>, <code>LogViewer</code>, <code>MultiSelectCombobox</code>, <code>NotificationCenter</code>, <code>OnboardingChecklist</code>, <code>PromptComposer</code>, <code>PromptStudio</code>, <code>QuickSwitcher</code>, <code>ReasoningTrace</code>, <code>SelectionList</code>, <code>StatusBar</code>, <code>ToastWithProgress</code>, <code>Toolbar</code>, <code>TransferList</code>, <code>UsageDashboard</code>, <code>UserMenu</code>, <code>VirtualizedSelect</code>, <code>WizardDialog</code>
</p>
</details>

<details>
<summary><b>🎛️ Inputs & Forms (23)</b></summary>
<p>
<code>Checkbox</code>, <code>ColorPicker</code>, <code>ComboboxField</code>, <code>DatePicker</code>, <code>DateRangePicker</code>, <code>Field</code>, <code>FileDropzone</code>, <code>NumberField</code>, <code>PasswordField</code>, <code>PinInput</code>, <code>ProgressBar</code>, <code>RadioGroup</code>, <code>SearchInput</code>, <code>SegmentedControl</code>, <code>SelectField</code>, <code>ShortcutRecorder</code>, <code>Slider</code>, <code>StarRating</code>, <code>Switch</code>, <code>TagInput</code>, <code>TextareaAutosize</code>, <code>TimePicker</code>, <code>TypeaheadInput</code>
</p>
</details>

<details>
<summary><b>🖥️ Desktop Integrations (23)</b></summary>
<p>Native desktop chrome from <code>@atlas/ui/desktop</code> — system dialogs, status/feedback, and nav/content helpers. See the <a href="#desktop-integrations-gallery">visual gallery</a>.</p>
<p>
<b>System dialogs:</b> <code>AboutDialog</code>, <code>CrashDialog</code>, <code>LicensesDialog</code>, <code>ReleaseNotesDialog</code>, <code>UnsavedChangesDialog</code>, <code>PermissionGate</code>
</p>
<p>
<b>Status / feedback:</b> <code>AutoSavePill</code>, <code>ConnectBar</code>, <code>DownloadCard</code>, <code>VersionFooter</code>, <code>WordCountBar</code>, <code>ZoomControls</code>
</p>
<p>
<b>Content / nav:</b> <code>EmojiPicker</code>, <code>FavoritesBar</code>, <code>FindBar</code>, <code>FontPicker</code>, <code>GroupedSidebarNav</code>, <code>PreviewPane</code>, <code>PropertyGrid</code>, <code>RecentFilesList</code>, <code>ShortcutSettingsList</code>, <code>ThemeSwitcher</code>, <code>ToolboxRail</code>
</p>
</details>

<details>
<summary><b>📐 Layout (19)</b></summary>
<p>
<code>Accordion</code>, <code>Breadcrumb</code>, <code>Card</code>, <code>Col</code>, <code>Drawer</code>, <code>FormCard</code>, <code>InfiniteScroll</code>, <code>ResizablePanel</code>, <code>Row</code>, <code>ScrollArea</code>, <code>Spacer</code>, <code>StickyHeader</code>, <code>SyncedScrollPane</code>, <code>Tabs</code>, <code>TitleBar</code>, <code>TreeView</code>, <code>VirtualizedGrid</code>, <code>VirtualList</code>, <code>WindowDragArea</code>
</p>
</details>

<details>
<summary><b>📊 DataViz (15)</b></summary>
<p>
<code>ActivitySparkline</code>, <code>AudioWaveform</code>, <code>BarChart</code>, <code>BulletChart</code>, <code>CalendarHeatmap</code>, <code>Chart</code>, <code>CircularProgress</code>, <code>Confetti</code>, <code>DonutChart</code>, <code>Gauge</code>, <code>Heatmap</code>, <code>LineChart</code>, <code>MultiSeriesLineChart</code>, <code>RadialGauge</code>, <code>StackedBarChart</code>
</p>
</details>

<details>
<summary><b>🪝 Hooks (25)</b></summary>
<p>
<code>useAsync</code>, <code>useControllableState</code>, <code>useCopyState</code>, <code>useCounter</code>, <code>useDebouncedCallback</code>, <code>useDebouncedValue</code>, <code>useDisclosure</code>, <code>useFocusTrap</code>, <code>useFocusVisible</code>, <code>useHotkeys</code>, <code>useHover</code>, <code>useIdle</code>, <code>useIsKeyDown</code>, <code>useIsMounted</code>, <code>useKeyPress</code>, <code>useLatest</code>, <code>useListState</code>, <code>useMultiSelect</code>, <code>usePagination</code>, <code>usePointerDrag</code>, <code>usePrevious</code>, <code>useRovingFocus</code>, <code>useScrollPosition</code>, <code>useTimer</code>, <code>useWindowQuery</code>
</p>
</details>

<details>
<summary><b>🧱 Atoms (9)</b></summary>
<p>
<code>Avatar</code>, <code>Badge</code>, <code>Button</code>, <code>CopyButton</code>, <code>Icon</code>, <code>IconButton</code>, <code>IconLabel</code>, <code>Kbd</code>, <code>SplitButton</code>
</p>
</details>

<details>
<summary><b>🪟 Overlays (9)</b></summary>
<p>
<code>AlertDialog</code>, <code>ContextMenu</code>, <code>Dialog</code>, <code>FocusScope</code>, <code>LayoutInspectorHUD</code>, <code>LoadingOverlay</code>, <code>Menubar</code>, <code>OnboardingTour</code>, <code>Toast</code>
</p>
</details>

<details>
<summary><b>✨ Effects (8)</b></summary>
<p>
<code>AnimatedBackground</code>, <code>AnimatedCounter</code>, <code>GradientText</code>, <code>Skeleton</code>, <code>SkeletonRow</code>, <code>Spinner</code>, <code>StreamingText</code>, <code>SyntaxCodeBlock</code>
</p>
</details>

<details>
<summary><b>📈 Finance (7)</b></summary>
<p>
<code>AllocationDonut</code>, <code>BalanceCard</code>, <code>BudgetBar</code>, <code>CandlestickChart</code>, <code>KpiGrid</code>, <code>PnlBadge</code>, <code>TransactionList</code>
</p>
</details>

---

## Screenshot workflow

Atlas UI ships committed PNG baselines for visual regression. Regenerate after changing component styles or sample props.

| Step | Command | Output |
| :--- | :--- | :--- |
| 1. Build package | `bun run build:ui` | Compiles `packages/ui` → `dist/` |
| 2. Capture AI | `bun run capture:ai` | `screenshots/ai-components/*.png` (58 files) |
| 3. Capture desktop | `bun run capture:desktop` | `screenshots/desktop-components/*.png` (23 files) |

Scripts: [`scripts/capture-all-ai-screenshots.tsx`](../../scripts/capture-all-ai-screenshots.tsx) and [`scripts/capture-all-desktop-screenshots.tsx`](../../scripts/capture-all-desktop-screenshots.tsx). Each render uses `@gpuix/react/testing` at a fixed viewport with representative sample props.

---

## AI Workspaces Gallery

58 GPU-rendered AI primitives in `@atlas/ui/ai` — chat surfaces, agent orchestration, prompt tooling, model evaluation, context browsers, tool permissions, and voice studios.

```tsx
import { ChatThread, AgentMonitor, PromptEngineeringSuite } from '@atlas/ui/ai'
```

### Chat & threads

| Chat thread | Chat bubble | Message scroller |
|:---:|:---:|:---:|
| <img src="../../screenshots/ai-components/ChatThread.png" alt="ChatThread" /> | <img src="../../screenshots/ai-components/ChatBubble.png" alt="ChatBubble" /> | <img src="../../screenshots/ai-components/MessageScroller.png" alt="MessageScroller" /> |
| **Message status** | **Thinking** | **Search bar** |
| <img src="../../screenshots/ai-components/MessageStatus.png" alt="MessageStatus" /> | <img src="../../screenshots/ai-components/ThinkingIndicator.png" alt="ThinkingIndicator" /> | <img src="../../screenshots/ai-components/ChatSearchBar.png" alt="ChatSearchBar" /> |
| **Interruptible composer** | **Regenerate bar** | **Task done** |
| <img src="../../screenshots/ai-components/InterruptibleComposer.png" alt="InterruptibleComposer" /> | <img src="../../screenshots/ai-components/RegenerateBar.png" alt="RegenerateBar" /> | <img src="../../screenshots/ai-components/TaskDoneBanner.png" alt="TaskDoneBanner" /> |

### Composers & input

| Prompt input | Mention input | Selection → prompt |
|:---:|:---:|:---:|
| <img src="../../screenshots/ai-components/PromptInput.png" alt="PromptInput" /> | <img src="../../screenshots/ai-components/MentionInput.png" alt="MentionInput" /> | <img src="../../screenshots/ai-components/SelectionToPrompt.png" alt="SelectionToPrompt" /> |
| **Select & ask** | | |
| <img src="../../screenshots/ai-components/SelectAndAsk.png" alt="SelectAndAsk" /> | | |

### Agents & runs

| Flow graph | Monitor | Run card |
|:---:|:---:|:---:|
| <img src="../../screenshots/ai-components/AgentFlowGraph.png" alt="AgentFlowGraph" /> | <img src="../../screenshots/ai-components/AgentMonitor.png" alt="AgentMonitor" /> | <img src="../../screenshots/ai-components/AgentRunCard.png" alt="AgentRunCard" /> |
| **Run steps** | **Trajectory** | **Live grid** |
| <img src="../../screenshots/ai-components/AgentRunSteps.png" alt="AgentRunSteps" /> | <img src="../../screenshots/ai-components/AgentTrajectory.png" alt="AgentTrajectory" /> | <img src="../../screenshots/ai-components/LiveAgentGrid.png" alt="LiveAgentGrid" /> |
| **Run inspector** | **Latency log** | **Sandbox log** |
| <img src="../../screenshots/ai-components/RunInspector.png" alt="RunInspector" /> | <img src="../../screenshots/ai-components/LatencyLog.png" alt="LatencyLog" /> | <img src="../../screenshots/ai-components/SandboxStepLog.png" alt="SandboxStepLog" /> |
| **Run cost** | | |
| <img src="../../screenshots/ai-components/RunCostCard.png" alt="RunCostCard" /> | | |

### Prompt engineering

| Template editor | Engineering suite | History list |
|:---:|:---:|:---:|
| <img src="../../screenshots/ai-components/PromptTemplateEditor.png" alt="PromptTemplateEditor" /> | <img src="../../screenshots/ai-components/PromptEngineeringSuite.png" alt="PromptEngineeringSuite" /> | <img src="../../screenshots/ai-components/PromptHistoryList.png" alt="PromptHistoryList" /> |
| **System prompt** | **Settings** | **Diff** |
| <img src="../../screenshots/ai-components/SystemPromptCard.png" alt="SystemPromptCard" /> | <img src="../../screenshots/ai-components/PromptSettings.png" alt="PromptSettings" /> | <img src="../../screenshots/ai-components/PromptDiff.png" alt="PromptDiff" /> |
| **Versioned library** | **Config diff** | **Review panel** |
| <img src="../../screenshots/ai-components/VersionedPromptLibrary.png" alt="VersionedPromptLibrary" /> | <img src="../../screenshots/ai-components/ConfigDiffReview.png" alt="ConfigDiffReview" /> | <img src="../../screenshots/ai-components/ReviewPanel.png" alt="ReviewPanel" /> |

### Models & evaluation

| Model picker | Performance table | Model lab |
|:---:|:---:|:---:|
| <img src="../../screenshots/ai-components/ModelPicker.png" alt="ModelPicker" /> | <img src="../../screenshots/ai-components/ModelPerformanceTable.png" alt="ModelPerformanceTable" /> | <img src="../../screenshots/ai-components/ModelLab.png" alt="ModelLab" /> |
| **Model journey** | **Scoring panel** | **Sampler controls** |
| <img src="../../screenshots/ai-components/ModelJourney.png" alt="ModelJourney" /> | <img src="../../screenshots/ai-components/ScoringPanel.png" alt="ScoringPanel" /> | <img src="../../screenshots/ai-components/SamplerControls.png" alt="SamplerControls" /> |
| **Response comparer** | | |
| <img src="../../screenshots/ai-components/ResponseComparer.png" alt="ResponseComparer" /> | | |

### Context & retrieval

| Context browser | Context ring | Token meter |
|:---:|:---:|:---:|
| <img src="../../screenshots/ai-components/ContextBrowser.png" alt="ContextBrowser" /> | <img src="../../screenshots/ai-components/ContextRing.png" alt="ContextRing" /> | <img src="../../screenshots/ai-components/TokenMeter.png" alt="TokenMeter" /> |
| **Usage budget** | **Source list** | **Inline citations** |
| <img src="../../screenshots/ai-components/UsageBudgetCard.png" alt="UsageBudgetCard" /> | <img src="../../screenshots/ai-components/SourceList.png" alt="SourceList" /> | <img src="../../screenshots/ai-components/InlineCitations.png" alt="InlineCitations" /> |
| **Document Q&A** | | |
| <img src="../../screenshots/ai-components/DocumentQAPanel.png" alt="DocumentQAPanel" /> | | |

### Tools & permissions

| Tool call card | Tool permission prompt |
|:---:|:---:|
| <img src="../../screenshots/ai-components/ToolCallCard.png" alt="ToolCallCard" /> | <img src="../../screenshots/ai-components/ToolPermissionPrompt.png" alt="ToolPermissionPrompt" /> |

### Code & streaming

| Generated code | Streaming markdown | Streaming diff |
|:---:|:---:|:---:|
| <img src="../../screenshots/ai-components/GeneratedCodeCard.png" alt="GeneratedCodeCard" /> | <img src="../../screenshots/ai-components/StreamingMarkdown.png" alt="StreamingMarkdown" /> | <img src="../../screenshots/ai-components/StreamingDiff.png" alt="StreamingDiff" /> |
| **Thought / code split** | **Inline code chip** | |
| <img src="../../screenshots/ai-components/ThoughtCodeSplit.png" alt="ThoughtCodeSplit" /> | <img src="../../screenshots/ai-components/InlineCodeChip.png" alt="InlineCodeChip" /> | |

### Workspaces & copilots

| Assist workspace | Help copilot | Branch explorer |
|:---:|:---:|:---:|
| <img src="../../screenshots/ai-components/AssistWorkspace.png" alt="AssistWorkspace" /> | <img src="../../screenshots/ai-components/HelpCopilot.png" alt="HelpCopilot" /> | <img src="../../screenshots/ai-components/BranchExplorer.png" alt="BranchExplorer" /> |

### Voice & transcripts

| Voice studio | Transcript sync |
|:---:|:---:|
| <img src="../../screenshots/ai-components/VoiceStudio.png" alt="VoiceStudio" /> | <img src="../../screenshots/ai-components/TranscriptSync.png" alt="TranscriptSync" /> |

---

## Desktop Integrations Gallery

23 native desktop chrome primitives in `@atlas/ui/desktop`. Cards and rails render at natural width; dialogs center on a dimmed overlay.

```tsx
import { GroupedSidebarNav, ToolboxRail, FindBar, AboutDialog } from '@atlas/ui/desktop'
```

See [Screenshot workflow](#screenshot-workflow) to regenerate baselines after visual changes.

### System dialogs

| About | Crash | Licenses |
|:---:|:---:|:---:|
| <img src="../../screenshots/desktop-components/AboutDialog.png" alt="AboutDialog" /> | <img src="../../screenshots/desktop-components/CrashDialog.png" alt="CrashDialog" /> | <img src="../../screenshots/desktop-components/LicensesDialog.png" alt="LicensesDialog" /> |
| **Release notes** | **Unsaved changes** | **Permission gate** |
| <img src="../../screenshots/desktop-components/ReleaseNotesDialog.png" alt="ReleaseNotesDialog" /> | <img src="../../screenshots/desktop-components/UnsavedChangesDialog.png" alt="UnsavedChangesDialog" /> | <img src="../../screenshots/desktop-components/PermissionGate.png" alt="PermissionGate" /> |

### Status & feedback

| Auto-save | Connect | Download |
|:---:|:---:|:---:|
| <img src="../../screenshots/desktop-components/AutoSavePill.png" alt="AutoSavePill" /> | <img src="../../screenshots/desktop-components/ConnectBar.png" alt="ConnectBar" /> | <img src="../../screenshots/desktop-components/DownloadCard.png" alt="DownloadCard" /> |
| **Version** | **Word count** | **Zoom** |
| <img src="../../screenshots/desktop-components/VersionFooter.png" alt="VersionFooter" /> | <img src="../../screenshots/desktop-components/WordCountBar.png" alt="WordCountBar" /> | <img src="../../screenshots/desktop-components/ZoomControls.png" alt="ZoomControls" /> |

### Content & navigation

| Sidebar | Toolbox | Favorites |
|:---:|:---:|:---:|
| <img src="../../screenshots/desktop-components/GroupedSidebarNav.png" alt="GroupedSidebarNav" /> | <img src="../../screenshots/desktop-components/ToolboxRail.png" alt="ToolboxRail" /> | <img src="../../screenshots/desktop-components/FavoritesBar.png" alt="FavoritesBar" /> |
| **Recent files** | **Preview** | **Find** |
| <img src="../../screenshots/desktop-components/RecentFilesList.png" alt="RecentFilesList" /> | <img src="../../screenshots/desktop-components/PreviewPane.png" alt="PreviewPane" /> | <img src="../../screenshots/desktop-components/FindBar.png" alt="FindBar" /> |
| **Font picker** | **Emoji** | **Property grid** |
| <img src="../../screenshots/desktop-components/FontPicker.png" alt="FontPicker" /> | <img src="../../screenshots/desktop-components/EmojiPicker.png" alt="EmojiPicker" /> | <img src="../../screenshots/desktop-components/PropertyGrid.png" alt="PropertyGrid" /> |
| **Shortcuts** | **Theme** | |
| <img src="../../screenshots/desktop-components/ShortcutSettingsList.png" alt="ShortcutSettingsList" /> | <img src="../../screenshots/desktop-components/ThemeSwitcher.png" alt="ThemeSwitcher" /> | |

---

<div align="center">
  <sub>Built with ❤️ exclusively for the native GPUIX runtime.</sub>
</div>
