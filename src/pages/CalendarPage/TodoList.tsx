import React, { useState } from 'react';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai';
import { Value } from './index';

interface Props {
  selectedDate: Value;
  filteredTodos: Todo[];
  handleAddTodo: () => void;
}

export default function TodoList({ selectedDate, filteredTodos, handleAddTodo }: Props) {
  return (
    <div className="py-20 px-10 bg-white relative lg:w-96 md:w-72 w-full">
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
          filteredTodos.map((item, index) => <div key={item.todo_id}>{item.content}</div>)
        ) : (
          <p className="text-slate-400">일정이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
