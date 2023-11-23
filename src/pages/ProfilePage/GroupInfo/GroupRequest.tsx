import React from 'react';
import { useState } from 'react';
import { API } from '../../../utils/axios';
import { Card } from 'flowbite-react';

export default function GroupRequest({ requests, groupName, groupId }) {
  const [request, setRequest] = useState(requests);
  console.log('requests는 useState -> ', request);
  const handleAccept = async requestId => {
    console.log('수락!!!', requests);
    console.log(requestId);
    const res = await API.post(`/group/studyGroup/${groupId}/${requestId}/requests/accept`);
    console.log(res.data, '수락 응답!!');

    // 요청을 수락한 후 해당 요청을 배열에서 제거
    setRequest(request.filter(item => item.user_id !== requestId));
  };
  const handleReject = async requestId => {
    console.log('거절!!!');
    const res = await API.post(`/group/studyGroup/${groupId}/${requestId}/requests/reject`);
    console.log(res.data, '거절 응답!!');

    // 요청을 거절한 후 해당 요청을 배열에서 제거
    setRequest(request.filter(item => item.user_id !== requestId));
  };
  console.log(request);
  return (
    <>
      {request.length > 0 && (
        <div className="mb-5 flex flex-col w-fit h-fit gap-2 border-2 rounded-lg border-primary p-2">
          <span className="bg-blue-100 text-blue-800 text-lg font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 h-fit w-fit self-center">
            {groupName}
          </span>

          {request.map(request => (
            <div key={request._id} className="flex flex-col justify-center gap-2 w-full">
              <div className="request-body flex text-sm items-center justify-between gap-3">
                <div>{request.user_name}</div>
                <div className="btnWrap flex gap-1">
                  <button
                    className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                    onClick={() => handleAccept(request.user_id)}
                  >
                    수락
                  </button>
                  <button
                    className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                    onClick={() => handleReject(request.user_id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
              {/* <div className="request-right flex text-sm items-center gap-3">
            <div>{request.user_name}</div>
            <div className="btnWrap flex gap-1">
              <button className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                수락
              </button>
              <button className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                삭제
              </button>
            </div>
          </div> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
