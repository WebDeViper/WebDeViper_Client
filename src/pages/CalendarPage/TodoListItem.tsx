import moment from 'moment';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { FaTrash, FaPen } from 'react-icons/fa';

interface Props {
  item: Todo;
}

export default function TodoListItem({ item }: Props) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const handleToggleUpdateOpen = () => {
    setIsUpdateOpen(prev => !prev);
  };
  return (
    <div key={item.todo_id} className="py-3 relative">
      <div className="flex justify-between items-center">
        <div>
          <div className="mb-1 text-base">
            <span className="text-gray-300">{moment(item.start_time).format('HH:mm')}</span>
            <span className="m-2 text-gray-300">-</span>
            <span className="text-gray-300">{moment(item.end_time).format('HH:mm')}</span>
          </div>
          <div className="text-gray-600">{item.content}</div>
        </div>
        {/* <div className=""> */}
        <button onClick={handleToggleUpdateOpen} className="rounded-full border border-gray-200 w-6 h-6"></button>
        {isUpdateOpen && (
          <>
            <button className="absolute flex justify-center items-center shadow-md -top-3 right-9 text-blue-300 rounded-full shadow-sky-200 w-6 h-6">
              <FaCheck />
            </button>
            <button className="text-xs absolute flex justify-center items-center shadow-md top-0 bottom-0 my-auto right-[4.5rem] text-blue-300 rounded-full shadow-sky-200 w-6 h-6">
              <FaPen />
            </button>
            <button className="text-xs absolute flex justify-center items-center shadow-md -bottom-3 right-9 text-blue-300 rounded-full shadow-sky-200 w-6 h-6">
              <FaTrash />
            </button>
          </>
        )}
        {/* </div> */}
      </div>
    </div>
  );
}
