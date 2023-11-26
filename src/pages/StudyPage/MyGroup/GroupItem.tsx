import { Link } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import { MdOutlinePerson } from 'react-icons/md';

interface Props {
  groupInfo: GroupInfoType;
}

export default function GroupItem({ groupInfo }: Props) {
  const { group_id, name, category, description, img_path, member_max, members } = groupInfo;

  return (
    <Link
      to={`/study/group/${group_id}`}
      state={{
        groupInfo,
      }}
    >
      <div className="rounded-md border h-full border-slate-300 overflow-auto relative">
        <div>
          <div className="absolute top-2 left-2">
            <div className="mb-24">
              <Badge color="yellow">{category}</Badge>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MdOutlinePerson />
              <span className="text-sm">
                {members && (members.length ? members.length : '1')} / {member_max}
              </span>
            </div>
          </div>
          <div
            style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 65%,rgba(0,0,0,0.3) 100%)' }}
            className="h-40"
          >
            <img className="w-full h-full" src={`${import.meta.env.VITE_APP_BACK_URL}${img_path}`} alt="귀여운 우유" />
          </div>
          <div className="flex flex-col p-2">
            <h3 className="my-2 truncate">{name}</h3>
            <p className="multiline-ellipsis text-sm text-slate-500">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
