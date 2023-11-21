import { useCallback, useEffect, useState } from 'react';
import { API } from '../../utils/axios';
import categories from '../../data/category';
// import DropDown from '../../components/common/DropDown';
// import UserRank from './userRank';
// import GroupRank from './groupRank';
// import { Badge } from 'flowbite-react';
import calculateTime from '../../utils/calculateTime';
import { useAppSelector } from '../../store/store';
import Badge from '../../components/common/Badge';
import SelectMenu from '../../components/common/SelectMenu';
// import './index.css';

const items = [...categories];

export default function RankingPage() {
  // 디폴트로 보여주기 위해 로그인한 유저가 속한 카테고리 선택
  const userCategory = useAppSelector(state => state.user?.userInfo?.category);
  // 카테고리 변경, top3, top3제외 를 관리하기 위한 state
  const [category, setCategory] = useState(categories[0]);
  const [groupRanking, setGroupRanking] = useState([]);
  const [userRanking, setUserRanking] = useState([]);

  // console.log('뭐지??', top3, other);

  // 처음 들어왔을 때 디폴트 카테고리로 조회한 결과 보여주기
  const getFirstRank = async () => {
    try {
      const res = await API.get('/ranking');
      setRank(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 서버에서 응답받은 데이터로 랭킹 state 업데이트하는 함수
  const setRank = (data: any) => {
    const { topUsers, topGroups } = data;
    if (topUsers && topGroups) {
      setUserRanking(topUsers);
      setGroupRanking(topGroups);
    } else if (topUsers && !topGroups) {
      setUserRanking(topUsers);
      setGroupRanking([]);
    } else if (!topUsers && topGroups) {
      setUserRanking([]);
      setGroupRanking(topGroups);
    } else {
      setUserRanking([]);
      setGroupRanking([]);
    }
  };

  // 카테고리별 탑텐 요청하는 함수.. 카테고리 바뀔때만 함수 재정의(useCallback)
  const getCategory = useCallback(async () => {
    // 바뀐 카테고리에 해당하는 랭킹 데이터 요청
    try {
      const res = await API.get(`/ranking?category=${category}`);
      setRank(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [category]);

  useEffect(() => {
    try {
      getFirstRank();
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    try {
      getCategory();
    } catch (err) {
      console.error(err);
    }
  }, [getCategory]);

  return (
    <div className="container relative">
      <h2>랭킹</h2>
      <SelectMenu selected={category} data={items} setSelected={setCategory}></SelectMenu>
      {/* 초단위 */}

      <div className="absolute top-2 right-0">
        <Badge color="pink">어제 기준 랭킹 12시마다 업데이트</Badge>
      </div>
      <div className="mb-3 w-1/4"></div>
      {/* <UserRank userRanking={userRanking} calculateTime={calculateTime} />
      <GroupRank groupRanking={groupRanking} calculateTime={calculateTime} /> */}
    </div>
  );
}
