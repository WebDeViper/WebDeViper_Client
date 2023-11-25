import React, { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';
import CustomDatePicker from './DatePicker';
import { TodoSelectedDateValue } from './index';
import { Button } from '../../components/common/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import moment from 'moment';
import { API } from '../../utils/axios';

interface Props {
  show: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: TodoSelectedDateValue;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  updateTodos: Todo | null;
}

export type TodoFormValues = {
  yourDetails: {
    title: string;
    startHour: string;
    startMinute: string;
    endHour: string;
    endMinute: string;
    content: string;
  };
};

const defaultValues = {
  yourDetails: {
    title: '',
    startHour: '18',
    startMinute: '00',
    endHour: '18',
    endMinute: '00',
    content: '',
  },
};

export default function AddTodoModal({ show, selectedDate, setTodos, setOpenModal, updateTodos }: Props) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ defaultValues });

  useEffect(() => {
    if (updateTodos) {
      setValue('yourDetails', {
        title: updateTodos.title,
        content: updateTodos.content,
        startHour: '18',
        startMinute: '00',
        endHour: '18',
        endMinute: '00',
      });
    } else {
      setValue('yourDetails', {
        ...defaultValues.yourDetails,
      });
    }
  }, [updateTodos, setValue]);

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

  const handleCancel = () => {
    setOpenModal(false);
    reset();
  };
  const onSubmit: SubmitHandler<TodoFormValues> = async data => {
    const ERR_MESSAGE = '시작 시간이 종료 시간보다 빨라야 합니다.';
    const startHour = Number(data.yourDetails.startHour);
    const endHour = Number(data.yourDetails.endHour);
    const startMinute = Number(data.yourDetails.startMinute);
    const endMinute = Number(data.yourDetails.endMinute);

    if (startDate === endDate) {
      if (startHour > endHour) return toast.info(ERR_MESSAGE, { type: toast.TYPE.ERROR });
      if (startHour === endHour) {
        if (startMinute > endMinute) return toast.error(ERR_MESSAGE);
      }
    }

    try {
      const momentStartDate = moment(startDate).format('yyyy, MM, DD');
      const momentEndDate = moment(endDate).format('yyyy, MM, DD');

      const newStateDate = new Date(momentStartDate);
      newStateDate.setHours(startHour);
      newStateDate.setMinutes(startMinute);

      const newEndDate = new Date(momentEndDate);
      newEndDate.setHours(endHour);
      newEndDate.setMinutes(endMinute);

      const body = {
        title: data.yourDetails.title,
        content: data.yourDetails.content,
        start_time: newStateDate,
        end_time: newEndDate,
      };
      if (updateTodos === null) {
        const response = await API.post('/todo_list', body);
        const newData = response.data.result;
        setTodos(prev => [...prev, newData]);
      } else {
        const response = await API.patch(`/todo_lists/${updateTodos.todo_id}`, body);
        const newData = response.data.updatedResult;

        setTodos(prev => {
          return prev.map(todo => {
            if (todo.todo_id === updateTodos.todo_id) {
              return newData;
            }
            return todo;
          });
        });
      }
      reset();
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal show={show} onClose={setOpenModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register('yourDetails.title', {
                  required: '제목을 입력하세요.',
                })}
              />
            </div>
            {errors?.yourDetails?.title && <p className="text-danger">{errors.yourDetails?.title.message}</p>}
          </div>
          <CustomDatePicker
            label="시작"
            selectedDate={startDate}
            handleChange={handleStartDateChange}
            register={register}
            hourName="startHour"
            minuteName="startMinute"
            errors={errors}
          />
          <CustomDatePicker
            label="종료"
            selectedDate={endDate}
            handleChange={handleEndDateChange}
            register={register}
            hourName="endHour"
            minuteName="endMinute"
            errors={errors}
          />
          <div>
            <label htmlFor="content" className="block font-medium leading-6 text-gray-900">
              내용
            </label>
            <div className="mt-2">
              <textarea
                id="content"
                rows={5}
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                {...register('yourDetails.content')}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit">확인</Button>
            <Button color="white" type="button" onClick={handleCancel}>
              취소
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
