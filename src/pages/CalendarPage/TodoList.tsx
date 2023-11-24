import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai';
import { Value } from './index';
import TodoListItem from './TodoListItem';

interface Props {
  selectedDate: Value;
  filteredTodos: Todo[];
  handleAddTodo: () => void;
}

export type TodoSelectedMenu = {
  id: string;
  isOpen: boolean;
};

export default function TodoList({ selectedDate, filteredTodos, handleAddTodo }: Props) {
  const [selectedMenu, setSelectedMenu] = useState<TodoSelectedMenu | null>(null);

  const handleMenuOpen = (id: string) => {
    if (!selectedMenu) {
      setSelectedMenu({ id, isOpen: true });
    } else if (selectedMenu.id === id) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu({ id, isOpen: true });
    }
  };

  useEffect(() => {
    setSelectedMenu(null);
  }, [selectedDate]);

  return (
    <div className="py-20 px-8 bg-white relative lg:w-96 w-full">
      <button
        onClick={handleAddTodo}
        className="rounded-full bg-lime-400 p-2.5 text-xl absolute top-6 hover:rotate-180 transition right-7"
      >
        <AiOutlinePlus />
      </button>
      <div className="mb-6 font-semibold">
        <span>{moment(selectedDate as Date).format('yyyy년 MM월 DD일')}</span>
      </div>
      <div>
        {filteredTodos.length ? (
          filteredTodos.map((item, index) => (
            <TodoListItem key={item.todo_id} item={item} selectedMenu={selectedMenu} handleMenuOpen={handleMenuOpen} />
          ))
        ) : (
          <p className="text-slate-400">일정이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
