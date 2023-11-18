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
import { io } from 'socket.io-client';
import { getAlarmMessage } from './store/userSlice';
export const socket = io('http://localhost:8001');

function App() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const isServiceAdmin = useAppSelector(state => state.user.userInfo.isServiceAdmin);
  const dispatch = useAppDispatch();
  const category = useAppSelector(state => state.user.userInfo.category);

  const { pathname } = useLocation();

  useEffect(() => {
    socket.on('newNotice', message => {
      console.log(message);
      dispatch(getAlarmMessage(message));
    });
    console.log(socket);
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/study/group/create" element={<CreateGroupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/notice" element={<NoticePage isServiceAdmin={isServiceAdmin} />} />
        <Route element={<NotAdminRoutes isServiceAdmin={isServiceAdmin} />}>
          <Route path="/notice/create" element={<CreateNoticePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
