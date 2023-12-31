import { useEffect, useState } from 'react';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai';
import { TodoSelectedDateValue } from './index';
import TodoListItem from './TodoListItem';
import { useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';

interface Props {
  selectedDate: TodoSelectedDateValue;
  filteredTodos: Todo[];
  handleModalOpen: () => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setUpdateTodos: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export type TodoSelectedMenu = {
  id: string;
  isOpen: boolean;
};

export default function TodoList({ selectedDate, filteredTodos, handleModalOpen, setTodos, setUpdateTodos }: Props) {
  const [selectedMenu, setSelectedMenu] = useState<TodoSelectedMenu | null>(null);
  const isAuth = useAppSelector(state => state.user.isAuth);

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

  const handleAddTodo = () => {
    if (isAuth) {
      handleModalOpen();
      setUpdateTodos(null);
    } else {
      toast.info('로그인 후 이용해주세요.', { type: 'error' });
    }
  };

  return (
    <div className="pt-20 pb-16 bg-white relative lg:w-96 w-full">
      <button
        onClick={handleAddTodo}
        className="rounded-full bg-lime-400 p-2.5 text-xl absolute top-6 hover:rotate-180 transition right-7"
      >
        <AiOutlinePlus />
      </button>
      <div className="mb-3 font-semibold px-8">
        <span>{moment(selectedDate as Date).format('yyyy년 MM월 DD일')}</span>
      </div>
      <div className="overflow-y-auto md:h-[32rem] h-96 px-8 py-4 flex flex-col gap-5">
        {filteredTodos.length ? (
          filteredTodos.map(item => (
            <TodoListItem
              key={item.todo_id}
              item={item}
              selectedMenu={selectedMenu}
              handleMenuOpen={handleMenuOpen}
              setTodos={setTodos}
              setUpdateTodos={setUpdateTodos}
              handleModalOpen={handleModalOpen}
              setSelectedMenu={setSelectedMenu}
            />
          ))
        ) : (
          <p className="text-slate-400">일정이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
