import React from 'react';
import { useStore } from '../hooks/useStore';
import { useForm, useFieldArray } from 'react-hook-form';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

interface Props { cardId: string; onClose: () => void; }
interface FormValues {
  title: string;
  checklist: { id: string; text: string; done: boolean }[];
  due?: string;
}

const CardModal: React.FC<Props> = ({ cardId, onClose }) => {
  const card = useStore(s => s.cards[cardId]);
  const updateCard = useStore(s => s.updateCard);
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: card.title,
      checklist: card.checklist,
      due: card.due ? format(card.due, 'yyyy-MM-dd') : undefined
    }
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'checklist' });

  const onSubmit = (data: FormValues) => {
    const updated = {
      ...card,
      title: data.title,
      checklist: data.checklist,
      due: data.due ? new Date(data.due).getTime() : undefined
    };
    updateCard(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-personaWhite p-6 rounded-2xl w-96">
        <h2 className="text-xl font-bold mb-4">カード編集</h2>
        <label className="block mb-2 text-sm font-semibold">タイトル</label>
        <input {...register('title')} className="w-full p-2 rounded border mb-4" />

        <label className="block mb-2 text-sm font-semibold">期限</label>
        <input type="date" {...register('due')} className="w-full p-2 rounded border mb-4" />

        <label className="block mb-2 text-sm font-semibold">チェックリスト</label>
        <div className="mb-2">
          {fields.map((item, idx) => (
            <div key={item.id} className="flex items-center mb-1 gap-2">
              <input type="checkbox" {...register(`checklist.${idx}.done` as const)} />
              <input
                {...register(`checklist.${idx}.text` as const)}
                className="flex-1 p-1 border rounded"
              />
              <button type="button" onClick={() => remove(idx)} className="text-red-600">✕</button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => append({ id: uuid(), text: '', done: false })}
          className="bg-personaBlue px-2 py-1 rounded text-white text-sm mb-4"
        >項目追加</button>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300">キャンセル</button>
          <button type="submit" className="px-4 py-2 rounded bg-personaRed text-white">保存</button>
        </div>
      </form>
    </div>
  );
};

export default CardModal;