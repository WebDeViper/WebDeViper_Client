import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

interface Props {
  label: '시작' | '종료';
  selectedDate: Date;
  handleChange: (date: Date) => void;
}

export default function CustomDatePicker({ label, selectedDate, handleChange }: Props) {
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
              />
              <span> : </span>
              <input
                type="text"
                className="w-16 text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="00"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
