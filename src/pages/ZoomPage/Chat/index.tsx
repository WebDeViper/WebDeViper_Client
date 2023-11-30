import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/common/Button';
import { ChatData } from '../type';
import ChatItem from './ChatItem';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="bg-slate-300 flex flex-col h-full">
      <div className="overflow-y-auto p-3 flex-1" ref={messageRef}>
        <div className="max-h-96">
          {chatLog &&
            chatLog.length > 0 &&
            chatLog.map((chat, index) => <ChatItem index={index} key={chat._id} chatLog={chat} />)}
        </div>
      </div>
      <div className="p-3">
        <form
          onSubmit={sendMessage}
          className="border-[2px] border-primary h-[60px] rounded-lg flex justify-between py-2 px-3 items-center w-full"
        >
          <input
            value={message}
            onChange={handleInputChange}
            className="h-full outline-none font-medium border-none bg-transparent flex-1"
            type="text"
          />
          <Button type="submit">전송</Button>
        </form>
      </div>
    </div>
  );
}
