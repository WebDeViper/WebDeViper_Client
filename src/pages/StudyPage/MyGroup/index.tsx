import GroupItem from '../GroupItem';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { API } from '../../../utils/axios';
import { useEffect, useState } from 'react';
// import { Card } from 'flowbite-react';

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
    <section>
      <h2 className="font-bold text-2xl mb-5">내가 속한 그룹</h2>
      {!myGroups.length && (
        <div className="h-20 w-full flex flex-col justify-center p-2 shadow-lg rounded-lg">
          <h1 className="text-lg font-medium">아직 생성된 스터디그룹이 없어요!</h1>
          <p>그룹을 생성해보세요!</p>
        </div>
      )}
      {myGroups.length > 0 && (
        <Swiper
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          navigation={true}
          keyboard={true}
          modules={[Navigation, Pagination, Keyboard, Autoplay]}
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{ delay: 3000 }}
          className="swiper_custom p-3 h-72"
        >
          {myGroups?.map((item, index) => {
            const { _id, is_private } = item;
            if (is_private) {
              //is_private이 true 면 보여주지않음
              return null;
            }
            return (
              <SwiperSlide key={index}>
                <GroupItem key={_id} groupInfo={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
}
