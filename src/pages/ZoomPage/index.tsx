import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector } from '../../store/store';
import Chat from './Chat';
import { ChatData, GetUser, JoinRoomCb } from './type';
import Zoom from './Zoom';
import useSocket from '../../hooks/useSocket';

export default function ZoomPage() {
  const chatSocket = useSocket('http://localhost:8001/chat');
  const { groupId } = useParams();
  const userInfo = useAppSelector(state => state.user.userInfo);

  const [users, setUsers] = useState<GetUser[]>([]);

  const [chatLog, setChatLog] = useState<ChatData[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!chatSocket) return;
    chatSocket.emit('joinRoom', userInfo.nickName, groupId, (cb: JoinRoomCb) => {
      console.log(cb);
      if (cb.isOk && cb.data) {
        setChatLog(cb.data);
      }
    });

    chatSocket.on('getUsers', (users: GetUser[]) => {
      setUsers(users);
    });

    chatSocket.on('disconnect', data => {
      chatSocket.emit('customDisconnectEvent', userInfo.id, groupId, (users: any) => {
        // console.log('Custom disconnect event received:', data);
        console.log('Custom disconnect event received:', users);
      });
      console.log(data, 'data');
      console.log('Custom disconnect event received:');
    });
  }, [userInfo, groupId, chatSocket]);

  console.log(users, 'users');

  return (
    <div className="h-full">
      <div className="flex h-full">
        <section className="flex-1">
          <Zoom users={users} />
        </section>
        <section className="w-96">
          <Chat chatLog={chatLog} />
        </section>
      </div>
    </div>
  );
}
