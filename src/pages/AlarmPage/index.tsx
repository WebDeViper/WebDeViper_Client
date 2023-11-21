import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { deleteAlarm } from '../../store/thunkFunctions';
import { MdClose } from 'react-icons/md';
import Badge from '../../components/common/Badge';

export default function AlarmPage() {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const alarmMessage = useAppSelector(state => state.user.userInfo.alarmMessage);

  const dispatch = useAppDispatch();

  const handleDeleteAlarm = async (id: string) => {
    const data = { _id: id };
    dispatch(deleteAlarm(data));
  };

  useEffect(() => {
    setAlarmList(alarmMessage);
  }, [alarmMessage]);
  return (
    <div className="container">
      {alarmList.length > 0 ? (
        <div className="mt-10">
          {alarmList.map(value => {
            if (value.notification_kind === 'new_notice') {
              return (
                <div key={value._id} className="rounded-md p-3 border-[1px] border-zinc-300 mb-5 bg-indigo-100">
                  <div className="flex justify-between mb-3">
                    <Link
                      to={`/notice/${value.content_id}`}
                      onClick={() => {
                        handleDeleteAlarm(value._id);
                      }}
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
                  <div className="mt-2 flex items-center">
                    <Badge color="blue">보낸 사람</Badge>
                    <span className="ml-3 text-sm">{value.user_id}</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <Badge color="pink">보낸 시간</Badge>
                    <span className="ml-3 text-sm">{moment(value.updated_at).format('YYYY-MM-DD HH:mm')}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div>알림이 없습니다.</div>
      )}
    </div>
  );
}
