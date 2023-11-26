import { Link } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import { MdOutlinePerson } from 'react-icons/md';

interface Props {
  groupInfo: GroupInfoType;
}

export default function GroupItem({ groupInfo }: Props) {
  const { group_id, name, category, img_path, member_max, members } = groupInfo;

  return (
    <Link
      to={`/study/group/${group_id}`}
      state={{
        groupInfo,
      }}
    >
      <div
        style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 65%,rgba(0,0,0,0.3) 100%)' }}
        className="relative lg:h-60 h-40 hover:scale-105 transition-all"
      >
        <div className="absolute top-2 left-3 opacity-75">
          <Badge color="yellow">{category}</Badge>
        </div>
        <img
          className="w-full h-full rounded-md object-cover"
          src={`${import.meta.env.VITE_APP_BACK_URL}${img_path}`}
          alt="귀여운 우유"
        />
        <div className="absolute bottom-1 left-3 text-white text-sm">
          <div className="truncate">
            <span>{name}</span>
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
