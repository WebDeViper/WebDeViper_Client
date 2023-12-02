import { useEffect, useMemo, useRef, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector } from '../../store/store';
import Chat from './Chat';
import { ChatData, GetUser, JoinRoomCb } from './type';
import Zoom from './Zoom';
import { Socket, io } from 'socket.io-client';

export default function ZoomPage() {
  const { groupId } = useParams();
  const userInfo = useAppSelector(state => state.user.userInfo);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<GetUser[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const navigate = useNavigate();
  const [chatLog, setChatLog] = useState<ChatData[]>([]);

  useEffect(() => {
    console.log(userInfo.nickName);
    const newSocket = io('http://localhost:8001/chat', {
      auth: {
        userNickName: userInfo.nickName,
        userId: userInfo.id,
        groupId: groupId,
      },
    });

    socketRef.current = newSocket;
    // socketRef.current.connect();

    return () => {
      // if (socketRef.current) {
      //   socketRef.current.disconnect();
      // }
    };
  }, [groupId, userInfo]);

  // 채팅에 관한 소켓
  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.emit('joinRoom', (cb: JoinRoomCb) => {
      if (cb.isOk && cb.data) {
        setChatLog(cb.data);
      }
    });

    socketRef.current.on('getUsers', (users: GetUser[]) => {
      console.log(users);
      setUsers(users);
    });

    socketRef.current.on('disconnect', () => {});
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on('message', (message: ChatData) => {
      setChatLog(prev => [...prev, message]);
    });
  }, []);

  // 채팅창 떠날 때
  const leaveRoom = () => {
    if (!socketRef.current) return;
    const isLeaving = confirm('정말 나가시겠습니까?');
    if (isLeaving) {
      socketRef.current.emit('leaveRoom', userInfo.nickName, groupId, userInfo.id);
      navigate(-1);
    }
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === '') return;
    if (!socketRef.current) return;
    socketRef.current.emit('sendMessage', message, (res: any) => {
      if (!res.isOk) {
        console.log('error message', res.error);
      }
      setMessage('');
    });
  };

  // 타이머에 관한 소켓
  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.emit('setTimer', userInfo.id, groupId);
    socketRef.current.on('getTimer', userTimer => {
      console.log(userTimer);
    });
  }, [userInfo, groupId]);

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
