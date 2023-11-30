import { Button } from '../../../components/common/Button';

interface Props {
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputField({ message, sendMessage, setMessage }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
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
  );
}
