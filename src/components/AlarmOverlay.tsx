import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import Overlay from './common/Overlay';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AlarmOverlay({ isOpen, setIsOpen }: Props) {
  const alarmMessage = useAppSelector(state => state.user.userInfo.alarmMessage);
  return (
    <>
      {alarmMessage.length > 0 && (
        <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="px-2 w-64">
            {alarmMessage.map(item => (
              <Link to="/notice" key={item._id}>
                {item.content}
              </Link>
            ))}
          </div>
        </Overlay>
      )}
    </>
  );
}
