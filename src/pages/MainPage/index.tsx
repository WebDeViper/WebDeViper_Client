import VisualComponent from './VisualComponent';
import '../../styles/main.css';
import { useNavigate } from 'react-router-dom';
import { MotionButton } from '../../components/common/Button';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BsGithub } from 'react-icons/bs';

export default function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <section className="w-full relative overflow-hidden md:h-[820px] h-[600px]">
        <h2 className="skip">visual</h2>
        <VisualComponent />
      </section>
      <section className="bg-gray-100">
        <div className="container">
          <div className="flex lg:flex-row flex-col py-12">
            <div className="flex-1">
              <div
                style={{ backgroundImage: `url('/images/main_visual_01.jpg')` }}
                data-aos="flip-up"
                data-aos-delay="400"
                data-aos-offset="0"
                data-aos-duration="2500"
                className="sm:h-[480px] h-[360px] shadow-2xl rounded-md bg-no-repeat bg-center bg-cover w-11/12 md:w-[480px] lg:m-0 mx-auto lg:w-9/12"
              />
            </div>
            <div className="flex-1 pb-20 order-first lg:order-last lg:pt-10 text-center lg:text-left">
              <h2
                className="md:text-4xl text-3xl md:leading-normal leading-snug"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                하루 공부시간을 설정하고
                <br />
                목표량을 달성해보세요
              </h2>
              <p className="md:text-xl text-lg md:leading-normal" data-aos="fade-up" data-aos-duration="1000">
                스탑워치를 이용해 하루 공부시간을 확인해보세요
                <br />
                열줌쉬어는 즐겁게 공부할 수 있는 다양한 기능을 제공합니다
              </p>
              <div className="mt-8" data-aos="zoom-in-up" data-aos-duration="1000">
                <MotionButton onClick={() => navigate('/study')}>스터디 참여하기</MotionButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <h2>GitHub</h2>
        <div className="lg:flex lg:gap-5" data-aos="fade-up" data-aos-duration="1000">
          <div className="flex-1 text-center lg:text-left lg:mt-0 mt-20">
            <a href="https://github.com/HongMinYeong">
              <div
                style={{ backgroundImage: `url('/images/my.jpeg')` }}
                className="col-span-6 h-96 rounded-md bg-no-repeat bg-center bg-cover"
              ></div>
              <div className="mt-4 flex font-semibold self-center text-lg items-center gap-2">
                <BsGithub />
                <span className="text-xl">홍민영</span>
              </div>
              <span className="mt-1 block text-primary-500 text-xl font-semibold"># BackEnd # 팀장</span>
            </a>
          </div>
          <div className="flex-1 lg:mt-0 mt-20">
            <div className="grid grid-cols-2 gap-x-4 gap-y-10">
              <div>
                <a href="https://github.com/hoonsdev">
                  <div
                    style={{ backgroundImage: `url('/images/th.jpeg')` }}
                    className="col-span-6 h-40 rounded-md bg-no-repeat bg-center bg-cover"
                  ></div>
                  <div className="mt-4 flex font-semibold text-lg items-center gap-2">
                    <BsGithub />
                    <span>김태훈</span>
                  </div>
                  <span className="mt-1 block text-primary-500 text-lg font-semibold"># FrontEnd</span>
                </a>
              </div>
              <div>
                <a href="https://github.com/msm0748">
                  <div
                    style={{ backgroundImage: `url('/images/sm.jpeg')` }}
                    className="col-span-6 h-40 rounded-md bg-no-repeat bg-center bg-cover"
                  ></div>
                  <div className="mt-4 flex font-semibold text-lg items-center gap-2">
                    <BsGithub />
                    <span>문석민</span>
                  </div>
                  <span className="mt-1 block text-primary-500 text-lg font-semibold"># FrontEnd</span>
                </a>
              </div>
              <div>
                <a href="https://github.com/seeun0210">
                  <div
                    style={{ backgroundImage: `url('/images/se.jpeg')` }}
                    className="col-span-6 h-40 rounded-md bg-no-repeat bg-center bg-cover"
                  ></div>
                  <div className="mt-4 flex font-semibold text-lg items-center gap-2">
                    <BsGithub />
                    <span>김세은</span>
                  </div>
                  <span className="mt-1 block text-primary-500 text-lg font-semibold"># BackEnd</span>
                </a>
              </div>
              <div>
                <a href="https://github.com/hotdog7778">
                  <div
                    style={{ backgroundImage: `url('/images/tg.jpeg')` }}
                    className="col-span-6 h-40 rounded-md bg-no-repeat bg-center bg-cover"
                  ></div>
                  <div className="mt-4 flex font-semibold text-lg items-center gap-2">
                    <BsGithub />
                    <span>김태균</span>
                  </div>
                  <span className="mt-1 block text-primary-500 text-lg font-semibold"># BackEnd</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
