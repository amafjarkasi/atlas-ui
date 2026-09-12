// @atlas/ui — overlays barrel export

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
} from './Dialog'
export type {
  DialogProps,
  DialogTriggerProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogBodyProps,
  DialogFooterProps,
  DialogCloseProps,
} from './Dialog'

export {
  toast,
  dismissToast,
  toastSuccess,
  toastError,
  toastWarning,
  useToastStore,
  Toaster,
} from './Toast'
export type { ToastItem, ToastVariant } from './Toast'

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from './ContextMenu'

export { AlertDialog } from './AlertDialog'
export type { AlertDialogProps } from './AlertDialog'

export { Menubar } from './Menubar'
export type { MenubarProps, Menu, MenuItem } from './Menubar'

export { OnboardingTour, Spotlight } from './OnboardingTour'
export type { OnboardingTourProps, TourStep, SpotlightProps } from './OnboardingTour'

export { LayoutInspectorHUD } from './LayoutInspectorHUD'
export type { LayoutInspectorHUDProps } from './LayoutInspectorHUD'

export { LoadingOverlay } from './LoadingOverlay'
export type { LoadingOverlayProps } from './LoadingOverlay'

export { FocusScope } from './FocusScope'
export type { FocusScopeProps } from './FocusScope'
