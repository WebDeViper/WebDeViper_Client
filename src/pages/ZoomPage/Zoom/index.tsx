import { Socket } from 'socket.io-client';
import { GetUser } from '../type';
import { useEffect, useState } from 'react';
import Profile from './Profile';
import Timer from './Timer';

interface Props {
  users: GetUser[];
  socket: Socket | null;
}

export default function Zoom({ users, socket }: Props) {
  // users에 대한 로직으로 수정 필요

  console.log(users);

  useEffect(() => {
    if (!socket) return;
  }, [socket]);

  return (
    <div className="h-full">
      <div className="h-full bg-[#1f1f1f]">
        <div className="py-20 grid lg:grid-cols-3 sm:grid-cols-2">
          {users &&
            users.map((user: GetUser) => (
              <div key={user.userId} className="relative h-48 lg:h-64">
                <div className="w-full h-full bg-[#333] border-1 border border-slate-950">
                  {/* <div className="absolute flex items-center gap-3 right-0 bg-black text-white rounded-bl-md py-1 px-3 cursor-default">
                    <span className={`w-2 h-2 ${isTimerRunning ? 'bg-lime-400' : 'bg-red-500'}  rounded-full`}></span>
                    <span className="md:text-lg">00:00:00</span>
                    {user.userId === userInfo.id && (
                      <>
                        {isTimerRunning ? (
                          <button onClick={handleToggleTimer}>
                            <IoPause />
                          </button>
                        ) : (
                          <button onClick={handleToggleTimer}>
                            <IoPlaySharp />
                          </button>
                        )}
                      </>
                    )}
                  </div> */}
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
