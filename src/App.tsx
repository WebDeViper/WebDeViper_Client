import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './components/layout';
import StudyPage from './pages/StudyPage';
import SignupPage from './pages/SignupPage';
import { useAppDispatch, useAppSelector } from './store/store';
import { useEffect } from 'react';
import { authUser } from './store/thunkFunctions';
import NoticePage from './pages/NoticePage';
import CreateNoticePage from './pages/CreateNoticePage';

function App() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch();
  const category = useAppSelector(state => state.user.userInfo.category);

  const { pathname } = useLocation();

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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/create" element={<CreateNoticePage />} />
      </Route>
    </Routes>
  );
}

export default App;
