import React, { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';
import CustomDatePicker from './DatePicker';
import { TodoSelectedDateValue } from './index';
import { Button } from '../../components/common/Button';

interface Props {
  show: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: TodoSelectedDateValue;
}

export default function AddTodoModal({ show, selectedDate, onClose }: Props) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    setStartDate(selectedDate as Date);
    setEndDate(selectedDate as Date);
  }, [selectedDate]);

  const handleStartDateChange = (date: Date) => {
    if (endDate && date > endDate) {
      setEndDate(date);
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    if (startDate && date < startDate) {
      setStartDate(date);
    }
    setEndDate(date);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="space-y-6 sm:w-96 w-80">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">일정</h3>
        <div>
          <label htmlFor="title" className="block font-medium leading-6 text-gray-900">
            제목
          </label>
          <div className="mt-2">
            <input
              id="title"
              type="title"
              autoComplete="title"
              required
              className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <CustomDatePicker label="시작" selectedDate={startDate} handleChange={handleStartDateChange} />
        <CustomDatePicker label="종료" selectedDate={endDate} handleChange={handleEndDateChange} />
        <div className="col-span-full">
          <label htmlFor="content" className="block font-medium leading-6 text-gray-900">
            내용
          </label>
          <div className="mt-2">
            <textarea
              id="content"
              rows={5}
              className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button>확인</Button>
          <Button color="white">취소</Button>
        </div>
      </div>
    </Modal>
  );
}
