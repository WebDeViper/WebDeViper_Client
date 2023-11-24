import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TodoFormValues } from './AddTodoModal';

interface Props {
  label: '시작' | '종료';
  selectedDate: Date;
  handleChange: (date: Date) => void;
  register: UseFormRegister<TodoFormValues>;
  hourName: 'startHour' | 'endHour';
  minuteName: 'startMinute' | 'endMinute';
  errors: FieldErrors<TodoFormValues>;
}

export default function CustomDatePicker({
  label,
  selectedDate,
  handleChange,
  register,
  hourName,
  minuteName,
  errors,
}: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값이 변경될 때 숫자만 남도록 처리
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = inputValue;
  };

  const isWithinMaxValue = (value: string, max: number): boolean => {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue <= max;
  };

  return (
    <div>
      <div className="">
        <div>
          <div className="whitespace-nowrap mb-2">{label}</div>
          <div className="flex items-center justify-between">
            <DatePicker
              className="ring-1 px-2 py-1  sm:w-48 w-32"
              selected={selectedDate}
              onChange={handleChange}
              dateFormat="yyyy.MM.dd"
              locale={ko}
            />
            <div>
              <input
                type="text"
                className="w-16 text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="18"
                {...register(hourName, {
                  validate: {
                    withinMaxValue: value => isWithinMaxValue(value, 23) || '시간의 최대값은 23입니다.',
                  },
                })}
                maxLength={2}
                onInput={handleInputChange}
              />
              <span> : </span>
              <input
                type="text"
                className="w-16 text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="00"
                maxLength={2}
                onInput={handleInputChange}
                {...register(minuteName, {
                  validate: {
                    withinMaxValue: value => isWithinMaxValue(value, 59) || '분의 최대값은 59입니다.',
                  },
                })}
              />
            </div>
          </div>
          {errors[hourName]?.message || errors[minuteName]?.message ? (
            <p className="text-danger text-right">{errors[hourName]?.message || errors[minuteName]?.message}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
