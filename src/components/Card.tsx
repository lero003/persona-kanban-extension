import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import clsx from 'clsx';
import CardModal from './CardModal';

interface Props {
  id: string;
  index: number;
  title: string;
}

const Card: React.FC<Props> = ({ id, index, title }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={clsx(
              'rounded-xl p-3 mb-2 shadow-lg font-persona text-personaWhite cursor-pointer',
              'bg-gradient-to-r from-personaRed via-personaYellow to-personaBlue'
            )}
            onClick={() => setOpen(true)}
          >
            <div className="flex items-center">
              <GripVertical className="mr-2 opacity-60" size={16} />
              <span>{title}</span>
            </div>
          </div>
        )}
      </Draggable>
      {open && <CardModal cardId={id} onClose={() => setOpen(false)} />}
    </>
  );
};

export default Card;