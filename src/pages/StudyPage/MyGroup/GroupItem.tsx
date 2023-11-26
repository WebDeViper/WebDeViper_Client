import { Link } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import { MdOutlinePerson } from 'react-icons/md';

interface Props {
  groupInfo: GroupInfoType;
}

export default function GroupItem({ groupInfo }: Props) {
  const { group_id, name, category, description, img_path, member_max, members } = groupInfo;
  const maxLength = 20; // 원하는 최대 길이
  const truncatedDescription =
    description && description.length > maxLength
      ? description.slice(0, maxLength) + '...' // 긴 경우 잘라내고 '...'을 추가
      : description; // 길이가 작은 경우 그대로 둡니다

  return (
    <Link
      to={`/study/group/${group_id}`}
      state={{
        groupInfo,
      }}
    >
      <div className="rounded-[4px] shadow-xl px-9 h-full flex items-center justify-center">
        <div className="flex items-center flex-col w-full">
          <img
            className="rounded-full w-16 h-16"
            src={`${import.meta.env.VITE_APP_BACK_URL}${img_path}`}
            alt="귀여운 우유"
          />
          <div className="mt-4 h-24 flex flex-col">
            <h3 className="font-bold text-center">{name.length > 10 ? name.slice(0, 9) + '...' : name}</h3>
            <p className="text-start" style={{ overflowWrap: 'anywhere' }}>
              {truncatedDescription}
            </p>
          </div>
          <div className="mt-2.5">
            <Badge color="yellow">{category}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlinePerson />
            {members && (members.length ? members.length : '1')} / {member_max}
          </div>
        </div>
      </div>
    </Link>
  );
}
