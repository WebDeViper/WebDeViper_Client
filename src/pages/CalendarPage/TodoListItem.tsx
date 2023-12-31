import moment from 'moment';
import { FaCheck } from 'react-icons/fa6';
import { FaTrash, FaPen, FaBars, FaTimes } from 'react-icons/fa';
import { TodoSelectedMenu } from './TodoList';
import { API } from '../../utils/axios';
// import { RxHamburgerMenu } from 'react-icons/rx';

interface Props {
  item: Todo;
  selectedMenu: TodoSelectedMenu | null;
  setSelectedMenu: React.Dispatch<React.SetStateAction<TodoSelectedMenu | null>>;
  handleMenuOpen: (id: string) => void;
  handleModalOpen: () => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setUpdateTodos: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export default function TodoListItem({
  selectedMenu,
  item,
  handleMenuOpen,
  setTodos,
  setUpdateTodos,
  handleModalOpen,
  setSelectedMenu,
}: Props) {
  const handleDeleteTodo = async (id: string) => {
    try {
      await API.delete(`/todo_list/${id}`);
      setTodos(prev => {
        // 이전 상태를 기반으로 새로운 배열 생성
        const updatedTodos = prev.filter(todo => todo.todo_id !== id);
        return updatedTodos;
      });
      hadleMenuClose();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateTodo = async (item: Todo) => {
    setUpdateTodos(item);
    handleModalOpen();
    hadleMenuClose();
  };
  const handleToggleTodoCompletion = async (item: Todo) => {
    const body = {
      ...item,
      done: item.done === 'y' ? 'n' : 'y',
    };

    try {
      await API.patch(`/todo_lists/${item.todo_id}`, body);
      setTodos(prev => {
        return prev.map(todo => {
          if (todo.todo_id === item.todo_id) {
            return { ...todo, done: item.done === 'y' ? 'n' : 'y' };
          }
          return todo;
        });
      });
      hadleMenuClose();
    } catch (err) {
      console.log(err);
    }
  };
  const hadleMenuClose = () => {
    setSelectedMenu(null);
  };
  return (
    <div className="py-3 px-2 relative rounded-md shadow-md shadow-cyan-200">
      <div className="flex justify-between items-center">
        <div>
          <div className="mb-1 text-base">
            <span className="text-gray-300">{moment(item.start_time).format('HH:mm')}</span>
            <span className="m-2 text-gray-300">~</span>
            <span className="text-gray-300">{moment(item.end_time).format('HH:mm')}</span>
          </div>
          <div className={`truncate w-48 ${item.done === 'n' ? 'text-gray-600' : 'line-through text-gray-300'}`}>
            {item.title}
          </div>
        </div>
        <button
          onClick={() => handleMenuOpen(item.todo_id)}
          className="rounded-full flex justify-center items-center shadow-md w-6 h-6 text-blue-300 text-sm"
        >
          {selectedMenu && selectedMenu.id === item.todo_id && selectedMenu.isOpen ? <FaTimes /> : <FaBars />}
        </button>
        {selectedMenu && selectedMenu.id === item.todo_id && (
          <>
            <button
              onClick={() => handleToggleTodoCompletion(item)}
              className="bg-white absolute flex justify-center items-center shadow-md -top-3 right-9 text-blue-300 rounded-full shadow-sky-200 w-6 h-6"
            >
              <FaCheck />
            </button>
            <button
              onClick={() => handleUpdateTodo(item)}
              className="bg-white text-xs absolute flex justify-center items-center shadow-md top-0 bottom-0 my-auto right-[4.5rem] text-blue-300 rounded-full shadow-sky-200 w-6 h-6"
            >
              <FaPen />
            </button>
            <button
              onClick={() => handleDeleteTodo(item.todo_id)}
              className="bg-white text-xs absolute flex justify-center items-center shadow-md -bottom-3 right-9 text-blue-300 rounded-full shadow-sky-200 w-6 h-6"
            >
              <FaTrash />
            </button>
          </>
        )}
        {/* </div> */}
      </div>
    </div>
  );
}
