import { ChatData } from '../type';
import '../../../styles/chat.css';

interface Props {
  chatLog: ChatData;
  index: number;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 9);
}

const colorList = ['#37b737', '#2a74ff', '#56bfa8', '#fb6767', '#1cc24d', '#8383de', '#49cc49', '#dc8444', '#ff4a4a'];

export default function ChatItem({ chatLog, index }: Props) {
  const chatColor = {
    color: colorList[getRandomNumber()],
  };
  return (
    <div className="message-container">
      <span style={chatColor} className={`drop-shadow-md font-bold inline-block mr-3 relative`}>
        {chatLog.sender.name}
        <span className="absolute -top-[2px] -right-[7px]">:</span>
      </span>
      <span className="drop-shadow-md font-semibold text-white">{chatLog.chat}</span>
    </div>
  );
}
