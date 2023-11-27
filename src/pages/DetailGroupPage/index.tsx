import { useEffect, useState } from 'react';
import { API } from '../../utils/axios';
// import { socket } from '../../App';
// import { socket } from '../../utils/socket';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useAppSelector } from '../../store/store';
import { IoArrowBackOutline } from 'react-icons/io5';
import ChatPage from '../ChatPage';
import './index.css';

export default function DetailGroupPage() {
  // groupId를 params로 가져옴
  const { groupId } = useParams() as { groupId: string };
  // 그룹에 멤버인지 판단할 로그인한 유저의 id 리덕스에서 가져옴
  const { id: userId } = useAppSelector(state => state.user?.userInfo);
  // params로 가져온 그룹 정보를 설정할 state 초기값
  const [groupInfo, setGroupInfo] = useState<GroupInfoType>({
    group_id: '',
    leader_id: '',
    name: '',
    category: '',
    description: '',
    img_path: '',
    member_max: '',
    goal_time: '',
    members: [],
  });
  // state 구조분해
  const { leader_id, name, category, description, member_max, goal_time, members } = groupInfo;

  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [leaderName, setLeaderName] = useState('');
  const [profileImgPath, setProfileImgPath] = useState('');
  const [isChatOn, setIsChatOn] = useState<boolean>(false);

  const navigate = useNavigate();

  // 채팅창 이동
  const handleChat = () => {
    if (userId) {
      if (members.includes(userId)) {
        setIsChatOn(!isChatOn);
        // socket.emit('login', userName, (res: any) => {
        //   if (res && res.isOk) {
        //     console.log('successfully login', res);
        //     // navigate(`/group/chat/${groupId}`);
        //     // setIsChatOn(true);
        //   } else {
        //     console.log('fail to login', res);
        //     alert('로그인해주세요!');
        //   }
        // });
      } else {
        alert('그룹 가입 후 이용 가능합니다.');
      }
    } else {
      alert('로그인 후 이용해주세요!');
    }
  };

  // 뒤로가기
  const handleGoBack = () => {
    navigate(-1);
  };

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
    // console.log('@#$@#$', groupInfo);
    // groupId로 그룹 정보 조회 (groupId 바뀔 때 리랜더링)
    const getGroupInfo = async () => {
      try {
        const res = await API.get(`/group/find/${groupId}`);
        if (res.data.isSuccess) {
          setGroupInfo(() => {
            const newGroupInfo = res.data.groupInfo;
            if (Object.keys(newGroupInfo).length) {
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

  // useEffect(() => {
  //   console.log('그룹 정보 잘 설정되나 :: ', groupInfo);
  // }, [groupInfo]);

  useEffect(() => {
    // 로그인한 유저의 신청중인 그룹 가져오기
    const getPendingGroups = async () => {
      try {
        const res = await API.get('/group/pendingGroups');
        console.log('신청중인 그룹 :: ', res.data.pendingGroups);
        const result = res.data.pendingGroups.find((item: any) => item.group_id === groupId);
        if (result) {
          setIsPending(true);
        } else {
          setIsPending(false);
        }
      } catch (error) {
        console.error('Error fetching pending groups:', error);
      }
    };
    getPendingGroups();
  }, [groupId, isPending]);

  // 그룹 가입 요청
  const handleGroupRequest = async (groupId: string) => {
    if (userId) {
      try {
        const res = await API.post(`/group/studyGroup/${groupId}/join`);
        if (!res.data.isFull) {
          const data = res.data.message;
          setIsPending(true);
          alert(data);
        } else {
          alert(`${res.data.message}`);
        }
      } catch (err: any) {
        console.error(err.message);
        alert('요청 처리 중 오류가 발생했습니다.');
      }
    } else {
      alert('로그인 후 이용해주세요!');
    }
  };

  // 그룹 요청 취소
  const handleCancelRequest = async () => {
    try {
      const res = await API.delete(`/group/studyGroup/${groupId}/joinRequests`);
      if (res.data.isSuccess) {
        setIsPending(false);
        alert(`${res.data.message}`);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className={`allWrap relative ${isChatOn ? 'chat-open' : ''}`}>
        {Object.keys(groupInfo).length === 0 && <div className="loading">로딩 중...</div>}
        {groupInfo && Object.keys(groupInfo).length > 0 && (
          <div className="studyContentWrap flex flex-col break-all">
            <div className="btnWrap flex justify-between items-center mb-5">
              <button className="text-2xl font-semibold" onClick={handleGoBack}>
                <IoArrowBackOutline />
              </button>
              <div className="requestBtn">
                {!members.includes(userId) &&
                  (isPending ? (
                    <Button onClick={handleCancelRequest}>신청취소</Button>
                  ) : (
                    <Button onClick={() => handleGroupRequest(groupId)}>신청하기</Button>
                  ))}

                <Button className="ms-2" onClick={handleChat}>
                  채팅하기
                </Button>
              </div>
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
                  <span>{category}</span>
                </li>
                <li className="flex md:flex-row flex-col items-center gap-2">
                  <Badge color="indigo" size="md">
                    하루 목표시간
                  </Badge>
                  <span>{goal_time}시간</span>
                </li>
                <li className="flex md:flex-row flex-col items-center gap-2">
                  <Badge color="indigo" size="md">
                    인원
                  </Badge>
                  <span>
                    {members.length} / {member_max}
                  </span>
                </li>
              </ul>
            </div>

            <h3>그룹 소개</h3>
            <div className="mb-5">
              <div className="studyContent_postContent rounded-md w-full p-5 shadow-md min-h-[200px] break-all md:break-keep">
                {description ? description : ''}
              </div>
            </div>

            <div className="studyContent_btnWrap self-center">
              {userId ? (
                <>
                  {members.includes(userId) &&
                    (leader_id === userId ? (
                      <Button onClick={deleteGroup} color="red">
                        그룹삭제
                      </Button>
                    ) : (
                      <Button onClick={leaveGroup} color="red">
                        그룹탈퇴
                      </Button>
                    ))}
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        )}
        {isChatOn && (
          <div className="chatPage h-screen">{<ChatPage setIsChatOn={setIsChatOn} groupId={groupId} />}</div>
        )}
      </div>
    </div>
  );
}
