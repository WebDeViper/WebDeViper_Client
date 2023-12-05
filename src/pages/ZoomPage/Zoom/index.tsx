import { Socket } from 'socket.io-client';
import { GetUser } from '../type';
import Profile from './Profile';
import Timer from './Timer.1';

interface Props {
  users: GetUser[];
  socket: Socket | null;
}

export default function Zoom({ users, socket }: Props) {
  return (
    <div className="h-full">
      <div className="h-full bg-[#1f1f1f]">
        <div className="py-20 grid lg:grid-cols-3 sm:grid-cols-2">
          {users &&
            users.map((user: GetUser) => (
              <div key={user.userId} className="relative h-48 lg:h-64">
                <div className="w-full h-full bg-[#333] border-1 border border-slate-950">
                  <Timer user={user} socket={socket} />
                  <Profile user={user} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
