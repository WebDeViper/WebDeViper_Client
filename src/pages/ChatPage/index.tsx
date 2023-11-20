import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { socket } from '../../utils/socketServer';
import { socket } from '../../App';
import './index.css';
import InputField from './InputField';
import Message from './Message';
import { useAppSelector } from '../../store/store';
import { Button } from '../../components/common/Button';

interface Props {
  setIsChatOn: (isChatOn: boolean) => void;
  groupId: string;
}

const ChatPage = ({ setIsChatOn, groupId }: Props) => {
  // console.log('유저정보는', user);
  const user = useAppSelector(state => state.user?.userInfo.nickName);
  const userInfo = useAppSelector(state => state.user?.userInfo);
  // const { groupId } = useParams(); // 유저가 조인한 방의 아이디를 url에서 가져온다
  const room = groupId;
  // console.log('그룹 아이디>>', room);
  const [chatLog, setChatLog] = useState<any[]>([]); // 배열로 변경
  const [message, setMessage] = useState('');
  // const navigate = useNavigate();

  // 채팅창 떠날 때
  const leaveRoom = () => {
    socket.emit('leaveRoom', user, (res: any) => {
      if (res.isOk) {
        setIsChatOn(false);
        // navigate(-1); // 다시 채팅방 리스트 페이지로 돌아감
      }
    });
  };

  // console.log('message List', chatLog);
  // console.log('룸아이디???', room);

  // 채팅 화면 처음 들어올 때
  useEffect(() => {
    socket.emit('joinRoom', userInfo.nickName, room, (res: any) => {
      if (res && res.isOk) {
        console.log('successfully join', res);
        console.log(res.data, 'resDAta');
        setChatLog(res.data);
      } else {
        console.log('fail to join', res);
      }
    });

    socket.on('message', message => {
      // message 이벤트를 수신하면 이 함수가 실행됩니다.
      // 여기서 message는 서버에서 보낸 데이터입니다.
      // setChatLog(prevChatLog => [...prevChatLog, message]);
      console.log('서버로부터 메시지 수신:', message, '라고?');
      setChatLog((prev: { message: string }[]) => [...prev, message]);
    });
  }, [room, userInfo.nickName]);

  // console.log(chatLog, 'chatLogchatLogchatLogchatLog');

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    // 일단 폼 제출하는거 막음
    e.preventDefault();
    if (message.trim() !== '') {
      console.log('하이하이하이');
      socket.emit('sendMessage', room, user, message, (res: any) => {
        if (!res.isOk) {
          console.log('error message', res.error);
        }
        setMessage('');
      });
    }
  };

  // console.log(chatLog, 'chatLogchatLogchatLogchatLog');

  return (
    <div
      className="chatContainer flex flex-col h-full"
      // style={{ backgroundImage: "url('../../../public/img/background.png')" }}
    >
      <nav>
        <Button onClick={leaveRoom}>←</Button>
      </nav>
      <div className="max-h-[100%]">
        {chatLog.length > 0 ? <Message chatLog={chatLog} user={userInfo} /> : <div className="h-full"></div>}
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
