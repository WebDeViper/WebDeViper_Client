import { Socket } from 'socket.io-client';
import { GetUser } from '../type';
import { IoPause, IoPlaySharp } from 'react-icons/io5';

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
                  <div className="absolute flex items-center gap-3 right-0 bg-black text-white rounded-bl-md py-1 px-3 cursor-default">
                    <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
                    <span className="md:text-lg">00:00:00</span>
                    <button>
                      {/* <IoPlaySharp /> */}
                      <IoPause />
                    </button>
                  </div>
                  <div className="w-16 h-16 rounded-full overflow-hidden relative inset-2/4 -translate-x-2/4 -translate-y-2/4">
                    <img
                      className="w-full h-full"
                      src={import.meta.env.VITE_APP_BACK_URL + user.userProfile}
                      alt="프로필 이미지"
                    />
                  </div>
                  <div className="absolute bottom-2 left-4">
                    <span className="text-white font-semibold text-sm">{user.userNickName}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// export const MemoizedZoom = React.memo(Zoom);
