import { API } from '../../../utils/axios';

interface Props {
  groupInfo: GroupInfoType;
  setPendingGroups: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function MyGroupRequest({ groupInfo, setPendingGroups }: Props) {
  const handleCancelRequest = async () => {
    try {
      const res = await API.delete(`/group/studyGroup/${groupInfo.group_id}/joinRequests`);
      if (res.data.isSuccess) {
        setPendingGroups((prev: any) => prev.filter((group: any) => group.group_id !== groupInfo.group_id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mb-5 flex flex-col items-center w-fit h-fit gap-2 border-2 rounded-lg border-primary p-2">
      <span className="bg-blue-100 text-blue-800 text-center text-lg font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 h-fit">
        {groupInfo.name}
      </span>
      <div className="request-body flex flex-col items-center w-fit gap-2">
        <div className="request-group-info flex text-sm items-center">
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
            인원 {groupInfo.members.length} / {groupInfo.member_max}
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            {groupInfo.category}
          </span>
        </div>
        <button
          className="bg-red-100 hover:bg-red-600 text-red-800 hover:text-red-100 transition-all text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
          onClick={handleCancelRequest}
        >
          신청 취소
        </button>
      </div>
    </div>
  );
}
