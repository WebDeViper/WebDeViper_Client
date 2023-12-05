import { useEffect, useRef, useState } from 'react';
import { ChatData, GetMessage, SendMessage } from '../type';
import { MemoizedChatItem } from './ChatItem';
import InputField from './InputField';

import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket | null;
}

export default function Chat({ socket }: Props) {
  const [chatLog, setChatLog] = useState<ChatData[]>([]);
  const [message, setMessage] = useState('');
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;
    socket.emit('getMessage', (cb: GetMessage) => {
      if (cb.isOk && cb.data) {
        setChatLog(cb.data);
      }
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (message: ChatData) => {
      setChatLog(prev => [...prev, message]);
    });
    return () => {
      socket.off('message');
    };
  }, [socket]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [chatLog]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === '') return;
    if (!socket) return;
    socket.emit('sendMessage', message, (res: SendMessage) => {
      if (!res.isOk) {
        console.log('error message', res.error);
      } else {
        setChatLog(prev => [...prev, res.message]);
      }
      setMessage('');
    });
  };

  return (
    <div className="bg-slate-300 flex flex-col h-full">
      <div className="overflow-y-auto p-3 flex-1 message-container" ref={messageRef}>
        <div className="max-h-96">
          {chatLog && chatLog.length > 0 && chatLog.map(chat => <MemoizedChatItem key={chat._id} chatLog={chat} />)}
        </div>
      </div>
      <div className="p-3">
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
