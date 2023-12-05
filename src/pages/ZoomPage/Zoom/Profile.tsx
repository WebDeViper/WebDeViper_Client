import { GetUser } from '../type';

interface Props {
  user: GetUser;
}

export default function Profile({ user }: Props) {
  return (
    <>
      <div className="w-16 h-16 rounded-full overflow-hidden relative inset-2/4 -translate-x-2/4 -translate-y-2/4">
        <img className="w-full h-full" src={import.meta.env.VITE_APP_BACK_URL + user.userProfile} alt="프로필 이미지" />
      </div>
      <div className="absolute bottom-2 left-4">
        <span className="text-white font-semibold text-sm">{user.userNickName}</span>
      </div>
    </>
  );
}
