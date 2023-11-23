import { Link } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import { MdOutlinePerson } from 'react-icons/md';

interface Props {
  groupInfo: GroupInfoType;
}

export default function GroupItem({ groupInfo }: Props) {
  const { group_id, name, category, img_path, member_max, members } = groupInfo;
  // const maxLength = 20; // 원하는 최대 길이
  // const truncatedDescription =
  //   description && description.length > maxLength
  //     ? description.slice(0, maxLength) + '...' // 긴 경우 잘라내고 '...'을 추가
  //     : description; // 길이가 작은 경우 그대로 둡니다
  // useEffect(() => {
  //   const handleRooms = async () => {
  //     try {
  //       const res = await API.get('/group/rooms');
  //       console.log('요청', res.data);

  //       const foundRoom = res.data.data.find((room: any) => room.group_id === group_id);
  //       if (foundRoom) {
  //         setRoomId(foundRoom._id); // 찾은 roomId를 설정
  //       }
  //     } catch (err) {
  //       console.error('에러!!!', err);
  //     }
  //   };

  //   handleRooms();
  // }, [group_id]);

  return (
    <Link
      to={`/study/group/${group_id}`}
      state={{
        groupInfo,
      }}
    >
      {/* <div className={`rounded-[4px] shadow-xl px-9 pb-5 pt-[25px] h-full`}>
        <div className={`flex items-center flex-col`}>
          <img
            className="rounded-full w-16 h-16"
            src={`${import.meta.env.VITE_APP_BACK_URL}${img_path}`}
            alt="귀여운 우유"
          />
          <div className="mt-4 h-24 flex flex-col">
            <h3 className="font-bold text-center">{name}</h3>
            <p className="text-start" style={{ overflowWrap: 'anywhere' }}>
              {truncatedDescription}
            </p>
          </div>
          <div className="mt-2.5">
            <span className="block bg-indigo-100 text-indigo-800 text-center text-md font-bold mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
              {category}
            </span>
            <div>
              정원: {members && (members.length ? members.length : '1')} / {member_max}
            </div>
          </div>
        </div>
      </div> */}

      <div className="relative lg:h-60 h-full hover:scale-105 transition-all">
        <div className="absolute top-2 left-3 opacity-75">
          <Badge color="yellow">{category}</Badge>
        </div>
        <img
          className="w-full h-full rounded-md object-cover"
          src={`${import.meta.env.VITE_APP_BACK_URL}${img_path}`}
          alt="귀여운 우유"
        />
        <div className="absolute bottom-1 left-3 text-white text-sm">
          <div>{name.length > 10 ? name.slice(0, 9) + '...' : name}</div>
          {/* <span className="block bg-indigo-100 text-indigo-800 text-center text-md font-bold mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
            {category}
          </span> */}
          <div className="flex items-center gap-2">
            <MdOutlinePerson />
            {members && (members.length ? members.length : '1')} / {member_max}
          </div>
        </div>
      </div>
    </Link>
  );
}
