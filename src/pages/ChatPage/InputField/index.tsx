import { Button } from '../../../components/common/Button';
import './InputField.css';

interface Props {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
}

const InputField = ({ message, setMessage, sendMessage }: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (message) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevents the default newline behavior
        sendMessage(); // Calls the sendMessage function
      }
    }
  };
  return (
    <form
      onSubmit={sendMessage}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 input-container border-2 !border-primary mb-3 h-[60px] rounded-lg flex justify-between py-2 px-3 items-center w-[90%]"
      id=""
    >
      <input
        className="input bg-transparent focus:outline-none border-none focus:ring-0 focus:ring-offset-0 font-medium h-full flex"
        placeholder="메시지를 입력하세요…"
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
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
