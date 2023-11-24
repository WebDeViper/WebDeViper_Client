import GroupInfo from './GroupInfo';
import UserInfo from './UserInfo';

export default function ProfilePage() {
  return (
    <div className="container">
      <UserInfo />
      <GroupInfo />
    </div>
  );
}
