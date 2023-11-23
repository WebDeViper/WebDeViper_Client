import React from 'react';
import { API } from '../../../utils/axios';

export default function MyGroupRequest({ groupInfo, setPendingGroups }) {
  console.log('>>>>', groupInfo);
  const handleCancelRequest = async () => {
    console.log('내가 신청중인 그룹 취소!!');
    // TODO: 그룹 신청 취소 api 연결
    try {
      const res = await API.delete(`/group/studyGroup/${groupInfo._id}/joinRequests`);
      if (res.data.isSuccess) {
        setPendingGroups(prev => prev.filter(group => group._id !== groupInfo._id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mb-5 flex flex-col items-center w-fit h-fit gap-2 border-2 rounded-lg border-primary p-2">
      <span className="bg-blue-100 text-blue-800 text-center text-lg font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 h-fit">
        {groupInfo.group_name}
      </span>
      <div className="request-body flex flex-col items-center w-fit gap-2">
        <div className="request-group-info flex text-sm items-center">
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
            인원 {groupInfo.members.length} / {groupInfo.group_maximum_member}
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            {groupInfo.group_category}
          </span>
        </div>
        <button
          className="bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
          onClick={handleCancelRequest}
        >
          신청 취소
        </button>
      </div>
    </div>
  );
}
