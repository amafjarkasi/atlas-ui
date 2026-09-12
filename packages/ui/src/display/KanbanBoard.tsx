/**
 * @atlas/ui — KanbanBoard
 *
 * A kanban board with pointer drag-and-drop between columns. Drag math is
 * delta-based (no element-bounds API is needed): the card's pointer-down is the
 * origin, and the target column is `round(origin + deltaX / (columnWidth + gap))`.
 * The dragged card dims and the target column highlights; release moves the card.
 * Chevrons remain as a keyboard/accessibility fallback.
 *
 * @example
 *   <KanbanBoard columns={cols} onMoveCard={move} onAddCard={add} />
 */
import { useRef, useState } from 'react'
import { surface, border, text, semantic } from '../tokens'
import { FONT } from '../tokens'
import { Icon } from '../atoms/Icon'

export interface KanbanCard {
  id: string
  title: string
  tag?: string
  tagColor?: string
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

export interface KanbanBoardProps {
  columns: KanbanColumn[]
  onMoveCard?: (cardId: string, fromColumnId: string, toColumnId: string) => void
  onAddCard?: (columnId: string) => void
  columnWidth?: number
  /** Gap between columns (must match the visual layout). */
  columnGap?: number
}

const DEFAULT_COLUMN_GAP = 12

export function KanbanBoard({
  columns,
  onMoveCard,
  onAddCard,
  columnWidth = 240,
  columnGap = DEFAULT_COLUMN_GAP,
}: KanbanBoardProps) {
  const drag = useRef<{ cardId: string; fromCol: number; startX: number } | null>(null)
  const [dragCardId, setDragCardId] = useState<string | null>(null)
  const [targetCol, setTargetCol] = useState<number | null>(null)

  const handleMove = (e: { x?: number; y?: number }) => {
    if (!drag.current) return
    const deltaX = (e.x ?? 0) - drag.current.startX
    const col = Math.max(0, Math.min(columns.length - 1, Math.round(drag.current.fromCol + deltaX / (columnWidth + columnGap))))
    setTargetCol(col)
  }

  const endDrag = () => {
    const d = drag.current
    if (d && targetCol !== null && targetCol !== d.fromCol && columns[d.fromCol] && columns[targetCol]) {
      onMoveCard?.(d.cardId, columns[d.fromCol].id, columns[targetCol].id)
    }
    drag.current = null
    setDragCardId(null)
    setTargetCol(null)
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseUp={endDrag}
      style={{ display: 'flex', flexDirection: 'row', gap: columnGap, alignItems: 'stretch', overflowX: 'scroll' }}
    >
      {columns.map((col, ci) => {
        const isTarget = dragCardId !== null && targetCol === ci && ci !== drag.current?.fromCol
        return (
          <div
            key={col.id}
            style={{
              width: columnWidth,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              backgroundColor: surface.card,
              borderWidth: isTarget ? 2 : 1,
              borderColor: isTarget ? semantic.accent : border.subtle,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <text style={{ fontSize: 12.5, fontWeight: 600, color: text.primary, fontFamily: FONT }}>{col.title}</text>
              <div
                onClick={() => onAddCard?.(col.id)}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  hover: { backgroundColor: '#FFFFFF14' },
                }}
              >
                <Icon name="plus" size={12} color={text.muted} />
              </div>
            </div>

            {col.cards.map((card) => {
              const isDragging = dragCardId === card.id
              return (
                <div
                  key={card.id}
                  onMouseDown={(e) => {
                    drag.current = { cardId: card.id, fromCol: ci, startX: e.x ?? 0 }
                    setDragCardId(card.id)
                    setTargetCol(ci)
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    backgroundColor: surface.raised,
                    borderWidth: 1,
                    borderColor: isDragging ? semantic.accent : border.subtle,
                    borderRadius: 8,
                    padding: 10,
                    cursor: 'grab',
                    opacity: isDragging ? 0.55 : 1,
                  }}
                >
                  <text style={{ fontSize: 12.5, color: text.primary, fontFamily: FONT }}>{card.title}</text>

                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {card.tag ? (
                      <div
                        style={{
                          paddingLeft: 6,
                          paddingRight: 6,
                          paddingTop: 2,
                          paddingBottom: 2,
                          borderRadius: 8,
                          backgroundColor: (card.tagColor ?? semantic.accent) + '22',
                        }}
                      >
                        <text style={{ fontSize: 10, color: card.tagColor ?? semantic.accent, fontFamily: FONT }}>{card.tag}</text>
                      </div>
                    ) : (
                      <div />
                    )}

                    <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                      {ci > 0 ? (
                        <div
                          onClick={() => onMoveCard?.(card.id, col.id, columns[ci - 1].id)}
                          style={{ cursor: 'pointer', padding: 3, borderRadius: 4, hover: { backgroundColor: '#FFFFFF14' } }}
                        >
                          <Icon name="chevronLeft" size={12} color={text.muted} />
                        </div>
                      ) : null}
                      {ci < columns.length - 1 ? (
                        <div
                          onClick={() => onMoveCard?.(card.id, col.id, columns[ci + 1].id)}
                          style={{ cursor: 'pointer', padding: 3, borderRadius: 4, hover: { backgroundColor: '#FFFFFF14' } }}
                        >
                          <Icon name="chevronRight" size={12} color={text.muted} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
