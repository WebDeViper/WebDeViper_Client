import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector } from '../../store/store';
import { chatSocket } from '../../utils/socket';
import Chat from './Chat';
import { ChatData, GetUsers, JoinRoomCb } from './type';

export default function ZoomPage() {
  const { groupId } = useParams();
  const userInfo = useAppSelector(state => state.user.userInfo);

  const [users, setUsers] = useState<GetUsers[]>([]);

  const [chatLog, setChatLog] = useState<ChatData[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    chatSocket.emit('joinRoom', userInfo.nickName, groupId, (cb: JoinRoomCb) => {
      console.log(cb);
      if (cb.isOk && cb.data) {
        setChatLog(cb.data);
      }
    });

    chatSocket.on('getUsers', (users: GetUsers[]) => {
      setUsers(users);
    });
  }, [userInfo, groupId]);

  console.log(users, 'users');

  return (
    <div className="container">
      <div className="flex">
        <Chat chatLog={chatLog} />
      </div>
    </div>
  );
}
