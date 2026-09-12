# @atlas/ui — Component Map

General-purpose GPUIX component library (`@atlas/ui`). Every category is a
subpath export: `@atlas/ui/tokens`, `…/atoms`, `…/overlays`, `…/layout`,
`…/inputs`, `…/effects`, `…/display`, `…/dataviz`, `…/ai`, `…/finance`,
`…/composites`, `…/desktop`, `…/hooks`, `…/core`. All are re-exported from
`@atlas/ui`.

## core — theme
`ThemeProvider`, `useTheme`, `alpha`

## hooks
`useHotkeys`, `splitHotkey`, `useControllableState`, `useDebouncedValue`,
`useDebouncedCallback`, `usePrevious`, `useLatest`, `useIsMounted`, `useInterval`,
`useTimeout`, `useDisclosure`, `useKeyPress`, `useIsKeyDown`, `useRovingFocus`,
`useFocusTrap`, `useScrollPosition`, `usePointerDrag`, `useMultiSelect`,
`useListState`, `useAsync`, `usePagination`, `useCopyState`, `useHover`,
`useFocusVisible`, `useWindowQuery`, `useIsCompact`, `useCounter`, `useIdle`

## atoms
`Icon`, `IconButton`, `Button`, `ButtonGroup`, `SplitButton`, `CopyButton`,
`IconLabel`, `Kbd`, `Badge`, `Avatar`, `AvatarGroup`

## inputs
`Switch`, `Checkbox`, `Slider`, `NumberField`, `PasswordField`, `RadioGroup`,
`SegmentedControl`, `ToggleGroup`, `SelectField`, `ComboboxField`,
`TypeaheadInput`, `SearchInput`, `TagInput`, `MentionInput`, `DatePicker`,
`DateRangePicker`, `TimePicker`, `ColorPicker`, `StarRating`, `PinInput`,
`FileDropzone`, `TextareaAutosize`, `Field`, `InputGroup`, `ShortcutRecorder`,
`ProgressBar`

## layout
`Row`, `Col`, `Spacer`, `Card` (+`Header/Title/Description/Body/Footer`),
`FormCard`, `Tabs`(+parts), `Accordion`, `PanelGroup/Panel/PanelResizeHandle`,
`Drawer`, `Dialog`-adjacent lives in overlays, `ScrollArea`, `StickyHeader`,
`TreeView`, `VirtualTree`, `VirtualList`, `VirtualizedGrid`, `InfiniteScroll`,
`SyncedScrollPane`, `TitleBar`, `WindowDragArea`, `Breadcrumb`

## overlays
`Dialog`(+parts), `AlertDialog`, `ContextMenu`(+parts), `Menubar`, `Popover`,
`HoverCard`, `Spotlight`, `OnboardingTour`, `LoadingOverlay`, `FocusScope`,
`LayoutInspectorHUD`, `Toast`/`toast`/`useToast`/`Toaster`

## effects
`Skeleton`(+`SkeletonText`), `SkeletonTimelineRow`, `Spinner`, `StreamingText`,
`StreamingMarkdown`, `AnimatedCounter`, `AnimatedBackground`, `GradientText`,
`SyntaxCodeBlock`

## display
`EmptyState`, `RetryView`, `SearchEmpty`, `Alert`, `ActionChips`, `Badge`-ish →
atoms, `Timeline`, `Divider`, `StepIndicator`, `DescriptionList`, `Marker`,
`SearchHighlights`, `StatCard`, `SparklineStat`, `TrendBadge`, `KpiGrid`(finance),
`DataGrid`, `DataTable`, `TreeTable`, `SummaryFooter`, `ColumnVisibilityMenu`,
`Pagination`, `PaginatedTable`, `FilterBar`, `TableChrome`, `FilterableTable`,
`AdminTable`(composites), `DetailPanel`, `BulkActionsBar`, `SelectionList`(composites),
`ScrollSpy`, `StatusDot`, `HintBar`, `AutoSavePill`(desktop), `Tooltip` (styled),
`BeforeAfterSlider`, `JsonTree`, `Calendar`, `KanbanBoard`, `ReorderableList`,
`GhostDragPreview`, `GroupedVirtualList`, `RelativeTime`, `ConfirmPopover`,
`ContextRow`, `UploadProgress`, `ThemeCustomizer`, `SettingRow`, `IconLabel`(atoms)

