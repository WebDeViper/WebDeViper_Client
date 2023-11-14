import { BsGithub } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-slate-200">
      <div className="container mx-auto">
        <div className="flex justify-between py-10">
          <div>
            <div className="text-xl font-bold mb-4">열줌쉬어</div>
            <div className="mb-4">
              스탑워치 / 타이머 기능을 통해 실시간으로 공부시간을 기록하고, <br /> 가입한 그룹 내에 공부량을 시각화하여
              보여줌
            </div>
            <div>프로젝트 기간 : 2023.10.23 - 2023.11.10</div>
            <div></div>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              <li className="mb-4 font-semibold">Frontend</li>
              <li>
                <a href="https://github.com/hoonsdev" target="_bank">
                  <div className="flex items-center gap-2">
                    <span>
                      <BsGithub />
                    </span>
                    <span>김태훈</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://github.com/msm0748" target="_bank">
                  <div className="flex items-center gap-2">
                    <span>
                      <BsGithub />
                    </span>
                    <span>문석민</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              <li className="mb-4 font-semibold">Backend</li>
              <li>
                <a href="https://github.com/seeun0210" target="_bank">
                  <div className="flex items-center gap-2">
                    <span>
                      <BsGithub />
                    </span>
                    <span>김세은</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://github.com/hotdog7778" target="_bank">
                  <div className="flex items-center gap-2">
                    <span>
                      <BsGithub />
                    </span>
                    <span>김태균</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://github.com/HongMinYeong" target="_bank">
                  <div className="flex items-center gap-2">
                    <span>
                      <BsGithub />
                    </span>
                    <span>홍민영</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
