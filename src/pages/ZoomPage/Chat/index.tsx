import { useEffect, useRef } from 'react';
import { ChatData } from '../type';
import { MemoizedChatItem } from './ChatItem';
import InputField from './InputField';
import '../../../styles/chat.css';

interface Props {
  chatLog: ChatData[];
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Chat({ chatLog, message, setMessage, sendMessage }: Props) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [chatLog]);

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
