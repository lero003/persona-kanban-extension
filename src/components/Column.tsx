import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Card from './Card';
import { useStore } from '../hooks/useStore';

interface Props {
  id: string;
  title: string;
}

const Column: React.FC<Props> = ({ id, title }) => {
  const column = useStore(s => s.columns[id]);
  const cards = useStore(s => s.cards);

  return (
    <div className="w-80 bg-personaBlack/80 rounded-2xl p-4 mx-2">
      <h2 className="text-lg font-bold text-personaYellow mb-4">{title}</h2>
      <Droppable droppableId={id} type="CARD">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[10rem]">
            {column.cardOrder.map((cardId, index) => (
              <Card id={cardId} key={cardId} index={index} title={cards[cardId]?.title ?? ''} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;