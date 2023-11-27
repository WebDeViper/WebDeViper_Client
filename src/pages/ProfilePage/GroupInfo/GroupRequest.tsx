// import React from 'react';
import { useState } from 'react';
import { API } from '../../../utils/axios';

interface Props {
  group: any;
}

export default function GroupRequest({ group }: Props) {
  const [request, setRequest] = useState<any[]>(group.nickNames.length ? group.nickNames : []);

  // 요청 수락
  const handleAccept = async (requestId: string) => {
    const res = await API.post(`/group/studyGroup/${group.group_id}/${requestId}/requests/accept`);
    console.log(res.data, '수락 응답!!');
    const newRequest = request.filter(item => item.userId !== requestId);
    // 요청을 수락한 후 해당 요청을 배열에서 제거
    setRequest(newRequest);
  };

  // 요청 거절
  const handleReject = async (requestId: string) => {
    const res = await API.post(`/group/studyGroup/${group.group_id}/${requestId}/requests/reject`);
    console.log(res.data, '거절 응답!!');
    const newRequest = request.filter(item => item.userId !== requestId);
    // 요청을 거절한 후 해당 요청을 배열에서 제거
    setRequest(newRequest);
  };

  return (
    <>
      {group.nickNames.length > 0 ? (
        <div className="mb-5 flex flex-col w-fit h-fit gap-2 border-2 rounded-lg border-primary p-2">
          <span className="bg-blue-100 text-blue-800 text-lg font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 h-fit w-fit self-center">
            {group.name}
          </span>

          {group.nickNames.map((request: any) => (
            <div key={Math.random() * 1000000} className="flex flex-col justify-center gap-2 w-full">
              <div className="request-body flex text-sm items-center justify-between gap-3">
                <div>{request.nickName}</div>
                <div className="btnWrap flex gap-1">
                  <button
                    className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                    onClick={() => handleAccept(request.userId)}
                  >
                    수락
                  </button>
                  <button
                    className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                    onClick={() => handleReject(request.userId)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>요청이 없습니다</div>
      )}
    </>
  );
}
