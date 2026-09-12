/**
 * @atlas/ui — Spacer
 *
 * Pushes siblings apart: flexGrow 1 (or a fixed width/height when `size` set).
 */
export interface SpacerProps {
  /** Fixed size along the flex main axis (px); omit for flex-grow. */
  size?: number
  vertical?: boolean
}

export function Spacer({ size, vertical = false }: SpacerProps) {
  return (
    <div
      style={
        size !== undefined
          ? vertical
            ? { width: size, flexShrink: 0 }
            : { height: size, flexShrink: 0 }
          : { flexGrow: 1 }
      }
    />
  )
}
