import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/userSlice';
import { GoBell } from 'react-icons/go';
import { HiMiniBars3 } from 'react-icons/hi2';
import useModalToggle from '../../hooks/useModalToggle';
import { IoCloseSharp } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';

const navigation = [
  { name: '공부하기', href: '/study', current: false },
  { name: '캘린더', href: '/calendar', current: false },
  { name: '랭킹', href: '/ranking', current: false },
  { name: '공지사항', href: '/notice', current: false },
];

export default function Header() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const userInfo = useAppSelector(state => state.user.userInfo);
  const alarmMessage = useAppSelector(state => state.user.userInfo.alarmMessage);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [isProfileOpen, selectProfileRef, toggleProfileOpen] = useModalToggle();
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const isPC = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    console.log(alarmMessage);
  }, [alarmMessage]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleToggleMobile = () => {
    setIsMobileMenu(prev => !prev);
  };

  const handleLogout = () => {
    toggleProfileOpen();
    dispatch(logout());
    setModalOpen(false);
  };

  useEffect(() => {
    setIsMobileMenu(false);
  }, [isPC]);

  const user = {
    nickname: userInfo.nickName,
    email: userInfo.email,
    imageUrl: 'https://data.onnada.com/character/201105/C3528_2048931593_266362f8_3.JPG',
  };

  return (
    <header className="bg-gray-800">
      {/* 로그인 모달 */}
      {!isAuth && <LoginModal open={modalOpen} onClose={setModalOpen} />}

      <div className="container">
        <div className="flex h-16 items-center justify-between relative">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to={'/'}>
                <img className="h-8 w-8" src="https://avatars.githubusercontent.com/u/148475509?s=48&v=4" alt="로고" />
              </Link>
            </div>
            {/* pc 좌측 */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="hover:bg-gray-700 hover:text-white text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* pc 우측 */}
          <div className="hidden md:block">
            <div className="flex items-center md:ml-6 gap-4 relative">
              {/* 로그인 사용자만 보일 수 있게 처리 */}
              {isAuth ? (
                <>
                  <button className="text-2xl text-gray-400 hover:text-white p-1 focus:outline-none rounded-full">
                    <GoBell />
                  </button>
                  <button className="p-1" onClick={toggleProfileOpen}>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5allhVIDcWziGtl4Rhu3Ccm5SkkTi50ageg&usqp=CAU"
                      alt="profile"
                    />
                  </button>
                  {/* 프로필 클릭 */}
                  {isProfileOpen && (
                    <div
                      className="absolute z-10 right-0 shadow-lg rounded-md bg-white mt-12 top-0 py-1 w-48"
                      ref={selectProfileRef}
                    >
                      <div className="hover:bg-gray-100">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700"
                          onClick={toggleProfileOpen}
                        >
                          프로필
                        </Link>
                      </div>
                      <div className="hover:bg-gray-100">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                        >
                          로그아웃
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={handleModalOpen}
                    className="text-gray-300 text-sm font-medium hover:bg-gray-700 hover:text-white rounded-md px-3 py-2"
                  >
                    로그인
                  </button>
                  <Link
                    to="/signup"
                    className="text-gray-300 text-sm font-medium hover:bg-gray-700 hover:text-white rounded-md px-3 py-2"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* mobile 우측 */}
          <div className="md:hidden">
            <button
              onClick={handleToggleMobile}
              className="text-2xl rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              {isMobileMenu ? <IoCloseSharp /> : <HiMiniBars3 />}
            </button>
          </div>
        </div>
        {/* 모바일 메뉴 */}
      </div>
      <div className="md:hidden">
        {isMobileMenu && (
          <>
            <div className="container">
              <div className="-ml-3 pb-3 pt-2">
                {navigation.map(item => (
                  <Link
                    to={item.href}
                    key={item.name}
                    className="text-white block rounded-md py-2 text-base font-medium hover:bg-gray-700 px-3"
                    onClick={() => setIsMobileMenu(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-700">
              <div className="container">
                <div className="-ml-3 pb-3 pt-2">
                  {/* 로그인 프로필 */}
                  {isAuth ? (
                    <>
                      <div className="flex justify-between px-3 py-3">
                        <div className="flex gap-3 items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5allhVIDcWziGtl4Rhu3Ccm5SkkTi50ageg&usqp=CAU"
                            alt="profile"
                          />

                          <div className="flex flex-col gap-1">
                            <div className="text-base font-medium leading-none text-white">{user.nickname}</div>
                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                          </div>
                        </div>
                        <button className="text-2xl text-gray-400 hover:text-white p-1 focus:outline-none rounded-full">
                          <GoBell />
                        </button>
                      </div>
                      <div>
                        <Link
                          to="/profile"
                          className="text-white block rounded-md py-2 text-base font-medium hover:bg-gray-700 px-3"
                          onClick={() => setIsMobileMenu(false)}
                        >
                          프로필
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="text-white block rounded-md py-2 text-base font-medium hover:bg-gray-700 px-3 w-full text-left"
                        >
                          로그아웃
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleModalOpen}
                        className="text-white block rounded-md py-2 text-base font-medium hover:bg-gray-700 px-3 w-full text-left"
                      >
                        로그인
                      </button>
                      <Link
                        to="/signup"
                        className="text-white block rounded-md py-2 text-base font-medium hover:bg-gray-700 px-3"
                        onClick={() => setIsMobileMenu(false)}
                      >
                        회원가입
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
