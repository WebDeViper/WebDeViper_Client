import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleDeleteAlarm = async (id: string) => {
    const data = { _id: id };
    dispatch(deleteAlarm(data));
  };

  const handleGotoAlarmPage = () => {
    navigate('/alarm');
    setIsOpen(false);
  };

  const renderNotification = (value: Alarm) => {
    switch (value.notification_kind) {
      // 공지사항에 대한 알람 메세지
      case 'new_notice':
        return (
          <div key={value._id} className="rounded-md p-2 border-[1px] border-zinc-300 bg-indigo-100">
            <div className="flex justify-between items-center">
              <Link
                to={`/notice/${value.content_id}`}
                onClick={() => {
                  handleDeleteAlarm(value._id);
                  setIsOpen(false);
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
      // 그룹 요청에 대한 알람 메세지
      case 'group_request':
        return (
          <div key={value._id} className="rounded-md p-2 border-[1px] border-zinc-300 bg-rose-100">
            <div className="flex justify-between items-center">
              <Link
                to={`/profile`}
                onClick={() => {
                  handleDeleteAlarm(value._id);
                  setIsOpen(false);
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
      // 그룹 요청에 대한 알람 메세지
      case 'group_approve':
        return (
          <div key={value._id} className="rounded-md p-2 border-[1px] border-zinc-300 bg-rose-100">
            <div className="flex justify-between items-center">
              <Link
                to={`/profile`}
                onClick={() => {
                  handleDeleteAlarm(value._id);
                  setIsOpen(false);
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
          <div className="px-2 py-2 w-72 max-h-80 overflow-y-auto">
            <div className="mt-4 flex flex-col gap-2">{alarmMessage.map(value => renderNotification(value))}</div>
          </div>
          <div className="py-1 text-center">
            <button onClick={handleGotoAlarmPage} className="text-sm text-blue-400 font-semibold">
              더 보기
            </button>
          </div>
        </Overlay>
      )}
    </>
  );
}
