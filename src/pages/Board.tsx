import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from '../components/Column';
import { useStore } from '../hooks/useStore';

const Board: React.FC = () => {
  const init = useStore(s => s.init);
  const board = useStore(s => {
    const ids = Object.keys(s.boards);
    return ids.length ? s.boards[ids[0]] : undefined;
  });

  useEffect(() => {
    init();
  }, []);

  const onDragEnd = (result: DropResult) => {
    // TODO: handle reordering logic
    console.log(result);
  };

  if (!board) return <p className="text-personaWhite">Loading…</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex items-start p-4 overflow-x-auto">
        {board.columnOrder.map(colId => (
          <Column
            id={colId}
            key={colId}
            title={useStore.getState().columns[colId].title}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;