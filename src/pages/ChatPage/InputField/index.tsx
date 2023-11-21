import { Button } from '../../../components/common/Button';
import './index.css';

interface Props {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InputField = ({ message, setMessage, sendMessage }: Props) => {
  // Enter 입력 시 자동제출 막고, 메세지가 있는 경우에만 submit handler 실행
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      sendMessage(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 input-container border-2 !border-primary mb-3 h-[60px] rounded-lg flex justify-between py-2 px-3 items-center w-[90%]"
    >
      <input
        className="input bg-transparent focus:outline-none border-none focus:ring-0 focus:ring-offset-0 font-medium h-full flex"
        placeholder="메시지를 입력하세요…"
        value={message}
        onChange={event => setMessage(event.target.value)}
        // onKeyDown={handleKeyDown}
      />

      <Button
        // disabled={message === ''}
        type="submit"
        // className="send-button rounded-lg bg-primary !text-white font-bold h-full"
      >
        전송
      </Button>
    </form>
  );
};

export default InputField;
