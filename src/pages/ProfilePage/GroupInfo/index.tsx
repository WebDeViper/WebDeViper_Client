import { useEffect, useState } from 'react';
import GroupRequest from './GroupRequest';
import MyGroupRequest from './MyGroupRequest';
import { API } from '../../../utils/axios';

export default function GroupInfo() {
  const [myOwnGroup, setMyOwnGroup] = useState<any[]>([]);
  const [hasGroupRequests, setHasGroupRequests] = useState<boolean>(false);
  const [pendingGroups, setPendingGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const res = await API.get('/group/getJoinRequest');
      console.log('내 그룹에 신청중인 사람들 :: ', res.data);
      const filteredGroup = res.data.groups;
      filteredGroup.map((group: any) => {
        group.nickNames.length > 0 ? setHasGroupRequests(true) : '';
      });
      setMyOwnGroup(filteredGroup);
    };
    const getPendingGroups = async () => {
      try {
        const res = await API.get('/group/pendingGroups');
        console.log('팬딩 그룹 서버 요청 :: ', res.data);
        setPendingGroups(res.data.pendingGroups); // 서버에서 받은 데이터를 설정
      } catch (error) {
        console.error('Error fetching pending groups:', error);
      }
    };

    getGroups();
    getPendingGroups();
  }, []);

  return (
    <div>
      <section className="mb-5">
        <h2>그룹 가입 요청</h2>
        <div className="myOwnGroupWrap flex flex-wrap md:gap-1 md:mb-5 mb-1">
          {hasGroupRequests ? (
            myOwnGroup?.map((group: any) => (
              <GroupRequest key={group.group_id} group={group} setHasGroupRequests={setHasGroupRequests} />
            ))
          ) : (
            <div className="block md:max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <p className="font-normal text-gray-700 dark:text-gray-400">요청이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
      <section>
        <h2>신청중인 그룹</h2>
        <div className="myPendingGroupWrap flex flex-wrap md:gap-1">
          {pendingGroups.length > 0 ? (
            pendingGroups.map((group, index) => (
              <MyGroupRequest key={index} groupInfo={group} setPendingGroups={setPendingGroups} />
            ))
          ) : (
            <div className="block md:max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <p className="font-normal text-gray-700 dark:text-gray-400">요청이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
