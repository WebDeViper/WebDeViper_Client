import { useAppDispatch } from '../../../store/store';
import EditCategory from './EditCategory';
import EditNickName from './EditNickName';
import EditProfileImage from './EditProfileImage';

export default function UserInfo() {
  const dispatch = useAppDispatch();

  return (
    <div className="myPage-userInfo flex flex-col md:flex-row justify-between mb-5 md:gap-1">
      <EditProfileImage />
      <div className="myPage-userInfo-right-container w-full">
        <EditNickName dispatch={dispatch} />
        <EditCategory dispatch={dispatch} />
      </div>
    </div>
  );
}
