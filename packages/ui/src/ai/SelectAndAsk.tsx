/** @atlas/ui — SelectAndAsk — act on a selection, then continue in a chat. */
import { border } from '../tokens'
import { SelectionToPrompt } from './SelectionToPrompt'
import { ChatThread, type ChatThreadMessage } from './ChatThread'

export interface SelectAndAskProps {
  selectedText: string
  messages: ChatThreadMessage[]
  onSend: (text: string) => void
  onAction?: (action: string, text: string) => void
  streaming?: boolean
}

export function SelectAndAsk({ selectedText, messages, onSend, onAction, streaming = false }: SelectAndAskProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <SelectionToPrompt text={selectedText} onAction={onAction} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: border.subtle,
          overflow: 'hidden',
        }}
      >
        <ChatThread title="Follow-up" messages={messages} onSend={onSend} loading={streaming} fitContent />
      </div>
    </div>
  )
}
