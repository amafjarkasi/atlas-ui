/**
 * @atlas/ui — ToolPermissionPrompt
 *
 * An inline confirm when an agent wants to run a tool (composes `ToolCallCard`
 * + allow/deny).
 */
import { text as textTokens } from '../tokens'
import { FONT } from '../tokens'
import { ToolCallCard } from './ToolCallCard'
import { Button } from '../atoms/Button'

export interface ToolPermissionPromptProps {
  toolName: string
  args?: string
  reason?: string
  onAllow?: () => void
  onDeny?: () => void
}

export function ToolPermissionPrompt({ toolName, args, reason, onAllow, onDeny }: ToolPermissionPromptProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderWidth: 1, borderColor: '#3B82F655', borderRadius: 10, padding: 10 }}>
      <text style={{ fontSize: 12, fontWeight: 600, color: textTokens.primary, fontFamily: FONT }}>The agent wants to run a tool</text>
      {reason ? <text style={{ fontSize: 11.5, color: textTokens.muted, fontFamily: FONT }}>{reason}</text> : null}
      <ToolCallCard name={toolName} args={args} />
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
        {onDeny ? <Button size="sm" variant="ghost" onClick={onDeny}>Deny</Button> : null}
        {onAllow ? <Button size="sm" onClick={onAllow}>Allow</Button> : null}
      </div>
    </div>
  )
}
