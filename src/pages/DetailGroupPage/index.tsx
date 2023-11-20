import { useEffect, useState } from 'react';
import { API } from '../../utils/axios';
// import { chatSocket } from '../../utils/socketServer';
import { socket } from '../../App';
import { useParams, useNavigate } from 'react-router-dom';
// import { IoMdArrowRoundBack } from 'react-icons/io';
// import Button from '../../components/common/Button';
import { Button } from '../../components/common/Button';
// import ChatPage from '../ChatPage';
// import './index.css';
import Badge from '../../components/common/Badge';
import { useAppSelector } from '../../store/store';

export default function DetailGroupPage() {
  // groupId를 params로 가져옴
  const { groupId } = useParams() as { groupId: string };
  const { id: userId, nickName: userName } = useAppSelector(state => state.user?.userInfo);
  // const location = useLocation();
  // console.log('@@@#$@#$#@$#@$@#$ location 새로고침>>>>', location);
  // const { groupInfo } = location.state;
  const [groupInfo, setGroupInfo] = useState<GroupInfoType>({
    group_id: '',
    leader_id: '',
    name: '',
    category: '',
    description: '',
    img_path: '',
    member_max: '',
    goal_time: '',
    member_count: '',
  });
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [leaderName, setLeaderName] = useState('');
  const [profileImgPath, setProfileImgPath] = useState('');
  const [isChatOn, setIsChatOn] = useState<boolean>(false);

  const navigate = useNavigate();

  // 채팅창 이동
  const handleChat = () => {
    socket.emit('login', userName, (res: any) => {
      if (res && res.isOk) {
        console.log('successfully login', res);
        // navigate(`/group/chat/${groupId}`);
        setIsChatOn(true);
      } else {
        console.log('fail to login', res);
        alert('로그인해주세요!');
      }
    });
  };

  // 뒤로가기
  // const handleGoBack = () => {
  //   navigate(-1);
  // };

  // 그룹 삭제
  const deleteGroup = async () => {
    try {
      const res: any = await API.delete(`group/studyGroup/${groupId}/members`);
      // console.log(res.data.message);
      alert(`${res.data.message}`);
      navigate('/');
    } catch (error) {
      console.error('그룹 삭제에 실패하셨습니다. ->', error);
    }
  };

  //그룹 탈퇴
  const leaveGroup = async () => {
    try {
      const res: any = await API.delete(`group/studyGroup/${groupId}`);
      // console.log(res.data.msg);
      alert(`${res.data.msg}`);
      navigate('/');
    } catch (error) {
      console.error('그룹 탈퇴에 실패하셨습니다. ->', error);
    }
  };

  useEffect(() => {
    // groupId로 그룹 정보 조회 (groupId 바뀔 때 리랜더링)
    const getGroupInfo = async () => {
      try {
        const res = await API.get(`/group/find/${groupId}`);
        if (res.data.isSuccess) {
          setGroupInfo(prevGroupInfo => {
            const newGroupInfo = res.data.GroupInfo;
            if (Object.keys(newGroupInfo).length > 0) {
              // 응답으로 받은 groupInfo에 대해 그룹장 프로필사진, 이름 얻어오기
              (async () => {
                const leaderRes = await API.get(`/user/${newGroupInfo.leader_id}`);
                if (leaderRes.data.isSuccess) {
                  const leaderInfo = leaderRes.data.userInfo;
                  setLeaderName(leaderInfo.nick_name);
                  setProfileImgPath(leaderInfo.image_path);
                }
              })();
            }
            return newGroupInfo;
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getGroupInfo();
  }, [groupId]);

  useEffect(() => {
    // 로그인한 유저의 신청중인 그룹 가져오기
    const getPendingGroups = async () => {
      try {
        const res = await API.get('/group/pendingGroups');
        console.log('신청중인 그룹 :: ', res.data.pendingGroups);
        setIsPending(res.data.pendingGroups.includes(groupId) ? true : false);
      } catch (error) {
        console.error('Error fetching pending groups:', error);
      }
    };
    getPendingGroups();
  }, [groupId, isPending]);

  const handleGroupRequest = async (groupId: string) => {
    try {
      const res = await API.post(`/group/studyGroup/${groupId}/join`);
      if (!res.data.isFull) {
        const data = res.data.message;
        setIsPending(true);
        alert(data);
      } else {
        alert(`${res.data.message}`);
      }
    } catch (err) {
      console.error(err.message);
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCancelRequest = async () => {
    try {
      const res = await API.delete(`/group/studyGroup/${groupId}/joinRequests`);
      if (res.data.isSuccess) {
        setIsPending(false);
        alert(`${res.data.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log('그룹 정보 잘 설정되나 :: ', groupInfo);
  const { name, category, description, member_max, goal_time, member_count } = groupInfo;

  return (
    <div className="container">
      <div className={`allWrap relative ${isChatOn ? 'chat-open' : ''}`}>
        {groupInfo && Object.keys(groupInfo).length === 0 && <div className="loading">로딩 중...</div>}
        {!groupInfo && <div className="loading">로딩 중...</div>}
        {groupInfo && Object.keys(groupInfo).length > 0 && (
          <div className="studyContentWrap flex flex-col break-all">
            <div className="btnWrap flex justify-end items-center mb-5">
              {isPending ? (
                <Button onClick={handleCancelRequest}>신청취소</Button>
              ) : (
                <Button onClick={() => handleGroupRequest(groupId)}>신청하기</Button>
              )}
              <Button onClick={handleChat}>채팅하기</Button>
            </div>
            {/* 그룹 제목 */}
            <h2>{name}</h2>
            <div className="flex items-center mb-6">
              {/* 그룹장 */}
              <img
                className="rounded-full w-10 h-10 me-3"
                src={profileImgPath ? import.meta.env.VITE_APP_BACK_URL + profileImgPath : ''}
                alt="유저 프로필 이미지"
              />
              <span>{leaderName}</span>
            </div>
            <div className="mb-10">
              <ul className="grid md:grid-cols-2 grid-cols-3 gap-y-4">
                <li className="flex md:flex-row flex-col items-center gap-2">
                  <Badge color="indigo" size="md">
                    카테고리
                  </Badge>
                  <span className="font-semibold">{category}</span>
                </li>
                <li className="flex md:flex-row flex-col items-center gap-2">
                  <Badge color="indigo" size="md">
                    목표시간
                  </Badge>
                  <span className="font-semibold">{goal_time}</span>
                </li>
                <li className="flex md:flex-row flex-col items-center gap-2">
                  <Badge color="indigo" size="md">
                    인원
                  </Badge>
                  <span className="font-semibold">
                    {member_count} / {member_max}
                  </span>
                </li>
              </ul>
            </div>

            <h3>그룹 소개</h3>
            <div className="mb-5">
              <div className="studyContent_postContent w-full p-5 shadow-md min-h-[200px] break-all md:break-keep">
                {description ? description : ''}
              </div>
            </div>

            <div className="studyContent_btnWrap self-center">
              {/* {members.includes(userId) &&
                (leader_id === userId ? (
                  <Button onClick={deleteGroup}>그룹삭제</Button>
                ) : (
                  <Button onClick={leaveGroup}>그룹탈퇴</Button>
                ))} */}
            </div>
          </div>
        )}
        {isChatOn && (
          <div className="chatPage h-screen">{/* <ChatPage setIsChatOn={setIsChatOn} groupId={groupId} /> */}</div>
        )}
      </div>
    </div>
  );
}
