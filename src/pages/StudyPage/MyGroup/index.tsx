import GroupItem from './GroupItem';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { API } from '../../../utils/axios';
import { useEffect, useState } from 'react';

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
                className="swiper_custom p-3 h-72"
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
          <div className="flex-1 order-first lg:order-2">
            <h2>내 목표</h2>
            <div className="rounded-md border border-slate-300 p-5">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">
                  <span>오늘 공부한 시간</span>
                  <span className="mx-1">/</span>
                  <span>내 목표 시간</span>
                </div>
                <div>
                  <button className=" bg-slate-200 px-2 py-1 rounded-xl text-xs text-slate-500">설정</button>
                </div>
              </div>
              <div className="font-semibold text-lg mt-3">
                <span>4시간 0분</span>
                <span className="mx-1">/</span>
                <span>8시간 0분</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-200 mt-4 relative">
                <span className="absolute w-[50%] top-0 bottom-0 bg-black rounded-full"></span>
              </div>
              <div className="w-full h-[1px] bg-slate-200 my-7 md:my-10"></div>
              <div>
                <div className="flex justify-between">
                  <div>
                    <span className="font-semibold">상태 메세지</span>
                  </div>
                  <div>
                    <button className=" bg-slate-200 px-2 py-1 rounded-xl text-xs text-slate-500">설정</button>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-sm text-slate-400">상태 메세지는 30자 이내로 작성 가능합니다.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
