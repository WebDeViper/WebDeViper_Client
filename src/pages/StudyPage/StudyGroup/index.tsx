import { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';
import { Button } from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import GroupItem from '../GroupItem';
// import { Card } from 'flowbite-react';
import 'swiper/css';

interface Props {
  userId: string;
}

export default function StudyGroup({ userId }: Props) {
  const [studyGroup, setStudyGroup] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getGroupData = async () => {
      try {
        const response = await API.get('/group/all');
        const data = response.data;
        console.log('모든 스터디그룹 :: ', data);
        // if (data.data) {
        //   setStudyGroup(data.data.filter((group: GroupInfoType) => !group.members.includes(userId)));
        // }
        setStudyGroup(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getGroupData();
  }, [userId]);

  const handleCreateGroup = () => {
    navigate('/study/group/create');
  };

  return (
    <section className="relative">
      <div className="allStudyTitleWrap flex justify-between items-center">
        <h2 className="font-bold text-2xl">이런 스터디는 어떠세요?</h2>
      </div>
      <div className="absolute top-1 right-0">
        <Button onClick={handleCreateGroup}>스터디 만들기</Button>
      </div>
      <div>
        {!studyGroup.length ? (
          <div className="h-20 w-full flex flex-col justify-center p-2 shadow-lg rounded-lg">
            <p className="text-lg font-medium">아직 생성된 스터디그룹이 없어요!</p>
            <p>그룹을 생성해보세요!</p>
          </div>
        ) : (
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
            {studyGroup?.map((item, index) => {
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
    </section>
  );
}
