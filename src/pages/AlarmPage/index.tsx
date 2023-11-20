import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function AlarmPage() {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const alarmMessage = useAppSelector(state => state.user.userInfo.alarmMessage);

  useEffect(() => {
    setAlarmList(alarmMessage);
  }, [alarmMessage]);
  return (
    <div className="container">
      {alarmList.map(value => {
        if (value.notification_kind === 'new_notice') {
          return (
            <div key={value._id}>
              <Link to={`/notice/${value.content_id}`}>
                <div className="flex gap-4">
                  <span>{value.content}</span>
                  <span>보낸 사람 : {value.user_id === 'admin' ? '관리자' : value.user_id}</span>
                  <span>날짜 : {moment(value.updated_at).format('YYYY.MM.DD HH:mm')}</span>
                </div>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
}
