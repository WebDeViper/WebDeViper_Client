import { useSelector } from 'react-redux';
import MyGroup from './MyGroup';
import StudyGroup from './StudyGroup';
import type { RootState } from '../../store/store';

export default function StudyPage() {
  // 리덕스에서 state 사용하여 userId 조회
  const userId = useSelector((state: RootState) => state.user?.userInfo?.id);
  return (
    <div>
      {userId ? <MyGroup /> : null}
      <StudyGroup userId={userId} />
    </div>
  );
}
