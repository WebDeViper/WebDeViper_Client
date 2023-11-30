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
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<GetUser[]>([]);

  const [chatLog, setChatLog] = useState<ChatData[]>([]);

  useEffect(() => {
    if (!chatSocket) return;
    chatSocket.emit('joinRoom', userInfo.nickName, groupId, (cb: JoinRoomCb) => {
      console.log(cb);
      if (cb.isOk && cb.data) {
        setChatLog(cb.data);
      }
    });

    chatSocket.on('message', (message: ChatData) => {
      setChatLog(prev => [...prev, message]);
    });

    chatSocket.on('getUsers', (users: GetUser[]) => {
      setUsers(users);
    });

    chatSocket.on('disconnect', () => {});
  }, [userInfo, groupId, chatSocket]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === '') return;
    if (!chatSocket) return;
    chatSocket.emit('sendMessage', groupId, userInfo.nickName, message, (res: any) => {
      if (!res.isOk) {
        console.log('error message', res.error);
      }
      setMessage('');
    });
  };

  return (
    <div className="h-full">
      <div className="flex h-full">
        <section className="flex-1">
          <Zoom users={users} />
        </section>
        <section className="w-96">
          <Chat chatLog={chatLog} sendMessage={sendMessage} message={message} setMessage={setMessage} />
        </section>
      </div>
    </div>
  );
}
