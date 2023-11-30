import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router';
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
  const navigate = useNavigate();

  const [chatLog, setChatLog] = useState<ChatData[]>([]);

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

    chatSocket.on('disconnect', () => {});
  }, [userInfo, groupId, chatSocket]);

  useEffect(() => {
    if (!chatSocket) return;
    chatSocket.on('message', (message: ChatData) => {
      setChatLog(prev => [...prev, message]);
    });
  }, [chatSocket]);

  // 채팅창 떠날 때
  const leaveRoom = () => {
    if (!chatSocket) return;
    const isLeaving = confirm('정말 나가시겠습니까?');
    if (isLeaving) {
      chatSocket.emit('leaveRoom', userInfo.nickName, groupId, userInfo.id);
      navigate(-1);
    }
  };

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
    <div className="h-screen">
      <div className="flex flex-col h-full">
        <header className="bg-gray-800">
          <div className="h-10 flex items-center ml-10">
            <button onClick={leaveRoom} className="text-white text-xl">
              <IoArrowBack />
            </button>
          </div>
        </header>
        <div className="flex h-full">
          <section className="flex-1">
            <Zoom users={users} />
          </section>
          <section className="w-96">
            <Chat chatLog={chatLog} sendMessage={sendMessage} message={message} setMessage={setMessage} />
          </section>
        </div>
      </div>
    </div>
  );
}
