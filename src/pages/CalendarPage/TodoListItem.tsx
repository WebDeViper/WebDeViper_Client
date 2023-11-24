import moment from 'moment';
import { FaCheck } from 'react-icons/fa6';
import { FaTrash, FaPen, FaBars, FaTimes } from 'react-icons/fa';
import { TodoSelectedMenu } from './TodoList';
// import { RxHamburgerMenu } from 'react-icons/rx';

interface Props {
  item: Todo;
  selectedMenu: TodoSelectedMenu | null;
  handleMenuOpen: (id: string) => void;
}

export default function TodoListItem({ selectedMenu, item, handleMenuOpen }: Props) {
  return (
    <div className="py-3 px-2 relative rounded-md shadow-md shadow-cyan-200">
      <div className="flex justify-between items-center">
        <div>
          <div className="mb-1 text-base">
            <span className="text-gray-300">{moment(item.start_time).format('HH:mm')}</span>
            <span className="m-2 text-gray-300">~</span>
            <span className="text-gray-300">{moment(item.end_time).format('HH:mm')}</span>
          </div>
          <div className="text-gray-600 truncate w-48">{item.title}</div>
        </div>
        <button
          onClick={() => handleMenuOpen(item.todo_id)}
          className="rounded-full flex justify-center items-center shadow-md w-6 h-6 text-blue-300 text-sm"
        >
          {selectedMenu && selectedMenu.id === item.todo_id && selectedMenu.isOpen ? <FaTimes /> : <FaBars />}
        </button>
        {selectedMenu && selectedMenu.id === item.todo_id && (
          <>
            <button className="bg-white absolute flex justify-center items-center shadow-md -top-3 right-9 text-blue-300 rounded-full shadow-sky-200 w-6 h-6">
              <FaCheck />
            </button>
            <button className="bg-white text-xs absolute flex justify-center items-center shadow-md top-0 bottom-0 my-auto right-[4.5rem] text-blue-300 rounded-full shadow-sky-200 w-6 h-6">
              <FaPen />
            </button>
            <button className="bg-white text-xs absolute flex justify-center items-center shadow-md -bottom-3 right-9 text-blue-300 rounded-full shadow-sky-200 w-6 h-6">
              <FaTrash />
            </button>
          </>
        )}
        {/* </div> */}
      </div>
    </div>
  );
}
