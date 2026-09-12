/**
 * @atlas/ui
 *
 * A GPUIX component library for Atlas apps.
 * All components are pure GPUIX primitives — no DOM, no browser APIs.
 * Works identically on Windows (DirectX 12), macOS (Metal), and Linux (Vulkan).
 *
 * Usage in any GPUIX project:
 *   import { Icon, Badge, Kbd, Avatar, toast, Toaster, Tabs, Switch } from '@atlas/ui'
 *   import { C, FONT, surface, semantic } from '@atlas/ui/tokens'
 */

// ── Design tokens & constants ────────────────────────────────────────────
export {
  C,
  FONT,
  FONT_MONO,
  surface,
  interact,
  border,
  text,
  semantic,
  SIDEBAR_WIDTH,
  LIST_WIDTH,
  TITLEBAR_HEIGHT,
  TRAFFIC_LIGHT_CLEARANCE,
} from './tokens'
export type { ColorTokens } from './tokens'

// ── Icon registry ────────────────────────────────────────────────────────
export { SVG_ICONS } from './icons'
export type { IconName } from './icons'

// ── Atoms ────────────────────────────────────────────────────────────────
export { Icon, IconButton, Kbd, Badge, Avatar, AvatarGroup } from './atoms'
export type {
  IconProps,
  IconButtonProps,
  KbdProps,
  BadgeProps,
  BadgeVariant,
  AvatarProps,
  AvatarGroupProps,
  AvatarPresence,
} from './atoms'

export { Button, ButtonGroup } from './atoms'
export type { ButtonProps, ButtonGroupProps, ButtonVariant, ButtonSize } from './atoms'

export { SplitButton } from './atoms'
export type { SplitButtonProps, SplitButtonItem } from './atoms'

export { CopyButton } from './atoms'
export type { CopyButtonProps } from './atoms'

// ── Overlays ─────────────────────────────────────────────────────────────
export {
  toast,
  dismissToast,
  toastSuccess,
  toastError,
  toastWarning,
  useToastStore,
  Toaster,
} from './overlays/Toast'
export type { ToastItem, ToastVariant } from './overlays/Toast'

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from './overlays/ContextMenu'

