import { useRef } from 'react';
import SwiperCore from 'swiper';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay, EffectFade } from 'swiper/modules';
import { images } from './image-data';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { MotionButton } from '../../components/common/Button';

export default function VisualComponent() {
  const navPrevButton = useRef<HTMLButtonElement>(null);
  const navNextButton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const onBeforeInit = (Swiper: SwiperCore): void => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation;
      if (!navigation) return;
      navigation.prevEl = navPrevButton.current;
      navigation.nextEl = navNextButton.current;
    }
  };

  return (
    <Swiper
      onBeforeInit={onBeforeInit}
      effect={'fade'}
      pagination={{
        clickable: true,
      }}
      keyboard={true}
      modules={[Navigation, Pagination, Keyboard, Autoplay, EffectFade]}
      slidesPerView={1}
      // autoplay={{ delay: 3000 }}
      allowTouchMove={false}
      loop={true}
      className="h-full"
    >
      {images.map(item => (
        <SwiperSlide className="relative">
          <div
            style={{ backgroundImage: `url(${item.src})` }}
            className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover"
          >
            <div className="lg:w-[1200px] md:w-[768px] w-full mx-auto h-[400px]">
              <div className="md:pl-[50%] md:pt-60 pt-14 text-center md:text-left">
                <h3
                  dangerouslySetInnerHTML={{ __html: item.text }}
                  className={`md:text-5xl text-3xl md:leading-relaxed leading-normal text-${item.textColor} drop-shadow-md font-bold`}
                />
                <MotionButton onClick={() => navigate('/study')}>스터디 참여하기</MotionButton>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <button
        ref={navPrevButton}
        className="text-6xl text-white opacity-40 absolute z-10 top-0 bottom-0 my-auto left-0 pl-3 pr-2 hidden md:block"
      >
        <IoIosArrowBack />
      </button>
      <button
        ref={navNextButton}
        className="text-6xl text-white opacity-40 absolute z-10 top-0 bottom-0 my-auto right-0 pl-2 pr-3 hidden md:block"
      >
        <IoIosArrowForward />
      </button>
    </Swiper>
  );
}
