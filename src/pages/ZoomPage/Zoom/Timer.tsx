import { useEffect, useState } from 'react';
import { GetUser } from '../type';
import { Socket } from 'socket.io-client';
import calculateTime from '../../../utils/calculateTime';
import { useAppSelector } from '../../../store/store';
import { IoPause, IoPlaySharp } from 'react-icons/io5';

interface Props {
  user: GetUser;
  socket: Socket | null;
}

export default function Timer({ user, socket }: Props) {
  const [timer, setTimer] = useState(0);
  const userInfo = useAppSelector(state => state.user.userInfo);
  const [startTime, setStartTime] = useState<Date>();

  useEffect(() => {
    setTimer(user.totalTime);
  }, [user.totalTime]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (user.isRunning === 'y') {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [user.isRunning]);

  useEffect(() => {
    if (!socket) return;
    socket.emit('setTimer', { subject: '수학', time: user.totalTime, is_running: user.isRunning, startTime });
  }, [socket, user, startTime]);

  const handleToggleTimer = (user: GetUser) => {
    if (!socket) return;

    const currentTime = new Date();
    const isRunning = user.isRunning === 'y' ? 'n' : 'y';
    socket.emit('setTimer', { subject: '수학', time: timer, is_running: isRunning, startTime: currentTime });
    setStartTime(currentTime);
  };

  return (
    <>
      <div className="absolute flex items-center gap-3 right-0 bg-black text-white rounded-bl-md py-1 px-3 cursor-default">
        <span className={`w-2 h-2 ${user.isRunning === 'y' ? 'bg-lime-400' : 'bg-red-500'}  rounded-full`}></span>
        <span className="md:text-lg">{calculateTime(timer)}</span>
        {user.userId === userInfo.id && (
          <>
            {user.isRunning === 'y' ? (
              <button onClick={() => handleToggleTimer(user)}>
                <IoPause />
              </button>
            ) : (
              <button onClick={() => handleToggleTimer(user)}>
                <IoPlaySharp />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
