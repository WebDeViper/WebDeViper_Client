import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './components/layout';
import StudyPage from './pages/StudyPage';
import CreateGroupPage from './pages/CreateGroupPage';
import SignupPage from './pages/SignupPage';
import { useAppDispatch, useAppSelector } from './store/store';
import { useEffect } from 'react';
import { authUser } from './store/thunkFunctions';
import NoticePage from './pages/NoticePage';
import CreateNoticePage from './pages/CreateNoticePage';
import NotAdminRoutes from './routes/NotAdminRoutes';
import { getAlarmMessage } from './store/userSlice';
import DetailNoticePage from './pages/DetailNoticePage';
import AlarmPage from './pages/AlarmPage';
import DetailGroupPage from './pages/DetailGroupPage';
import RankingPage from './pages/RankingPage';
import ProfilePage from './pages/ProfilePage';
import CalendarPage from './pages/CalendarPage';
import { io } from 'socket.io-client';
import ZoomPage from './pages/ZoomPage';
import KakaoPage from './pages/OAuthPage/KakaoPage';
import ErrorPage from './pages/ErrorPage';
import NotAuthRoutes from './components/NotAuthRoutes';

function App() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const isServiceAdmin = useAppSelector(state => state.user.userInfo.isServiceAdmin);
  const userId = useAppSelector(state => state.user.userInfo.id);
  const socket = io(`${import.meta.env.VITE_APP_BACK_URL}`, { auth: { userId } });
  const dispatch = useAppDispatch();
  // const category = useAppSelector(state => state.user.userInfo.category);

  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      socket.on('newNotice', message => {
        dispatch(getAlarmMessage(message));
      });
      socket.on('newGroupRequest', message => {
        dispatch(getAlarmMessage(message));
      });
    }
  }, [dispatch, isAuth, socket]);

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  useEffect(() => {
    // 모바일 접속시 스크롤 생기는 거 방지
    function setScreenSize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`); //"--vh"라는 속성으로 정의해준다.
    }

    window.addEventListener('resize', () => setScreenSize());
    return () => {
      window.removeEventListener('resize', () => setScreenSize());
    };
  }, []); //처음 마운트될때 값을 계산하도록 함수를 호출한다

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/study/group/:groupId" element={<DetailGroupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/notice" element={<NoticePage isServiceAdmin={isServiceAdmin} />} />
        <Route path="/notice/:noticeId" element={<DetailNoticePage isServiceAdmin={isServiceAdmin} />} />
        <Route path="/oauth/kakao" element={<KakaoPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route element={<NotAdminRoutes isServiceAdmin={isServiceAdmin} />}>
          <Route path="/notice/create" element={<CreateNoticePage />} />
        </Route>
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/study/group/create" element={<CreateGroupPage />} />
          <Route path="/alarm" element={<AlarmPage />} />
        </Route>
      </Route>
      <Route path="/zoom/:groupId" element={<ZoomPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