## dataviz
`ActivitySparkline`, `LineChart`, `MultiSeriesLineChart`, `BarChart`,
`StackedBarChart`, `Heatmap`, `CalendarHeatmap`, `DonutChart`, `BulletChart`,
`Gauge`, `RadialGauge`, `CircularProgress`, `AudioWaveform`, `Confetti`, `Chart`

## ai
`ChatBubble`, `ChatThread`, `ChatWindow`, `MessageScroller`, `PromptInput`,
`PromptComposer`, `PromptStudio`(composites), `PromptTemplateEditor`,
`PromptEngineeringSuite`, `PromptHistoryList`, `MentionInput`(inputs),
`StreamingMarkdown`, `ThinkingIndicator`, `InterruptibleComposer`,
`RegenerateBar`, `CitedAnswer`(composites), `SourceList`, `InlineCitations`,
`CitationTooltip`(composites), `InlineCodeChip`, `AgentRunSteps`,
`AgentRunCard`, `AgentRunConsole`(composites), `AgentTrajectory`,
`AgentFlowGraph`, `BranchExplorer`, `LiveAgentGrid`, `AgentMonitor`,
`RunInspector`, `ToolCallCard`, `ToolPermissionPrompt`, `ContextBrowser`,
`ContextRing`, `TokenMeter`, `UsageBudgetCard`, `RunCostCard`,
`DocumentQAPanel`, `HelpCopilot`, `SelectionToPrompt`, `SelectAndAsk`,
`TranscriptSync`, `VoiceStudio`, `ChatSearchBar`, `ResponseComparer`,
`ModelPicker`, `ModelPerformanceTable`, `ModelLab`, `ScoringPanel`,
`SamplerControls`, `SystemPromptCard`, `PromptSettings`, `PromptDiff`,
`StreamingDiff`, `ConfigDiffReview`, `ReviewPanel`, `VersionedPromptLibrary`,
`GeneratedCodeCard`, `ModelJourney`, `LatencyLog`, `SandboxStepLog`,
`AssistWorkspace`

## finance
`KpiGrid`, `BalanceCard`, `PnlBadge`, `TrendBadge`(display), `TransactionList`,
`BudgetBar`, `AllocationDonut`, `CandlestickChart`

## desktop
System dialogs: `UnsavedChangesDialog`, `AboutDialog`, `CrashDialog`,
`ReleaseNotesDialog`, `LicensesDialog`, `PermissionGate`.
Status/feedback: `ConnectBar`, `DownloadCard`, `AutoSavePill`, `VersionFooter`,
`WordCountBar`, `ZoomControls`, `ShortcutSettingsList`.
Content/nav: `RecentFilesList`, `GroupedSidebarNav`, `ToolboxRail`,
`FavoritesBar`, `PreviewPane`, `EmojiPicker`, `FontPicker`, `FindBar`,
`PropertyGrid`, `ThemeSwitcher`

## composites
Higher-order compositions built from the above (see `src/composites/` barrel):
`QuickSwitcher`, `NotificationCenter`, `KeyboardShortcutsOverlay`, `WizardDialog`,
`ActionToast`, `UserMenu`, `Toolbar`, `FilterableTable`, `SelectionList`,
`LogViewer`, `ActivityFeed`, `DataExplorer`, `AuditTrail`, `FileBrowser`,
`DiffViewer`, `StatusBar`, `EditorTabStrip`, `InlineEditableField`,
`MultiSelectCombobox`, `PromptComposer`, `ChatWindow`, `CitationTooltip`,
`ReasoningTrace`, `AgentRunConsole`, `UsageDashboard`, `AssetDetailPanel`,
`CalendarEventEditor`, `OnboardingChecklist`, `DebugInspector`,
`VirtualizedSelect`, `ToastWithProgress`, `AnimatedStat`, `TransferList`,
`AdminTable`, `CitedAnswer`, `PromptStudio`, `AssistWorkspace`, `PromptSettings`,
`ReviewPanel`, `ModelLab`, `VoiceStudio`, `SelectAndAsk`, `RunInspector`,
`HelpCopilot`, `PromptEngineeringSuite`, `AgentMonitor`

## Authoring
See `packages/ui/AUTHORING.md` for the framework constraints (no DOM, StyleDesc
keys, motion limits, key normalization) before adding components.
