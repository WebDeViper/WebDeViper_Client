import { useEffect, useMemo, useRef, useState } from 'react';
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
    const newSocket = io('http://localhost:8001/chat', {
      auth: {
        userNickName: userInfo.nickName,
        userId: userInfo.id,
        groupId: groupId,
      },
    });

    setSocket(newSocket);
  }, [groupId, userInfo]);

  // 채팅에 관한 소켓
  useEffect(() => {
    if (!socket) return;
    socket.emit('joinRoom');
    socket.on('getUsers', (users: GetUser[]) => {
      setUsers(users);
    });

    return () => {
      socket.off('joinRoom');
      socket.off('getUsers');
    };
  }, [socket]);

  // 채팅창 떠날 때
  const leaveRoom = () => {
    // if (!socket) return;
    // const isLeaving = confirm('정말 나가시겠습니까?');
    // if (isLeaving) {
    // socket.emit('leaveRoom', userInfo.nickName, groupId, userInfo.id);
    navigate(-1);
    // }
  };

  // // 타이머에 관한 소켓
  // useEffect(() => {
  //   if (!socket) return;
  //   socket.emit('setTimer', userInfo.id, groupId);
  //   socket.on('getTimer', userTimer => {
  //     console.log(userTimer);
  //   });
  // }, [userInfo, groupId]);

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
            <Chat socket={socket} />
          </section>
        </div>
      </div>
    </div>
  );
}
