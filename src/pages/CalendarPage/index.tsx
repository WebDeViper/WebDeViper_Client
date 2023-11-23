import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css';
import TodoList from './TodoList';
import { API } from '../../utils/axios';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Todo = {
  _id: string;
  user_id: string;
  title: string;
  content: string;
  start_time: Date;
  end_time: Date;
  done: 'y' | 'n';
};

type TodoCalendarTileProps = {
  date: Date;
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [todos, setTodos] = useState<Todo[]>([]);

  console.log(todos);
  useEffect(() => {
    const fetchTodoList = async () => {
      const response = await API.get('/todo_lists');
      const data = await response.data;
      setTodos(data.todos);
    };
    fetchTodoList();
  }, []);

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
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          minDetail="year"
          formatDay={(_, date) => moment(date).format('D')}
          className="mx-auto flex-1 relative p-3 z-10"
          tileContent={TodoCalendarTile}
          // showNeighboringMonth={false}
        />
        {/* <TodoList
          selectedDate={selectedDate}
          filteredTodos={filteredTodos}
          handleUpdateTodo={handleUpdateTodo}
          handleAddTodo={handleAddTodo}
        /> */}
      </div>
    </div>
  );
}
