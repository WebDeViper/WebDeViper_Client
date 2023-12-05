import { SiTypescript } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import { FaNodeJs } from 'react-icons/fa';
import { SiExpress } from 'react-icons/si';
import { SiMysql } from 'react-icons/si';
import { SiMongodb } from 'react-icons/si';
import { SiSocketdotio } from 'react-icons/si';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Footer() {
  const isPC = useMediaQuery({ query: '(max-width: 1200px)' });

  const [isOneOpen, setIsOneOpen] = useState(true);
  const [isTwoOpen, setIsTwoOpen] = useState(true);

  const handleOneOpen = () => {
    setIsOneOpen(!isOneOpen);
  };

  const handleTwoOpen = () => {
    setIsTwoOpen(!isTwoOpen);
  };

  useEffect(() => {
    if (!isPC) {
      setIsOneOpen(true);
      setIsTwoOpen(true);
    } else {
      setIsOneOpen(false);
      setIsTwoOpen(false);
    }
  }, [isPC]);

  return (
    <footer className="bg-slate-200">
      <div className="container mx-auto flex flex-col lg:flex-row gap-3 items-center lg:justify-between py-5">
        <div className="partOneWrap flex flex-col">
          <div className="flex items-center self-center lg:self-start mb-4">
            <div className="text-xl font-bold">열줌쉬어</div>
            {isPC &&
              (!isOneOpen ? (
                <button onClick={handleOneOpen}>
                  <FaAngleDown />
                </button>
              ) : (
                <button onClick={handleOneOpen}>
                  <FaAngleUp />
                </button>
              ))}
          </div>
          {isOneOpen && (
            <>
              <div className="mb-4">
                스탑워치 / 타이머 기능을 통해 실시간으로 공부시간을 기록하고, <br /> 가입한 그룹 내에 공부량을
                시각화하여 보여줌
              </div>
              <div>프로젝트 기간 : 2023.10.23 - 2023.11.10</div>
            </>
          )}
        </div>
        <div className="partTwoWrap flex flex-col lg:flex-row gap-4">
          <div className="flex items-center self-center lg:self-start">
            <div className="text-xl font-bold">Skill Set</div>
            {isPC &&
              (!isTwoOpen ? (
                <button onClick={handleTwoOpen}>
                  <FaAngleDown />
                </button>
              ) : (
                <button onClick={handleTwoOpen}>
                  <FaAngleUp />
                </button>
              ))}
          </div>

          {isTwoOpen && (
            <div className="flex gap-3">
              <ul className="flex flex-col gap-2">
                <li className="mb-4 font-semibold">FrontEnd</li>
                <li>
                  <div className="flex items-center gap-2">
                    <span>
                      <SiTypescript />
                    </span>
                    <span>TypeScript</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <span>
                      <FaReact />
                    </span>
                    <span>React.js</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <span>
                      <SiTailwindcss />
                    </span>
                    <span>Tailwindcss</span>
                  </div>
                </li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li className="mb-4 font-semibold">BackEnd</li>
                <li>
                  <div className="flex items-center gap-2">
                    <span>
                      <FaNodeJs />
                    </span>
                    <span>Node.js</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <span>
                      <SiExpress />
                    </span>
                    <span>Express.js</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <span>
                      <SiSocketdotio />
                    </span>
                    <span>Socket.IO</span>
                  </div>
                </li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li className="mb-4 font-semibold">Database</li>
                <li>
                  <div className="flex items-center gap-2">
                    <span>
                      <SiMysql />
                    </span>
                    <span>MySQL</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <span>
                      <SiMongodb />
                    </span>
                    <span>MongoDB</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
