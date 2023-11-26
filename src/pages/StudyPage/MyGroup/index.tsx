import GroupItem from './GroupItem';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { API } from '../../../utils/axios';
import { useEffect, useState } from 'react';
import MyGoal from './MyGoal';

export default function MyGroup() {
  const [myGroups, setMyGroups] = useState([]);
  // 랜더링 시 내가 속한 그룹 리스트 받아오기
  useEffect(() => {
    const getMyGroups = async () => {
      try {
        const res = await API.get('/group/studyGroups/users');
        console.log('내가 속한 그룹 ', res.data.study_groups);
        setMyGroups(res.data.study_groups);
      } catch (err) {
        console.error('에러!!!', err);
      }
    };

    getMyGroups();
  }, []);
  return (
    <section className="bg-slate-100 -mt-5">
      <div className="container pt-12 pb-20">
        <div className="flex lg:flex-row flex-col ">
          <div className="lg:w-[480px] lg:mr-16 lg:mt-0 mt-8">
            <h2>내 스터디</h2>
            {!myGroups.length && (
              <div className="h-20 w-full flex flex-col justify-center p-2 shadow-lg rounded-lg">
                <h1 className="text-lg font-medium">아직 생성된 스터디그룹이 없어요!</h1>
                <p>그룹을 생성해보세요!</p>
              </div>
            )}
            {myGroups.length > 0 && (
              <Swiper
                navigation={true}
                keyboard={true}
                modules={[Navigation, Pagination, Keyboard, Autoplay]}
                slidesPerView={2}
                spaceBetween={10}
                autoplay={{ delay: 3000 }}
                className="swiper_custom h-[277px]"
              >
                {myGroups?.map((item, index) => {
                  const { group_id } = item;
                  return (
                    <SwiperSlide key={index}>
                      <GroupItem key={group_id} groupInfo={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
          <MyGoal />
        </div>
      </div>
    </section>
  );
}
