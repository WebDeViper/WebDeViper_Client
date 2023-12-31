import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css';
import TodoList from './TodoList';
import { API } from '../../utils/axios';
import { useAppSelector } from '../../store/store';
import AddTodoModal from './AddTodoModal';

type ValuePiece = Date | null;
export type TodoSelectedDateValue = ValuePiece | [ValuePiece, ValuePiece];

type TodoCalendarTileProps = {
  date: Date;
};

export default function CalendarPage() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const [selectedDate, setSelectedDate] = useState<TodoSelectedDateValue>(new Date());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [updateTodos, setUpdateTodos] = useState<Todo | null>(null);

  useEffect(() => {
    if (isAuth) {
      const fetchTodoList = async () => {
        const response = await API.get('/todo_lists');
        const data = await response.data;
        setTodos(data.todos);
      };
      fetchTodoList();
    } else {
      setTodos([]);
    }
  }, [isAuth]);

  useEffect(() => {
    const selectedTodos = [...todos].filter(date => {
      const formattedDate = getFormattedDate(selectedDate as Date);
      const eventStartDate = getFormattedDate(date.start_time);
      const eventEndDate = getFormattedDate(date.end_time);
      return formattedDate >= eventStartDate && formattedDate <= eventEndDate;
    });
    setFilteredTodos(selectedTodos);
  }, [selectedDate, todos]);

  const getFormattedDate = (date: Date) => moment(date).format('YYYY-MM-DD');

  const filterMatchingEvents = (date: Date, todos: Todo[]) => {
    const formattedDate = getFormattedDate(date);

    return todos.filter(event => {
      const eventStartDate = getFormattedDate(event.start_time);
      const eventEndDate = getFormattedDate(event.end_time);
      return formattedDate >= eventStartDate && formattedDate <= eventEndDate;
    });
  };

  const todoCalendarTile = ({ date }: TodoCalendarTileProps) => {
    const matchingEvents = filterMatchingEvents(date, todos);

    return (
      <div className="w-full relative flex justify-center">
        {matchingEvents.slice(0, 1).map(event => (
          <p key={event.todo_id}></p>
        ))}
      </div>
    );
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  return (
    <div className="container">
      <h2>일정</h2>
      <div className="calendar">
        <div className="flex shadow-2xl lg:flex-row flex-col">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDetail="year"
            formatDay={(_, date) => moment(date).format('D')}
            className="mx-auto flex-1 relative p-3 z-10"
            tileContent={todoCalendarTile}
            // showNeighboringMonth={false}
          />
          <TodoList
            selectedDate={selectedDate}
            filteredTodos={filteredTodos}
            handleModalOpen={handleModalOpen}
            setTodos={setTodos}
            setUpdateTodos={setUpdateTodos}
          />
        </div>
        <AddTodoModal
          show={openModal}
          updateTodos={updateTodos}
          setOpenModal={setOpenModal}
          selectedDate={selectedDate}
          setTodos={setTodos}
        />
      </div>
    </div>
  );
}
