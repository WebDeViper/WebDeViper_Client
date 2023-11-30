import { GetUser } from '../type';

interface Props {
  users: GetUser[];
}

export default function Zoom({ users }: Props) {
  return (
    <div className="h-full">
      <div className="h-full bg-gray-900">
        <div className="p-10 grid grid-cols-3 gap-5">
          {users &&
            users.map((user: GetUser) => (
              <div key={user.userId} className="relative h-60">
                <div className="w-full h-full">
                  <img
                    className="w-full h-full"
                    src={import.meta.env.VITE_APP_BACK_URL + user.userProfile}
                    alt="프로필 이미지"
                  />
                </div>
                <div>{user.nickName}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
