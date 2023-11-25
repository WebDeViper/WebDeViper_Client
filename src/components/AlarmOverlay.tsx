import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import Overlay from './common/Overlay';
import { deleteAlarm } from '../store/thunkFunctions';
import { MdClose } from 'react-icons/md';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AlarmOverlay({ isOpen, setIsOpen }: Props) {
  const alarmMessage = useAppSelector(state => state.user.userInfo.alarmMessage);
  const dispatch = useAppDispatch();

  // console.log(alarmMessage);

  const handleDeleteAlarm = async (id: string) => {
    const data = { _id: id };
    dispatch(deleteAlarm(data));
  };

  const renderNotification = (value: Alarm) => {
    switch (value.notification_kind) {
      case 'new_notice':
        return (
          <div key={value._id} className="rounded-md p-2 border-[1px] border-zinc-300 bg-indigo-100">
            <div className="flex justify-between items-center">
              <Link
                to={`/notice/${value.content_id}`}
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
                className="truncate block w-52 text-sm"
              >
                <span className="text-gray-700 font-medium">{value.content}</span>
              </Link>
              <button
                className="flex justify-center items-center w-6 h-6 text-gray-400"
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
              >
                <MdClose />
              </button>
            </div>
          </div>
        );
      case 'group_request':
        return (
          <div key={value._id} className="rounded-md p-2 border-[1px] border-zinc-300 bg-rose-100">
            <div className="flex justify-between mb-3">
              <Link
                to={`/profile`}
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
                className="truncate block w-52 text-sm"
              >
                <span className="text-gray-700 font-medium">{value.content}</span>
              </Link>
              <button
                className="flex justify-center items-center w-6 h-6 text-gray-400"
                onClick={() => {
                  handleDeleteAlarm(value._id);
                }}
              >
                <MdClose />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {alarmMessage && alarmMessage.length > 0 && (
        <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="px-2 py-2 w-72 max-h-96 overflow-y-auto">
            <div className="mt-10 flex flex-col gap-2">{alarmMessage.map(value => renderNotification(value))}</div>
          </div>
        </Overlay>
      )}
    </>
  );
}
