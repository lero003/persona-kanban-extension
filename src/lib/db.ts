import Dexie, { Table } from 'dexie';

export interface Attachment {
  id: string;
  name: string;
  mime: string;
  size: number;
  blob: Blob;
  createdAt: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  checklist: ChecklistItem[];
  attachments: string[];
  due?: number;
  createdAt: number;
}

export interface Column {
  id: string;
  title: string;
  cardOrder: string[];
}

export interface Board {
  id: string;
  title: string;
  columnOrder: string[];
}

class PersonaDB extends Dexie {
  attachments!: Table<Attachment, string>;
  cards!: Table<Card, string>;
  columns!: Table<Column, string>;
  boards!: Table<Board, string>;

  constructor() {
    super('persona-kanban');
    this.version(2).stores({
      attachments: 'id',
      cards: 'id',
      columns: 'id',
      boards: 'id'
    });
  }
}

export const db = new PersonaDB();