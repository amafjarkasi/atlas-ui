/** @atlas/ui — SelectAndAsk — act on a selection, then continue in a chat. */
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SelectionToPrompt text={selectedText} onAction={onAction} />
      <div style={{ height: 360, borderTopWidth: 1, borderColor: '#242428', paddingTop: 8 }}>
        <ChatThread title="Follow-up" messages={messages} onSend={onSend} loading={streaming} />
      </div>
    </div>
  )
}
