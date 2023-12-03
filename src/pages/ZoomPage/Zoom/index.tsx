import { Socket } from 'socket.io-client';
import { GetTimer, GetUser } from '../type';
import { useEffect } from 'react';

interface Props {
  users: GetUser[];
  socket: Socket | null;
}

export default function Zoom({ users, socket }: Props) {
  useEffect(() => {
    if (!socket) return;
    socket.emit('setTimer');
    socket.on('getTimer', (res: GetTimer[]) => {
      console.log(res);
    });
  }, [socket]);

  useEffect(() => {}, []);
  return (
    <div className="h-full">
      <div className="h-full bg-gray-900">
        <div className="p-10 grid grid-cols-3 gap-5">
          {users &&
            users.map((user: GetUser) => (
              <div key={user.userId} className="relative h-60">
                <div className="w-full h-full">
                  <img
                    className="w-full h-full"
                    src={import.meta.env.VITE_APP_BACK_URL + user.userProfile}
                    alt="프로필 이미지"
                  />
                </div>
                <div>{user.userNickName}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
