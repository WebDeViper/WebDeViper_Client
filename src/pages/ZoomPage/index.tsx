import { useEffect, useMemo, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector } from '../../store/store';
import Chat from './Chat';
import { ChatData, GetUser, JoinRoomCb } from './type';
import Zoom from './Zoom';
import { io } from 'socket.io-client';

export default function ZoomPage() {
  const { groupId } = useParams();
  const userInfo = useAppSelector(state => state.user.userInfo);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<GetUser[]>([]);
  const groupSocket = useMemo(
    () =>
      io('http://localhost:8001/chat', {
        auth: {
          userId: userInfo.id,
          groupId: groupId,
        },
      }),
    [userInfo.id, groupId]
  );
  const navigate = useNavigate();

  const [chatLog, setChatLog] = useState<ChatData[]>([]);

  // 채팅에 관한 소켓
  useEffect(() => {
    // if (!groupSocket) return;
    groupSocket.emit('joinRoom', userInfo.nickName, groupId, (cb: JoinRoomCb) => {
      console.log(cb);
      if (cb.isOk && cb.data) {
        setChatLog(cb.data);
      }
    });

    groupSocket.on('getUsers', (users: GetUser[]) => {
      setUsers(users);
    });

    groupSocket.on('disconnect', () => {});
  }, [userInfo, groupId, groupSocket]);

  useEffect(() => {
    // if (!groupSocket) return;
    groupSocket.on('message', (message: ChatData) => {
      setChatLog(prev => [...prev, message]);
    });
  }, [groupSocket]);

  // 채팅창 떠날 때
  const leaveRoom = () => {
    if (!groupSocket) return;
    const isLeaving = confirm('정말 나가시겠습니까?');
    if (isLeaving) {
      groupSocket.emit('leaveRoom', userInfo.nickName, groupId, userInfo.id);
      navigate(-1);
    }
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === '') return;
    if (!groupSocket) return;
    groupSocket.emit('sendMessage', groupId, userInfo.nickName, message, (res: any) => {
      if (!res.isOk) {
        console.log('error message', res.error);
      }
      setMessage('');
    });
  };

  // 타이머에 관한 소켓
  useEffect(() => {
    if (!groupSocket) return;
    groupSocket.emit('setTimer', userInfo.id, groupId);
    groupSocket.on('getTimer', userTimer => {
      console.log(userTimer);
    });
  }, [groupSocket, userInfo, groupId]);

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
