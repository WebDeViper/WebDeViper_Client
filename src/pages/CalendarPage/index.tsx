import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css';
import TodoList from './TodoList';
import { API } from '../../utils/axios';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

type TodoCalendarTileProps = {
  date: Date;
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodoList = async () => {
      const response = await API.get('/todo_lists');
      const data = await response.data;
      setTodos(data.todos);
    };
    fetchTodoList();
  }, []);

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

  const TodoCalendarTile = ({ date }: TodoCalendarTileProps) => {
    const matchingEvents = filterMatchingEvents(date, todos);

    return (
      <div className="w-full relative flex justify-center">
        {matchingEvents.slice(0, 1).map(event => (
          <p key={event.todo_id}></p>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h2 className="mt-10">일정</h2>
      <div className="calendar">
        <div className="flex shadow-2xl lg:flex-row flex-col">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDetail="year"
            formatDay={(_, date) => moment(date).format('D')}
            className="mx-auto flex-1 relative p-3 z-10"
            tileContent={TodoCalendarTile}
            // showNeighboringMonth={false}
          />
          <TodoList
            selectedDate={selectedDate}
            filteredTodos={filteredTodos}
            // handleAddTodo={handleAddTodo}
          />
        </div>
      </div>
    </div>
  );
}
