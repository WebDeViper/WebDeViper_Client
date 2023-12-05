import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector } from '../../store/store';
import Chat from './Chat';
import { GetUser } from './type';
import Zoom from './Zoom';
import { Socket, io } from 'socket.io-client';

export default function ZoomPage() {
  const { groupId } = useParams();
  const userInfo = useAppSelector(state => state.user.userInfo);
  const [users, setUsers] = useState<GetUser[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_APP_BACK_URL}/chat`, {
      auth: {
        userNickName: userInfo.nickName,
        userId: userInfo.id,
        groupId: groupId,
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [groupId, userInfo]);

  useEffect(() => {
    if (!socket) return;
    socket.emit('joinRoom');
    socket.on('getUsers', (users: GetUser[]) => {
      setUsers(users);
    });
    socket.on('updateUser', (users: GetUser[]) => {
      setUsers(users);
    });
    socket.on('leaveRoom', (users: GetUser[]) => {
      setUsers(users);
    });

    return () => {
      socket.off('getUsers');
      socket.off('leaveRoom');
    };
  }, [socket]);

  // 채팅창 떠날 때
  const leaveRoom = () => {
    navigate(-1);
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
        <div className="flex flex-col md:flex-row h-full">
          <section className="flex-1">
            <Zoom users={users} socket={socket} />
          </section>
          <section className="lg:w-96 md:w-80 w-full md:h-full h-64 md:relative absolute bottom-0">
            <Chat socket={socket} />
          </section>
        </div>
      </div>
    </div>
  );
}
