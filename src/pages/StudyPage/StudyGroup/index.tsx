import { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';
import { Button } from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import GroupItem from './GroupItem';

interface Props {
  userId: string;
}

export default function StudyGroup({ userId }: Props) {
  const [studyGroup, setStudyGroup] = useState<GroupInfoType[]>([]);
  const [lastGroupId, setLastGroupId] = useState('');
  const [hasMoreGroup, setHasMoreGroup] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const getGroupData = async () => {
      try {
        const response = await API.get(`/group/all`);
        const data = response.data;
        console.log('모든 스터디그룹 :: ', data);
        setStudyGroup(data.data);
        setLastGroupId(data.data[data.data.length - 1].group_id);
        if (data.isEnd) {
          setHasMoreGroup(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getGroupData();
  }, [userId]);

  const handleCreateGroup = () => {
    navigate('/study/group/create');
  };

  const handleMoreGroup = async () => {
    try {
      const response = await API.get(`/group/all/${lastGroupId}`);
      const data = response.data;
      console.log('모든 스터디그룹 :: ', data);
      if (data.data.length) {
        const newStudyGroup = studyGroup.concat(data.data);
        setStudyGroup(newStudyGroup);
        setLastGroupId(newStudyGroup[newStudyGroup.length - 1].group_id);
        if (data.isEnd) {
          setHasMoreGroup(false);
        }
      } else {
        setHasMoreGroup(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="relative container">
      <h2>이런 스터디는 어떠세요?</h2>
      <div className="absolute -top-1 right-4 sm:right-0">
        <Button onClick={handleCreateGroup}>스터디 만들기</Button>
      </div>
      {!studyGroup.length ? (
        <div className="h-20 w-full flex flex-col justify-center p-2 shadow-lg rounded-lg">
          <p className="text-lg font-medium">아직 생성된 스터디그룹이 없어요!</p>
          <p>그룹을 생성해보세요!</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 grid-cols-3 md:grid-cols-4 gap-2 grid-flow-row auto-rows-fr">
          {studyGroup?.map(item => (
            <GroupItem key={item.group_id} groupInfo={item} />
          ))}
        </div>
      )}
      {hasMoreGroup && (
        <Button className="self-center mt-3" onClick={handleMoreGroup}>
          더보기
        </Button>
      )}
    </section>
  );
}