export {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from './overlays/Dialog'

export { AlertDialog } from './overlays/AlertDialog'
export type { AlertDialogProps } from './overlays/AlertDialog'

export { Menubar } from './overlays/Menubar'
export type { MenubarProps, Menu, MenuItem } from './overlays/Menubar'

export { OnboardingTour, Spotlight } from './overlays/OnboardingTour'
export type { OnboardingTourProps, TourStep, SpotlightProps } from './overlays/OnboardingTour'

export { LayoutInspectorHUD } from './overlays/LayoutInspectorHUD'
export type { LayoutInspectorHUDProps } from './overlays/LayoutInspectorHUD'

// ── Layout ───────────────────────────────────────────────────────────────
export { PanelGroup, Panel, PanelResizeHandle } from './layout/ResizablePanel'
export type { PanelGroupProps, PanelProps, PanelResizeHandleProps } from './layout/ResizablePanel'

export { Tabs, TabsList, TabsTrigger, TabsContent } from './layout/Tabs'
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './layout/Tabs'

export { ScrollArea } from './layout/ScrollArea'
export type { ScrollAreaProps } from './layout/ScrollArea'

export { TreeView } from './layout/TreeView'
export type { TreeViewProps, TreeNode } from './layout/TreeView'

export { Drawer } from './layout/Drawer'
export type { DrawerProps, DrawerSide } from './layout/Drawer'

export { Breadcrumb } from './layout/Breadcrumb'
export type { BreadcrumbProps, BreadcrumbItem } from './layout/Breadcrumb'

export { WindowDragArea } from './layout/WindowDragArea'
export type { WindowDragAreaProps } from './layout/WindowDragArea'

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from './layout/Card'
export type { CardProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardBodyProps, CardFooterProps } from './layout/Card'

export { Accordion } from './layout/Accordion'
export type { AccordionProps, AccordionItem } from './layout/Accordion'

export { StickyHeader } from './layout/StickyHeader'
export type { StickyHeaderProps } from './layout/StickyHeader'

export { VirtualList } from './layout/VirtualList'
export type { VirtualListProps } from './layout/VirtualList'

export { InfiniteScroll } from './layout/InfiniteScroll'
export type { InfiniteScrollProps } from './layout/InfiniteScroll'

export { VirtualizedGrid } from './layout/VirtualizedGrid'
export type { VirtualizedGridProps } from './layout/VirtualizedGrid'

export { SyncedScrollPane } from './layout/SyncedScrollPane'
export type { SyncedScrollPaneProps } from './layout/SyncedScrollPane'

// ── Inputs ───────────────────────────────────────────────────────────────
export { Switch } from './inputs/Switch'
export type { SwitchProps } from './inputs/Switch'

export { Checkbox } from './inputs/Checkbox'
export type { CheckboxProps } from './inputs/Checkbox'

export { ProgressBar } from './inputs/ProgressBar'
export type { ProgressBarProps } from './inputs/ProgressBar'

export { Slider } from './inputs/Slider'
export type { SliderProps } from './inputs/Slider'

export { RadioGroup } from './inputs/RadioGroup'
export type { RadioGroupProps, RadioOption } from './inputs/RadioGroup'

export { TagInput } from './inputs/TagInput'
export type { TagInputProps } from './inputs/TagInput'

export { DatePicker } from './inputs/DatePicker'
export type { DatePickerProps } from './inputs/DatePicker'

export { TimePicker } from './inputs/TimePicker'
export type { TimePickerProps, TimeValue } from './inputs/TimePicker'

export { ColorPicker } from './inputs/ColorPicker'
export type { ColorPickerProps } from './inputs/ColorPicker'

export { FileDropzone } from './inputs/FileDropzone'
export type { FileDropzoneProps } from './inputs/FileDropzone'

export { PinInput } from './inputs/PinInput'
export type { PinInputProps } from './inputs/PinInput'

export { TextareaAutosize } from './inputs/TextareaAutosize'
export type { TextareaAutosizeProps } from './inputs/TextareaAutosize'

export { SearchInput } from './inputs/SearchInput'
export type { SearchInputProps } from './inputs/SearchInput'

export { SegmentedControl, ToggleGroup } from './inputs/SegmentedControl'
export type { SegmentedControlProps, ToggleGroupProps, SegmentOption } from './inputs/SegmentedControl'

export { Field, InputGroup } from './inputs/Field'
export type { FieldProps, InputGroupProps } from './inputs/Field'

export { StarRating } from './inputs/StarRating'
export type { StarRatingProps } from './inputs/StarRating'

// ── Effects ──────────────────────────────────────────────────────────────
export { Skeleton, SkeletonText } from './effects/Skeleton'
export type { SkeletonProps, SkeletonTextProps } from './effects/Skeleton'

export { AnimatedCounter } from './effects/AnimatedCounter'
export type { AnimatedCounterProps } from './effects/AnimatedCounter'

export { GradientText } from './effects/GradientText'
export type { GradientTextProps, GradientStop } from './effects/GradientText'

export { SyntaxCodeBlock } from './effects/SyntaxCodeBlock'
export type { SyntaxCodeBlockProps } from './effects/SyntaxCodeBlock'

export { SkeletonTimelineRow } from './effects/SkeletonRow'
export type { SkeletonTimelineRowProps } from './effects/SkeletonRow'

export { Spinner } from './effects/Spinner'
export type { SpinnerProps } from './effects/Spinner'

export { StreamingText } from './effects/StreamingText'
export type { StreamingTextProps } from './effects/StreamingText'

export { AnimatedBackground } from './effects/AnimatedBackground'
export type { AnimatedBackgroundProps } from './effects/AnimatedBackground'

// ── Display & feedback ───────────────────────────────────────────────────
export { Popover } from './display/Popover'
export type { PopoverProps } from './display/Popover'

export { HoverCard } from './display/HoverCard'
export type { HoverCardProps } from './display/HoverCard'

export { CommandMenu } from './display/CommandMenu'
export type { CommandMenuProps, CommandItem } from './display/CommandMenu'

export { Alert } from './display/Alert'
export type { AlertProps, AlertVariant } from './display/Alert'

export { StepIndicator } from './display/StepIndicator'
export type { StepIndicatorProps, Step } from './display/StepIndicator'

export { Divider } from './display/Divider'
export type { DividerProps } from './display/Divider'

export { Timeline } from './display/Timeline'
export type { TimelineProps, TimelineItem } from './display/Timeline'

export { DataGrid } from './display/DataGrid'
export type { DataGridProps, DataGridColumn } from './display/DataGrid'

export { EmptyState } from './display/EmptyState'
export type { EmptyStateProps } from './display/EmptyState'

export { StatCard } from './display/StatCard'
export type { StatCardProps } from './display/StatCard'

export { DescriptionList } from './display/DescriptionList'
export type { DescriptionListProps, DescriptionItem } from './display/DescriptionList'

export { Marker } from './display/Marker'
export type { MarkerProps } from './display/Marker'

export { JsonTree } from './display/JsonTree'
export type { JsonTreeProps } from './display/JsonTree'

export { BeforeAfterSlider } from './display/BeforeAfterSlider'
export type { BeforeAfterSliderProps } from './display/BeforeAfterSlider'

export { DataTable } from './display/DataTable'
export type { DataTableProps, DataTableColumn } from './display/DataTable'

export { Calendar } from './display/Calendar'
export type { CalendarProps, CalendarEvent } from './display/Calendar'

export { KanbanBoard } from './display/KanbanBoard'
export type { KanbanBoardProps, KanbanColumn, KanbanCard } from './display/KanbanBoard'

export { SparklineStat } from './display/SparklineStat'
export type { SparklineStatProps } from './display/SparklineStat'

export { TrendBadge } from './display/TrendBadge'
export type { TrendBadgeProps } from './display/TrendBadge'

export { PaginatedTable } from './display/PaginatedTable'
export type { PaginatedTableProps } from './display/PaginatedTable'

export { FilterBar } from './display/FilterBar'
export type { FilterBarProps } from './display/FilterBar'

export { TreeTable } from './display/TreeTable'
export type { TreeTableProps, TreeTableNode } from './display/TreeTable'

export { SearchableList } from './display/SearchableList'
export type { SearchableListProps } from './display/SearchableList'

export { DetailPanel } from './display/DetailPanel'
export type { DetailPanelProps } from './display/DetailPanel'

export { BulkActionsBar } from './display/BulkActionsBar'
export type { BulkActionsBarProps } from './display/BulkActionsBar'

export { GroupedVirtualList } from './display/GroupedVirtualList'
export type { GroupedVirtualListProps, Group } from './display/GroupedVirtualList'

export { RelativeTime } from './display/RelativeTime'
export type { RelativeTimeProps } from './display/RelativeTime'

export { ReorderableList } from './display/ReorderableList'
export type { ReorderableListProps } from './display/ReorderableList'

export { ScrollSpy } from './display/ScrollSpy'
export type { ScrollSpyProps, ScrollSpySection } from './display/ScrollSpy'

export { GhostDragPreview } from './display/GhostDragPreview'
export type { GhostDragPreviewProps } from './display/GhostDragPreview'

// ── Data Visualization ───────────────────────────────────────────────────
export { ActivitySparkline } from './dataviz/ActivitySparkline'
export type { ActivitySparklineProps, SparklineDataPoint } from './dataviz/ActivitySparkline'

export { LineChart } from './dataviz/LineChart'
export type { LineChartProps } from './dataviz/LineChart'

export { BarChart } from './dataviz/BarChart'
export type { BarChartProps, BarChartDatum } from './dataviz/BarChart'

export { Heatmap } from './dataviz/Heatmap'
export type { HeatmapProps } from './dataviz/Heatmap'

export { CircularProgress } from './dataviz/CircularProgress'
export type { CircularProgressProps } from './dataviz/CircularProgress'

export { Gauge } from './dataviz/Gauge'
export type { GaugeProps } from './dataviz/Gauge'

export { AudioWaveform } from './dataviz/AudioWaveform'
export type { AudioWaveformProps } from './dataviz/AudioWaveform'

export { Confetti } from './dataviz/Confetti'
export type { ConfettiProps } from './dataviz/Confetti'

export { Chart } from './dataviz/Chart'
export type { ChartProps, ChartLegendItem } from './dataviz/Chart'

export { DonutChart } from './dataviz/DonutChart'
export type { DonutChartProps, DonutSegment } from './dataviz/DonutChart'

export { MultiSeriesLineChart } from './dataviz/MultiSeriesLineChart'
export type { MultiSeriesLineChartProps, MultiLineSeries } from './dataviz/MultiSeriesLineChart'

export { StackedBarChart } from './dataviz/StackedBarChart'
export type { StackedBarChartProps, StackedBarDatum, StackedBarSegment } from './dataviz/StackedBarChart'

export { BulletChart } from './dataviz/BulletChart'
export type { BulletChartProps } from './dataviz/BulletChart'

export { RadialGauge } from './dataviz/RadialGauge'
export type { RadialGaugeProps } from './dataviz/RadialGauge'

export { CalendarHeatmap } from './dataviz/CalendarHeatmap'
export type { CalendarHeatmapProps, CalendarHeatmapDatum } from './dataviz/CalendarHeatmap'

// ── AI / agent ───────────────────────────────────────────────────────────
export { ChatBubble } from './ai/ChatBubble'
export type { ChatBubbleProps, ChatRole } from './ai/ChatBubble'

export { MessageScroller } from './ai/MessageScroller'
export type { MessageScrollerProps } from './ai/MessageScroller'

export { PromptInput } from './ai/PromptInput'
export type { PromptInputProps } from './ai/PromptInput'

export { AgentRunSteps } from './ai/AgentRunSteps'
export type { AgentRunStepsProps, AgentStep, AgentStepStatus } from './ai/AgentRunSteps'

export { ToolCallCard } from './ai/ToolCallCard'
export type { ToolCallCardProps, ToolCallStatus } from './ai/ToolCallCard'

export { TokenMeter } from './ai/TokenMeter'
export type { TokenMeterProps } from './ai/TokenMeter'

export { ChatThread } from './ai/ChatThread'
export type { ChatThreadProps, ChatThreadMessage } from './ai/ChatThread'

export { ThinkingIndicator } from './ai/ThinkingIndicator'
export type { ThinkingIndicatorProps } from './ai/ThinkingIndicator'

export { RegenerateBar } from './ai/RegenerateBar'
export type { RegenerateBarProps } from './ai/RegenerateBar'

export { SourceList } from './ai/SourceList'
export type { SourceListProps, Source } from './ai/SourceList'

export { InlineCodeChip } from './ai/InlineCodeChip'
export type { InlineCodeChipProps } from './ai/InlineCodeChip'

export { ModelPicker } from './ai/ModelPicker'
export type { ModelPickerProps, ModelOption } from './ai/ModelPicker'

export { UsageBudgetCard } from './ai/UsageBudgetCard'
export type { UsageBudgetCardProps } from './ai/UsageBudgetCard'

export { AgentRunCard } from './ai/AgentRunCard'
export type { AgentRunCardProps } from './ai/AgentRunCard'

export { StreamingMarkdown } from './ai/StreamingMarkdown'
export type { StreamingMarkdownProps } from './ai/StreamingMarkdown'

export { MentionInput } from './ai/MentionInput'
export type { MentionInputProps, MentionOption } from './ai/MentionInput'

export { PromptHistoryList } from './ai/PromptHistoryList'
export type { PromptHistoryListProps, PromptHistoryItem } from './ai/PromptHistoryList'

// ── Finance ───────────────────────────────────────────────────────────────
export { KpiGrid } from './finance/KpiGrid'
export type { KpiGridProps } from './finance/KpiGrid'

export { BalanceCard } from './finance/BalanceCard'
export type { BalanceCardProps } from './finance/BalanceCard'

export { PnlBadge } from './finance/PnlBadge'
export type { PnlBadgeProps } from './finance/PnlBadge'

export { TransactionList } from './finance/TransactionList'
export type { TransactionListProps, Transaction } from './finance/TransactionList'

export { BudgetBar } from './finance/BudgetBar'
export type { BudgetBarProps } from './finance/BudgetBar'

export { AllocationDonut } from './finance/AllocationDonut'
export type { AllocationDonutProps, AllocationSegment } from './finance/AllocationDonut'

export { CandlestickChart } from './finance/CandlestickChart'
export type { CandlestickChartProps, Candle } from './finance/CandlestickChart'

// ── Hooks ────────────────────────────────────────────────────────────────
export {
  useHotkeys,
  splitHotkey,
  useControllableState,
  useDebouncedValue,
  usePrevious,
  useInterval,
  useTimeout,
  useLatest,
  useIsMounted,
  useDisclosure,
  useKeyPress,
  useIsKeyDown,
  useRovingFocus,
  useFocusTrap,
  useScrollPosition,
} from './hooks'
export type {
  HotkeyHandler,
  UseHotkeysReturn,
  ControllableStateOptions,
  UseKeyPressReturn,
  UseIsKeyDownReturn,
  RovingFocusOptions,
  ScrollPosition,
} from './hooks'

// ── Core (theme) ─────────────────────────────────────────────────────────
export { ThemeProvider, useTheme, alpha } from './core'
export type { ThemeProviderProps, Theme, ThemeContextValue } from './core'

// ── Composites ───────────────────────────────────────────────────────────
export * from './composites'

// ── Grounded additions ───────────────────────────────────────────────────
export { PasswordField, NumberField, DateRangePicker, TypeaheadInput, ShortcutRecorder } from './inputs'
export type {
  PasswordFieldProps,
  NumberFieldProps,
  DateRangePickerProps,
  DateRange,
  TypeaheadInputProps,
  TypeaheadOption,
  ShortcutRecorderProps,
} from './inputs'

export {
  SearchHighlights,
  ConfirmPopover,
  RetryView,
  ActionChips,
  BackToTop,
  Pagination,
  ColumnVisibilityMenu,
  SummaryFooter,
  VirtualTree,
  StatusDot,
  HintBar,
  Tooltip,
} from './display'
export type {
  SearchHighlightsProps,
  ConfirmPopoverProps,
  RetryViewProps,
  ActionChipsProps,
  ActionChip,
  BackToTopProps,
  PaginationProps,
  ColumnVisibilityMenuProps,
  ColumnVisibilityColumn,
  SummaryFooterProps,
  VirtualTreeProps,
  StatusDotProps,
  StatusValue,
  HintBarProps,
  HintItem,
  TooltipProps,
} from './display'

export { LoadingOverlay, FocusScope } from './overlays'
export type { LoadingOverlayProps, FocusScopeProps } from './overlays'

export { TitleBar } from './layout'
export type { TitleBarProps } from './layout'

export { MessageStatus } from './ai'
export type { MessageStatusProps, MessageStatusValue } from './ai'

// ── AI batch (creative leaves) ───────────────────────────────────────────
export {
  ContextRing,
  RunCostCard,
  GeneratedCodeCard,
  ModelPerformanceTable,
  ScoringPanel,
  SamplerControls,
  SystemPromptCard,
  InlineCitations,
  PromptDiff,
  StreamingDiff,
  ResponseComparer,
  PromptTemplateEditor,
  AgentTrajectory,
  BranchExplorer,
  TaskDoneBanner,
  ToolPermissionPrompt,
} from './ai'
export type {
  ContextRingProps,
  RunCostCardProps,
  GeneratedCodeCardProps,
  GeneratedCodeStatus,
  ModelPerformanceTableProps,
  BenchmarkRow,
  ScoringPanelProps,
  ScoreCriterion,
  SamplerControlsProps,
  SamplerValues,
  SystemPromptCardProps,
  InlineCitationsProps,
  PromptDiffProps,
  StreamingDiffProps,
  ResponseComparerProps,
  ComparableResponse,
  PromptTemplateEditorProps,
  AgentTrajectoryProps,
  TrajectoryStep,
  TrajectoryState,
  BranchExplorerProps,
  BranchNode,
  BranchStatus,
  TaskDoneBannerProps,
  ToolPermissionPromptProps,
} from './ai'

// ── Round 2: hooks & quick wins ──────────────────────────────────────────
export {
  usePointerDrag,
  useMultiSelect,
  useListState,
  useAsync,
  useDebouncedCallback,
  usePagination,
  useCopyState,
  useHover,
  useFocusVisible,
  useWindowQuery,
  useIsCompact,
  useCounter,
  useIdle,
} from './hooks'
export type {
  PointerDragHandlers,
  UsePointerDragReturn,
  MultiSelectOptions,
  UseMultiSelectReturn,
  UseListStateReturn,
  AsyncState,
  PaginationOptions,
  UsePaginationReturn,
  WindowQuery,
} from './hooks'

export { IconLabel } from './atoms'
export type { IconLabelProps } from './atoms'

export { Row, Col, Spacer, FormCard } from './layout'
export type { RowProps, Align, Justify, ColProps, SpacerProps, FormCardProps } from './layout'

export { SettingRow, SearchEmpty, ContextRow, UploadProgress, ThemeCustomizer, TableChrome } from './display'
export type { SettingRowProps, SearchEmptyProps, ContextRowProps, ContextAction, UploadProgressProps, UploadStatus, ThemeCustomizerProps, TableChromeProps } from './display'

export { SelectField, ComboboxField } from './inputs'
export type { SelectFieldProps, SelectOption, ComboboxFieldProps } from './inputs'

export { ChatSearchBar } from './ai'
export type { ChatSearchBarProps } from './ai'

export { AgentFlowGraph, ContextBrowser } from './ai'
export type { AgentFlowGraphProps, AgentFlowNode, AgentNodeKind, AgentNodeState, ContextBrowserProps, ContextChunk } from './ai'

export {
  ThoughtCodeSplit,
  ConfigDiffReview,
  TranscriptSync,
  InterruptibleComposer,
  SelectionToPrompt,
  LatencyLog,
  SandboxStepLog,
  DocumentQAPanel,
  VersionedPromptLibrary,
  ModelJourney,
  LiveAgentGrid,
  PromptSettings,
  ReviewPanel,
  ModelLab,
  VoiceStudio,
  SelectAndAsk,
  AssistWorkspace,
  PromptEngineeringSuite,
  AgentMonitor,
  RunInspector,
  HelpCopilot,
} from './ai'
export type {
  ThoughtCodeSplitProps,
  ConfigDiffReviewProps,
  TranscriptSyncProps,
  TranscriptSegment,
  InterruptibleComposerProps,
  SelectionToPromptProps,
  LatencyLogProps,
  LatencyEntry,
  SandboxStepLogProps,
  SandboxLine,
  SandboxLineKind,
  DocumentQAPanelProps,
  DocChunk,
  VersionedPromptLibraryProps,
  VersionedPrompt,
  PromptVersion,
  ModelJourneyProps,
  JourneyTurn,
  LiveAgentGridProps,
  AgentRunSummary,
  PromptSettingsProps,
  ReviewPanelProps,
  ModelLabProps,
  VoiceStudioProps,
  SelectAndAskProps,
  AssistWorkspaceProps,
  PromptEngineeringSuiteProps,
  AgentMonitorProps,
  RunInspectorProps,
  HelpCopilotProps,
} from './ai'

// ── Desktop (app chrome) ─────────────────────────────────────────────────
export * from './desktop'
