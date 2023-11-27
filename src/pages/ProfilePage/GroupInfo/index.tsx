import { useEffect, useState } from 'react';
import GroupRequest from './GroupRequest';
import MyGroupRequest from './MyGroupRequest';
import { API } from '../../../utils/axios';
// import { Card } from 'flowbite-react';

export default function GroupInfo() {
  const [myOwnGroup, setMyOwnGroup] = useState<any[]>([]);
  const [pendingGroups, setPendingGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      // const res = await API.get('/group/studyGroups/users');
      const res = await API.get('/group/getJoinRequest');
      console.log('내 그룹에 들어온 신청 리스트 :: ', res.data);
      const requestLists = res.data.groupWithMembers.data;
      setMyOwnGroup(requestLists);
    };
    const getPendingGroups = async () => {
      try {
        const res = await API.get('/group/pendingGroups');
        setPendingGroups(res.data.pendingGroups); // 서버에서 받은 데이터를 설정
      } catch (error) {
        console.error('Error fetching pending groups:', error);
      }
    };

    getGroups();
    getPendingGroups();
  }, []);
  console.log('그룹 가입 요청 어쩌구', myOwnGroup);
  console.log('내 신청 중 그룹', pendingGroups);

  return (
    <div>
      <section>
        <h2>그룹 가입 요청</h2>
        {/* <Card>요청이 없습니다.</Card> */}
        <div className="myOwnGroupWrap flex flex-wrap md:gap-1 md:mb-5 mb-1">
          {myOwnGroup.map(
            (group: any) =>
              group.data.length > 0 && (
                <GroupRequest
                  key={group.data._id}
                  requests={group.join_requests}
                  groupName={group.group_name}
                  groupId={group._id}
                />
              )
          )}
        </div>
      </section>
      <section>
        <h2>신청중인 그룹</h2>
        <div className="myPendingGroupWrap flex flex-wrap md:gap-1">
          {pendingGroups.length > 0 &&
            pendingGroups.map((group, index) => (
              <MyGroupRequest key={index} groupInfo={group} setPendingGroups={setPendingGroups} />
            ))}
        </div>
      </section>
    </div>
  );
}
