import create from 'zustand';
import { db, Board, Column, Card } from '../lib/db';
import { v4 as uuid } from 'uuid';

interface State {
  boards: Record<string, Board>;
  columns: Record<string, Column>;
  cards: Record<string, Card>;
  init: () => Promise<void>;
  reorder: (sourceId: string, destId: string, sourceIdx: number, destIdx: number, type: 'COLUMN' | 'CARD', parentId?: string) => void;
  addCard: (columnId: string, title: string) => void;
  updateCard: (card: Card) => void;
}

export const useStore = create<State>((set, get) => ({
  boards: {},
  columns: {},
  cards: {},
  init: async () => {
    const [boards, columns, cards] = await Promise.all([
      db.boards.toArray(),
      db.columns.toArray(),
      db.cards.toArray()
    ]);
    set({
      boards: Object.fromEntries(boards.map(b => [b.id, b])),
      columns: Object.fromEntries(columns.map(c => [c.id, c])),
      cards: Object.fromEntries(cards.map(ca => [ca.id, ca]))
    });
  },
  reorder: (sourceId, destId, sourceIdx, destIdx, type, parentId) => {
    if (type === 'COLUMN') {
      const board = { ...get().boards[sourceId] };
      const [removed] = board.columnOrder.splice(sourceIdx, 1);
      board.columnOrder.splice(destIdx, 0, removed);
      db.boards.put(board);
      set(state => ({ boards: { ...state.boards, [board.id]: board } }));
    } else {
      const colFrom = { ...get().columns[sourceId] };
      const [removed] = colFrom.cardOrder.splice(sourceIdx, 1);
      if (sourceId !== destId) {
        const colTo = { ...get().columns[destId] };
        colTo.cardOrder.splice(destIdx, 0, removed);
        db.columns.bulkPut([colFrom, colTo]);
        set(state => ({
          columns: {
            ...state.columns,
            [colFrom.id]: colFrom,
            [colTo.id]: colTo
          }
        }));
      } else {
        colFrom.cardOrder.splice(destIdx, 0, removed);
        db.columns.put(colFrom);
        set(state => ({ columns: { ...state.columns, [colFrom.id]: colFrom } }));
      }
    }
  },
  addCard: (columnId, title) => {
    const id = uuid();
    const newCard: Card = {
      id,
      title,
      checklist: [],
      attachments: [],
      createdAt: Date.now()
    };
    db.cards.add(newCard);
    set(state => {
      const column = { ...state.columns[columnId] };
      column.cardOrder = [...column.cardOrder, id];
      db.columns.put(column);
      return {
        cards: { ...state.cards, [id]: newCard },
        columns: { ...state.columns, [columnId]: column }
      };
    });
  },
  updateCard: card => {
    db.cards.put(card);
    set(state => ({ cards: { ...state.cards, [card.id]: card } }));
    if (card.due) {
      chrome.alarms.create(card.id, { when: card.due });
    }
  }
}));