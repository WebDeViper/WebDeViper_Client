import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/userSlice';
import { GoBell } from 'react-icons/go';
import { HiMiniBars3 } from 'react-icons/hi2';

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

  console.log(alarmMessage);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    setModalOpen(false);
  };

  const user = {
    nickname: userInfo.nickName,
    email: userInfo.email,
    imageUrl: 'https://data.onnada.com/character/201105/C3528_2048931593_266362f8_3.JPG',
  };

  return (
    <header className="bg-gray-800">
      {!isAuth && <LoginModal open={modalOpen} onClose={setModalOpen} />}
      <div className="container">
        <div className="flex h-16 items-center justify-between">
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
            {/* mobile 좌측 */}
            <div className="md:hidden">모바일 일 때 여기 코드</div>
          </div>
          {/* pc 우측 */}
          <div className="hidden md:block">
            <div className="flex items-center md:ml-6 gap-4">
              {/* 로그인 사용자만 보일 수 있게 처리 */}
              {isAuth ? (
                <>
                  <button className="text-2xl text-gray-400 hover:text-white p-1">
                    <GoBell />
                  </button>
                  <button className="p-1">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5allhVIDcWziGtl4Rhu3Ccm5SkkTi50ageg&usqp=CAU"
                      alt="profile"
                    />
                  </button>
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
            <button className="text-2xl rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <HiMiniBars3 />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
