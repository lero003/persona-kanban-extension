import create from 'zustand';
import { Board, Column, Card } from '../lib/db';
import { v4 as uuid } from 'uuid';
import { db } from '../lib/db';

interface State {
  boards: Record<string, Board>;
  columns: Record<string, Column>;
  cards: Record<string, Card>;
  init: () => Promise<void>;
  addCard: (columnId: string, title: string) => void;
}

export const useStore = create<State>((set, get) => ({
  boards: {},
  columns: {},
  cards: {},
  init: async () => {
    const boards = await db.boards.toArray();
    const columns = await db.columns.toArray();
    const cards = await db.cards.toArray();
    set({
      boards: Object.fromEntries(boards.map(b => [b.id, b])),
      columns: Object.fromEntries(columns.map(c => [c.id, c])),
      cards: Object.fromEntries(cards.map(ca => [ca.id, ca]))
    });
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
  }
}));